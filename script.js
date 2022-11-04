let todosQuizzes = [];
let idsFiltrados = [];

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

let tituloNivel1;
let acertoNivel1;
let urlNivel1;
let descricaoNivel1;

function pegarQuizzes() {
  const promise = axios.get(
    "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes"
  );
  promise.then(respostaDoServidor);
}

function respostaDoServidor(resposta) {
  todosQuizzes = resposta.data;
  // console.log(todosQuizzes);
  if (idsFiltrados.length < 0) {
    document.querySelector(".criarQuizzHome").style.display = "flex";
    document.querySelector(".mostrarQuizzesUsuarios").style.display = "none";
  } else {
    document.querySelector(".criarQuizzHome").style.display = "none";
    document.querySelector(".mostrarQuizzesUsuarios").style.display = "flex";
    renderizarQuizzesUsuario();
    renderizarTodosQuizzesFiltrado();
  }
}

let submitInformacoes = document.querySelector(".irParaPerguntas");
submitInformacoes.addEventListener("click", validarInformacoes);
function validarInformacoes(e) {
  e.preventDefault();
  title = document.querySelector(".title").value;
  qtdePerguntas = document.querySelector(".qtdePerguntas").value;
  qtdeNiveis = document.querySelector(".qtdeNiveis").value;
  urlCapa = document.querySelector(".url");
  console.log("capaaa", urlCapa);
  console.log(" caa valorrr", urlCapa.value);
  console.log(" caatype", typeof urlCapa.value);

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
}

let submitPerguntas = document.querySelector(".irParaNiveis");
submitPerguntas.addEventListener("click", validarPerguntas);
function validarPerguntas(e) {
  e.preventDefault();

  pergunta1 = document.querySelector(".pergunta1").value;

  corPergunta1 = document.querySelector(".corPergunta1").value;
  patternColor = new RegExp("^#+([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$");

  respostaCorreta = document.querySelector(".respCorreta").value;
  urlrespostaCorreta = document.querySelector(".urlRespCorreta");
  console.log(urlrespostaCorreta);
  console.log(urlrespostaCorreta.value);

  respostaIncorreta1 = document.querySelector(".respIncorreta1").value;
  urlrespostaIncorreta1 = document.querySelector(".urlRespImcorreta1");

  let respostaIncorreta2 = document.querySelector(".respIncorreta2").value;
  let urlrespostaIncorreta2 = document.querySelector(".urlRespImcorreta2");

  let respostaIncorreta3 = document.querySelector(".respIncorreta3").value;
  let urlrespostaIncorreta3 = document.querySelector(".urlRespImcorreta3");

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
  }
}

let submitNiveis = document.querySelector(".finalizarQuizz");
submitNiveis.addEventListener("click", validarNiveis);
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
    document.querySelector(".niveisDoQuizz").style.display = "none";
    document.querySelector(".acessarSeuQuizz").style.display = "flex";
  }

  enviarQuizzServidor();
}

pegarQuizzes();

function voltarHome() {
  document.querySelector(".acessarSeuQuizz").style.display = "none";
  document.querySelector(".home").style.display = "flex";
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
}

function criarQuizz() {
  document.querySelector(".home").style.display = "none";
  document.querySelector(".criacaoDeQuizz").style.display = "flex";
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
      // window.location.reload();
    });
}

function armazenarIds(resposta) {
  console.log("id armazenado", resposta.data.id);
  if (localStorage.getItem("listaDeIds") === null) {
    let id = resposta.data.id;
    listaArmazenada.push(id);
    console.log("id do if", id);

    listaSerializada = JSON.stringify(listaArmazenada);
    localStorage.setItem("listaDeIds", listaSerializada);

    listaIds = localStorage.getItem("listaDeIds");
    listaArmazenada = JSON.parse(listaIds);
    console.log("lista if", listaArmazenada);
  } else {
    listaIds = localStorage.getItem("listaDeIds");
    listaArmazenada = JSON.parse(listaIds);

    let id = resposta.data.id;
    listaArmazenada.push(id);
    console.log("id do else", id);

    listaSerializada = JSON.stringify(listaArmazenada);
    localStorage.setItem("listaDeIds", listaSerializada);
    console.log("lista serializada else", listaSerializada);
    console.log("lista else", listaArmazenada);
  }
}

// function armazenarIds(resposta) {
//   listaIds = localStorage.getItem("listaDeIds");
//   listaArmazenada = JSON.parse(listaIds);

//   let id = resposta.data.id;
//   listaArmazenada.push(id);

//   listaSerializada = JSON.stringify(listaArmazenada);

//   localStorage.setItem("listaDeIds", listaSerializada);
// }

// function renderCreateQuizzContainer() {
//   const criarQuizzContainer = document.querySelector(".criarQuizzHome");
//   criarQuizzContainer.innerHTML = "";

//   criarQuizzContainer.innerHTML += `
//     <p>Você não criou nenhum</p>
//     <p>quizz ainda :(</p>
//     <button onclick="criarQuizz()">Criar Quizz</button>
//  `;
// }

// function renderizarTodosQuizzesNaoFiltrado() {
//   const quizzes = document.querySelector(".todosQuizzes");
//   quizzes.innerHTML = "";

//   for (let i = 0; i < todosQuizzes.length; i++) {
//     let quizz = todosQuizzes[i];
//     quizzes.innerHTML += `
//           <div class="quizz" onclick="irParaOQuizz(this)">
//             <img src="${quizz.image}" />
//             <p>${quizz.title}</p>
//           </div>
//       `;
//   }
// }

// if (localStorage.getItem("listaDeIds") === null) {
//   renderCreateQuizzContainer();
//   renderizarTodosQuizzesNaoFiltrado();
// } else {
//   document
//     .querySelector(".criarQuizzHome")
//     .classList.add("criarQuizzHomeDesativado");
//   renderizarQuizzesUsuario();
//   console.log("mais uma lista>>>>>>>>>>>>", idsFiltrados.length);

//   renderizarTodosQuizzesFiltrado();
// }
