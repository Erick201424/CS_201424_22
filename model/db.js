import  pkg  from 'pg';
import { db } from '../config.js';
const { Pool } = pkg

async function getConnection() {
    const client = new Pool({
      user: db.user,
      host: db.host,
      database: db.database,
      password: db.password,
      port: db.port,
    });
    await client.connect();
    return client;
}

export const getData = getConnection;