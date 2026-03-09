import nodemailer from "nodemailer";

import { env } from "../config/env.js";
import { logger } from "../config/logger.js";

let transporter = null;

function getTransporter() {
  if (transporter) return transporter;
  if (!env.smtpHost || !env.smtpUser || !env.smtpPass) return null;

  transporter = nodemailer.createTransport({
    host: env.smtpHost,
    port: env.smtpPort,
    secure: env.smtpSecure,
    auth: {
      user: env.smtpUser,
      pass: env.smtpPass
    }
  });

  return transporter;
}

export async function sendMail({ to, subject, text }) {
  const smtp = getTransporter();
  if (!smtp) {
    logger.warn("SMTP is not configured. Email not sent.", { to, subject });
    return false;
  }

  await smtp.sendMail({
    from: env.smtpFrom,
    to,
    subject,
    text
  });

  return true;
}
