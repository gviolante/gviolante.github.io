# Gabriel Violante — portfólio

Portfólio bilíngue de software e aprendizado de máquina. Seções: **Home → About → Projects → Papers → Skills → Contact**. Inglês em `/`, português em `/pt/`.

## Executar

Requer Node.js 22.8 ou superior. Sem dependências externas para construir, executar ou testar o site.

```bash
npm run dev      # http://localhost:4321; reconstrói ao editar src/ ou public/
npm run check    # Build + testes Node
npm run build    # Gera dist/
npm run preview  # Build + servidor
```

Recarregue após editar. Outra porta: `PORT=4322 npm run dev`. **Sirva somente `dist/`, nunca a raiz do projeto.**

## Organização

```text
src/data/content.js         Textos e traduções
src/data/projects.js        Perfil, projetos e publicações
src/data/document-links.js  Links de visualização no Google Drive
src/templates.js            Componentes e páginas HTML
src/icons.js                Ícones SVG locais
src/styles.css              Paleta, temas e responsividade
src/client.js               Menu, seção ativa, idioma e cópia de e-mail
src/theme.js                Sistema/Claro/Escuro e persistência
public/assets/images/       Imagens e ilustrações selecionadas
scripts/build.mjs           Geração estática
scripts/serve.mjs           Servidor restrito à saída pública
```

Conteúdo em `src/data/`, apresentação em `src/`, ferramentas em `scripts/`. A construção copia somente o favicon e as imagens de `public/`, além do CSS/JS da aplicação. Não lê `personalContext/` nem publica PDFs.

## Destinos e documentos

- Projetos abrem os repositórios públicos em nova guia, na ordem: Eanter-OS, StrongerNotes, EnemRunner, Competitive-Programming, RPG-Sheet-Supros.
- Artigos abrem a publicação oficial (IEEE Xplore ou SBC Open Library), com link adicional para o DOI. Não há páginas locais de detalhamento nem links de download.
- Currículo em cada idioma e histórico escolar abrem os arquivos originais autorizados pelo proprietário no visualizador do Google Drive. As permissões dos arquivos são administradas por Gabriel no Drive.
- Links externos usam `target="_blank"`, `rel="noopener noreferrer"` e descrição acessível sobre a abertura de uma nova guia. E-mail usa `mailto:`; navegação e idioma permanecem na guia atual.
- `src/data/documents.json`, `scripts/generate-documents.py` e os PDFs revisados em `public/assets/documents/` e `public/assets/papers/` são legados preservados localmente, excluídos do build. Não são mais a fonte dos documentos oferecidos pelo site.

## Rotas

| Inglês | Português | Conteúdo |
| --- | --- | --- |
| `/` | `/pt/` | Página principal |
| `/projects/` | `/projetos/` | Catálogo de projetos |
| `/404.html` | `/pt/404.html` | Página de erro |

As antigas rotas de estudos TinyFlow e Enem Runner foram retiradas. O controle PT/EN abre o destino equivalente e preserva a seção com JavaScript. Conteúdo e links continuam disponíveis sem JavaScript.

## Temas e acessibilidade

Sistema acompanha o dispositivo, inclusive mudanças em tempo real. Claro/Escuro persistem em localStorage e são aplicados antes do CSS. Com armazenamento bloqueado, o seletor continua funcionando na página atual.

Menu móvel por teclado, Escape com retorno de foco, link para pular ao conteúdo, foco visível, textos alternativos, ícones decorativos ocultos de leitores de tela e respeito a movimento reduzido. Logos mantêm suas cores e fundo branco para leitura nos dois temas.

## Verificação

`npm run check` executa 12 testes: saída pública, links/âncoras, limites factuais, prioridade de projetos, idiomas, metadados, destinos externos, remoção de downloads/páginas de artigos e comportamento de temas.

Para testar a interface com o servidor ativo:

```bash
cp tests/browser.html dist/__browser-check.html
```

Abra `http://localhost:4321/__browser-check.html` e aguarde `passed`. O teste cobre seis páginas em 320, 390, 768 e 1440 px nos dois temas, menu, idioma, carregamento de imagens, links para visualizadores, persistência e recursos inacessíveis. `npm run build` remove o arquivo temporário. Não edite durante o teste com o modo watch ativo.

## Conteúdo e publicação

- Redação direta e factual, sem slogans. Paleta papel/verde e pixel-art preservadas.
- VALE aparece somente como pesquisa recém-iniciada, sem implementação ou resultados.
- Trabalhos coletivos e protótipos são identificados; Competitive-Programming inclui tentativas incompletas.
- TinyFlow usa embeddings pré-computados na validação embarcada. Enem Runner relata testes com pessoas vendadas, não validação com o público final.
- As ilustrações de Eanter-OS, StrongerNotes e Competitive-Programming são conceituais, não capturas de produto.
- `CONTEXTO_PROJETO.md` registra fontes e decisões. Não publicar documentos pessoais nem credenciais.

Hospedagem e domínio serão definidos posteriormente. `SITE_URL=https://seu-dominio.example npm run build` gera URLs canônicas, hreflang e sitemap. Publique apenas `dist/`, configurando a página 404 com o status HTTP apropriado.
