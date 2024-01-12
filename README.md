# Metricas Api
Esta é uma API que recebe um arquivo excel e retorna algumas métricas.

O swagger desta API está dísponivel em: <a>https://metricas-api.onrender.com/api-docs</a>

Ou caso rode locamente basta ir em `api-docs`. <br/>
Ex.: <a>http://localhost:3333/api-docs</a>

# Como rodar a API

- Clone a aplicação
  ```
  git clone https://github.com/jpsouza06/metricas-api.git
  ```

- Instale as dependências
  ```
  npm install
  ```

- Crie um arquivo `.env` na raiz do projeto, o conteudo desse arquivo deve 
seguir como exemplo o arquivo '.env.example'.

## Como executar a aplicação  em homologação:
- Inicie a aplicação:
  ```
  npm run start:dev
  ```

- Use a aplicação:
  ```
  http://localhost:3333
  ```

## Como executar a aplicação em produção:
- Crie o build da aplicação
  ```
  npm run build
  ```

- Inicie a aplicação
  ```
  npm run start
  ```
