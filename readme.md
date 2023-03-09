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