import dotenv from 'dotenv';
import path from 'path';

const envPath = path.join(__dirname + '/../../.env');
dotenv.config({ path: envPath });

export const ENV = {
  Port: process.env.Port,
  DatabaseHost: process.env.DatabaseHost,
  DatabasePort: process.env.DatabasePort,
  DatabaseUser: process.env.DatabaseUser,
  DatabasePassword: process.env.DatabasePassword,
  DatabaseDatabase: process.env.DatabaseDatabase,
  Environment: process.env.Environment,
  SecretKey: process.env.SecretKey,
  JwtTokenExpire: process.env.JwtTokenExpire
};
