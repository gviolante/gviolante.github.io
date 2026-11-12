# Gabriel Violante — portfólio

Portfólio local centrado em inteligência artificial aplicada a problemas reais. A capa destaca Gabriel Violante com uma descrição breve, inspirada na hierarquia da abertura do Ninito. Inclui catálogo com filtros, duas páginas de projeto, publicações, trajetória e contato.

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
  theme.js            Tema claro, escuro ou automático, com preferência salva
public/
  assets/images/      Diagramas SVG e imagem do Enem Runner
  assets/papers/      Somente os dois artigos selecionados
scripts/
  build.mjs           Geração das páginas estáticas
  serve.mjs           Servidor local restrito à saída pública
tests/
  site.test.mjs       Links, âncoras, conteúdo e limites da publicação
  theme.test.mjs      Preferência de tema e casos de armazenamento indisponível
  browser.html       Verificações de comportamento e responsividade
dist/                 Saída gerada; não editar diretamente
```

O conteúdo é transformado em HTML durante a construção. O navegador recebe páginas prontas e usa JavaScript apenas para menu, filtros e cópia de e-mail. Sem JavaScript, os projetos e links continuam disponíveis.

Para editar um projeto, altere sua entrada em `src/data/projects.js`. Cada projeto ganha uma página automaticamente. As seções de apresentação estão em `src/templates.js`; o visual está em `src/styles.css`.

Astro era a recomendação inicial, mas o registro npm não estava acessível neste ambiente. Esta versão usa JavaScript nativo e funções de apresentação simples para permitir execução e validação imediatas. Reavaliar a migração para Astro antes de ampliar muito o catálogo; não há implementação de Astro ou TypeScript neste momento.

## Rotas

- `/`: apresentação, destaques, sobre, experiências, pesquisa e contato.
- `/projetos/`: catálogo com filtros.
- `/projetos/tinyflow-edgenids/`: estudo de caso de pesquisa em cibersegurança.
- `/projetos/enem-runner/`: jogo e acessibilidade.
- `404.html`: página para configurar como resposta de erro na hospedagem futura.

## Verificação no navegador

O arquivo `tests/browser.html` verifica as quatro páginas de conteúdo e a página 404 em 320, 390, 768 e 1440 pixels, nos dois temas. Verifica também menu móvel, Escape, foco, filtros, persistência de tema e ausência de documentos pessoais ou recursos removidos por HTTP. Para reproduzir com o servidor local ativo:

```bash
cp tests/browser.html dist/__browser-check.html
```

Abra `http://localhost:4321/__browser-check.html` e aguarde o resultado `passed`. O teste deve ser servido na mesma origem do portfólio. Depois execute `npm run build` para remover o arquivo temporário da saída antes de rodar `npm run check` ou preparar uma publicação.

A revisão atual passou nas 188 verificações dessa página e nos oito testes Node, com inspeção visual de desktop e celular nos temas claro e escuro. Essas verificações não substituem uma auditoria completa de acessibilidade ou testes em outros navegadores.

## Temas

No cabeçalho, selecione **Sistema**, **Claro** ou **Escuro**. O padrão acompanha o sistema operacional. Uma escolha explícita é salva localmente no navegador e restaurada antes do CSS para evitar uma troca visível de paleta no carregamento. Voltar a Sistema remove essa preferência e acompanha mudanças do dispositivo em tempo real.

O seletor funciona mesmo quando o navegador bloqueia o armazenamento; nesse caso, a escolha vale apenas para a página atual. A paleta usa variáveis em `src/styles.css`, preservando as cores originais dos recursos visuais. O script `src/theme.js` concentra o comportamento e sincroniza alterações entre abas.

## Conteúdo e continuidade

- A pesquisa de detecção de enxames de abelhas junto à VALE foi recém-iniciada, sem implementação ou resultados. Aparece apenas como atividade na trajetória; não possui card, ilustração de solução, estudo de caso ou página própria.
- As métricas e limitações de TinyFlow são contextualizadas por configuração.
- Enem Runner é um trabalho coletivo. A imagem foi extraída do artigo fornecido por Gabriel (figura 2, página 4).
- Diagramas SVG são ilustrações conceituais; não são fotos de dispositivos ou capturas de experimentos reais.
- `personalContext/` é material interno e está no `.gitignore`. A construção copia somente `public/` e os recursos explicitamente definidos.
- O contexto e as pendências editoriais estão em `CONTEXTO_PROJETO.md`; as orientações para agentes estão em `AGENTS.md`.

O repositório Git local foi inicializado na branch `main`, usando a identidade Git já configurada. O primeiro commit preserva a primeira versão; as revisões seguintes registram a evolução. Nenhum remoto foi configurado nem houve envio ao GitHub. Documentos pessoais e `dist/` ficam fora do histórico.

Inglês, currículo público revisado, demais projetos, domínio e publicação ficam para próximas etapas.

Quando houver domínio, `SITE_URL=https://seu-dominio.example npm run build` gera URLs canônicas e sitemap. Configure a hospedagem para publicar apenas `dist/`, servir os diretórios como páginas e usar `404.html` com status HTTP 404. O endereço acima é ilustrativo.
