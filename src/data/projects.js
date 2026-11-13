/** Conteúdo público. Fontes e limites documentados em CONTEXTO_PROJETO.md. */
export const profile = {
  name: 'Gabriel Violante',
  email: 'gabriel.violant@gmail.com',
  github: 'https://github.com/ViolanteGabriel',
  linkedin: 'https://www.linkedin.com/in/gabriel-violante/',
};

// Ordem definida por Gabriel. Pesquisas publicadas ficam em Papers.
export const projects = [
  {
    slug: 'eanteros', title: 'Eanter-OS', image: 'eanteros.svg', tags: ['Python', 'React', 'RAG'],
    href: 'https://github.com/ViolanteGabriel/Eanter-OS',
    en: { category: 'Applied AI · team project', summary: 'Hackathon prototype for reviewing loan disputes with machine learning, document retrieval and human review.', alt: 'Conceptual illustration of document analysis and human review in Eanter-OS.' },
    pt: { category: 'IA aplicada · projeto em equipe', summary: 'Protótipo de hackathon para análise de disputas de empréstimos com aprendizado de máquina, busca em documentos e revisão humana.', alt: 'Ilustração conceitual de análise de documentos e revisão humana no Eanter-OS.' },
  },
  {
    slug: 'stronger-notes', title: 'StrongerNotes', image: 'stronger-notes.svg', tags: ['TypeScript', 'React', 'Fastify', 'MongoDB'],
    href: 'https://github.com/ViolanteGabriel/StrongerNotes',
    en: { category: 'Web development · team project', summary: 'Workout tracking app with routines, sets, reps, weights and progress charts. Developed for a Software Engineering course.', alt: 'Conceptual illustration of a dumbbell, a workout log and a progress chart.' },
    pt: { category: 'Desenvolvimento web · equipe', summary: 'Aplicação para organizar treinos, registrar séries, repetições e cargas, e acompanhar a evolução em gráficos. Trabalho de Engenharia de Software.', alt: 'Ilustração conceitual de um halter, um registro de treino e um gráfico de evolução.' },
  },
  {
    slug: 'enem-runner', title: 'EnemRunner', image: 'enem-runner.png', tags: ['Unity', 'C#', 'Game design'],
    href: 'https://github.com/ViolanteGabriel/EnemRunner',
    en: { category: 'Games · team project', summary: 'Mobile endless runner with audio cues and interfaces designed for visual accessibility. Tested with blindfolded participants; evaluation with blind or low-vision players remains future work.', alt: 'Enem Runner gameplay: a character navigating obstacles on a city street.' },
    pt: { category: 'Jogos · projeto em equipe', summary: 'Jogo de corrida infinita para celular com orientação sonora e interfaces voltadas à acessibilidade visual. Testado com pessoas vendadas; avaliação com pessoas cegas ou com baixa visão é trabalho futuro.', alt: 'Tela do Enem Runner: personagem desviando de obstáculos em uma rua.' },
  },
  {
    slug: 'competitive-programming', title: 'Competitive-Programming', image: 'competitive-programming.svg', tags: ['C++', 'Python', 'Algorithms'],
    href: 'https://github.com/ViolanteGabriel/Competitive-Programming',
    en: { category: 'Algorithms · personal practice', summary: 'Programming exercises organized by topic and training week. Includes solutions, historical attempts and unfinished exercises.', alt: 'Conceptual illustration of code brackets, a graph and an ordered sequence.' },
    pt: { category: 'Algoritmos · estudo pessoal', summary: 'Exercícios de programação organizados por assunto e semana de treinamento. Inclui soluções, tentativas anteriores e exercícios incompletos.', alt: 'Ilustração conceitual de código, um grafo e uma sequência ordenada.' },
  },
  {
    slug: 'rpg-sheet', title: 'RPG-Sheet-Supros', image: 'rpg-sheet.png', tags: ['JavaScript', 'PixiJS', 'RPG'],
    href: 'https://github.com/ViolanteGabriel/RPG-Sheet-Supros',
    en: { category: 'RPG tools · personal project', summary: 'Local character sheet with combat tracking, notes, backups and animated effects. Combat rules are specific to Supros and his campaign.', alt: 'RPG character sheet showing combat controls and the Godspeed effect.' },
    pt: { category: 'Ferramentas de RPG · projeto pessoal', summary: 'Ficha local com controle de combate, anotações, backups e efeitos animados. As regras de combate são específicas do Supros e de sua campanha.', alt: 'Ficha de RPG com controles de combate e o efeito Godspeed.' },
  },
];

