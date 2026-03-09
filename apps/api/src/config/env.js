import dotenv from "dotenv";

dotenv.config();

export const env = {
  port: Number(process.env.PORT || 5000),
  nodeEnv: process.env.NODE_ENV || "development",
  databaseUrl: process.env.DATABASE_URL || "",
  corsOrigin: process.env.CORS_ORIGIN || "http://localhost:5173",
  webBaseUrl: process.env.WEB_BASE_URL || "http://localhost:5173",
  adminUser: process.env.ADMIN_USER || "support@quadravise.com",
  adminPassword: process.env.ADMIN_PASSWORD || "Quadravice@123",
  adminTokenSecret: process.env.ADMIN_TOKEN_SECRET || "change-this-secret",
  adminCookieName: process.env.ADMIN_COOKIE_NAME || "quadravise_admin_token",
  smtpHost: process.env.SMTP_HOST || "",
  smtpPort: Number(process.env.SMTP_PORT || 587),
  smtpSecure: process.env.SMTP_SECURE === "true",
  smtpUser: process.env.SMTP_USER || "",
  smtpPass: process.env.SMTP_PASS || "",
  smtpFrom: process.env.SMTP_FROM || "support@quadravise.com",
  contactReceiverEmail: process.env.CONTACT_RECEIVER_EMAIL || "support@quadravise.com"
};
