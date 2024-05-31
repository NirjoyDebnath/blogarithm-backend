import {Knex} from 'knex';
import { ENV } from '../config/conf';

interface knexDatabaseConnectionObjectType {
    [key:string]: Knex.Config,
}

const connectToDatabase: knexDatabaseConnectionObjectType = {
    development: {
        client: 'mysql2',
        connection:{
            host: ENV.DatabaseHost || 'localhost',
            port: Number(ENV.DatabasePort) || 3306,
            user: ENV.DatabaseUser || 'root',
            password: ENV.DatabasePassword || 'start',
            database: ENV.DatabaseDatabase || 'DBblogarithm',
        },
        migrations:{
            tableName: 'knex_migrations',
        },
    },
};

export default connectToDatabase;