function pegarQuizzes() {
  const promise = axios.get(
    "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes"
  );
  promise.then(respostaDoServidor);
}

let todosQuizzes = [];
function respostaDoServidor(resposta) {
  todosQuizzes = resposta.data;
  // console.log(todosQuizzes);
  if (localStorage.getItem("listaDeIds") === null) {
    renderCreateQuizzContainer();
    renderizarTodosQuizzesNaoFiltrado();
  } else {
    document
      .querySelector(".criarQuizzHome")
      .classList.add("criarQuizzHomeDesativado");
    renderizarQuizzesUsuario();
    renderizarTodosQuizzesFiltrado();
  }
}

pegarQuizzes();

function renderizarTodosQuizzesFiltrado() {
  const quizzes = document.querySelector(".todosQuizzes");
  quizzes.innerHTML = "";

  let listaIdsAtual = [];
  let listaIdsAtualJSon = localStorage.getItem("listaDeIds");
  listaIdsAtual = JSON.parse(listaIdsAtualJSon);

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

function renderizarTodosQuizzesNaoFiltrado() {
  const quizzes = document.querySelector(".todosQuizzes");
  quizzes.innerHTML = "";

  let listaIdsAtual = [];
  let listaIdsAtualJSon = localStorage.getItem("listaDeIds");
  listaIdsAtual = JSON.parse(listaIdsAtualJSon);

  for (let i = 0; i < todosQuizzes.length; i++) {
    let quizz = todosQuizzes[i];
    quizzes.innerHTML += `
          <div class="quizz" onclick="irParaOQuizz(this)">
            <img src="${quizz.image}" />
            <p>${quizz.title}</p>               
          </div>
      `;
  }
}

function renderizarQuizzesUsuario() {
  const quizzesUsuario = document.querySelector(".quizzesUsuario");
  quizzesUsuario.innerHTML = "";

  let listaIdsAtual = [];
  let listaIdsAtualJSon = localStorage.getItem("listaDeIds");
  listaIdsAtual = JSON.parse(listaIdsAtualJSon);

  for (let i = 0; i < todosQuizzes.length; i++) {
    let quizz = todosQuizzes[i];

    if (listaIdsAtual.includes(quizz.id)) {
      quizzesUsuario.innerHTML += `
              <div class="quizz" onclick="irParaOQuizz(this)">
                <img src="${quizz.image}" />
                <p>${quizz.title}</p>               
              </div>
          `;
    }
  }
}

function renderCreateQuizzContainer() {
  const criarQuizzContainer = document.querySelector(".criarQuizzHome");
  criarQuizzContainer.innerHTML = "";

  criarQuizzContainer.innerHTML += `
    <p>Você não criou nenhum</p>
    <p>quizz ainda :(</p>
    <button onclick="criarQuizz()">Criar Quizz</button>
 `;
}

function enviarQuizzServidor() {
  novoQuizz = {
    title: "Título do quizz",
    image:
      "https://disneyplusbrasil.com.br/wp-content/uploads/2022/02/Os-Simpsons-Star-Plus.jpg",
    questions: [
      {
        title: "Título da pergunta 1",
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
        title: "Título do nível 1",
        image:
          "https://disneyplusbrasil.com.br/wp-content/uploads/2022/02/Os-Simpsons-Star-Plus.jpg",
        text: "Descrição do nível 1",
        minValue: 0,
      },
      {
        title: "Título do nível 2",
        image: "https://http.cat/412.jpg",
        text: "Descrição do nível 2",
        minValue: 50,
      },
    ],
  };

  axios
    .post(" https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes", novoQuizz)
    .then(armazenarIds)
    .catch(() => {
      window.location.reload();
    });
}

let listaIds = [];
let listaSerializada = [];
let listaArmazenada = [];
let listaArmazenada2 = [];

function armazenarIds(resposta) {
  listaIds = localStorage.getItem("listaDeIds");
  listaArmazenada = JSON.parse(listaIds);

  let id = resposta.data.id;
  listaArmazenada.push(id);

  listaSerializada = JSON.stringify(listaArmazenada);

  localStorage.setItem("listaDeIds", listaSerializada);
}

function armazenarIds(resposta) {
  console.log(resposta.data.id);
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
