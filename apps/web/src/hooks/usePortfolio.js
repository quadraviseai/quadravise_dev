import { useQuery } from "@tanstack/react-query";

import { portfolioService } from "../services/portfolioService";

export function usePortfolio() {
  return useQuery({
    queryKey: ["portfolio"],
    queryFn: portfolioService.getProjects
  });
}

export function useHomepagePortfolio() {
  return useQuery({
    queryKey: ["portfolio", "homepage"],
    queryFn: portfolioService.getHomepageProjects
  });
}

export function usePortfolioBySlug(slug, options = {}) {
  return useQuery({
    queryKey: ["portfolio", slug],
    queryFn: () => portfolioService.getProjectBySlug(slug),
    enabled: options.enabled ?? Boolean(slug)
  });
}
