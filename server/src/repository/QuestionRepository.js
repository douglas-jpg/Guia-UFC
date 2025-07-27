import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});

class QuestionRepository {
    async getAllQuestions() {
        const result = await pool.query(
            'SELECT * FROM questions ORDER BY id DESC'
        );
        return result.rows;
    }

    async getQuestionById(id) {
        const result = await pool.query(
            'SELECT * FROM questions WHERE id = $1',
            [id]
        );
        return result.rows[0];
    }

    async createQuestion({ title, content }) {
        try {
            const result = await pool.query(
                `INSERT INTO questions (title, content)
         VALUES ($1, $2)
         RETURNING *`,
                [title, content]
            );
            return result.rows[0];
        } catch (error) {
            throw error;
        }
    }

    async updateQuestion(id, { title, content }) {
        const result = await pool.query(
            `UPDATE questions
         SET title   = $1,
             content = $2
       WHERE id = $3
       RETURNING *`,
            [title, content, id]
        );
        return result.rows[0];
    }

    async deleteQuestion(id) {
        await pool.query('DELETE FROM questions WHERE id = $1', [id]);
    }

    async getAnswersByQuestionId(questionId) {
        const result = await pool.query(
            'SELECT * FROM answers WHERE question_id = $1 ORDER BY id ASC',
            [questionId]
        );
        return result.rows;
    }

    async createAnswer({ content, questionId }) {
        try {
            const result = await pool.query(
                `INSERT INTO answers (content, question_id)
         VALUES ($1, $2)
         RETURNING *`,
                [content, questionId]
            );
            return result.rows[0];
        } catch (error) {
            throw error;
        }
    }
}

export default new QuestionRepository();
