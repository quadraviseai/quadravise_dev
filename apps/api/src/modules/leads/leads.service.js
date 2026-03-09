import { logger } from "../../config/logger.js";
import { env } from "../../config/env.js";
import { buildLeadAcknowledgementEmail, buildLeadNotificationEmail } from "../../utils/emailTemplates.js";
import { sendMail } from "../../utils/mailer.js";

import { leadsRepository } from "./leads.repository.js";

export const leadsService = {
  async createLead(payload) {
    const lead = await leadsRepository.create(payload);

    const notification = buildLeadNotificationEmail(lead);
    const acknowledgement = buildLeadAcknowledgementEmail(lead);

    logger.info("Lead notification prepared", {
      subject: notification.subject,
      leadId: lead.id
    });

    await Promise.allSettled([
      sendMail({
        to: env.contactReceiverEmail,
        subject: notification.subject,
        text: notification.text
      }),
      sendMail({
        to: lead.email,
        subject: acknowledgement.subject,
        text: acknowledgement.text
      })
    ]);

    return lead;
  },
  async getLeadsPaged({ page, pageSize, search }) {
    return leadsRepository.findAllPaged({ page, pageSize, search });
  }
};
