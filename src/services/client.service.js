const ClientRepository = require("../repositories/client.repository");

class ClientService {
  static async getAllClients() {
    return await ClientRepository.findAll();
  }

  static async getClientById(id) {
    const client = await ClientRepository.findById(id);
    if (!client) {
      throw new Error("Client not found");
    }
    return client;
  }

  static async createClient(data) {
    if (!data.name || !data.email) {
      throw new Error("Name and email are required");
    }

    return ClientRepository.create(data);
  }

  static async updateClient(id, data) {
    if (!id || !data.email || !data.name) {
      throw new Error("ID, Name and email are required");
    }
    return ClientRepository.update(id, data);
  }

  static async deleteClient(id) {
    if (!id) {
      throw new Error("ID is required");
    }
    const client = ClientRepository.findById(id);
    if (!client) {
      throw new Error("Client Not found");
    }
    return ClientRepository.deleteById(id);
  }

  static async getAllClientsWithDepartments() {
    const rows = await ClientRepository.findAllWithDepartments();
    return rows.map((client) => ({
      id: client.client_id,
      name: client.client_name,
      department: client.dep_id
        ? {
            id: client.department_id,
            name: client.department_name,
            location: client.department_location,
          }
        : null,
    }));
  }

  static async getLatestClientInDep() {
    const rows = await ClientRepository.findLatestClientInDep();
    return rows.map((client) => ({
      id: client.client_id,
      name: client.client_name,
      department: client.department_id
        ? {
            id: client.department_id,
            name: client.department_name,
            location: client.department_location,
          }
        : null,
    }));
  }
  static async increaseClientSalary(id, amount) {
    if (!id || !amount) {
      throw new Error("ID and amount are required");
    }
    return ClientRepository.increaseSalary(id, amount);
  }

  static async getMaxClientSalary() {
    const client = await ClientRepository.ClientWithMaxSalary();

    return client;
  }
  static async getDepartmentsWithMaxMinSalary() {
    const salary = await ClientRepository.FindDepartmentWithMaxMInSalary();
    if (!salary || salary.length === 0) {
      throw new Error("No data found");
    }
    return salary;
  }

  static async giveBonusToDepartmentClients(departmentName, bonusAmount) {
    if (!departmentName || !bonusAmount) {
      throw new Error("Department name and bonus amount are required");
    }
    return ClientRepository.giveBonusToClientsInDepartment(
      departmentName,
      bonusAmount,
    );
  }
}

module.exports = ClientService;
