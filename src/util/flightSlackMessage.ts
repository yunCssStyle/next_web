import axios from 'axios';

export const flightSlackMessage = async (errorMessage: string) => {
  const env = process.env.NEXT_PUBLIC_ENVIRONMENT;

  if (env === 'local') {
    console.log('----flightMsg----', errorMessage);
    return;
  }

  // Slack에 보낼 메시지
  const message = {
    text: `--${env.toUpperCase()}-- | ${errorMessage}, | <TIME: ${new Date().toUTCString()}>`
  };

  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
  };

  await axios({
    method: 'post',
    url: process.env.NEXT_PUBLIC_SLACK_WEBHOOK_URL,
    data: JSON.stringify(message),
    headers: headers
  });
  return;
};
