export function buildLeadNotificationEmail(lead) {
  return {
    subject: `New consultation request from ${lead.name}`,
    text:
      `A new consultation request was submitted.\n\n` +
      `Name: ${lead.name}\n` +
      `Email: ${lead.email}\n` +
      `Mobile Number: ${lead.mobile_number || "N/A"}\n` +
      `Company: ${lead.company || "N/A"}\n` +
      `Project Type: ${lead.project_type}\n` +
      `Budget: ${lead.budget || "N/A"}\n` +
      `Description: ${lead.description || "N/A"}\n` +
      `Submitted At: ${lead.created_at}`
  };
}

export function buildLeadAcknowledgementEmail(lead) {
  return {
    subject: "Quadravise | Consultation Request Received",
    text:
      `Hi ${lead.name},\n\n` +
      `We received your consultation request and our team will review it shortly.\n\n` +
      `Submitted details:\n` +
      `Project Type: ${lead.project_type}\n` +
      `Budget: ${lead.budget || "Not specified"}\n` +
      `Company: ${lead.company || "Not specified"}\n\n` +
      `If you need to add anything, simply reply to this email.\n\n` +
      `Regards,\nQuadravise`
  };
}

export function buildAdminPasswordResetEmail({ resetLink }) {
  return {
    subject: "Quadravise Admin Password Reset",
    text: `A password reset was requested for your admin account.\n\nReset link: ${resetLink}\n\nThis link expires in 15 minutes.`
  };
}
