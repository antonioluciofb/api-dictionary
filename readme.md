# Deploy

Projeto disponivel em - [Api-Dictionary](https://api-dictionary.onrender.com/api-docs)
# Api Dictionary

Este é um projeto de API RESTful que utiliza o Node.js com o framework Express para fornecer uma plataforma de dicionário online. Os dados do dicionário são armazenados em um banco de dados MongoDB, o que permite uma escalabilidade fácil e o manuseio eficiente dos dados.

A API utiliza o Redis como um banco de dados em memória para aumentar a velocidade de resposta e melhorar a performance. O Redis é usado para armazenar informações relacionadas às palavras favoritas dos usuários, permitindo que a API recupere essas informações rapidamente quando necessário.

A API oferece diversas funcionalidades, incluindo a capacidade de pesquisar uma lista completa de palavras ou procurar por uma palavra específica, apresentando uma definição clara e concisa, além de sinônimos e exemplos de uso. Os usuários também podem marcar palavras como favoritas, tornando mais fácil para eles acessá-las posteriormente. Além disso, a API mantém um registro do histórico de pesquisas dos usuários.

O projeto é implementado utilizando Node.js e as bibliotecas Express, MongoDB, Docker e Redis. Com essa combinação de tecnologias, a API oferece uma performance excepcional e é fácil de usar e integrar em aplicativos móveis ou da web que dependam de uma plataforma de dicionário eficiente.

# Front End

[Front End](https://github.com/antonioluciofb/dictionary) - Front End do projeto

# Instalação

### É necessário usar Docker

Instale api-dictionary:

- Entre na pasta do projeto

- Crie um arquivo .env com as seguintes variáveis:

```bash
  MONGO_URL=mongodb://mongo:27017/dictionary
```

```bash
  REDIS_URL=redis://redis:6379
```

```bash
  SECRET=secret
```

- Execute os seguintes comandos:

```bash
  docker-compose build
```

```bash
  docker-compose up
```

## Features

- [x] Listar todas as palavras
- [x] Ver detalhes de uma palavra
- [x] Pesquisar palavras
- [x] Pesquisar palavra específica
- [x] Marcar palavras como favoritas
- [x] Listar palavras favoritas
- [x] Listar histórico de pesquisas

## Stack utilizada

[NodeJS](https://nodejs.org/en/) - Node.js é um interpretador de JavaScript assíncrono com código aberto orientado a eventos.

[Docker](https://www.docker.com/) - Docker é uma plataforma de código aberto que facilita a criação, implantação e execução de aplicativos em contêineres.

[Redis](https://redis.io/) - Redis é um banco de dados de chave-valor de código aberto, de alto desempenho e de baixa latência.

[MongoDB](https://www.mongodb.com/) - MongoDB é um banco de dados de código aberto orientado a documentos livre, de alta performance e fácil escalabilidade.

# English Version

# Api Dictionary

This is a RESTful API project that uses Node.js with the Express framework to provide an online dictionary platform. The dictionary data is stored in a MongoDB database, which allows for easy scalability and efficient data handling.

The API uses Redis as an in-memory database to increase response speed and improve performance. Redis is used to store information related to users' favorite words, allowing the API to retrieve this information quickly when needed.

The API offers several features, including the ability to search a full list of words or search for a specific word, presenting a clear and concise definition, as well as synonyms and examples of use. Users can also mark words as favorites, making it easier for them to access them later. In addition, the API keeps a record of the users' search history.

The project is implemented using Node.js and the Express, MongoDB, Docker and Redis libraries. With this combination of technologies, the API offers exceptional performance and is easy to use and integrate into mobile or web applications that depend on an efficient dictionary platform.

# Front End

[Front End](https://github.com/antonioluciofb/dictionary) - Front End of the project

# Installation

### It is necessary to use Docker

Install api-dictionary:

- Enter the project folder

- Create .env file with the following variables:

```bash
  MONGO_URL=mongodb://mongo:27017/dictionary
```

```bash
  REDIS_URL=redis://redis:6379
```

```bash
  SECRET=secret
```

- Run the following commands:

```bash
  docker-compose build
```

```bash
  docker-compose up
```

## Features

- [x] List all words
- [x] View details of a word
- [x] Search words
- [x] Search specific word
- [x] Mark words as favorites
- [x] List favorite words
- [x] List search history

## Stack used

[NodeJS](https://nodejs.org/en/) - Node.js is an open-source, cross-platform, JavaScript runtime environment that executes JavaScript code outside of a browser.

[Docker](https://www.docker.com/) - Docker is an open platform for developing, shipping, and running applications.

[Redis](https://redis.io/) - Redis is an open source (BSD licensed), in-memory data structure store, used as a database, cache and message broker.

[MongoDB](https://www.mongodb.com/) - MongoDB is a free and open-source cross-platform document-oriented database program. Classified as a NoSQL database program, MongoDB uses JSON-like documents with optional schemas.