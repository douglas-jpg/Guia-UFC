import QuestionRepository from '../repository/QuestionRepository.js';

class QuestionService {
    async getAllQuestions() {
        const questions = await QuestionRepository.getAllQuestions();
        for (let question of questions) {
            question.answers = await QuestionRepository.getAnswersByQuestionId(
                question.id
            );
        }
        return questions;
    }

    async getQuestionById(id) {
        const question = await QuestionRepository.getQuestionById(id);
        if (question) {
            question.answers = await QuestionRepository.getAnswersByQuestionId(
                id
            );
        }
        return question;
    }

    async createQuestion(question) {
        return await QuestionRepository.createQuestion(question);
    }

    async updateQuestion(id, question) {
        return await QuestionRepository.updateQuestion(id, question);
    }

    async deleteQuestion(id) {
        return await QuestionRepository.deleteQuestion(id);
    }

    async createAnswer(answer) {
        return await QuestionRepository.createAnswer(answer);
    }
}

export default new QuestionService();
