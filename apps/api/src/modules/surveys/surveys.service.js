import { env } from "../../config/env.js";
import { logger } from "../../config/logger.js";
import { buildSurveyAcknowledgementEmail, buildSurveyNotificationEmail } from "../../utils/emailTemplates.js";
import { sendMail } from "../../utils/mailer.js";

import { surveysRepository } from "./surveys.repository.js";

export const surveysService = {
  async createSurvey(payload) {
    const survey = await surveysRepository.create(payload);
    const notification = buildSurveyNotificationEmail(survey);

    logger.info("Survey notification prepared", {
      subject: notification.subject,
      surveyId: survey.id
    });

    const emailTasks = [
      sendMail({
        to: env.contactReceiverEmail,
        subject: notification.subject,
        text: notification.text
      })
    ];

    if (survey.email) {
      const acknowledgement = buildSurveyAcknowledgementEmail(survey);
      emailTasks.push(
        sendMail({
          to: survey.email,
          subject: acknowledgement.subject,
          text: acknowledgement.text
        })
      );
    }

    await Promise.allSettled(emailTasks);
    return survey;
  }
};
