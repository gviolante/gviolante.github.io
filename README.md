# Gabriel Violante — portfólio

Portfólio bilíngue centrado em IA e problemas reais. A página segue **Home → About → Projects → Papers → Skills → Contact**, com pixel-art, currículo, artigos, histórico acadêmico e temas claro/escuro.

## Executar

Requer Node.js 22.8 ou superior. Não há dependências externas para o site.

```bash
npm run dev      # http://localhost:4321; reconstrói ao editar src/ ou public/
npm run check    # Build + testes Node
npm run build    # Gera dist/
npm run preview  # Build + servidor, sem observar alterações
```

Recarregue a página após editar. Outra porta: `PORT=4322 npm run dev`.

**Sirva somente `dist/`, nunca a raiz do projeto.** Os documentos pessoais não fazem parte da saída pública.

## Organização

```text
src/data/content.js       Narrativa, interface e traduções
src/data/projects.js      Perfil, projetos, publicações e estudos de caso
src/data/documents.json   Dados selecionados para os PDFs públicos
src/templates.js          Componentes e páginas HTML
src/styles.css            Estilos, temas e responsividade
src/client.js             Menu, seção ativa, idioma e cópia de e-mail
src/theme.js              Sistema/Claro/Escuro e persistência
public/assets/images/     Imagens e ilustrações selecionadas
public/assets/papers/     Artigos selecionados (cópias locais)
public/assets/documents/  Currículo e resumo acadêmico públicos, EN/PT
scripts/build.mjs         Geração estática
scripts/serve.mjs         Servidor restrito à saída pública
scripts/generate-documents.py  Geração editorial opcional dos PDFs
```

Conteúdo e traduções ficam em `src/data/`; apresentação em `src/`; ferramentas em `scripts/`. A construção não lê `personalContext/`. Os artigos abrem PDFs oficiais externos da SBC. As fontes e os cuidados de redação estão em `CONTEXTO_PROJETO.md`.

## Rotas e idioma

| Inglês | Português | Conteúdo |
| --- | --- | --- |
| `/` | `/pt/` | Página principal |
| `/projects/` | `/projetos/` | Catálogo |
| `/projects/tinyflow-edgenids/` | `/projetos/tinyflow-edgenids/` | Estudo de pesquisa |
| `/projects/enem-runner/` | `/projetos/enem-runner/` | Estudo do jogo |
| `/404.html` | `/pt/404.html` | Página de erro |

Inglês é o padrão. O controle PT/EN abre a página equivalente e preserva a seção atual quando JavaScript está disponível. Texto, links, downloads e troca de idioma funcionam sem JavaScript. A URL determina o idioma, sem redirecionamento automático.

## Temas e acessibilidade

**System / Light / Dark** (ou **Sistema / Claro / Escuro**). Escolhas explícitas persistem em localStorage e são aplicadas antes do CSS. Sistema acompanha o dispositivo, inclusive mudanças em tempo real. Se o armazenamento estiver bloqueado, o seletor continua funcionando na página atual.

Menu móvel operável por teclado, Escape com retorno de foco, link para pular ao conteúdo, foco visível, textos alternativos e respeito a movimento reduzido. Imagens conservam as cores originais nos dois temas.

## Documentos públicos

Os PDFs em `public/assets/documents/` são versões revisadas, em inglês e português:

- Currículo de uma página, com formação, experiências, pesquisa e habilidades.
- Resumo acadêmico de duas páginas, baseado no histórico emitido em 31/08/2026, com notas até 2026/1. **Não é o histórico oficial.** Mantém disciplinas, notas, NSG e equivalências; omite identificadores pessoais.

Para atualizá-los, edite `src/data/documents.json`, gere novamente e revise visualmente cada página. Essa etapa editorial usa Python e ReportLab; não é requisito do build web:

```bash
python3 -m venv /tmp/portfolio-docs-env
/tmp/portfolio-docs-env/bin/pip install reportlab
/tmp/portfolio-docs-env/bin/python scripts/generate-documents.py
npm run check
```

Nunca copie automaticamente currículo bruto, histórico original, carta pessoal ou credenciais para `public/`.

## Verificação

`npm run check` executa dez testes: links, âncoras, saída pública, limites factuais, ordem das seções, alternância de idiomas, metadados e preferências de tema.

Com o servidor ativo, a revisão de interface pode ser reproduzida:

```bash
cp tests/browser.html dist/__browser-check.html
```

Abra `http://localhost:4321/__browser-check.html`. O teste cobre dez páginas em 320, 390, 768 e 1440 px, nos dois temas, além de menu, idioma, PDFs, persistência e recursos privados. Aguarde `passed`. Após testar, `npm run build` remove o arquivo temporário. Evite editar `src/` durante o teste se estiver usando `npm run dev`, pois o rebuild remove o harness.

A revisão atual passou nas **347 verificações do Chromium** e nos **dez testes Node**. Revisão visual feita em desktop e celular nos dois temas. PDFs renderizados para conferir paginação, legibilidade e conteúdo. Os testes não substituem uma auditoria completa de acessibilidade em vários navegadores.

## Conteúdo e continuidade

- VALE aparece apenas como pesquisa recém-iniciada, sem implementação ou resultados.
- Trabalhos em equipe são identificados como coletivos. Protótipos não são apresentados como produtos em produção.
- Resultados de TinyFlow são vinculados à configuração correta; embeddings embarcados são pré-computados.
- Enem Runner relata testes com pessoas vendadas, não validação concluída com pessoas cegas ou com baixa visão.
- Git local na branch `main`, sem remoto ou push. `personalContext/` e `dist/` estão ignorados.

Hospedagem e domínio serão definidos posteriormente. Quando houver domínio, `SITE_URL=https://seu-dominio.example npm run build` gera URLs canônicas, hreflang e sitemap. Publique apenas `dist/` e configure a página 404 com status HTTP apropriado.
