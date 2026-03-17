import { query } from "../../config/db.js";

export const surveysRepository = {
  async create(payload) {
    const rows = await query(
      `
        INSERT INTO quadrailearn_surveys (
          name,
          email,
          role,
          recommended_features,
          helpful_classes_or_exams,
          needs_multilingual_support,
          specific_requirements,
          feedback
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING
          id,
          name,
          email,
          role,
          recommended_features,
          helpful_classes_or_exams,
          needs_multilingual_support,
          specific_requirements,
          feedback,
          created_at
      `,
      [
        payload.name,
        payload.email || null,
        payload.role || null,
        payload.recommended_features,
        payload.helpful_classes_or_exams || null,
        payload.needs_multilingual_support,
        payload.specific_requirements || null,
        payload.feedback || null
      ]
    );

    return rows[0];
  }
};
