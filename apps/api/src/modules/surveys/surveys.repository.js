import { query } from "../../config/db.js";

export const surveysRepository = {
  async create(payload) {
    const rows = await query(
      `
        INSERT INTO quadrailearn_surveys (
          name,
          email,
          respondent_type,
          tracking_methods,
          tracking_methods_other,
          concept_confidence,
          learning_challenges,
          content_over_understanding,
          study_routine,
          learning_health_score,
          valuable_features,
          motivation_with_streaks,
          willingness_to_pay,
          monthly_price_range
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
        RETURNING
          id,
          name,
          email,
          respondent_type,
          tracking_methods,
          tracking_methods_other,
          concept_confidence,
          learning_challenges,
          content_over_understanding,
          study_routine,
          learning_health_score,
          valuable_features,
          motivation_with_streaks,
          willingness_to_pay,
          monthly_price_range,
          created_at
      `,
      [
        null,
        payload.email || null,
        payload.respondent_type,
        payload.tracking_methods,
        payload.tracking_methods_other || null,
        payload.concept_confidence,
        payload.learning_challenges,
        payload.content_over_understanding,
        payload.study_routine,
        payload.learning_health_score,
        payload.valuable_features,
        payload.motivation_with_streaks,
        payload.willingness_to_pay,
        payload.monthly_price_range
      ]
    );

    return rows[0];
  }
};
