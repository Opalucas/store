
# Frontend Bookstore

Este é um projeto de frontend em React utilizando Vite. Ele consome uma API criada em Django para fornecer uma interface de usuário. Siga as instruções abaixo para clonar, instalar e executar o projeto em sua máquina local.

## Instalação e execução

### 1. Clonar o repositório

Crie uma pasta em sua máquina onde deseja clonar o projeto. Depois, execute o comando abaixo para clonar o repositório:

```bash
git clone https://github.com/Opalucas/store.git .
```

### 2. Instalar as dependências

Navegue até a pasta onde o projeto foi clonado e instale as dependências utilizando o comando abaixo:


```bash
npm install
```

### 3. Verificar a configuração da API

Navegue até a pasta src/services e abra o arquivo API.jsx. Verifique se a baseURL dentro desse arquivo está apontando corretamente para a URL da aplicação Django que você configurou. A linha deve ser algo semelhante a:

```bash
const urlBase = 'http://localhost:8000';
```

Ou

```bash
const urlBase = 'http://127.0.0.1:8000';
```
Se a URL da API for diferente, ajuste-a conforme necessário para garantir a comunicação entre o frontend e o backend.

### 4. Executar o servidor de desenvolvimento
Após configurar a URL da API, você pode iniciar o servidor de desenvolvimento com o seguinte comando:

```bash
npm run dev
```

A aplicação estará disponível em http://localhost:5173/ por padrão.

Certifique-se de que o backend (API Django) também esteja rodando para que o frontend consiga consumir os dados corretamente.
