import * as db from '../helpers/database';

export const findByUsername = async (username: string) => {
  const query = 'SELECT * from users where username = ?';
  const user = await db.run_query(query, [username]);
  return user;
}


export const getAllUsers = async () => {
  const query = 'SELECT * FROM users';
  const users = await db.run_query(query, null);
  return users;
};

export const addUser = async (user: any) => {
  const keys = Object.keys(user);
  const values = Object.values(user);
  const columns = keys.join(',');
  const placeholders = values.map(() => '?').join(',');

  const query = `INSERT INTO users (${columns}) VALUES (${placeholders})`;
  try {
    await db.run_query(query, values);
    return { status: 201 };
  } catch (err: any) {
    return err;
  }
};

export const updateUser = async (id: any, user: any) => {
  const keys = Object.keys(user);
  const values = Object.values(user);
  const setStatement = keys.map((key) => `${key} = ?`).join(', ');

  const query = `UPDATE users SET ${setStatement} WHERE id = ?`;  
  values.push(id);

  try {
    await db.run_query(query, values);
    return { status: 200 };
  } catch (err: any) {
    return err;
  }
};

export const deleteUser = async (id: any) => {
  const query = 'DELETE FROM users WHERE id = ?';
 try {
    await db.run_delete(query, [id]);
    return { status: 200 };
  } catch (err: any) {
    return err;
  }
};


