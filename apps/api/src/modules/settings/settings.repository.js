import { query } from "../../config/db.js";

const selectSql = `
  SELECT
    address,
    email,
    linkedin,
    instagram,
    facebook,
    working_hours AS "workingHours",
    show_linkedin AS "showLinkedin",
    show_email AS "showEmail",
    show_instagram AS "showInstagram",
    show_facebook AS "showFacebook",
    projects_delivered AS "projectsDelivered",
    industries_served AS "industriesServed",
    mvp_kickoff_speed AS "mvpKickoffSpeed",
    reliability_focus AS "reliabilityFocus",
    performance_build AS "performanceBuild",
    about_years_experience AS "aboutYearsExperience",
    about_products_delivered AS "aboutProductsDelivered",
    about_core_team_size AS "aboutCoreTeamSize",
    about_reliability_focus AS "aboutReliabilityFocus",
    quadrailearn_tracks AS "quadrailearnTracks",
    mvp_window AS "mvpWindow"
  FROM site_settings
  WHERE id = 1
  LIMIT 1
`;

export const settingsRepository = {
  async getSettings() {
    const rows = await query(selectSql);
    return rows[0] || null;
  },
  async updateSettings(payload) {
    const rows = await query(
      `
        UPDATE site_settings
        SET
          address = $1,
          email = $2,
          linkedin = $3,
          instagram = $4,
          facebook = $5,
          working_hours = $6,
          show_linkedin = $7,
          show_email = $8,
          show_instagram = $9,
          show_facebook = $10,
          projects_delivered = $11,
          industries_served = $12,
          mvp_kickoff_speed = $13,
          reliability_focus = $14,
          performance_build = $15,
          about_years_experience = $16,
          about_products_delivered = $17,
          about_core_team_size = $18,
          about_reliability_focus = $19,
          quadrailearn_tracks = $20,
          mvp_window = $21,
          updated_at = NOW()
        WHERE id = 1
        RETURNING
          address,
          email,
          linkedin,
          instagram,
          facebook,
          working_hours AS "workingHours",
          show_linkedin AS "showLinkedin",
          show_email AS "showEmail",
          show_instagram AS "showInstagram",
          show_facebook AS "showFacebook",
          projects_delivered AS "projectsDelivered",
          industries_served AS "industriesServed",
          mvp_kickoff_speed AS "mvpKickoffSpeed",
          reliability_focus AS "reliabilityFocus",
          performance_build AS "performanceBuild",
          about_years_experience AS "aboutYearsExperience",
          about_products_delivered AS "aboutProductsDelivered",
          about_core_team_size AS "aboutCoreTeamSize",
          about_reliability_focus AS "aboutReliabilityFocus",
          quadrailearn_tracks AS "quadrailearnTracks",
          mvp_window AS "mvpWindow"
      `,
      [
        payload.address,
        payload.email,
        payload.linkedin || "",
        payload.instagram || "",
        payload.facebook || "",
        payload.workingHours,
        payload.showLinkedin,
        payload.showEmail,
        payload.showInstagram,
        payload.showFacebook,
        payload.projectsDelivered,
        payload.industriesServed,
        payload.mvpKickoffSpeed,
        payload.reliabilityFocus,
        payload.performanceBuild,
        payload.aboutYearsExperience,
        payload.aboutProductsDelivered,
        payload.aboutCoreTeamSize,
        payload.aboutReliabilityFocus,
        payload.quadrailearnTracks,
        payload.mvpWindow
      ]
    );
    return rows[0] || null;
  }
};
