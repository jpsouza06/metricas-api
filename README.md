# Metricas Api
Esta é uma API que recebe um arquivo excel e retorna algumas métricas.

O swagger desta API está dísponivel em: <a>https://metricas-api.onrender.com/api-docs</a>

Ou caso rode locamente basta ir em `api-docs`. <br/>
Ex.: <a>http://localhost:3333/api-docs</a>

# Como rodar a API

## Requisitos mínimos:
- Node 18.18.0;

## Como executar a aplicação  em homologação:
- Clone a aplicação
  ```
  git clone https://github.com/jpsouza06/metricas-api.git
  ```

- Instale as dependências
  ```
  npm install
  ```

- Crie um arquivo `.env` na raiz do projeto, o conteudo desse arquivo deve 
seguir como exemplo o arquivo '.env.example'. A unica variavel de ambieste é a `PORT`
que caso não seja passada terá o padrão de `3333`'

- Inicie a aplicação:
  ```
  npm run start:dev
  ```

- Use a aplicação:
  ```
  http://localhost:3333
  ```

## Como executar a aplicação em produção:
- Instale as dependências
  ```
  npm i
  ```

- Crie o build da aplicação
  ```
  npm run build
  ```

- Inicie a aplicação
  ```
  npm run start
  ```
