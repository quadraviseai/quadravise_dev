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

export function buildSurveyNotificationEmail(survey) {
  return {
    subject: `New QuadraiLearn survey from ${survey.name}`,
    text:
      `A new QuadraiLearn survey was submitted.\n\n` +
      `Name: ${survey.name}\n` +
      `Email: ${survey.email || "Not provided"}\n` +
      `Role: ${survey.role || "Not provided"}\n` +
      `Recommended Features: ${survey.recommended_features?.join(", ") || "None selected"}\n` +
      `Helpful Classes or Exams: ${survey.helpful_classes_or_exams || "Not provided"}\n` +
      `Needs Multilingual Support: ${survey.needs_multilingual_support ? "Yes" : "No"}\n` +
      `Specific Requirements: ${survey.specific_requirements || "Not provided"}\n` +
      `Feedback: ${survey.feedback || "Not provided"}\n` +
      `Submitted At: ${survey.created_at}`
  };
}

export function buildSurveyAcknowledgementEmail(survey) {
  return {
    subject: "Quadravise | QuadraiLearn Survey Received",
    text:
      `Hi ${survey.name},\n\n` +
      `Thank you for sharing your feedback on QuadraiLearn. We have received your survey and the team will review it.\n\n` +
      `Submitted details:\n` +
      `Role: ${survey.role || "Not specified"}\n` +
      `Recommended Features: ${survey.recommended_features?.join(", ") || "None selected"}\n` +
      `Helpful Classes or Exams: ${survey.helpful_classes_or_exams || "Not specified"}\n` +
      `Needs Multilingual Support: ${survey.needs_multilingual_support ? "Yes" : "No"}\n\n` +
      `Regards,\nQuadravise`
  };
}
