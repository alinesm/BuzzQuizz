let todosQuizzes = [];

let listaIds = [];
let listaSerializada = [];
let listaArmazenada = [];

let title;
let urlCapa;
let qtdePerguntas;
let qtdeNiveis;

let pergunta1;
let corPergunta1;
let patternColor;
let respostaCorreta;
let urlrespostaCorreta;

let respostaIncorreta1;
let urlrespostaIncorreta1;

let respostaIncorreta2;
let urlrespostaIncorreta2;

let respostaIncorreta3;
let urlrespostaIncorreta3;

let tituloNivel1;
let acertoNivel1;
let urlNivel1;
let descricaoNivel1;

pegarQuizzes();

function pegarQuizzes() {
  const promise = axios.get(
    "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes"
  );
  promise.then(respostaDoServidor);
}

function respostaDoServidor(resposta) {
  todosQuizzes = resposta.data;
  let idArmazenado = renderizarQuizzesUsuario();

  if (localStorage.getItem("listaDeIds") === null || idArmazenado.length <= 0) {
    document.querySelector(".criarQuizzHome").style.display = "flex";
    document.querySelector(".mostrarQuizzesUsuarios").style.display = "none";
    renderizarTodosQuizzesFiltrado();
  } else {
    document.querySelector(".criarQuizzHome").style.display = "none";
    document.querySelector(".mostrarQuizzesUsuarios").style.display = "flex";
    renderizarQuizzesUsuario();
    renderizarTodosQuizzesFiltrado();
  }
}

let listaIdsAtual = [];
let listaIdsAtualJSon = localStorage.getItem("listaDeIds");
listaIdsAtual = JSON.parse(listaIdsAtualJSon);

function renderizarTodosQuizzesFiltrado() {
  const quizzes = document.querySelector(".todosQuizzes");
  quizzes.innerHTML = "";

  for (let i = 0; i < todosQuizzes.length; i++) {
    let quizz = todosQuizzes[i];

    if (!listaIdsAtual.includes(quizz.id)) {
      quizzes.innerHTML += `
          <div class="quizz" onclick="irParaOQuizz(this)">
            <img src="${quizz.image}" />
            <p>${quizz.title}</p>               
          </div>
      `;
    }
  }
}

function renderizarQuizzesUsuario() {
  const quizzesUsuario = document.querySelector(".quizzesUsuario");
  quizzesUsuario.innerHTML = "";
  let idsFiltrados = [];

  for (let i = 0; i < todosQuizzes.length; i++) {
    let quizz = todosQuizzes[i];

    if (listaIdsAtual.includes(quizz.id)) {
      idsFiltrados.push(quizz.id);
      quizzesUsuario.innerHTML += `
              <div class="quizz" onclick="irParaOQuizz(this)">
                <img src="${quizz.image}" />
                <p>${quizz.title}</p>               
              </div>
          `;
    }
  }
  return idsFiltrados;
}

function criarQuizz() {
  document.querySelector(".home").style.display = "none";
  document.querySelector(".criacaoDeQuizz").style.display = "flex";
}

let submitInformacoes = document.querySelector(".irParaPerguntas");
submitInformacoes.addEventListener("click", validarInformacoes);
function validarInformacoes(e) {
  e.preventDefault();
  title = document.querySelector(".title").value;
  qtdePerguntas = document.querySelector(".qtdePerguntas").value;
  qtdeNiveis = document.querySelector(".qtdeNiveis").value;
  urlCapa = document.querySelector(".url");

  if (title.length < 20 || title.length > 65) {
    alert("titulo");
  } else if (!urlCapa.checkValidity()) {
    alert("url");
  } else if (qtdePerguntas < 3) {
    alert("qtde perg");
  } else if (qtdeNiveis < 2) {
    alert("qtde perg");
  } else {
    document.querySelector(".informacoesBasicas").classList.add("desativado");
    document.querySelector(".perguntasDoQuizz").style.display = "flex";
  }
  renderizarContainerPerguntas();
}

