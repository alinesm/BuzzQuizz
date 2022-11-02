function pegarQuizzes() { 
  const promise = axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes');
  promise.then(respostaDoServidor); 
}

let todosQuizzes = []
function respostaDoServidor(resposta){  
  todosQuizzes = resposta.data;
  renderizarQuizzesUsuario()
  renderizarTodosQuizzes();
}

pegarQuizzes()

function renderizarTodosQuizzes() {
  const quizzes = document.querySelector('.todosQuizzes');
  quizzes.innerHTML = '';

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
  const quizzesUsuario = document.querySelector('.quizzesUsuario');
  quizzesUsuario.innerHTML = '';

  for (let i = 0; i < 6; i++) {
      let quizz = todosQuizzes[i];     

      quizzesUsuario.innerHTML += `
          <div class="quizz" onclick="irParaOQuizz(this)">
            <img src="${quizz.image}" />
            <p>${quizz.title}</p>               
          </div>
      `;                 
  }
}
