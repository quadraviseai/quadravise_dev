import { useQuery } from "@tanstack/react-query";

import { portfolioService } from "../services/portfolioService";

export function usePortfolio() {
  return useQuery({
    queryKey: ["portfolio"],
    queryFn: portfolioService.getProjects
  });
}
