import axios from 'axios';
import { eventFilters } from './utils';

const URL_API = 'http://localhost:3000';

const EventService = {
    getAllEvents: () => axios.get(`${URL_API}/events`),
    getEventById: (id) => axios.get(`${URL_API}/events/${id}`),
    createEvent: (data) => axios.post(`${URL_API}/events`, data),
    updateEvent: (id, data) => axios.put(`${URL_API}/events/${id}`, data),
    deleteEvent: (id) => axios.delete(`${URL_API}/events/${id}`),
};

const QuestionService = {
    getAllQuestions: () => axios.get(`${URL_API}/questions`),
    getQuestionById: (id) => axios.get(`${URL_API}/questions/${id}`),
    updateQuestion: (id, data) => axios.put(`${URL_API}/questions/${id}`, data),
    deleteQuestion: (id) => axios.delete(`${URL_API}/questions/${id}`),
    createAnswer: (questionId, data) =>
        axios.post(`${URL_API}/questions/${questionId}/answers`, data),
};

async function getAllQuestions() {
    try {
        const response = await QuestionService.getAllQuestions();
        const questionsData = response.data;
        const questionsContainer = document.getElementById('questions');
        if (!questionsContainer) {
            console.warn('Elemento questionsContainer não encontrado no DOM.');
            return;
        }
        questionsContainer.innerHTML = '';

        questionsData.forEach((question) => {
            const questionElement = document.createElement('div');
            questionElement.className = 'question-card';
            questionElement.innerHTML = `
        <div class="question-content">
          <h3>${question.title}</h3>
          <p>${question.content}</p>
        </div>
        <div class="question-stats">
          <div class="question-stat">
            <i class="far fa-comment"></i> ${question.answers.length} respostas
          </div>
        </div>
        <div class="answers-section">
          <h3 class="answers-title"><i class="fas fa-reply"></i> Respostas (${
              question.answers.length
          })</h3>
          <div class="answer-form">
            <form class="answerForm" data-question-id="${question.id}">
              <div class="form-group">
                <textarea placeholder="Escreva sua resposta..." required></textarea>
              </div>
              <button type="submit" class="btn btn-primary">Enviar Resposta</button>
            </form>
          </div>
          <div class="answers-list">
            ${question.answers
                .map(
                    (answer) => `
                  <div class="answer-card">
                    <div class="answer-content">
                      <p>${answer.content}</p>
                    </div>
                  </div>`
                )
                .join('')}
          </div>
        </div>`;

            questionsContainer.appendChild(questionElement);
        });

        attachAnswerFormListeners();
    } catch (error) {
        console.error('Erro ao carregar perguntas:', error);
    }
}

async function postQuestion(form) {
    const formData = {
        title: document.getElementById('questionTitle')?.value,
        content: document.getElementById('questionContent')?.value,
    };

    try {
        await axios.post(`${URL_API}/questions`, formData);
        form.reset();
        await getAllQuestions();
    } catch (error) {
        console.error('Erro ao criar pergunta:', error);
    }
}

async function postAnswer({ questionId, content }) {
    try {
        await QuestionService.createAnswer(questionId, { content });
        await getAllQuestions();
    } catch (error) {
        console.error('Erro ao criar resposta:', error);
    }
}

function attachAnswerFormListeners() {
    const forms = document.querySelectorAll('.answerForm');
    forms.forEach((form) => {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const questionId = form.dataset.questionId;
            const textarea = form.querySelector('textarea');
            const content = textarea.value.trim();
            if (!content) return;
            await postAnswer({ questionId, content });
            form.reset();
        });
    });
}

function questionForms() {
    const questionForm = document.getElementById('questionForm');
    if (!questionForm) return;

    questionForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        await postQuestion(questionForm);
    });
}

export function setupEventForm() {
    const eventForm = document.getElementById('event-form');
    if (!eventForm) return;

    const today = new Date().toISOString().split('T')[0];
    const eventDateInput = document.getElementById('event-date');
    if (eventDateInput) eventDateInput.min = today;

    eventForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = {
            title: document.getElementById('event-title')?.value,
            type: document.getElementById('event-type')?.value,
            date: eventDateInput?.value,
            description: document.getElementById('event-description')?.value,
            links: document.getElementById('event-links')?.value,
        };
        try {
            await EventService.createEvent(formData);
            eventForm.reset();
        } catch (error) {
            console.error('Erro ao criar evento:', error);
        }
    });
}

async function getAllEvents() {
    try {
        const response = await EventService.getAllEvents();
        const eventsData = response.data;

        const eventsContainer = document.getElementById('events');
        if (!eventsContainer) {
            console.warn('Container de eventos não encontrado');
            return;
        }

        eventsContainer.innerHTML = '';

        eventsData.forEach((event) => {
            const eventElement = document.createElement('div');
            eventElement.classList.add('event-card');

            let typeEvent;

            switch (event.category) {
                case 'academico':
                    typeEvent = 'academic';
                    break;
                case 'cultural':
                    typeEvent = 'cultural';
                    break;
                case 'esportivo':
                    typeEvent = 'sports';
                    break;
            }

            eventElement.classList.add(typeEvent);

            const date = new Date(event.date);
            const monthNames = [
                'JAN',
                'FEV',
                'MAR',
                'ABR',
                'MAI',
                'JUN',
                'JUL',
                'AGO',
                'SET',
                'OUT',
                'NOV',
                'DEZ',
            ];
            const month = monthNames[date.getMonth()];

            eventElement.innerHTML = `
                            <div class="event-date">
                                <div class="day">${date.getDate()}</div>
                                <div class="month">${month}</div>
                            </div>
                            <div class="event-content">
                                <span class="event-type ${typeEvent}"
                                    >Evento ${event.category}</span
                                >
                                <h3>${event.title}</h3>
                                <div class="event-meta">
                                    <div>
                                        <i class="fas fa-map-marker-alt"></i>
                                        ${event.location}
                                    </div>
                                </div>
                                <p class="event-description">
                                    ${event.description}
                                </p>
                                <div class="event-actions">
                                    <a target="_blank" href="${
                                        event.links
                                    }" class="btn">Detalhes</a>
                                </div>
                            </div>`;

            eventsContainer.appendChild(eventElement);
        });
        eventFilters();
    } catch (error) {
        console.error('Erro ao carregar eventos:', error);
    }
}

export const api = () => {
    getAllQuestions();
    questionForms();
    getAllEvents();
};
