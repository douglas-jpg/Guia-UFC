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
            if (question) {
                res.json(question);
            } else {
                res.status(404).json({ error: 'Question not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async createQuestion(req, res) {
        try {
            const question = await QuestionService.createQuestion(req.body);
            res.status(201).json(question);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateQuestion(req, res) {
        try {
            const question = await QuestionService.updateQuestion(
                req.params.id,
                req.body
            );
            if (question) {
                res.json(question);
            } else {
                res.status(404).json({ error: 'Question not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async deleteQuestion(req, res) {
        try {
            await QuestionService.deleteQuestion(req.params.id);
            res.status(204).end();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async createAnswer(req, res) {
        try {
            const answer = await QuestionService.createAnswer({
                ...req.body,
                question_id: req.params.questionId,
            });
            res.status(201).json(answer);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default new QuestionController();
