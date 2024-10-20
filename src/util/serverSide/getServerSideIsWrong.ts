'use server';
import { sessionType } from '@/app/api/user-info/route';
import { authOption } from 'lib/auth';
import { getServerSession } from 'next-auth';
import REDIS_CUSTOM from '../redis';
import { flightSlackMessage } from '../flightSlackMessage';

export async function getServerSideIsWrong() {
  const session = (await getServerSession(authOption)) as sessionType;
  const result: isWrongType = { isWrong: false, type: 'noError' };
  try {
    if (!session) {
      result.isWrong = true;
      result.type = 'emptySession';
      return result;
    }

    const sid = session.user.sid;
    const redisData = await REDIS_CUSTOM.get(session?.user.memberId);
    const hasActiveSession = redisData?.includes(sid);

    if (!redisData) {
      result.isWrong = true;
      result.type = 'emptyRedis';
      return result;
    }

    if (redisData && !hasActiveSession) {
      result.isWrong = true;
      result.type = 'multiLogin';
      return result;
    }

    if (result.isWrong === false) {
      await REDIS_CUSTOM?.expire(session.user.memberId, 30 * 60);
    }

    return result;
  } catch (error) {
    await flightSlackMessage(
      `[IsWrong] isWrong error: ${JSON.stringify(
        error
      )}} | result: ${JSON.stringify(result)}
        `
    );
    result.isWrong = true;
    result.type = 'unknown';

    return result;
  }
}

type isWrongType = {
  isWrong: boolean;
  type: 'emptySession' | 'emptyRedis' | 'multiLogin' | 'noError' | 'unknown';
};
