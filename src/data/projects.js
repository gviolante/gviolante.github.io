/** Conteúdo público. Fontes e limites documentados em CONTEXTO_PROJETO.md. */
export const profile = {
  name: 'Gabriel Violante',
  email: 'gabriel.violant@gmail.com',
  phone: '+55 (31) 99549-7868',
  phoneHref: 'tel:+5531995497868',
  github: 'https://github.com/ViolanteGabriel',
  linkedin: 'https://www.linkedin.com/in/gabriel-violante/',
};

// Ordem definida por Gabriel. Os três trabalhos publicados precedem estes repositórios na interface.
export const projects = [
  {
    slug: 'eanteros', title: 'Eanter-OS', image: 'projects/eanter-os/agreement-recommendation.png', imageWidth: 1916, imageHeight: 1079,
    artwork: { kind: 'app', logo: 'projects/eanter-os/logo.png', logoWidth: 1493, logoHeight: 475 }, tags: ['Python', 'React', 'RAG'],
    href: 'https://github.com/ViolanteGabriel/Eanter-OS',
    en: { category: 'Applied AI · team project', summary: 'Team-built prototype that uses machine learning and document retrieval to support human review of loan disputes. 2nd place at the UFMG × EnterAI Hackathon.', alt: 'Eanter-OS prototype screen with an agreement recommendation and documents for human review.' },
    pt: { category: 'IA aplicada · projeto em equipe', summary: 'Protótipo em equipe que usa aprendizado de máquina e busca em documentos para apoiar a análise humana de disputas de empréstimos. 2º lugar no Hackathon UFMG × EnterAI.', alt: 'Tela do protótipo Eanter-OS com recomendação de acordo e documentos para revisão humana.' },
  },
  {
    slug: 'stronger-notes', title: 'StrongerNotes', image: 'projects/stronger-notes/progress-overview.png', imageWidth: 1912, imageHeight: 1075,
    artwork: { kind: 'app', logo: 'projects/stronger-notes/logo.png', logoWidth: 1072, logoHeight: 334 }, tags: ['TypeScript', 'React', 'Fastify', 'MongoDB'],
    href: 'https://github.com/ViolanteGabriel/StrongerNotes',
    en: { category: 'Web development · team project', summary: 'A team-built app to plan workouts, log sets, reps and weights, and follow progress through charts. I contributed as a full-stack developer.', alt: 'StrongerNotes progress dashboard with exercise records and strength progression charts.' },
    pt: { category: 'Desenvolvimento web · equipe', summary: 'Aplicação em equipe para planejar treinos, registrar séries, repetições e cargas, e acompanhar a evolução em gráficos. Atuei no desenvolvimento full-stack.', alt: 'Painel de evolução do StrongerNotes, com registros de exercícios e gráficos de progressão de força.' },
  },
  {
    slug: 'enem-runner', title: 'EnemRunner', image: 'projects/enem-runner/main-screen.png', tags: ['Unity', 'C#', 'Game design'],
    artwork: { kind: 'game', logo: 'projects/enem-runner/title.png', characters: ['projects/enem-runner/character-01.png', 'projects/enem-runner/character-02.png', 'projects/enem-runner/character-03.png'] },
    href: 'https://github.com/ViolanteGabriel/EnemRunner',
    en: { category: 'Games · team project', summary: 'A mobile endless runner built with my COLTEC team, exploring visual accessibility through audio cues and interface design. The project led to our SBGames 2022 paper.', alt: 'Enem Runner title screen with a city street and character selection.' },
    pt: { category: 'Jogos · projeto em equipe', summary: 'Jogo de corrida infinita para celular, desenvolvido com minha equipe no COLTEC, que explora acessibilidade visual com orientação sonora e interfaces. O projeto deu origem ao nosso artigo no SBGames 2022.', alt: 'Tela inicial do Enem Runner, com uma rua e seleção de personagem.' },
  },
  {
    slug: 'competitive-programming', title: 'Competitive-Programming', image: 'projects/competitive-programming/codeforces.webp', imageWidth: 1024, imageHeight: 1024, tags: ['C++', 'Python', 'Algorithms'],
    href: 'https://github.com/ViolanteGabriel/Competitive-Programming',
    en: { category: 'Algorithms · personal practice', summary: 'My practice in algorithms and problem solving with C++ and Python, organized by topic and training week.', alt: 'Codeforces logo, a competitive programming platform.' },
    pt: { category: 'Algoritmos · estudo pessoal', summary: 'Meu estudo de algoritmos e resolução de problemas com C++ e Python, organizado por assunto e semana de treinamento.', alt: 'Logo do Codeforces, plataforma de programação competitiva.' },
  },
  {
    slug: 'rpg-sheet', title: 'RPG-Interective-Sheet', image: 'projects/rpg-interactive-sheet/player-sheet.png', tags: ['JavaScript', 'PixiJS', 'RPG'],
    artwork: { icon: 'projects/rpg-interactive-sheet/d20.png' }, imageWidth: 1915, imageHeight: 1080,
    href: 'https://github.com/ViolanteGabriel/RPG-Sheet',
    en: { category: 'RPG tools · personal project', summary: 'An interactive character sheet for my RPG campaign, with combat tracking, notes, local backups and animated effects built with PixiJS.', alt: 'Kozuki character sheet with health, armor, weapons and combat abilities.' },
    pt: { category: 'Ferramentas de RPG · projeto pessoal', summary: 'Ficha interativa para minha campanha de RPG, com controle de combate, anotações, backups locais e efeitos animados com PixiJS.', alt: 'Ficha de Kozuki com vida, armadura, armas e habilidades de combate.' },
  },
];

