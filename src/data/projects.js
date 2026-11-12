/** Conteúdo público selecionado. Fontes e pendências ficam em CONTEXTO_PROJETO.md. */
export const profile = {
  name: 'Gabriel Violante',
  email: 'gabriel.violant@gmail.com',
  github: 'https://github.com/ViolanteGabriel',
  linkedin: 'https://www.linkedin.com/in/gabriel-violante/',
};

export const studies = [
  {
    slug: 'tinyflow-edgenids',
    number: '02',
    title: 'Pequenos modelos.\nUma rede mais protegida.',
    shortTitle: 'TinyFlow-EdgeNIDS',
    category: 'pesquisa',
    categoryLabel: 'Pesquisa e cibersegurança',
    status: 'SBRC 2026',
    context: 'Pesquisa · DCC / UFMG',
    tags: ['TinyML', 'Cibersegurança', 'Embeddings'],
    summary: 'Detecção de ataques na borda da rede com embeddings de séries temporais e modelos leves, investigando o equilíbrio entre qualidade de detecção e custo computacional.',
    role: 'Primeiro autor · experimentação e escrita',
    period: '2026',
    visual: 'network',
    question: 'Quanto de inteligência cabe em um dispositivo com poucos recursos?',
    sections: [
      { title: 'O desafio', text: 'Dispositivos conectados ampliam as possibilidades da Internet das Coisas, mas também a exposição a ataques. Detectar tráfego malicioso perto desses dispositivos exige considerar limites de memória e processamento.' },
      { title: 'Da representação ao modelo', text: 'O TinyFlow-EdgeNIDS combina embeddings de séries temporais do tráfego com classificadores leves: uma rede neural compacta e regressão logística. Os modelos são convertidos para TensorFlow Lite e avaliados em diferentes cenários de tráfego.' },
      { title: 'Minha contribuição', text: 'Conduzi a experimentação e a escrita do artigo como primeiro autor, em colaboração com Felipe Melo, Fernando Nakayama e Michele Nogueira, no Departamento de Ciência da Computação da UFMG.' },
      { title: 'Resultados com contexto', text: 'No conjunto NF-ToN-IoT-v3, a DNN com embeddings alcançou F1 de 0,9536 no cenário B com tráfego limpo. Em outra configuração, a regressão logística com embeddings para NF-UNSW-NB15-v3 resultou em um arquivo TFLite de 1,45 KB. São resultados de modelos distintos.' },
      { title: 'Limites e próximos passos', text: 'A validação embarcada utilizou um Arduino Nano 33 BLE Sense Rev2, recebendo embeddings pré-computados. O pipeline completo de captura de tráfego e construção de embeddings em tempo real no access point permanece como trabalho futuro.' },
    ],
    takeaway: 'Uma boa representação dos dados pode tornar modelos simples úteis para problemas complexos.',
    links: [{ label: 'Ler o artigo', href: '/assets/papers/tinyflow-edgenids.pdf', type: 'PDF' }],
    publication: {
      title: 'Detecção de Ataques na Borda da Rede com Embeddings de Séries Temporais',
      authors: 'Gabriel Violante, Felipe Melo, Fernando Nakayama e Michele Nogueira',
      venue: 'SBRC', year: '2026',
    },
  },
  {
    slug: 'enem-runner',
    number: '03',
    title: 'Jogar também\né pertencer.',
    shortTitle: 'Enem Runner',
    category: 'jogos',
    categoryLabel: 'Jogos e acessibilidade',
    status: 'SBGames 2022',
    context: 'Projeto em equipe · COLTEC / UFMG',
    tags: ['Unity', 'C#', 'Acessibilidade'],
    summary: 'Um jogo de corrida infinita que explora recursos sonoros e interfaces acessíveis, enquanto faz uma crítica aos obstáculos da mobilidade urbana no Brasil.',
    role: 'Desenvolvimento em equipe · coautor',
    period: '2022',
    visual: 'game',
    question: 'Como criar uma experiência de jogo que mais pessoas possam aproveitar?',
    sections: [
      { title: 'Acessibilidade como ponto de partida', text: 'Enem Runner é um jogo para dispositivos móveis desenvolvido em Unity. A proposta aborda a inclusão de pessoas cegas ou com baixa visão e usa o caminho até uma prova do ENEM como cenário para discutir as barreiras das cidades brasileiras.' },
      { title: 'Uma experiência guiada também pelo som', text: 'O projeto explora efeitos sonoros associados aos obstáculos, controles simples e organização consistente dos elementos da interface. Um botão de orientação descreve as funcionalidades presentes na tela.' },
      { title: 'Construção coletiva', text: 'Participei do desenvolvimento em equipe no COLTEC/UFMG e sou coautor do artigo com Éric Parreiras, Gabriel Begnami, Arthur Cordeiro e Virginia F. Mota. O trabalho foi apresentado no contexto do SBGames 2022.' },
      { title: 'O que foi avaliado', text: 'O artigo relata testes com pessoas vendadas. Testes com pessoas cegas ou com baixa visão aparecem como trabalho futuro; essa etapa é importante para avaliar a acessibilidade junto ao público a que a proposta se destina.' },
    ],
    takeaway: 'Projetar para diferentes formas de perceber o mundo muda a maneira como construímos uma experiência.',
    links: [{ label: 'Ler o artigo', href: '/assets/papers/enem-runner.pdf', type: 'PDF' }],
    publication: {
      title: 'Enem Runner: um jogo de corrida infinita acessível a deficientes visuais',
      authors: 'Éric Parreiras, Gabriel Begnami, Gabriel Violante, Arthur Cordeiro e Virginia F. Mota',
      venue: 'SBGames', year: '2022',
    },
  },
];

