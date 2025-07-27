function setupMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }
}

function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const target = document.querySelector(this.getAttribute('href'));
            const navMenu = document.getElementById('nav-menu');

            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth',
                });
                if (navMenu) navMenu.classList.remove('active');
            }
        });
    });
}
function setupNavigationHighlight() {
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('nav a');
        let current = '';

        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

function setupCourseTabs() {
    const courseTabs = document.querySelectorAll('.course-tab');
    const courseContents = document.querySelectorAll('.course-content');

    if (courseTabs.length > 0) {
        courseTabs.forEach((tab) => {
            tab.addEventListener('click', () => {
                courseTabs.forEach((t) => t.classList.remove('active'));
                tab.classList.add('active');

                courseContents.forEach((content) =>
                    content.classList.remove('active')
                );

                const courseId = tab.getAttribute('data-course');
                document.getElementById(courseId).classList.add('active');
            });
        });
    }
}

function setupCourseFilters() {
    const filterBtns = document.querySelectorAll('.courses-filter .filter-btn');

    if (filterBtns.length > 0) {
        filterBtns.forEach((btn) => {
            btn.addEventListener('click', () => {
                filterBtns.forEach((b) => b.classList.remove('active'));
                btn.classList.add('active');
                console.log(`Filtrar cursos por: ${btn.textContent}`);
            });
        });
    }
}

function setupScholarshipFilters() {
    const scholarshipFilters = document.querySelectorAll(
        '.scholarship-filters select'
    );

    if (scholarshipFilters.length > 0) {
        scholarshipFilters.forEach((select) => {
            select.addEventListener('change', () => {
                console.log(
                    `Filtro de bolsa alterado: ${select.id} = ${select.value}`
                );
            });
        });
    }
}

function setupEventFilters() {
    const filterBtns = document.querySelectorAll('.events-filters .filter-btn');
    const eventCards = document.querySelectorAll('.event-card');

    if (filterBtns.length > 0 && eventCards.length > 0) {
        filterBtns.forEach((btn) => {
            btn.addEventListener('click', () => {
                filterBtns.forEach((b) => b.classList.remove('active'));
                btn.classList.add('active');

                const filter = btn.getAttribute('data-filter');

                eventCards.forEach((card) => {
                    if (filter === 'all') {
                        card.style.display = 'flex';
                    } else {
                        card.style.display = card.classList.contains(filter)
                            ? 'flex'
                            : 'none';
                    }
                });
            });
        });
    }
}

function setupCalendarNavigation() {
    const prevBtn = document.querySelector('.calendar-nav button:first-child');
    const nextBtn = document.querySelector('.calendar-nav button:last-child');
    const calendarTitle = document.querySelector('.calendar-header h3');

    if (prevBtn && nextBtn && calendarTitle) {
        prevBtn.addEventListener('click', () => {
            calendarTitle.textContent = 'Julho 2024';
        });

        nextBtn.addEventListener('click', () => {
            calendarTitle.textContent = 'Setembro 2024';
        });
    }
}

function setupEventForm() {
    const eventForm = document.getElementById('event-form');

    if (eventForm) {
        const today = new Date().toISOString().split('T')[0];
        const eventDateInput = document.getElementById('event-date');

        if (eventDateInput) {
            eventDateInput.min = today;
        }

        eventForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const title = document.getElementById('event-title')?.value;
            const type = document.getElementById('event-type')?.value;
            const date = eventDateInput?.value;

            if (!title || !type || !date) {
                alert('Por favor, preencha todos os campos obrigatórios.');
                return;
            }

            alert(
                'Seu evento foi enviado com sucesso! Ele será revisado pela equipe antes da publicação.'
            );
            eventForm.reset();
        });
    }
}

function setupFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');

    if (faqItems.length > 0) {
        faqItems.forEach((item) => {
            const question = item.querySelector('.faq-question');

            question.addEventListener('click', () => {
                item.classList.toggle('active');
            });
        });
    }
}

const questionsData = [
    {
        id: 1,
        title: 'Como funciona o processo de matrícula para calouros?',
        content:
            'Fui aprovado no SISU e gostaria de saber como funciona o processo de matrícula na UFC. Quais documentos preciso levar? Existe algum prazo específico?',
        user: { name: 'João Almeida', avatar: 'JA' },
        date: '2 dias atrás',
        tags: ['matrícula', 'calouro', 'documentos'],
        answers: [
            {
                id: 1,
                content:
                    'Parabéns pela aprovação! O processo de matrícula é feito online pelo SIGAA. Você receberá um e-mail com todas as instruções. Geralmente precisa apresentar: RG, CPF, comprovante de residência, histórico escolar e foto 3x4. Fique atento aos prazos!',
                user: { name: 'Maria Cavalcante', avatar: 'MC' },
                date: '1 dia atrás',
                likes: 12,
            },
            {
                id: 2,
                content:
                    'Além dos documentos que a Maria mencionou, não esqueça da sua certidão de nascimento ou casamento. O processo costuma durar cerca de 3 dias úteis. Qualquer dúvida, o setor de matrículas é bem atencioso.',
                user: { name: 'Carlos Rodrigues', avatar: 'CR' },
                date: '20 horas atrás',
                likes: 8,
            },
        ],
    },
    {
        id: 2,
        title: 'Como solicitar isenção da taxa do Restaurante Universitário?',
        content:
            'Sou estudante de baixa renda e gostaria de saber como posso solicitar a isenção da taxa do RU. Quais documentos preciso apresentar e onde devo fazer o pedido?',
        user: { name: 'Ana Santos', avatar: 'AS' },
        date: '5 dias atrás',
        tags: ['RU', 'isenção', 'bolsas'],
        answers: [
            {
                id: 1,
                content:
                    'A solicitação é feita pelo SIGAA na seção de Serviços Estudantis. Você precisa preencher um formulário e anexar documentos que comprovem sua situação socioeconômica (comprovante de renda familiar, NIS, etc). O período de solicitação é divulgado no calendário acadêmico.',
                user: { name: 'Pedro Silva', avatar: 'PS' },
                date: '4 dias atrás',
                likes: 15,
            },
        ],
    },
    {
        id: 3,
        title: 'Quais são os melhores lugares para estudar no campus do Pici?',
        content:
            'Estou começando agora na UFC e queria saber quais são os melhores lugares para estudar no campus do Pici. Existem bibliotecas abertas até tarde? Há espaços silenciosos para estudo em grupo?',
        user: { name: 'Lucas Oliveira', avatar: 'LO' },
        date: '1 semana atrás',
        tags: ['estudo', 'campus', 'biblioteca'],
        answers: [
            {
                id: 1,
                content:
                    'A Biblioteca Central fica aberta até as 22h durante a semana e tem ótimos espaços individuais. Para estudo em grupo, recomendo os espaços no bloco da Engenharia, que ficam abertos até mais tarde. O RU também é um bom lugar para estudar durante o dia.',
                user: { name: 'Ana Ferreira', avatar: 'AF' },
                date: '6 dias atrás',
                likes: 21,
            },
            {
                id: 2,
                content:
                    'Se você prefere lugares mais tranquilos, experimente as salas de estudo no térreo do bloco da Matemática. São pequenas e geralmente menos cheias que a biblioteca central.',
                user: { name: 'Rafael Costa', avatar: 'RC' },
                date: '5 dias atrás',
                likes: 9,
            },
        ],
    },
];