function renderizarContainerPerguntas() {
  const formPerguntas = document.querySelector(".form");
  formPerguntas.innerHTML = "";
  for (let i = 0; i < qtdePerguntas; i++) {
    formPerguntas.innerHTML += `
      <div class="containerPergunta${i + 1}">
        <div class="headerPergunta">
          <p>Pergunta ${i + 1}</p>
          <ion-icon
            onclick="pergunta(this)"
            name="create-outline"
          ></ion-icon>
        </div>
        <div class="inputs">
          <input
            type="text"
            class="pergunta${i + 1}"
            placeholder="Texto da pergunta"
          />
          <input
            type="text"
            class="corPergunta${i + 1}"
            placeholder="Cor de fundo da pergunta"
          />
          <p>Resposta Correta</p>
          <input
            type="text"
            class="respCorreta"
            placeholder="Resposta correta"

          />
          <input
            class="urlRespCorreta"
            type="url"
            placeholder="URL da imagem do seu Quizz"
          />
          <p>Respostas incorretas</p>
          <input
            type="text"
            class="respIncorreta1"

            placeholder="Resposta incorreta 1" 
          />
          <input
            class="urlRespImcorreta1"
            type="url"
            placeholder="URL da imagem 1"
          />

          <input
            type="text"
            class="respIncorreta2"
            placeholder="Resposta incorreta 2"
          />
          <input
            class="urlRespImcorreta2"
            type="url"
            placeholder="URL da imagem 2"
          />

          <input
            type="text"
            class="respIncorreta3"
            placeholder="Resposta incorreta 3"
          />
          <input
            class="urlRespImcorreta3"
            type="url"
            placeholder="URL da imagem 3"
          />
      </div>
    </div>`;
  }

  formPerguntas.innerHTML += `<button type="submit" class="irParaNiveis">
      Prosseguir pra criar níveis
    </button>`;
}

let submitPerguntas = document.querySelector(".form");
submitPerguntas.addEventListener("submit", (e) => validarPerguntas(e));

function validarPerguntas(e) {
  e.preventDefault();
  pergunta1 = document.querySelector(".pergunta1").value;

  corPergunta1 = document.querySelector(".corPergunta1").value;
  patternColor = new RegExp("^#+([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$");

  respostaCorreta = document.querySelector(".respCorreta").value;
  urlrespostaCorreta = document.querySelector(".urlRespCorreta");

  respostaIncorreta1 = document.querySelector(".respIncorreta1").value;
  urlrespostaIncorreta1 = document.querySelector(".urlRespImcorreta1");

  respostaIncorreta2 = document.querySelector(".respIncorreta2").value;
  urlrespostaIncorreta2 = document.querySelector(".urlRespImcorreta2");

  respostaIncorreta3 = document.querySelector(".respIncorreta3").value;
  urlrespostaIncorreta3 = document.querySelector(".urlRespImcorreta3");

  if (pergunta1.length < 20) {
    alert("perguntas");
  } else if (!patternColor.test(corPergunta1)) {
    alert("color");
  } else if (respostaCorreta.length <= 0) {
    alert("resposta correta errada ");
  } else if (respostaIncorreta1.length <= 0) {
    alert("incorreta");
  } else if (!urlrespostaCorreta.checkValidity()) {
    alert("url1");
  } else if (!urlrespostaIncorreta1.checkValidity()) {
    alert("url2");
  } else if (!urlrespostaIncorreta2.checkValidity()) {
    alert("url3");
  } else if (!urlrespostaIncorreta3.checkValidity()) {
    alert("url4");
  } else {
    document.querySelector(".perguntasDoQuizz").style.display = "none";
    document.querySelector(".niveisDoQuizz").style.display = "flex";
    renderizarContainerNiveis();
  }
}

function pergunta(clicked) {
  const clickedIconGrandParentClass =
    clicked.parentNode.parentNode.classList.value;

  const inputsPerguntas = document.querySelectorAll(".inputs");

  for (const input of inputsPerguntas) {
    const inputParentClass = input.parentNode.classList.value;
    if (inputParentClass !== clickedIconGrandParentClass) {
      input.style.display = "none";
    } else {
      input.style.display = "flex";
    }
  }
}

function renderizarContainerNiveis() {
  const formNivel = document.querySelector(".formNivel");
  formNivel.innerHTML = "";
  for (let i = 0; i < qtdeNiveis; i++) {
    formNivel.innerHTML += `
     <div class="containerNivel${i + 1}">
        <div class="headerNivel">
          <p>Nivel ${i + 1}</p>
          <ion-icon onclick="nivel(this)" name="create-outline"></ion-icon>
        </div>
        <div class="inputsNivel">
          <input
            type="text"
            class="nivel1"
            placeholder="Titulo do Nivel"
          />  
          <input
            type="number"
            class="acerto1"
            placeholder="% de acerto mínima"
          />
          <input
            class="urlNivel1"
            type="url"
            placeholder="URL da imagem do nível"
          />
          <input
            type="text"
            class="descricaoNivel1"
            placeholder="Descrição de nível"
          />
      </div>`;
  }

  formNivel.innerHTML += `<button class="finalizarQuizz" type="submit"">
  Finalizar Quizz
    </button>`;
}

