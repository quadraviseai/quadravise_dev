import { usersRepository } from "./users.repository.js";

export const usersService = {
  async getUsersPaged({ page, pageSize, search }) {
    return usersRepository.findAllPaged({ page, pageSize, search });
  },
  async createUser(payload) {
    const created = await usersRepository.create(payload);
    return created ? usersRepository.findById(created.id) : null;
  },
  async updateUser(id, payload) {
    const updated = await usersRepository.updateById(id, payload);
    return updated ? usersRepository.findById(id) : null;
  },
  async deleteUser(id) {
    return usersRepository.deleteById(id);
  }
};
