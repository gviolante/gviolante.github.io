# Gabriel Violante — portfólio

Portfólio em Astro, com inglês em `/` e português em `/pt/`. Seções: **Home → About → Projects → Skills → Contact**. Saída estática, CSS próprio e GSAP/ScrollTrigger para movimento.

## Desenvolvimento

Node.js **24** recomendado (`.nvmrc`); mínimo exigido: **22.23.4**. Versões das dependências fixadas no lockfile.

```bash
npm ci
npm run dev      # Astro: http://localhost:4321, atualização automática
npm run check    # Build de produção + testes Node
npm run test:browser # Chromium: layout, interação, movimento e capturas
npm run build    # Gera dist/
npm run preview  # Serve o dist/ já construído, sem reconstruir
```

Outra porta no desenvolvimento: `npm run dev -- --port 4322`. Para a prévia: `PORT=4322 npm run preview`. **Publique somente `dist/`.**

## Organização

```text
src/
├── pages/                 Rotas Astro em inglês/português, 404, robots e sitemap
├── layouts/               Documento HTML e metadados compartilhados
├── components/
│   ├── pages/             Composição de Home, catálogo e erro; não cria rotas
│   ├── sections/          Home, About, Projects, Skills e Contact
│   ├── navigation/        Header, bandeiras de idioma e atalhos
│   ├── cards/             Cards de projetos/artigos e suas imagens
│   └── ui/                Links, ícones, títulos de seção e redes sociais
├── data/                  Conteúdo, traduções, projetos e links autorizados
├── scripts/               JavaScript do navegador: interação e animações
├── styles/global.css      Paleta, temas e responsividade
└── theme.js               Tema aplicado antes do CSS
public/
├── favicon.svg
└── assets/images/
    ├── profile/           Retrato selecionado
    ├── conferences/       Logos das conferências
    ├── education/         Logos UFMG, DCC/UFMG e COLTEC/UFMG
    └── projects/          Imagens agrupadas por projeto
scripts/
├── serve.mjs              Prévia local do build
└── browser-check.mjs      Executa verificações no Chromium
tests/
├── unit/                  Lógica isolada, como preferência de tema
├── integration/           Páginas construídas, links e recursos publicados
└── browser/               Harness HTML para verificação da interface
docs/github.md           Preparação do repositório e orientações de publicação
.github/workflows/        Verificação automática e publicação manual no Pages
.nvmrc                    Versão de Node usada no desenvolvimento e CI
```

Os arquivos de configuração permanecem na raiz. `node_modules/`, `.astro/` e `dist/` são pastas geradas, ignoradas pelo Git. O checkout de trabalho pode conter contexto e materiais legados locais; eles não fazem parte da exportação pública.

| Para alterar | Local |
| --- | --- |
| Textos e traduções | `src/data/content.js` |
| Projetos, artigos e imagens dos cards | `src/data/projects.js` e `public/assets/images/projects/` ou `conferences/` |
| Currículos no Drive | `src/data/document-links.js` |
| Header e seleção de idioma | `src/components/navigation/` |
| Aparência e animações | `src/styles/global.css` e `src/scripts/` |

Imagens usam nomes em minúsculas, separados por hífen. Cada projeto tem sua própria pasta: `eanter-os`, `stronger-notes`, `enem-runner`, `competitive-programming` e `rpg-interactive-sheet`. Os banners de Eanter-OS e StrongerNotes combinam logos e capturas reais; o RPG usa a nova ficha como fundo do D20.

A barra `QuickLinks.astro` oferece e-mail, LinkedIn, GitHub e currículo no idioma atual. Fica na lateral em telas largas e na parte inferior em telas menores, com área reservada ao final da página e nomes visíveis no hover/foco.

O tema permanece em `src/theme.js` por ser a entrada executada antes do CSS; os demais comportamentos do navegador ficam em `src/scripts/`. Ferramentas executadas pelo desenvolvedor ficam em `scripts/`, na raiz.

