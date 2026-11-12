# Gabriel Violante — portfólio

Primeira versão local do portfólio, centrada em inteligência artificial aplicada a problemas reais. Inclui página inicial, catálogo com filtros, três páginas de projeto, publicações e contato.

## Executar

Requer Node.js 22.8 ou superior. Não há pacotes externos para instalar.

```bash
npm run dev
```

Acesse `http://localhost:4321`. Alterações em `src/` e `public/` geram novamente o site; recarregue a página no navegador para vê-las.

```bash
npm run check    # Gera o site e executa os testes
npm run build    # Gera somente a pasta dist/
npm run preview  # Gera o site e inicia o servidor, sem observar alterações
```

Para usar outra porta: `PORT=4322 npm run dev`.

Se o ambiente bloquear o servidor Node, depois de executar a construção também é possível servir os arquivos estáticos:

```bash
python3 -m http.server 4321 --bind 127.0.0.1 --directory dist
```

Sempre sirva `dist/`, nunca a raiz do projeto: os documentos pessoais estão fora da saída pública.

## Organização

```text
src/
  data/projects.js    Perfil, projetos, publicações e experiências
  templates.js        Componentes e páginas HTML
  styles.css          Estilos e adaptações para telas menores
  client.js           Menu, filtros e cópia de e-mail
public/
  assets/images/      Diagramas SVG e imagem do Enem Runner
  assets/papers/      Somente os dois artigos selecionados
scripts/
  build.mjs           Geração das páginas estáticas
  serve.mjs           Servidor local restrito à saída pública
tests/
  site.test.mjs       Links, âncoras, conteúdo e limites da publicação
  browser.html       Verificações de comportamento e responsividade
dist/                 Saída gerada; não editar diretamente
```

O conteúdo é transformado em HTML durante a construção. O navegador recebe páginas prontas e usa JavaScript apenas para menu, filtros e cópia de e-mail. Sem JavaScript, os projetos e links continuam disponíveis.

Para editar um projeto, altere sua entrada em `src/data/projects.js`. Cada projeto ganha uma página automaticamente. As seções de apresentação estão em `src/templates.js`; o visual está em `src/styles.css`.

Astro era a recomendação inicial, mas o registro npm não estava acessível neste ambiente. Esta versão usa JavaScript nativo e funções de apresentação simples para permitir execução e validação imediatas. Reavaliar a migração para Astro antes de ampliar muito o catálogo; não há implementação de Astro ou TypeScript neste momento.

## Rotas

- `/`: apresentação, destaques, sobre, experiências, pesquisa e contato.
- `/projetos/`: catálogo com filtros.
- `/projetos/deteccao-de-abelhas/`: pesquisa em andamento junto à VALE.
- `/projetos/tinyflow-edgenids/`: estudo de caso de pesquisa em cibersegurança.
- `/projetos/enem-runner/`: jogo e acessibilidade.
- `404.html`: página para configurar como resposta de erro na hospedagem futura.

## Verificação no navegador

O arquivo `tests/browser.html` verifica as cinco páginas principais em 320, 390, 768 e 1440 pixels; menu móvel, Escape, foco, filtros e ausência de documentos pessoais por HTTP. Para reproduzir com o servidor local ativo:

```bash
cp tests/browser.html dist/__browser-check.html
```

Abra `http://localhost:4321/__browser-check.html` e aguarde o resultado `passed`. O teste deve ser servido na mesma origem do portfólio. Depois execute `npm run build` para remover o arquivo temporário da saída antes de rodar `npm run check` ou preparar uma publicação.

A sessão inicial passou nas 77 verificações dessa página e nos quatro testes Node, com inspeção visual de desktop e celular. Essas verificações não substituem uma auditoria completa de acessibilidade ou testes em outros navegadores.

## Conteúdo e continuidade

- A pesquisa de detecção de abelhas é apresentada como em andamento. Não há resultados de campo ou modalidade de sensor presumidos.
- As métricas e limitações de TinyFlow são contextualizadas por configuração.
- Enem Runner é um trabalho coletivo. A imagem foi extraída do artigo fornecido por Gabriel (figura 2, página 4).
- Diagramas SVG são ilustrações conceituais; não são fotos de dispositivos ou capturas de experimentos reais.
- `personalContext/` é material interno e está no `.gitignore`. A construção copia somente `public/` e os recursos explicitamente definidos.
- O contexto e as pendências editoriais estão em `CONTEXTO_PROJETO.md`; as orientações para agentes estão em `AGENTS.md`.

O ambiente desta sessão tem `.git` reservado e somente leitura; o repositório Git não foi inicializado. A publicação também não foi iniciada. Inglês, currículo público revisado, demais projetos e domínio ficam para próximas etapas.

Quando houver domínio, `SITE_URL=https://seu-dominio.example npm run build` gera URLs canônicas e sitemap. Configure a hospedagem para publicar apenas `dist/`, servir os diretórios como páginas e usar `404.html` com status HTTP 404. O endereço acima é ilustrativo.
