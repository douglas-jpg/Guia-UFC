import QuestionRepository from '../repository/QuestionRepository.js';

class QuestionService {
    async getAllQuestions() {
        const questions = await QuestionRepository.getAllQuestions();
        for (const question of questions) {
            question.answers = await QuestionRepository.getAnswersByQuestionId(
                question.id
            );
        }
        return questions;
    }

    async getQuestionById(id) {
        const question = await QuestionRepository.getQuestionById(id);
        if (!question) {
            throw new Error(`Pergunta com ID ${id} não encontrada`);
        }
        question.answers = await QuestionRepository.getAnswersByQuestionId(id);
        return question;
    }


    async createQuestion({ title, content }) {
        if (!title || !title.trim()) {
            throw new Error('Título é obrigatório');
        }
        if (!content || !content.trim()) {
            throw new Error('Conteúdo é obrigatório');
        }
        return await QuestionRepository.createQuestion({ title, content });
    }

    async updateQuestion(id, { title, content }) {
        if (!title || !title.trim()) {
            throw new Error('Título é obrigatório');
        }
        if (!content || !content.trim()) {
            throw new Error('Conteúdo é obrigatório');
        }
        const updated = await QuestionRepository.updateQuestion(id, {
            title,
            content,
        });
        if (!updated) {
            throw new Error(
                `Não foi possível atualizar a pergunta com ID ${id}`
            );
        }
        return updated;
    }

    async deleteQuestion(id) {
        const question = await QuestionRepository.getQuestionById(id);
        if (!question) {
            throw new Error(`Pergunta com ID ${id} não encontrada`);
        }
        await QuestionRepository.deleteQuestion(id);
        return { message: 'Pergunta deletada com sucesso' };
    }

    async createAnswer({ content, questionId }) {
        if (!content || !content.trim()) {
            throw new Error('Conteúdo da resposta é obrigatório');
        }
        if (!questionId) {
            throw new Error('questionId é obrigatório');
        }
        const question = await QuestionRepository.getQuestionById(questionId);
        if (!question) {
            throw new Error(`Pergunta com ID ${questionId} não encontrada`);
        }
        return await QuestionRepository.createAnswer({ content, questionId });
    }
}

export default new QuestionService();
