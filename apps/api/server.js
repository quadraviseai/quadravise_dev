import app from "./src/app.js";
import { assertDatabaseConnection } from "./src/config/db.js";
import { env } from "./src/config/env.js";
import { logger } from "./src/config/logger.js";

async function startServer() {
  try {
    await assertDatabaseConnection();

    app.listen(env.port, () => {
      logger.info("Quadravise API server running", {
        port: env.port,
        env: env.nodeEnv
      });
    });
  } catch (error) {
    logger.error("Failed to start API server", { error: error.message });
    process.exit(1);
  }
}

startServer();