function renderQuestions() {
    const questionsContainer = document.getElementById('questionsContainer');
    if (!questionsContainer) return;

    questionsContainer.innerHTML = '';

    questionsData.forEach((question) => {
        const questionElement = document.createElement('div');
        questionElement.className = 'question-card';
        questionElement.innerHTML = `
            <div class="question-header">
                <div class="user-info">
                    <div class="user-details">
                        <div class="user-name">${question.user.name}</div>
                    </div>
                </div>
            </div>
            <div class="question-content">
                <h3>${question.title}</h3>
                <p>${question.content}</p>
            </div>
            <div class="question-stats">
                <div class="question-stat">
                    <i class="far fa-comment"></i> ${
                        question.answers.length
                    } respostas
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
                            <div class="answer-header">
                                <div class="user-info">
                                    <div class="user-details">
                                        <div class="user-name">${answer.user.name}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="answer-content">
                                <p>${answer.content}</p>
                            </div>
                            <div class="answer-footer">
                                <button class="like-btn" data-answer-id="${answer.id}">
                                    <i class="far fa-heart"></i>
                                    <span class="like-count">${answer.likes}</span>
                                </button>
                            </div>
                        </div>
                    `
                        )
                        .join('')}
                </div>
            </div>
        `;

        questionsContainer.appendChild(questionElement);
    });

    document.querySelectorAll('.like-btn').forEach((button) => {
        button.addEventListener('click', function () {
            this.classList.toggle('liked');
            const likeCount = this.querySelector('.like-count');
            const currentCount = parseInt(likeCount.textContent);

            if (this.classList.contains('liked')) {
                likeCount.textContent = currentCount + 1;
                this.innerHTML = `<i class="fas fa-heart"></i> <span class="like-count">${
                    currentCount + 1
                }</span>`;
            } else {
                likeCount.textContent = currentCount - 1;
                this.innerHTML = `<i class="far fa-heart"></i> <span class="like-count">${
                    currentCount - 1
                }</span>`;
            }
        });
    });

    document.querySelectorAll('.answerForm').forEach((form) => {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const textarea = this.querySelector('textarea');
            const answerContent = textarea.value.trim();

            if (answerContent) {
                alert(
                    'Resposta enviada com sucesso! Em uma implementação real, esta resposta seria salva no banco de dados.'
                );
                textarea.value = '';
            }
        });
    });
}

function setupQuestionForm() {
    const questionForm = document.getElementById('questionForm');

    if (questionForm) {
        questionForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const title = document.getElementById('questionTitle')?.value;
            const content = document.getElementById('questionContent')?.value;
            const tagsInput = document.getElementById('questionTags')?.value;

            if (!title || !content) {
                alert('Por favor, preencha o título e o conteúdo da pergunta.');
                return;
            }

            const tags = tagsInput
                ? tagsInput
                      .split(',')
                      .map((tag) => tag.trim())
                      .filter((tag) => tag)
                : [];

            // Criar nova pergunta
            const newQuestion = {
                id: questionsData.length + 1,
                title,
                content,
                user: { name: 'Novo Usuário', avatar: 'NU' },
                date: 'Agora mesmo',
                tags,
                answers: [],
            };

            questionsData.unshift(newQuestion);

            renderQuestions();

            questionForm.reset();

            const questionsSection = document.querySelector('#questions');
            if (questionsSection) {
                questionsSection.scrollIntoView({ behavior: 'smooth' });
            }

            alert('Pergunta publicada com sucesso!');
        });
    }
}

function init() {
    // Configurações globais
    setupMobileMenu();
    setupSmoothScrolling();
    setupNavigationHighlight();

    // Configurações específicas de página
    setupCourseTabs();
    setupCourseFilters();
    setupScholarshipFilters();
    setupEventFilters();
    setupCalendarNavigation();
    setupEventForm();
    setupFAQAccordion();

    if (document.getElementById('questionsContainer')) {
        renderQuestions();
        setupQuestionForm();
    }
}

document.addEventListener('DOMContentLoaded', init);
