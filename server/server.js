import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import questionRoutes from './routes/questions.js';
import eventRoutes from './routes/events.js';
import { Pool } from 'pg';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/questions', questionRoutes);
app.use('/events', eventRoutes);

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

try {
    pool.query('SELECT NOW()', (err, res) => {
        if (err) {
            throw new Error('Database connection error');
        }

        console.log('Database connected successfully');
    });
} catch (error) {
    console.log('Erro', err.stack);
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running http://localhost:${PORT}`);
});