function nivel(clicked) {
  const clickedIconGrandParentClass =
    clicked.parentNode.parentNode.classList.value;

  const inputsNiveis = document.querySelectorAll(".inputsNivel");

  for (const input of inputsNiveis) {
    const inputParentClass = input.parentNode.classList.value;
    if (inputParentClass !== clickedIconGrandParentClass) {
      input.style.display = "none";
    } else {
      input.style.display = "flex";
    }
  }
}

let submitNiveis = document.querySelector(".formNivel");
submitNiveis.addEventListener("submit", (e) => validarNiveis(e));

function validarNiveis(e) {
  e.preventDefault();

  tituloNivel1 = document.querySelector(".nivel1").value;
  acertoNivel1 = document.querySelector(".acerto1").value;
  urlNivel1 = document.querySelector(".urlNivel1");
  descricaoNivel1 = document.querySelector(".descricaoNivel1").value;

  if (tituloNivel1.length < 10) {
    alert("titulo");
  } else if (acertoNivel1 < 0 || acertoNivel1 > 100) {
    alert("acerto");
  } else if (!urlNivel1.checkValidity()) {
    alert("url");
  } else if (descricaoNivel1.length < 30) {
    alert("desc ");
  } else {
    enviarQuizzServidor();
    document.querySelector(".niveisDoQuizz").style.display = "none";
    finalizarQuizzCriado();
  }
}

function finalizarQuizzCriado() {
  const acessarQuizzCriado = document.querySelector(".acessarSeuQuizz");
  acessarQuizzCriado.style.display = "flex";
  acessarQuizzCriado.innerHTML = "";
  acessarQuizzCriado.innerHTML += `
    <p>Seu quizz está pronto!</p>
    <div>
      <img src=${urlCapa.value} />
      <p>${title}</p>
    </div>
    <button onclick="irParaQuizz()">Acessar Quizz</button>
    <p class="voltarHome" onclick="voltarHome()">Voltar pra home</p>`;
}

function voltarHome() {
  document.querySelector(".acessarSeuQuizz").style.display = "none";
  document.querySelector(".home").style.display = "flex";
  window.location.reload();
}

function enviarQuizzServidor() {
  novoQuizz = {
    title: title,
    image: urlCapa.value,
    questions: [
      {
        title: pergunta1,
        color: corPergunta1,
        answers: [
          {
            text: respostaCorreta,
            image: urlrespostaCorreta.value,
            isCorrectAnswer: true,
          },
          {
            text: respostaIncorreta1,
            image: urlrespostaIncorreta1.value,
            isCorrectAnswer: false,
          },
        ],
      },
      {
        title: "Título da pergunta 2",
        color: "#123456",
        answers: [
          {
            text: "Texto da resposta 1",
            image:
              "https://disneyplusbrasil.com.br/wp-content/uploads/2022/02/Os-Simpsons-Star-Plus.jpg",
            isCorrectAnswer: true,
          },
          {
            text: "Texto da resposta 2",
            image: "https://http.cat/412.jpg",
            isCorrectAnswer: false,
          },
        ],
      },
      {
        title: "Título da pergunta 3",
        color: "#123456",
        answers: [
          {
            text: "Texto da resposta 1",
            image:
              "https://disneyplusbrasil.com.br/wp-content/uploads/2022/02/Os-Simpsons-Star-Plus.jpg",
            isCorrectAnswer: true,
          },
          {
            text: "Texto da resposta 2",
            image: "https://http.cat/412.jpg",
            isCorrectAnswer: false,
          },
        ],
      },
    ],
    levels: [
      {
        title: tituloNivel1,
        image: urlNivel1.value,
        text: descricaoNivel1,
        minValue: acertoNivel1,
      },
      {
        title: "Título do nível 2",
        image: "https://http.cat/412.jpg",
        text: "Descrição do nível 2",
        minValue: 50,
      },
    ],
  };

  console.log("Novo Quiz", novoQuizz);

  axios
    .post(" https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes", novoQuizz)
    .then(armazenarIds)
    .catch((e) => {
      console.log(e);
      window.location.reload();
    });
}

function armazenarIds(resposta) {
  console.log("id armazenado", resposta.data.id);
  if (localStorage.getItem("listaDeIds") === null) {
    let id = resposta.data.id;
    listaArmazenada.push(id);

    listaSerializada = JSON.stringify(listaArmazenada);
    localStorage.setItem("listaDeIds", listaSerializada);

    listaIds = localStorage.getItem("listaDeIds");
    listaArmazenada = JSON.parse(listaIds);
  } else {
    listaIds = localStorage.getItem("listaDeIds");
    listaArmazenada = JSON.parse(listaIds);

    let id = resposta.data.id;
    listaArmazenada.push(id);

    listaSerializada = JSON.stringify(listaArmazenada);
    localStorage.setItem("listaDeIds", listaSerializada);
  }
}
