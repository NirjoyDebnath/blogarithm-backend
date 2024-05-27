import {config} from 'dotenv';
import dotenv from 'dotenv';
import {Knex} from 'knex';
import knex from 'knex';
import path from 'path';
const envPath = path.join(__dirname + '/../../.env');
dotenv.config({ path: envPath });

// dotenv.config();

// type keyTypes = 'development'|'production'|'staging'|'test'

interface knexDatabaseConnectionObjectType {
    [key:string]: Knex.Config
}

const connectToDatabase: knexDatabaseConnectionObjectType = {
    development: {
        client: 'mysql2',
        connection:{
            host: process.env.databaseHost,
            port: Number(process.env.databasePort),
            user: process.env.databaseUser,
            password: process.env.databasePassword,
            database: process.env.databaseDatabase,
        },
        migrations:{
            tableName: 'knex_migrations',
        },
    },
};

export default connectToDatabase;