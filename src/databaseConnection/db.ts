import knex from 'knex'
import knexFile from './knexfile'

const db = knex(knexFile.development)

export default db;









// const environment: string = process.env.environment||'development';

// const knex = knex_g(connectToDatabase[environment]);

// // console.log(knex);

// export default knex;
