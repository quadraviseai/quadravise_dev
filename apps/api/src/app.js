import cors from "cors";
import express from "express";
import helmet from "helmet";
import path from "path";
import { fileURLToPath } from "url";

import { env } from "./config/env.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { notFound } from "./middleware/notFound.js";
import { rateLimiter } from "./middleware/rateLimiter.js";
import { requestLogger } from "./middleware/requestLogger.js";
import apiRoutes from "./routes.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.resolve(__dirname, "../uploads");

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" }
  })
);
app.use(cors({ origin: env.corsOrigin, credentials: true }));
app.use(express.json());
app.use(rateLimiter);
app.use(requestLogger);
app.use("/uploads", express.static(uploadsDir));

app.use("/api", apiRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
