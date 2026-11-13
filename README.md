# Gabriel Violante — portfólio

Portfólio em Astro, com inglês em `/` e português em `/pt/`. Seções: **Home → About → Projects → Papers → Skills → Contact**. Saída estática, CSS próprio e GSAP/ScrollTrigger para movimento.

## Desenvolvimento

Node.js **22.23.4 ou superior**. Versões das dependências fixadas no lockfile.

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
src/data/                 Conteúdo e traduções, independentes da apresentação
src/pages/                Rotas Astro, robots.txt e sitemap.xml
src/layouts/              HTML e metadados compartilhados
src/components/           Cards, cabeçalho, links e seções
src/styles.css            Paleta, temas e responsividade
src/icons.js              SVGs locais
src/client.js             Menu, âncoras, idioma e cópia de e-mail
src/motion.js             GSAP/ScrollTrigger: entradas e efeitos de rolagem
src/theme.js              Preferência de tema, executada antes do CSS
public/                   Somente favicon e imagens selecionadas
archive/                  PDFs legados; nunca publicados
scripts/                  Ferramentas de desenvolvimento
astro.config.mjs          Build estático e domínio opcional
```

O Astro substitui o gerador manual de HTML. Não há React, backend ou roteamento SPA. Conteúdo e links são entregues no HTML e funcionam sem JavaScript. A preferência de tema permanece em `src/theme.js`, incluída inline no cabeçalho para evitar troca visível de paleta no carregamento.

A identidade usa roxo e azul-escuro, com uma versão clara em lavanda. O retrato permanece estático. Entradas de seções e cards, progresso de leitura, trajetória e fundos decorativos acompanham a rolagem nativa. GSAP ajusta os efeitos à tela e a `prefers-reduced-motion`, inclusive quando a preferência muda com uma animação em andamento. Foco por teclado termina a entrada do elemento focado.

## Rotas e destinos

| Inglês | Português | Conteúdo |
| --- | --- | --- |
| `/` | `/pt/` | Página principal |
| `/projects/` | `/projetos/` | Catálogo |
| `/404.html` | `/pt/404/` | Página de erro |

Projetos, publicações, DOI e perfis abrem em nova guia. Currículos e histórico abrem os originais autorizados no Google Drive, conforme `src/data/document-links.js`. Gabriel administra as permissões dos arquivos. Não há downloads diretos nem páginas locais de artigos.

**Astro copia todo o conteúdo de `public/`.** Não colocar PDFs, documentos pessoais ou credenciais nessa pasta. Os PDFs revisados anteriores ficam em `archive/`; o gerador opcional também escreve nessa pasta. `personalContext/`, `archive/` e os dados documentais legados não entram no build.

## Verificação

`npm run check` verifica links/âncoras, idiomas, arquivos públicos, prioridades dos projetos, limites factuais e temas. O tema Sistema acompanha o dispositivo; escolhas explícitas persistem. O conteúdo respeita teclado e movimento reduzido.

`npm run test:browser` usa `playwright-core` somente no desenvolvimento e um Chromium já instalado, sem baixar navegador. Se necessário, indique o executável:

```bash
CHROMIUM_PATH=/caminho/do/chromium npm run test:browser
```

O teste inicia uma prévia local temporária e percorre seis páginas em 320, 390, 768 e 1440 px, nos dois temas. Verifica menu, idioma, imagens, links, persistência, recursos removidos, retrato estático, entradas de cards, interrupção por movimento reduzido, teclado, retorno do histórico, redimensionamento e navegação sem JavaScript. O servidor e o harness temporários são removidos ao terminar. Capturas ficam em `/tmp/portfolio-astro-qa`, ou no diretório definido por `QA_OUTPUT_DIR`.

## Publicação e continuidade

`SITE_URL=https://seu-dominio.example npm run build` gera canonical, hreflang e sitemap com o domínio. Sem domínio configurado, o sitemap fica vazio, sem URLs fictícias. Configure a hospedagem para retornar 404 real usando as páginas de erro.

`CONTEXTO_PROJETO.md` registra fontes e decisões. VALE permanece somente na trajetória, sem resultados. Projetos coletivos e limites dos experimentos continuam explícitos. Não há push ou deploy automático.
