import { Sequelize, QueryTypes } from 'sequelize';
import { config } from "../config";

export const run_query = async (query: string, values: any) => {
  try {
    const sequelize = new Sequelize(config.database, config.user, config.password, {
      host: config.host,
      port: config.port,
      dialect: 'mysql'
    });
    await sequelize.authenticate();
    const data = await sequelize.query(query, {
      replacements: values,
      type: QueryTypes.SELECT
    });
    await sequelize.close();
    return data;
  } catch (err: any) {
    console.error(err, query, values);
    throw 'Database query error';
  }
}

export const run_insertrecord = async (sql: string, values: any) => {
  try {
    const sequelize = new Sequelize(config.database, config.user, config.password, {
      host: config.host,
      port: config.port,
      dialect: 'mysql'
    });
    await sequelize.authenticate();
    const data = await sequelize.query(sql, {
      replacements: values,
      type: QueryTypes.INSERT
    });
    await sequelize.close();
    return data;
  } catch (err: any) {
    console.error(err, sql, values);
    throw 'Database record insert error';
  }
}

export const run_updaterecord = async (sql: string, values: any) => {
  try {
    const sequelize = new Sequelize(config.database, config.user, config.password, {
      host: config.host,
      port: config.port,
      dialect: 'mysql'
    });
    await sequelize.authenticate();
    const data = await sequelize.query(sql, {
      replacements: values,
      type: QueryTypes.UPDATE
    });
    await sequelize.close();
    return data;
  } catch (err: any) {
    console.error(err, sql, values);
    throw 'Database update record error';
  }
}

export const run_deleterecord = async (sql: string, values: any) => {
  try {
    const sequelize = new Sequelize(config.database, config.user, config.password, {
      host: config.host,
      port: config.port,
      dialect: 'mysql'
    });
    await sequelize.authenticate();
    const data = await sequelize.query(sql, {
      replacements: values,
      type: QueryTypes.DELETE
    });
    await sequelize.close();
    return data;
  } catch (err: any) {
    console.error(err, sql, values);
    throw 'Database delete record error';
  }
}