O Astro substitui o gerador manual de HTML. Não há React, backend ou roteamento SPA. Conteúdo e links são entregues no HTML e funcionam sem JavaScript. A preferência de tema permanece em `src/theme.js`, incluída inline no cabeçalho para evitar troca visível de paleta no carregamento.

A identidade usa roxo e azul-escuro, com uma versão clara em lavanda. O retrato permanece estático. Entradas de seções e cards, progresso de leitura e fundos decorativos acompanham a rolagem nativa. GSAP ajusta os efeitos à tela e a `prefers-reduced-motion`, inclusive quando a preferência muda com uma animação em andamento. Foco por teclado termina a entrada do elemento focado. Os títulos de seção usam roxo e um traço decorativo, sem números. Sublinhados destacam a apresentação, médias acadêmicas e autoria de Gabriel. Desenham-se uma vez durante a entrada e ficam completos sem JavaScript ou com movimento reduzido.

## Rotas e destinos

| Inglês | Português | Conteúdo |
| --- | --- | --- |
| `/` | `/pt/` | Página principal |
| `/projects/` | `/projetos/` | Catálogo |
| `/404.html` | `/pt/404/` | Página de erro |

Projects apresenta primeiro os três trabalhos publicados (IEEE ISCC, SBRC e SBGames), depois os cinco repositórios, tanto na home quanto no catálogo. `ProjectCollection.astro` mantém essa composição compartilhada. A antiga âncora `#papers` continua levando às publicações dentro de Projects; não há seção nem item de menu Papers.

Projetos, publicações, DOI e perfis abrem em nova guia. Currículos abrem os originais autorizados no Google Drive, conforme `src/data/document-links.js`. O histórico escolar completo não é mais oferecido na interface. Gabriel administra as permissões dos arquivos. Não há downloads diretos nem páginas locais de artigos.

**Astro copia todo o conteúdo de `public/`.** Use essa pasta somente para imagens e recursos autorizados. Documentos pessoais, credenciais e arquivos de desenvolvimento não devem entrar no site nem na exportação para o GitHub.

## Verificação

`npm run check` verifica links/âncoras, idiomas, arquivos públicos, prioridades dos projetos, limites factuais e temas. O tema Sistema acompanha o dispositivo; escolhas explícitas persistem. O conteúdo respeita teclado e movimento reduzido.

`npm run test:browser` usa `playwright-core` somente no desenvolvimento e um Chromium já instalado, sem baixar navegador. Se necessário, indique o executável:

```bash
CHROMIUM_PATH=/caminho/do/chromium npm run test:browser
```

O teste inicia uma prévia local temporária e percorre seis páginas em 320, 390, 768 e 1440 px, nos dois temas. Verifica menu, idioma, imagens, links, persistência, recursos removidos, retrato estático, entradas de cards, interrupção por movimento reduzido, teclado, retorno do histórico, redimensionamento e navegação sem JavaScript. O servidor e o harness temporários são removidos ao terminar. Capturas ficam em `/tmp/portfolio-astro-qa`, ou no diretório definido por `QA_OUTPUT_DIR`.

## Publicação e continuidade

`SITE_URL=https://seu-dominio.example npm run build` gera canonical, hreflang e sitemap com o domínio. Sem domínio configurado, o sitemap fica vazio, sem URLs fictícias. Configure a hospedagem para retornar 404 real usando as páginas de erro.

O fluxo do GitHub está documentado em [docs/github.md](docs/github.md). O histórico público preserva os commits de desenvolvimento, com documentos privados removidos de todas as revisões. O histórico original do checkout de trabalho não deve ser enviado sem essa filtragem. `.gitattributes` também permite exportar um ZIP dos arquivos públicos, mas esse ZIP não substitui os commits.

O workflow do GitHub executa `npm ci` e `npm run check` em Node 24. Não há push ou deploy automático. `pages.yml` prepara a publicação manual em `https://gviolante.github.io`; os passos para renomear o repositório e ativar o Pages estão em `docs/github.md`. A configuração atual espera hospedagem na raiz do domínio; publicação em um subdiretório precisa de ajuste prévio.
