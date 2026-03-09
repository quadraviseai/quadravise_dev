import { z } from "zod";

export const updateSettingsSchema = z.object({
  address: z.string().min(2).max(255),
  email: z.string().email(),
  linkedin: z.string().url().optional().or(z.literal("")),
  instagram: z.string().url().optional().or(z.literal("")),
  facebook: z.string().url().optional().or(z.literal("")),
  workingHours: z.string().min(2).max(255),
  showLinkedin: z.boolean(),
  showEmail: z.boolean(),
  showInstagram: z.boolean(),
  showFacebook: z.boolean(),
  projectsDelivered: z.string().min(1).max(40),
  industriesServed: z.string().min(1).max(40),
  mvpKickoffSpeed: z.string().min(1).max(40),
  reliabilityFocus: z.string().min(1).max(40),
  performanceBuild: z.string().min(1).max(40),
  aboutYearsExperience: z.string().min(1).max(40),
  aboutProductsDelivered: z.string().min(1).max(40),
  aboutCoreTeamSize: z.string().min(1).max(40),
  aboutReliabilityFocus: z.string().min(1).max(40),
  quadrailearnTracks: z.string().min(1).max(40),
  mvpWindow: z.string().min(1).max(40)
});
