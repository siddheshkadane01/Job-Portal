// Import with `import * as Sentry from "@sentry/node"` if you are using ESM
import * as Sentry from "@sentry/node"
import { mongo } from "mongoose";

Sentry.init({
  dsn: "https://6105e383e162971841083aac65499978@o4509638344376320.ingest.us.sentry.io/4509638351781888",

  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
  integrations:[
    Sentry.nodeContextIntegration(),
    Sentry.mongoIntegration
  ]
});