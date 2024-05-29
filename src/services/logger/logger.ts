import { DevelopmentLoggerService } from "./development-logger";

export interface LoggerService {
  logError(error: Error): void;
  logInfo(message: string): void;
  logWarning(message: string): void;
}


// This would change depending on the environment, to log
// errors to a service like Sentry or LogRocket
export const logger = new DevelopmentLoggerService()