// Títulos oficiais preservados no idioma da publicação; resumos e interface traduzidos.
export const papers = [
  {
    slug: 'network-flow-embeddings', venue: 'IEEE ISCC', year: '2026', logo: 'ISCC2026_Logo.webp',
    title: 'Time Series Embeddings of Network Flows for Semi-Supervised Anomaly Detection',
    authors: 'Fernando Nakayama, Felipe Melo, Gabriel Violante & Michele Nogueira',
    href: 'https://ieeexplore.ieee.org/document/11739938', doi: '10.1109/ISCC70364.2026.11739938', publicationLanguage: 'en',
    en: { role: 'Coauthor', venue: 'IEEE Symposium on Computers and Communications', summary: 'Time-series representations of network flows for semi-supervised anomaly detection.' },
    pt: { role: 'Coautor', venue: 'IEEE Symposium on Computers and Communications', summary: 'Representações de fluxos de rede como séries temporais para detecção semissupervisionada de anomalias.' },
  },
  {
    slug: 'tinyflow-edgenids', venue: 'SBRC', year: '2026', logo: 'SBRC2026_Logo.png',
    title: 'Detecção de Ataques na Borda da Rede com Embeddings de Séries Temporais',
    authors: 'Gabriel Violante, Felipe Melo, Fernando Nakayama & Michele Nogueira',
    href: 'https://sol.sbc.org.br/index.php/sbrc/article/view/42316', doi: '10.5753/sbrc.2026.19392', publicationLanguage: 'pt-BR',
    en: { role: 'First author', venue: 'Brazilian Symposium on Computer Networks and Distributed Systems', summary: 'Lightweight intrusion detection with traffic embeddings. Embedded tests use precomputed embeddings; the full real-time pipeline remains future work.' },
    pt: { role: 'Primeiro autor', venue: 'Simpósio Brasileiro de Redes de Computadores e Sistemas Distribuídos', summary: 'Detecção de intrusões com embeddings de tráfego e modelos leves. Testes embarcados usam embeddings pré-computados; o pipeline completo em tempo real é trabalho futuro.' },
  },
  {
    slug: 'enem-runner', venue: 'SBGames', year: '2022', logo: 'SBGames2022_Logo.png',
    title: 'Enem Runner: um jogo de corrida infinita acessível a deficientes visuais',
    authors: 'Éric Parreiras, Gabriel Begnami, Gabriel Violante, Arthur Cordeiro & Virginia F. Mota',
    href: 'https://sol.sbc.org.br/index.php/sbgames_estendido/article/view/23798', doi: '10.5753/sbgames_estendido.2022.227237', publicationLanguage: 'pt-BR',
    en: { role: 'Coauthor', venue: 'Brazilian Symposium on Computer Games and Digital Entertainment · Extended Proceedings', summary: 'Audio cues and interface design in a mobile game. Tests involved blindfolded participants; evaluation with blind or low-vision players remains future work.' },
    pt: { role: 'Coautor', venue: 'Simpósio Brasileiro de Jogos e Entretenimento Digital · Anais Estendidos', summary: 'Orientação sonora e interfaces em um jogo para celular. Os testes foram feitos com pessoas vendadas; avaliação com pessoas cegas ou com baixa visão é trabalho futuro.' },
  },
];
