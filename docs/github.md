# Preparação para o GitHub

## Histórico público

O repositório público preserva os commits de desenvolvimento, suas mensagens, autoria, datas e ordem. Documentos pessoais, contexto interno e materiais legados foram removidos de todas as revisões antes do envio. Commits que passaram a ter diff vazio foram mantidos para registrar as etapas do trabalho.

A filtragem muda os identificadores dos commits. O histórico original permanece no checkout de trabalho local; **não envie esse histórico sem filtrá-lo**. `.gitignore` e `.gitattributes` não removem arquivos de commits antigos.

## Continuidade

- Faça as mudanças funcionais em commits separados, preservando o registro do progresso.
- Se trabalhar no checkout público, use o fluxo normal de commit e push. Não adicione materiais pessoais.
- Se partir do checkout local que contém documentos privados, filtre uma cópia nova com `git-filter-repo`, preservando commits vazios com `--prune-empty never --prune-degenerate never`.
- Remova todas as versões e caminhos antigos de `archive/`, `personalContext/`, `AGENTS.md`, `CONTEXTO_PROJETO.md`, `ideas.md`, `docs/ideas.md`, `src/data/documents.json`, `scripts/generate-documents.py`, `scripts/legacy/`, `public/assets/documents/` e `public/assets/papers/`, além de PDFs e arquivos de ambiente privados.
- Confira a correspondência de commits e a ausência dos arquivos privados em todo o histórico. Compare a árvore final com a versão pública esperada e execute `npm run check`.
- Atualizações posteriores devem avançar a branch pública normalmente. Se houver divergência, investigue antes de substituir qualquer histórico remoto.

`git archive`, com as exclusões de `.gitattributes`, continua útil para gerar um ZIP dos arquivos públicos. **O ZIP não preserva commits e não deve substituir o histórico do repositório.**

## Verificação automática

O workflow `.github/workflows/check.yml` instala as dependências pelo lockfile e executa o build e os testes em pushes para `main` e pull requests. Usa Node 24, definido também em `.nvmrc`, e permissões de leitura. Não realiza deploy.

Referências das ações: [checkout](https://github.com/actions/checkout) e [setup-node](https://github.com/actions/setup-node). A verificação visual continua disponível localmente com `npm run test:browser` e Chromium instalado.

## Hospedagem

O projeto gera arquivos estáticos em `dist/`. Defina `SITE_URL` com o domínio final antes do build para gerar canonical, hreflang e sitemap.

As rotas e os assets usam caminhos a partir da raiz do domínio. Para GitHub Pages, isso atende um site de usuário (`usuario.github.io`) ou domínio próprio. Publicação sob `/nome-do-repositorio/` exige adaptar e testar os caminhos antes de ativar o deploy.

A licença do código e as permissões de reutilização das imagens ainda não foram definidas pelo proprietário. Não presumir uma licença aberta para retratos, logos ou outros materiais.
