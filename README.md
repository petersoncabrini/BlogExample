# Blog em Angular e ASP.NET Core Web API

Este é um projeto de blog desenvolvido em Angular, ASP.NET Core Web API utilizando EF Core como ORM (Object-Relational Mapping) e SQL Server como banco de dados. O projeto possui recursos completos de CRUD (Create, Read, Update e Delete) para postagens e comentários, além de funcionalidades de autenticação e autorização para acesso aos endpoints da API.

## Tecnologias utilizadas

* Angular
* ASP.NET Core Web API
* EF Core (Entity Framework Core)
* SQL Server

## Funcionalidades

* CRUD (Create, Read, Update e Delete) de postagens e comentários.
* Autenticação e autorização para acesso aos endpoints da API.
* Interface de usuário responsiva para desktop e mobile.

## Imagens

### Swagger - Endpoints da API
<img width="1100" alt="Captura de Tela 2023-04-22 às 10 22 05" src="https://user-images.githubusercontent.com/82073973/233789283-80dc8b78-a5b3-43df-8616-1e4536ce29fd.png">


### Home do Blog - Desktop
<img width="1677" alt="Captura de Tela 2023-04-22 às 10 40 05" src="https://user-images.githubusercontent.com/82073973/233789304-791652d8-3e55-4fdb-a387-a2f79efd131e.png">

### Home do Blog - Mobile
<img width="368" alt="Captura de Tela 2023-04-22 às 10 41 07" src="https://user-images.githubusercontent.com/82073973/233789331-49beeb3c-4b3e-4962-b916-f1a9d1b57b18.png">


## Como executar o projeto

1) Clone o repositório para sua máquina local.
2) Abra o projeto no Visual Studio ou VSCode
3) Configure a Connection String para o banco de dados SQL Server. Você pode ajustar a Connection String no arquivo appsettings.json do projeto ASP.NET Core Web API, conforme seu ambiente local.
4) Execute as migrations do banco de dados para criar a estrutura necessária.
5) Compile o projeto ASP.NET Core Web API.
6) Navegue para a pasta do projeto Angular e execute ng serve no terminal para iniciar o servidor de desenvolvimento do Angular.
7) Abra o navegador e acesse http://localhost:4200 para acessar a interface do blog.
