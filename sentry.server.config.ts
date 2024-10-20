// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';

process.env.NEXT_PUBLIC_ENVIRONMENT === 'production' &&
  Sentry.init({
    dsn: 'https://c0fad827059e8531d64368dfb7c33408@o4506155049156608.ingest.sentry.io/4506539875696640',

    // Adjust this value in production, or use tracesSampler for greater control
    tracesSampleRate: 1,

    // Setting this option to true will print useful information to the console while you're setting up Sentry.
    debug: false
  });
