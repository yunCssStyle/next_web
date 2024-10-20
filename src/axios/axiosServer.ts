import { sessionType } from '@/app/api/user-info/route';
import { getServerSideIsWrong } from '@/util/serverSide/getServerSideIsWrong';
import axios from 'axios';
import { authOption } from 'lib/auth';
import { getServerSession } from 'next-auth';
import { ClientCodeType } from './axios';
import { flightSlackMessage } from '@/util/flightSlackMessage';

// 서버에서만 실행
import 'server-only';

const InvalidInput = 'Invalid input detected';

const sqlInjectionPattern =
  /(\b(SELECT|UPDATE|DELETE|INSERT)\b|;|--|\b(OR|AND)\b.*=.*)/i;

export function validateInput(input: string) {
  if (sqlInjectionPattern.test(String(input))) {
    throw new Error(InvalidInput);
  }
}

const AxiosServer = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_HOST}`,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*'
  },
  withCredentials: true,
  timeout: 10000
});

AxiosServer.interceptors.request.use(
  async (config) => {
    if (config.url === '/logins/authentication') return config;

    const session = (await getServerSession(authOption)) as sessionType;
    if (session) {
      config.headers['memberId'] = session.user.memberId;
    }

    //prevent sql injection
    //todo sql injection 주석해제
    // validateInput(config.url + JSON.stringify(config.params));
    return config;
  },
  async (error) => {
    await flightSlackMessage(
      `AxiosServer request error1: ${JSON.stringify(error)}}`
    );

    return Promise.reject(error);
  }
);

AxiosServer.interceptors.response.use(
  async (response) => {
    if (
      response.config.url === '/logins/authentication' ||
      response.config.url === 'profiles/collection-list' ||
      response.config.url === '/votes' ||
      response.config.url === '/votes/vote' ||
      (response.config.url !== null &&
        response.config.url!.includes('profiles/stat')) ||
      (response.config.url !== null &&
        response.config.url!.includes('votes/detail')) ||
      (response.config.url !== null &&
        response.config.url!.includes('votes/result'))
    )
      return response;

    const isWrong = await getServerSideIsWrong();

    if (!isWrong.isWrong) return response;

    const error = {
      response: {
        data: {
          client_code: 'UNKNOWN' as ClientCodeType,
          status: 412
        }
      }
    };

    switch (isWrong.type) {
      case 'emptySession':
        error.response.data.client_code = 'EMPTY_SESSION';
        break;

      case 'emptyRedis':
        error.response.data.client_code = 'EMPTY_REDIS';
        break;

      case 'multiLogin':
        error.response.data.client_code = 'MULTI_LOGIN';
        break;

      default:
        break;
    }
    return Promise.reject(error);
  },

  async (error) => {
    if (error.message === InvalidInput) {
      error.response = {
        data: {
          client_code: 'UNKNOWN',
          client_message: 'Invalid input detected',
          description: 'Invalid input detected',
          status: 400
        }
      };
      return Promise.reject(error);
    }

    switch (error.config?.url) {
      case '/wallets/valid-wallet':
        break;
      default:
      // await flightSlackMessage(
      //   `AxiosServer response error2: ${JSON.stringify(error)}}`
      // );
    }

    return Promise.reject(error);
  }
);

//redis unChecked url
const redisUnCheckedUrl = ['/logins/authentication', '/votes/result'];

export default AxiosServer;
