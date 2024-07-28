let newMessage = document.querySelector(".new-message");
let attButton = document.getElementById("update");
class Banco {
  constructor() {
    let id = localStorage.getItem("id");
    if (id === null) {
      localStorage.setItem("id", 0);
    }
  }

  post(mensagem) {
    let nextId = getNextId();
    localStorage.setItem(nextId, JSON.stringify(mensagem));
    localStorage.setItem("id", nextId);
  }

  read() {
    let mensagens = new Array();
    let ids = localStorage.getItem("id");
    for (let i = 0; i <= ids; i++) {
      let msg = JSON.parse(localStorage.getItem(i));
      if (msg === null) {
        continue;
      }

      msg.id = i;
      mensagens.push(msg);
    }
    return mensagens;
  }

  update(id) {
    newMessage.style.display = "block";
    attButton.style.display = "block";
    newMessage.dataset.id = id;
  }

  delete(id) {
    localStorage.removeItem(id);
  }
}

function getNextId() {
  let nextId = localStorage.getItem("id");
  return parseInt(nextId) + 1;
}

const bandoDeDados = new Banco();

function sendUpdate() {
  let id = parseInt(newMessage.dataset.id);
  let comment = JSON.parse(localStorage.getItem(id));
  comment.msg = newMessage.value;
  localStorage.setItem(id, JSON.stringify(comment));
  newMessage.style.display = "none";
  attButton.style.display = "none";
}

function sendMessage() {
  let nome = document.getElementById("nome").value;
  let msg = document.getElementById("mensagem").value;
  let mensagem = { nome: nome, msg: msg };
  bandoDeDados.post(mensagem);
}

function loadComments() {
  let comments = bandoDeDados.read();
  let listComments = document.getElementById("lista-comentarios");
  comments.forEach((comment) => {
    let linha = listComments.insertRow();
    let title = document.createElement("h4");
    title.innerHTML = comment.nome;
    linha.insertCell(0).appendChild(title);
    linha.insertCell(1).innerHTML = `${comment.msg}`;
    let btn1 = createButton(comment, "Delete");
    let btn2 = createButton(comment, "Update");
    let div = document.createElement("div");
    div.className = "botoes";
    linha.insertCell(2).appendChild(div);
    div.appendChild(btn1);
    div.appendChild(btn2);
  });
}

function createButton(comment, buttonMsg) {
  let button = document.createElement("button");
  button.type = "button";
  button.className = "botao";
  button.id = comment.id;
  button.innerHTML = buttonMsg;
  button.onclick = () => {
    const id = comment.id;
    if (buttonMsg === "Delete") {
      bandoDeDados.delete(id);
      window.location.reload();
    } else {
      bandoDeDados.update(id);
    }
  };
  return button;
}

document.addEventListener("DOMContentLoaded", (event) => {
  if (document.body.contains(document.getElementById("lista-comentarios"))) {
    loadComments();
  }
});
