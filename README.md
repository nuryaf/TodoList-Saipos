# TodoList - Desafio técnico
Aplicação desenvolvida com as tecnologias: 
- [Node JS](https://nodejs.org/en/)
- [Angular](https://angular.io/)
- [Docker Toolbox](https://docs.docker.com/toolbox/toolbox_install_windows/) para a criação e testes em banco de dados Postgres.

Comando utilizado no Docker para a criação do banco de dados:
```
docker run --name database -e POSTGRES_PASSWORD=docker -e POSTGRES_DB=todolist -p 5432:5432 -d postgres
```

## Execução do projeto
> A tabela **tasks** será criada automaticamente ao executar a API.
Para conectar a um banco de dados já existente, ajustar as configurações de conexão no arquivo API/src/db/[index.js](https://github.com/nuryaf/TodoList/blob/master/API/src/db/index.js).

- Dentro da pasta API, rodar os comandos:
```sh 
npm i 
npm run dev
``` 
A API será disponibilizada na porta 3333
- Dentro da pasta Frontend, rodar o comando:
``` 
ng serve 
```
A aplicação será disponibilizada na porta 4200

## Observação
Senha de administrador contém criptografia, logo, não é apresentada no console do navegador.
