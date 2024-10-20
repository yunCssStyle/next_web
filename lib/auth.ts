import Apple from 'next-auth/providers/apple';
import Google from 'next-auth/providers/google';

import REDIS_CUSTOM from '@/util/redis';
import { createPrivateKey, randomUUID } from 'crypto';
import { AuthOptions } from 'next-auth';
import { SignJWT } from 'jose';
import AxiosServer from '@/axios/axiosServer';
import { flightSlackMessage } from '@/util/flightSlackMessage';
import NextAuth from 'next-auth/next';

// Read more at: https://next-auth.js.org/getting-started/typescript#module-augmentation
declare module 'next-auth/jwt' {
  interface JWT {
    /** The user's role. */
    userRole?: 'admin';
  }
}

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string | null;
      name: string | null;
      isSession: boolean;
      useSession: boolean;
      memberId: string;
      sid: string | null;
      image: string | null;
      error: string | null;
    };
  }
}

const env = process.env.NEXT_PUBLIC_ENVIRONMENT;

const getAppleToken = async () => {
  const key = `-----BEGIN PRIVATE KEY-----\n${process.env.NEXT_PUBLIC_APPLE_PRIVATE_KEY}\n-----END PRIVATE KEY-----\n`;

  //issuedAt
  const issuedAt = new Date().getTime() / 1000;
  // 1month
  const expireTime = issuedAt + 60 * 60 * 24 * 30 * 6;

  const appleToken = await new SignJWT({})
    .setAudience('https://appleid.apple.com')
    .setIssuer(process.env.NEXT_PUBLIC_APPLE_TEAM_ID)
    .setIssuedAt(issuedAt)
    .setExpirationTime(expireTime)
    .setSubject(process.env.NEXT_PUBLIC_APPLE_CLIENT_ID)
    .setProtectedHeader({
      alg: 'ES256',
      kid: process.env.NEXT_PUBLIC_APPLE_KEY_ID
    })
    .sign(createPrivateKey(key));

  //필요
  await flightSlackMessage(
    `[-----APPLE_LOGIN_TOKEN_GEN-----] | expireTime: ${new Date(
      expireTime * 1000
    )}`
  );

  return appleToken;
};
export const authOption: AuthOptions = {
  /**
   * 애플 로그인 시 쿠키옵션 적용해 주어야 callbackUrl이 정상 작동
   */

  cookies: {
    pkceCodeVerifier: {
      name: 'next-auth.pkce.code_verifier',
      options: {
        httpOnly: true,
        sameSite: 'none',
        path: '/',
        secure: true
      }
    }
  },

  // https://next-auth.js.org/configuration/providers/oauth
  providers: [
    Apple({
      clientId: process.env.NEXT_PUBLIC_APPLE_CLIENT_ID,
      clientSecret: await getAppleToken(),
      idToken: true,
      profile(profile, tokens) {
        return {
          id: profile.sub,
          email: profile.email,
          provider: 'APPLE'
        };
      }
    }),

    Google({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
      idToken: true,
      profile(profile, tokens) {
        return {
          id: profile.sub,
          email: profile.email,
          provider: 'GOOGLE'
        };
      }
    })
  ],

  callbacks: {
    async jwt({ token, user }: any) {
      if (user?.email) {
        const payload = {
          provider: user.provider,
          providerId: user.id, //sub
          email: user.email
        };

        const errLocation = { api: 'fail', redis: 'fail' };

        await AxiosServer.post('/logins/authentication', payload)
          .then(async (res) => {
            token.memberId = res.data.memberId;
            token.sid = randomUUID();

            return { memberId: res.data.memberId, sid: token.sid };
          })
          .then(async (res) => {
            if (res.memberId) {
              errLocation.api = 'success';
            }
            try {
              if (payload.email.includes('@privaterelay.appleid.com')) {
                await REDIS_CUSTOM.set(res.memberId, `${res.sid}:true`);
              } else {
                await REDIS_CUSTOM.set(res.memberId, `${res.sid}:false`);
              }
            } catch (e) {
              errLocation.redis = 'fail';
              //필요
              await flightSlackMessage(
                `[-----LOGIN_ERROR1-----] payload: ${JSON.stringify(
                  payload
                )}, errLocation: ${JSON.stringify(errLocation)}, apiHost: ${
                  process.env.NEXT_PUBLIC_API_HOST
                }`
              );
            }
          })
          .catch(async (err) => {
            const checkId = randomUUID();
            await REDIS_CUSTOM.set('inspect', checkId);
            const redisInspect = await REDIS_CUSTOM.get('inspect');
            if (redisInspect === checkId) {
              errLocation.redis = 'success';
            }
            //필요
            await flightSlackMessage(
              `[-----LOGIN_ERROR2-----] | payload: ${JSON.stringify(
                payload
              )} | errLocation: ${JSON.stringify(errLocation)}, apiHost: ${
                process.env.NEXT_PUBLIC_API_HOST
              }`
            );
          });
        // -------end test code ver
      }

      const redisData = await REDIS_CUSTOM.get(token.memberId);

      if (redisData) {
        return token;
      } else {
        return null;
      }
    },

    async session({ session, token }: any) {
      session.user.memberId = token.memberId;
      session.user.sid = token.sid;

      return session;
    }
  },

  pages: {
    signIn: '/',
    error: '/'
    // signOut: '/?signout=true'
  },

  secret: process.env.NEXTAUTH_SECRET
};

export const auth = async (req: any, res: any) => {
  return await NextAuth(req, res, authOption);
};

declare global {
  namespace NodeJS {
    export interface ProcessEnv {
      NEXT_PUBLIC_GOOGLE_CLIENT_ID: string;
      NEXT_PUBLIC_GOOGLE_CLIENT_SECRET: string;

      //example
      NEXTAUTH_SECRET: string;
      AUTH_APPLE_ID: string;
      AUTH_APPLE_SECRET: string;
      AUTH_GOOGLE_ID: string;
      AUTH_GOOGLE_SECRET: string;
    }
  }
}
