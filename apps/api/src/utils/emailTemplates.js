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
    subject: `New QuadraiLearn survey from ${survey.respondent_type}`,
    text:
      `A new QuadraiLearn survey was submitted.\n\n` +
      `Email: ${survey.email || "Not provided"}\n` +
      `Who Are You: ${survey.respondent_type}\n` +
      `Tracking Methods: ${survey.tracking_methods?.join(", ") || "None selected"}\n` +
      `Tracking Methods Other: ${survey.tracking_methods_other || "Not provided"}\n` +
      `Concept Confidence: ${survey.concept_confidence}\n` +
      `Learning Challenges: ${survey.learning_challenges?.join(", ") || "None selected"}\n` +
      `Content Over Understanding: ${survey.content_over_understanding}\n` +
      `Study Routine: ${survey.study_routine}\n` +
      `Learning Health Score: ${survey.learning_health_score}/5\n` +
      `Valuable Features: ${survey.valuable_features?.join(", ") || "None selected"}\n` +
      `Motivation With Streaks: ${survey.motivation_with_streaks}\n` +
      `Willingness To Pay: ${survey.willingness_to_pay}\n` +
      `Monthly Price Range: ${survey.monthly_price_range}\n` +
      `Submitted At: ${survey.created_at}`
  };
}

export function buildSurveyAcknowledgementEmail(survey) {
  return {
    subject: "Quadravise | QuadraiLearn Survey Received",
    text:
      `Hi,\n\n` +
      `Thank you for sharing your feedback on QuadraiLearn. We have received your survey and the team will review it.\n\n` +
      `Submitted details:\n` +
      `Who Are You: ${survey.respondent_type}\n` +
      `Learning Health Score: ${survey.learning_health_score}/5\n` +
      `Valuable Features: ${survey.valuable_features?.join(", ") || "None selected"}\n\n` +
      `Regards,\nQuadravise`
  };
}
