import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: 'https://338f7ab170112283b02c4492f84febae@o4509005275267072.ingest.de.sentry.io/4509005278085200',
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  tracePropagationTargets: [
    'localhost',
    /^https:\/\/(www\.)?olca\.cz/,
    /^https:\/\/(www\.)?frymurk\.com/,
  ],
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});
