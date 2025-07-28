import 'dotenv/config';
import { Client } from 'pg';
import { readFile } from 'fs/promises';

async function createDatabase() {
    const client = new Client({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: 'postgres',
        password: process.env.DB_PASSWORD,
        port: Number(process.env.DB_PORT),
    });

    try {
        await client.connect();
        await client.query(`CREATE DATABASE ${process.env.DB_NAME}`);
        console.log(
            `Banco de dados ${process.env.DB_NAME} criado com sucesso!`
        );
    } catch (err) {
        if (err.code === '42P04') {
            console.log(`O banco ${process.env.DB_NAME} já existe.`);
        } else {
            throw err;
        }
    } finally {
        await client.end();
    }
}

async function initSchema() {
    const sql = await readFile('./src/database/init_db.sql', 'utf8');

    const client = new Client({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: Number(process.env.DB_PORT),
    });

    try {
        await client.connect();
        await client.query(sql);
        console.log('Tabelas e dados criados com sucesso!');
    } catch (err) {
        throw err;
    } finally {
        await client.end();
    }
}

async function setup() {
    try {
        await createDatabase();
        await initSchema();
    } catch (err) {
        console.error('Erro durante a configuração do banco:', err.message);
    }
}

setup();
