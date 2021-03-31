<p align="center">
    <img src="./public/logo-title.svg" height="80">
<p>
<p align="center">Converse em tempo real com outras pessoas</p>
<br>

![Badge](https://img.shields.io/badge/Node-14.16.0-green)
![Badge](https://img.shields.io/badge/NPM-6.14.11-brightgreen)

![Badge](https://img.shields.io/badge/Socket.io-4.0.0-blue)
![Badge](https://img.shields.io/badge/ExpressJS-4.17.1-informational)
![Badge](https://img.shields.io/badge/EJS-3.1.6-yellow)

<br><br>
<p align="center">
    <img src="./.github/slide-1-socket-chat.jpg">
    <img src="./.github/slide-2-socket-chat.jpg">
<p>

## Sobre

Em busca de um melhor proveito de meus estudos, decidi criar um aplicativo web que se atualizasse a cada interação com o backend, ou seja, que fosse em tempo real. Portanto, me deparei com Socket.io, uma biblioteca que me permitiu criar um bate papo (chat) em tempo real e com NodeJS ao lado do servidor.

## Funcionalidades

- Escolher o seu nome;
    - Antes do nome ser autorizado, é feito uma validação para verificar se ele já está sendo usado.
- Enviar mensagens;
- Enviar emoticons/emojis;
- Obter a contagem de usuários;
- Ler o log de cada entrada/saída de usuário.

## Instalação

### Pré-requesitos

Para o projeto ser executado, é necessário possuir NodeJS instalado em sua máquina, sendo de preferência, a versão mais recente.

### Início

Clonagem do repositório:

```
git clone https://github.com/willaug/socket-chat.git
```

Instalação de depêndencias:

```
npm install
```
ou
```
npm i
```

### Configuração de porta e URL

Por padrão, o endereço do servidor é **http://127.0.0.1** com a porta **8080**, portanto: **http://127.0.0.1:8080**.
Caso queira altera-las, acesse o arquivo **index.js** e modifique as constantes **port** e **url**. Como no exemplo abaixo:

```
const port = process.env.PORT || 8080
const url = `http://127.0.0.1:${port}/`
```

Apenas isso é necessário para a comunicação entre Socket.io e NodeJS.

### Construído em

- [NodeJS](https://nodejs.org/en/)
- [ExpressJS](https://expressjs.com/pt-br/)
- [EJS](https://ejs.co/)
- [Socket.io](https://socket.io/)

## Autor

Feito por William Augusto
📧 william.santos315@outlook.com

## Despedida

Obrigado por visitar meu projeto, você é livre para dar um feedback ou usa-lo como referência para os seus projetos. Obrigado, até mais! 😊
