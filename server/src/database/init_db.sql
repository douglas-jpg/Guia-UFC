-- Remove as tabelas se já existirem (ordem importa por causa de dependências)
DROP TABLE IF EXISTS answers;
DROP TABLE IF EXISTS questions;
DROP TABLE IF EXISTS events;
DROP TYPE IF EXISTS event_category;

CREATE TYPE event_category AS ENUM ('academico', 'esportivo', 'cultural');

CREATE TABLE questions (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    content TEXT
);

CREATE TABLE answers (
    id SERIAL PRIMARY KEY,
    content TEXT,
    question_id INTEGER REFERENCES questions(id)
);

CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    description TEXT,
    date DATE,
    location VARCHAR(255),
    category event_category,
    links TEXT
);

INSERT INTO questions (title, content) VALUES
('Como funciona a matrícula?', 'A matrícula é feita pelo SIGAA.'),
('Quais documentos preciso para o RU?', 'Você precisa da carteirinha e documento com foto.');

INSERT INTO answers (content, question_id) VALUES
('A matrícula ocorre todo semestre, pelo SIGAA.', 1),
('Você precisa da carteirinha de estudante e um documento com foto.', 2);

INSERT INTO events (title, description, date, location, category, links) VALUES
('Semana da Computação', 'Evento acadêmico com palestras e workshops.', '2025-09-15', 'UFC Campus', 'academico', 'https://exemplo.com/sescomp'),
('Intercurso UFC', 'Evento esportivo entre cursos.', '2025-10-10', 'Ginásio da UFC', 'esportivo', 'https://exemplo.com/intercurso'),
('Arraiá UFC', 'Festa junina da universidade.', '2025-06-20', 'Quadra principal', 'cultural', 'https://exemplo.com/arraia');
