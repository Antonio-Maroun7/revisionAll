const pool = require("../db/pool");

class DepartmentRepository {
  static async findAll() {
    const result = await pool.query(`SELECT * FROM department
            order by department_id`);
    return result.rows;
  }

  static async findById(id) {
    const result = await pool.query(
      `SELECT * FROM department
		WHERE department_id = $1`,
      [id],
    );
    return result.rows[0];
  }

  static async create({ name, location }) {
    const result = await pool.query(
      `INSERT INTO department 
            (department_name, department_location) 
            VALUES ($1, $2) RETURNING *`,
      [name, location],
    );
    return result.rows[0];
  }

  static async update(id, { name, location }) {
    const result = await pool.query(
      `UPDATE department 
			SET department_name = $1,
			department_location = $2 
			WHERE department_id =$3 RETURNING *`,
      [name, location, id],
    );
    return result.rows[0];
  }

  static async deleteById(id) {
    await pool.query(
      `DELETE FROM department
            WHERE department_id = $1`,
      [id],
    );
  }

  static async findDepartmentClients() {
    const result = await pool.query("SELECT * FROM dep_emp()");
    return result.rows;
  }
}

module.exports = DepartmentRepository;
