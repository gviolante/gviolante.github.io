/** Conteúdo público selecionado. Fontes e pendências ficam em CONTEXTO_PROJETO.md. */
export const profile = {
  name: 'Gabriel Violante',
  email: 'gabriel.violant@gmail.com',
  github: 'https://github.com/ViolanteGabriel',
  linkedin: 'https://www.linkedin.com/in/gabriel-violante/',
};

export const projects = [
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
