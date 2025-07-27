import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});

class QuestionRepository {
    async getAllQuestions() {
        const result = await pool.query(
            'SELECT * FROM questions ORDER BY created_at DESC'
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

    async createQuestion(question) {
        const { title, content, user_id } = question;
        const result = await pool.query(
            'INSERT INTO questions (title, content, user_id) VALUES ($1, $2, $3) RETURNING *',
            [title, content, user_id]
        );
        return result.rows[0];
    }

    async updateQuestion(id, question) {
        const { title, content } = question;
        const result = await pool.query(
            'UPDATE questions SET title = $1, content = $2 WHERE id = $3 RETURNING *',
            [title, content, id]
        );
        return result.rows[0];
    }

    async deleteQuestion(id) {
        await pool.query('DELETE FROM questions WHERE id = $1', [id]);
    }

    async getAnswersByQuestionId(questionId) {
        const result = await pool.query(
            'SELECT * FROM answers WHERE question_id = $1 ORDER BY created_at ASC',
            [questionId]
        );
        return result.rows;
    }

    async createAnswer(answer) {
        const { content, user_id, question_id } = answer;
        const result = await pool.query(
            'INSERT INTO answers (content, user_id, question_id) VALUES ($1, $2, $3) RETURNING *',
            [content, user_id, question_id]
        );
        return result.rows[0];
    }
}

export default new QuestionRepository();