export const experiences = [
  { label: 'Pesquisa recém-iniciada', place: 'Iniciação científica junto à VALE', text: 'Acabei de ingressar em uma pesquisa sobre detecção de enxames de abelhas com TinyML em ESP32. Ainda sem implementação ou resultados para apresentar.' },
  { label: 'Engenharia de software', place: 'LEVTY', text: 'Desenvolvimento de sistemas e integrações, conectando processos, pessoas e tecnologia.' },
  { label: 'Pesquisa', place: 'DCC / UFMG', text: 'Aprendizado de máquina, cibersegurança e inteligência em dispositivos com recursos limitados.' },
  { label: 'Construção de sistemas', place: 'PI Júnior & InspEasy', text: 'Experiências com automação de processos, integração de sistemas e software para o contexto industrial.' },
];

// Projetos com código público verificável. Pesquisas ficam em Papers.
export const projects = [
  {
    slug: 'eanteros', title: 'EanterOS', image: 'eanteros.svg', tags: ['Python', 'React', 'RAG'],
    href: 'https://github.com/ViolanteGabriel/Hackathon-UFMGxEnter',
    en: { category: 'Applied AI · team project', summary: 'A hackathon prototype combining machine learning and document retrieval to support decisions in loan disputes, with a human in the loop.', alt: 'Conceptual illustration: documents, AI analysis and human review in EanterOS.' },
    pt: { category: 'IA aplicada · projeto em equipe', summary: 'Protótipo de hackathon que combina aprendizado de máquina e busca em documentos para apoiar decisões em disputas de empréstimos, com revisão humana.', alt: 'Ilustração conceitual: documentos, análise por IA e revisão humana no EanterOS.' },
  },
  {
    slug: 'rpg-sheet', title: 'RPG Character Sheet', image: 'rpg-sheet.png', tags: ['JavaScript', 'PixiJS', 'RPG'],
    href: 'https://github.com/ViolanteGabriel/rpg-interactive-character-sheet',
    en: { category: 'Creative tools · personal project', summary: 'A local interactive character sheet for tabletop sessions, with combat tracking, backups and animated effects. Built around a custom campaign character.', alt: 'RPG character sheet showing combat controls and the Godspeed effect.' },
    pt: { category: 'Ferramentas criativas · projeto pessoal', summary: 'Uma ficha local para sessões presenciais de RPG, com controle de combate, backups e efeitos animados. Criada para um personagem de uma campanha com regras próprias.', alt: 'Ficha de RPG com controles de combate e o efeito Godspeed.' },
  },
  {
    slug: 'enem-runner', title: 'Enem Runner', image: 'enem-runner.png', tags: ['Unity', 'C#', 'Game design'],
    href: 'https://github.com/ViolanteGabriel/EnemRunner',
    en: { category: 'Accessible games · team project', summary: 'An endless runner exploring audio cues and accessible interfaces, inspired by the barriers people with disabilities face in Brazilian cities.', alt: 'Enem Runner gameplay: a character navigating obstacles on a city street.' },
    pt: { category: 'Jogos acessíveis · projeto em equipe', summary: 'Um jogo de corrida infinita que explora orientação sonora e interfaces acessíveis, inspirado nas barreiras enfrentadas por pessoas com deficiência nas cidades brasileiras.', alt: 'Tela do Enem Runner: personagem desviando de obstáculos em uma rua.' },
  },
];

