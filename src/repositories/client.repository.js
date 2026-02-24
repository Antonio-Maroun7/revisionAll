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
           SELECT * FROM clients LEFT JOIN departments 
           ON clients.dep_id = departments.dep_id 
           ORDER BY client_id;
            `);
    return result.rows;
  }

  static async findLatestClientInDep() {
    const result = await pool.query(
      `SELECT 
        d.department_id,d.department_name,c.client_name,MAX(c.client_id) as latest
        FROM  department d
        left join clients c on c.department_id = d.department_id
        GROUP BY  d.department_id,d.department_name,c.client_name
        ORDER BY latest desc`,
    );
    return result.rows;
  }
}

module.exports = ClientRepository;
