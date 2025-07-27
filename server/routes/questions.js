import express from 'express';
import QuestionController from '../controllers/QuestionController.js';

const router = express.Router();

router.get('/', QuestionController.getAllQuestions);
router.get('/:id', QuestionController.getQuestionById);
router.post('/', QuestionController.createQuestion);
router.put('/:id', QuestionController.updateQuestion);
router.delete('/:id', QuestionController.deleteQuestion);
router.post('/:questionId/answers', QuestionController.createAnswer);

export default router;
