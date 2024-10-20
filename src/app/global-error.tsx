'use client';

import * as Sentry from '@sentry/nextjs';
import { useEffect } from 'react';
import Error from './error';

export default function GlobalError({ error }: { error: any }) {
  useEffect(() => {
    process.env.NEXT_PUBLIC_ENVIRONMENT === 'production' &&
      Sentry.captureException(error);
  }, [error]);

  return (
    <html>
      <body>
        <Error />
      </body>
    </html>
  );
}
