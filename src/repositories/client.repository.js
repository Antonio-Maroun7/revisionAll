const pool = require("../db/pool");

class ClientRepository {
  static async findAll() {
    const result = await pool.query(`SELECT * FROM clients 
            order by client_id`);
    return result.rows;
  }

  static async findById(id) {
    const result = await pool.query(
      `SELECT * FROM clients
		WHERE client_id = $1`,
      [id],
    );
    return result.rows[0];
  }

  static async create({ name, email }) {
    const result = await pool.query(
      `INSERT INTO clients 
            (client_name, client_email) 
            VALUES ($1, $2) RETURNING *`,
      [name, email],
    );
    return result.rows[0];
  }

  static async update(id, { name, email }) {
    const result = await pool.query(
      `UPDATE clients 
			SET client_name = $1,
			client_email = $2 
			WHERE client_id =$3 RETURNING *`,
      [name, email, id],
    );
    return result.rows[0];
  }

  static async deleteById(id) {
    await pool.query(
      `DELETE FROM clients
            WHERE client_id = $1`,
      [id],
    );
  }

  static async findAllWithDepartments() {
    const result = await pool.query(`
           SELECT * FROM "v_latestClient_Department"
            `);
    return result.rows;
  }

  static async findLatestClientInDep() {
    const result = await pool.query(
      `select * from public."v_latestClient_Department"`,
    );
    return result.rows;
  }

  static async increaseSalary(id, amount) {
    const result = await pool.query("call increase_salary($1,$2)", [
      id,
      amount,
    ]);
    return console.log("Salary increased for client ID:", id);
  }

  static async ClientWithMaxSalary() {
    const result = await pool.query(`
      SELECT * FROM public."v_maxSalary"
      `);
    return result.rows[0];
  }

  static async FindDepartmentWithMaxMInSalary() {
    const result = await pool.query(`SELECT *FROM public."v_Max-Min"`);
    return result.rows[0];
  }
  static async giveBonusToClientsInDepartment(departmentName, bonusAmount) {
    const result = await pool.query(
      `
      call give_bonus($1, $2)`,
      [departmentName, bonusAmount],
    );
    return console.log(`Bonus of ${bonusAmount} 
        given to clients in department: ${departmentName}`);
  }
}

module.exports = ClientRepository;
