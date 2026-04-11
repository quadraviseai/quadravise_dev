import { buildDefaultAdminConfiguration, configurationService } from "../configuration/configuration.service.js";
import { usersRepository } from "./users.repository.js";

function createValidationError(message) {
  const error = new Error(message);
  error.statusCode = 400;
  error.publicMessage = message;
  return error;
}

function normalizeStringArray(values = []) {
  return [...new Set(values.map((value) => String(value || "").trim().toLowerCase()).filter(Boolean))];
}

async function validateUserAccess(payload) {
  const configuration = (await configurationService.getConfiguration()) || buildDefaultAdminConfiguration();
  const activeRoleKeys = new Set(
    (configuration.roles || [])
      .filter((role) => role.isActive !== false)
      .map((role) => String(role.key || "").trim().toLowerCase())
      .filter(Boolean)
  );
  const activeProductKeys = new Set(
    (configuration.products || [])
      .filter((product) => product.isActive !== false)
      .map((product) => String(product.key || "").trim().toLowerCase())
      .filter(Boolean)
  );

  const normalizedRole = String(payload.role || "").trim().toLowerCase();
  const normalizedProducts = normalizeStringArray(payload.products);
  const invalidProducts = normalizedProducts.filter((productKey) => !activeProductKeys.has(productKey));

  if (!activeRoleKeys.has(normalizedRole)) {
    throw createValidationError("Selected role is not available in configuration");
  }

  if (invalidProducts.length) {
    throw createValidationError(`Unknown or inactive product assignments: ${invalidProducts.join(", ")}`);
  }

  return {
    ...payload,
    role: normalizedRole,
    products: normalizedProducts
  };
}

export const usersService = {
  async getUsersPaged({ page, pageSize, search }) {
    return usersRepository.findAllPaged({ page, pageSize, search });
  },
  async createUser(payload) {
    const validatedPayload = await validateUserAccess(payload);
    const created = await usersRepository.create(validatedPayload);
    return created ? usersRepository.findById(created.id) : null;
  },
  async updateUser(id, payload) {
    const validatedPayload = await validateUserAccess(payload);
    const updated = await usersRepository.updateById(id, validatedPayload);
    return updated ? usersRepository.findById(id) : null;
  },
  async deleteUser(id) {
    return usersRepository.deleteById(id);
  }
};
