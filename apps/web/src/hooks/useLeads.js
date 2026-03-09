import { useMutation } from "@tanstack/react-query";

import { leadService } from "../services/leadService";

export function useLeads() {
  return useMutation({
    mutationFn: leadService.createLead
  });
}
