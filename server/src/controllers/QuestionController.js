import QuestionService from '../services/QuestionService.js';

class QuestionController {
    async getAllQuestions(req, res) {
        try {
            const questions = await QuestionService.getAllQuestions();
            res.json(questions);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getQuestionById(req, res) {
        try {
            const question = await QuestionService.getQuestionById(
                req.params.id
            );
            res.json(question);
        } catch (error) {
            if (error.message.includes('não encontrada')) {
                res.status(404).json({ error: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }

    async createQuestion(req, res) {
        try {
            const question = await QuestionService.createQuestion(req.body);
            res.status(201).json(question);
        } catch (error) {
            if (error.message.includes('obrigat')) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }

    async updateQuestion(req, res) {
        try {
            const updated = await QuestionService.updateQuestion(
                req.params.id,
                req.body
            );
            res.json(updated);
        } catch (error) {
            if (error.message.includes('não encontrada')) {
                res.status(404).json({ error: error.message });
            } else if (error.message.includes('obrigat')) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }

    async deleteQuestion(req, res) {
        try {
            await QuestionService.deleteQuestion(req.params.id);
            res.status(204).end();
        } catch (error) {
            if (error.message.includes('não encontrada')) {
                res.status(404).json({ error: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }

    async createAnswer(req, res) {
        try {
            const answer = await QuestionService.createAnswer({
                content: req.body.content,
                questionId: req.params.questionId,
            });
            res.status(201).json(answer);
        } catch (error) {
            if (error.message.includes('obrigat')) {
                res.status(400).json({ error: error.message });
            } else if (error.message.includes('não encontrada')) {
                res.status(404).json({ error: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }
}

export default new QuestionController();
