import { LoggerService } from "./logger";

export class DevelopmentLoggerService implements LoggerService {
  logError(error: Error): void {
    console.error(error);
  }
  logInfo(message: string): void {
    console.info(message);
  }
  logWarning(message: string): void {
    console.warn(message);
  }
}