export const papers = [
  {
    slug: 'tinyflow-edgenids', venue: 'SBRC', year: '2026', authors: 'Gabriel Violante, Felipe Melo, Fernando Nakayama & Michele Nogueira',
    href: 'https://sol.sbc.org.br/index.php/sbrc/article/download/42316/42083',
    source: 'https://sol.sbc.org.br/index.php/sbrc/article/view/42316',
    en: { title: 'Network Edge Attack Detection with Time-Series Embeddings', role: 'First author', venue: 'Brazilian Symposium on Computer Networks and Distributed Systems', summary: 'TinyFlow-EdgeNIDS investigates lightweight intrusion detection using traffic embeddings. Embedded validation uses precomputed embeddings; the complete real-time pipeline remains future work.' },
    pt: { title: 'Detecção de Ataques na Borda da Rede com Embeddings de Séries Temporais', role: 'Primeiro autor', venue: 'Simpósio Brasileiro de Redes de Computadores e Sistemas Distribuídos', summary: 'O TinyFlow-EdgeNIDS investiga detecção de intrusões com embeddings de tráfego e modelos leves. A validação embarcada usa embeddings pré-computados; o pipeline completo em tempo real permanece como trabalho futuro.' },
  },
  {
    slug: 'enem-runner', venue: 'SBGames', year: '2022', authors: 'Éric Parreiras, Gabriel Begnami, Gabriel Violante, Arthur Cordeiro & Virginia F. Mota',
    href: 'https://sol.sbc.org.br/index.php/sbgames_estendido/article/download/23798/23627/',
    source: 'https://sol.sbc.org.br/index.php/sbgames_estendido/article/view/23798',
    en: { title: 'Enem Runner: an Accessible Endless Runner for People with Visual Impairments', role: 'Coauthor', venue: 'Brazilian Symposium on Computer Games and Digital Entertainment · Extended Proceedings', summary: 'A study of audio cues, interface design and inclusion in a mobile game. The reported tests involved blindfolded participants; evaluation with blind or low-vision players remains future work.' },
    pt: { title: 'Enem Runner: um jogo de corrida infinita acessível a deficientes visuais', role: 'Coautor', venue: 'Simpósio Brasileiro de Jogos e Entretenimento Digital · Anais Estendidos', summary: 'Um estudo de orientação sonora, interfaces e inclusão em um jogo mobile. Os testes relatados envolveram pessoas vendadas; a avaliação com pessoas cegas ou com baixa visão permanece como trabalho futuro.' },
  },
];

const englishStudies = [
  {
    title: 'Small models.\nA more secure network.', context: 'Research · DCC / UFMG', role: 'First author · experimentation and writing',
    summary: 'Network intrusion detection with time-series embeddings and lightweight models, exploring the balance between detection quality and computational cost.',
    question: 'How much intelligence can fit in a resource-constrained device?',
    sections: [
      { title: 'The challenge', text: 'Connected devices create possibilities for the Internet of Things, but also increase exposure to attacks. Detecting malicious traffic close to these devices requires working within memory and processing limits.' },
      { title: 'From representation to model', text: 'TinyFlow-EdgeNIDS combines traffic time-series embeddings with lightweight classifiers: a compact neural network and logistic regression. Models are converted to TensorFlow Lite and evaluated across traffic scenarios.' },
      { title: 'My contribution', text: 'I led the experiments and paper writing as first author, collaborating with Felipe Melo, Fernando Nakayama and Michele Nogueira at UFMG’s Computer Science Department.' },
      { title: 'Results in context', text: 'On NF-ToN-IoT-v3, the DNN with embeddings achieved an F1 score of 0.9536 in clean scenario B. In a separate configuration, logistic regression with embeddings on NF-UNSW-NB15-v3 produced a 1.45 KB TFLite file. These results belong to different models.' },
      { title: 'Limitations and next steps', text: 'Embedded validation used an Arduino Nano 33 BLE Sense Rev2 receiving precomputed embeddings. The complete pipeline for traffic capture and real-time embedding generation on an access point remains future work.' },
    ], takeaway: 'A good data representation can make simple models useful for complex problems.',
  },
  {
    title: 'Playing is\nbelonging, too.', context: 'Team project · COLTEC / UFMG', role: 'Team contributor · coauthor',
    summary: 'An endless runner exploring audio cues and accessible interfaces, with a critical look at urban mobility barriers in Brazil.',
    question: 'How can we create a game experience more people can enjoy?',
    sections: [
      { title: 'Accessibility as a starting point', text: 'Enem Runner is a mobile game developed in Unity. It explores inclusion for blind and low-vision players, using the journey to Brazil’s ENEM exam to discuss barriers in Brazilian cities.' },
      { title: 'An experience guided by sound', text: 'The project explores sounds associated with obstacles, simple controls and consistent interface layouts. A tutorial button describes the available features on each screen.' },
      { title: 'A collective effort', text: 'I contributed to the project as part of the COLTEC/UFMG team and coauthored the paper with Éric Parreiras, Gabriel Begnami, Arthur Cordeiro and Virginia F. Mota. The work was presented at SBGames 2022.' },
      { title: 'What was evaluated', text: 'The paper reports tests with blindfolded participants. Tests with blind or low-vision people remain future work: an essential step in evaluating accessibility with the intended audience.' },
    ], takeaway: 'Designing for different ways of perceiving the world changes how we build an experience.',
  },
];
export function getStudy(study, lang) {
  return lang === 'en' ? { ...study, ...englishStudies[studies.indexOf(study)] } : study;
}
