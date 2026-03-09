import { socialAccountsRepository } from "./socialAccounts.repository.js";

export const socialAccountsService = {
  async getActiveAccounts() {
    return socialAccountsRepository.findAllActive();
  }
};
