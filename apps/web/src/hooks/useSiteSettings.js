import { useQuery } from "@tanstack/react-query";

import { settingsService } from "../services/settingsService";

export function useSiteSettings() {
  return useQuery({
    queryKey: ["site-settings"],
    queryFn: settingsService.getSettings
  });
}
