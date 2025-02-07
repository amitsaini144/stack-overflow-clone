import morgan from "morgan";
import logger from "./logger";

// Define Morgan format
const morganFormat = ":method :url :status :response-time ms";

// Create Morgan middleware for logging requests
export const morganLogger = morgan(morganFormat, {
  stream: {
    write: (message: string) => logger.info(message.trim()), // Send Morgan logs to Winston
  },
});