// Títulos oficiais preservados no idioma da publicação; resumos e interface traduzidos.
export const papers = [
  {
    slug: 'network-flow-embeddings', venue: 'IEEE ISCC', year: '2026', logo: 'conferences/iscc-2026.png',
    title: 'Time Series Embeddings of Network Flows for Semi-Supervised Anomaly Detection',
    authors: ['Fernando Nakayama', 'Felipe Melo', 'Gabriel Violante', 'Michele Nogueira'],
    href: 'https://ieeexplore.ieee.org/document/11739938', doi: '10.1109/ISCC70364.2026.11739938', publicationLanguage: 'en',
    en: { role: 'Third author', venue: 'IEEE Symposium on Computers and Communications', summary: 'Research on time-series embeddings for network anomaly detection. I contributed an autoencoder to evaluate this representation of network traffic.' },
    pt: { role: 'Terceiro autor', venue: 'IEEE Symposium on Computers and Communications', summary: 'Pesquisa sobre embeddings de séries temporais para detectar anomalias em redes. Contribuí com um autoencoder para avaliar essa representação do tráfego.' },
  },
  {
    slug: 'tinyflow-edgenids', venue: 'SBRC', year: '2026', logo: 'conferences/sbrc-2026.png',
    title: 'Detecção de Ataques na Borda da Rede com Embeddings de Séries Temporais',
    authors: ['Gabriel Violante', 'Felipe Melo', 'Fernando Nakayama', 'Michele Nogueira'],
    href: 'https://sol.sbc.org.br/index.php/sbrc/article/view/42316', doi: '10.5753/sbrc.2026.19392', publicationLanguage: 'pt-BR',
    en: { role: 'First author', venue: 'Brazilian Symposium on Computer Networks and Distributed Systems', summary: 'I led the experiments and writing of this study on lightweight models for network intrusion detection, with inference evaluated on an Arduino Nano using precomputed embeddings.' },
    pt: { role: 'Primeiro autor', venue: 'Simpósio Brasileiro de Redes de Computadores e Sistemas Distribuídos', summary: 'Conduzi os experimentos e a escrita deste estudo de modelos leves para detecção de ataques em redes, com inferência avaliada em Arduino Nano usando embeddings pré-computados.' },
  },
  {
    slug: 'enem-runner', venue: 'SBGames', year: '2022', logo: 'conferences/sbgames-2022.png',
    title: 'Enem Runner: um jogo de corrida infinita acessível a deficientes visuais',
    authors: ['Éric Parreiras', 'Gabriel Begnami', 'Gabriel Violante', 'Arthur Cordeiro', 'Virginia F. Mota'],
    href: 'https://sol.sbc.org.br/index.php/sbgames_estendido/article/view/23798', doi: '10.5753/sbgames_estendido.2022.227237', publicationLanguage: 'pt-BR',
    en: { role: 'Third author', venue: 'Brazilian Symposium on Computer Games and Digital Entertainment · Extended Proceedings', summary: 'Coauthored at age 17, this paper presents our team’s work on audio cues and interface design to explore visual accessibility in a mobile game.' },
    pt: { role: 'Terceiro autor', venue: 'Simpósio Brasileiro de Jogos e Entretenimento Digital · Anais Estendidos', summary: 'Artigo que publiquei em coautoria aos 17 anos, apresentando o trabalho da nossa equipe com orientação sonora e interfaces para explorar acessibilidade visual em um jogo para celular.' },
  },
];
