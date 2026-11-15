# Preparação para o GitHub

## Origem pública limpa

O repositório de trabalho local contém documentos pessoais antigos no histórico. **Não faça push desse histórico.** Excluir arquivos do último commit ou adicionar regras ao `.gitignore` não remove versões anteriores.

`.gitattributes` exclui documentos, contexto interno e ferramentas legadas de `git archive`. Essa regra vale para a exportação, **não para `git push`**. A exportação deve ser o ponto de partida de um repositório novo, sem copiar a pasta `.git` original.

Depois de salvar e commitar as alterações locais:

```bash
git archive --format=zip --output=/tmp/portfolio-github.zip HEAD
```

Extraia o ZIP em uma pasta nova. Confira os arquivos, execute `npm ci` e `npm run check` nessa pasta e inicialize um histórico independente:

```bash
git init -b main
git add .
git commit -m "Initial public portfolio"
```

Somente essa pasta limpa deve receber o remoto do GitHub. A criação do repositório remoto, sua visibilidade e o primeiro push ficam para a etapa de publicação.

## Verificação automática

O workflow `.github/workflows/check.yml` instala as dependências pelo lockfile e executa o build e os testes em pushes para `main` e pull requests. Usa Node 24, definido também em `.nvmrc`, e permissões de leitura. Não realiza deploy.

Referências das ações: [checkout](https://github.com/actions/checkout) e [setup-node](https://github.com/actions/setup-node). A verificação visual continua disponível localmente com `npm run test:browser` e Chromium instalado.

## Hospedagem

O projeto gera arquivos estáticos em `dist/`. Defina `SITE_URL` com o domínio final antes do build para gerar canonical, hreflang e sitemap.

As rotas e os assets usam caminhos a partir da raiz do domínio. Para GitHub Pages, isso atende um site de usuário (`usuario.github.io`) ou domínio próprio. Publicação sob `/nome-do-repositorio/` exige adaptar e testar os caminhos antes de ativar o deploy.

A licença do código e as permissões de reutilização das imagens ainda não foram definidas pelo proprietário. Não presumir uma licença aberta para retratos, logos ou outros materiais.
