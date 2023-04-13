// Seleciona os elementos HTML
const questionElement = document.querySelector('#question');
const optionsElement = document.querySelector('#options');
const submitButton = document.querySelector('#submit');
const resultElement = document.querySelector('#result');
const resultMessageElement = document.querySelector('#result-message');

// Array de perguntas, respostas e pontuações
const questions = [
  {
    question: "Qual o nome da esposa de Noé?",
    options: ["Marta", "Naamá", "Sara"],
    answer: "Naamá",
    points: 10,
  },
  {
    question: "Quantos anos Noé tinha quando começou a construir a arca?",
    options: ["100 anos", "200 anos", "300 anos"],
    answer: "500 anos",
    points: 20,
  },
  {
    question: "Quantos andares tinha a arca?",
    options: ["1 andar", "2 andares", "3 andares"],
    answer: "3 andares",
    points: 30,
  },
];

// Armazena os pontos totais do usuário
let totalPoints = 0;

// Armazena o índice da pergunta atual
let currentQuestionIndex = 0;

// Função para mostrar a pergunta atual na tela
function showQuestion() {
  const currentQuestion = questions[currentQuestionIndex];

  const questionElement = document.querySelector("#question");
  const optionsElement = document.querySelector("#options");
  const submitButton = document.querySelector("#submit");

  questionElement.textContent = currentQuestion.question;

  // Remove as opções anteriores, caso existam
  while (optionsElement.firstChild) {
    optionsElement.removeChild(optionsElement.firstChild);
  }

  // Adiciona as opções da pergunta atual
  currentQuestion.options.forEach((option) => {
    const optionElement = document.createElement("button");
    optionElement.textContent = option;
    optionElement.classList.add("option");

    optionElement.addEventListener("click", () => {
      // Verifica se a resposta está correta e atualiza os pontos
      if (option === currentQuestion.answer) {
        totalPoints += currentQuestion.points;
      }

      // Passa para a próxima pergunta ou finaliza o desafio
      currentQuestionIndex++;

      if (currentQuestionIndex < questions.length) {
        showQuestion();
      } else {
        endChallenge();
      }
    });

    optionsElement.appendChild(optionElement);
  });

  // Desabilita o botão de enviar até que uma opção seja selecionada
  submitButton.disabled = true;
}

// Função para exibir a próxima pergunta
function showNextQuestion() {
  // Verifica se já exibiu todas as perguntas
  if (currentQuestion >= questions.length) {
    // Exibe a pontuação final
    displayResult();
  } else {
    // Obtém a pergunta atual
    const question = questions[currentQuestion];
    // Atualiza o elemento de pergunta com a nova pergunta
    const questionElement = document.getElementById("question");
    questionElement.innerHTML = question.question;
    // Atualiza o elemento de opções com as novas opções
    const optionsElement = document.getElementById("options");
    optionsElement.innerHTML = "";
    for (let i = 0; i < question.options.length; i++) {
      const option = question.options[i];
      optionsElement.innerHTML += `
        <button class="option" onclick="checkAnswer('${option}')">${option}</button>
      `;
    }
    // Incrementa o índice da pergunta atual
    currentQuestion++;
  }
}

// Função para verificar a resposta selecionada
function checkAnswer(selectedOption) {
  // Obtém a pergunta atual
  const question = questions[currentQuestion - 1];
  // Verifica se a resposta selecionada está correta
  if (selectedOption === question.answer) {
    // Adiciona os pontos da pergunta à pontuação total
    totalPoints += question.points;
  }
  // Exibe a próxima pergunta
  showNextQuestion();
}

// Função para exibir a pontuação final
function displayResult() {
  // Atualiza o elemento de pergunta com a mensagem de pontuação final
  const questionElement = document.getElementById("question");
  questionElement.innerHTML = `Parabéns! Você fez ${totalPoints} pontos.`;
  // Remove o elemento de opções
  const optionsElement = document.getElementById("options");
  optionsElement.innerHTML = "";
}

// Função para mostrar a próxima pergunta
function showNextQuestion() {
  // Verifica se é a última pergunta
  if (currentQuestionIndex === questions.length - 1) {
    showResults();
  } else {
    // Incrementa o índice da pergunta atual
    currentQuestionIndex++;

    // Atualiza o número da pergunta
    questionNumberEl.textContent = `Pergunta ${currentQuestionIndex + 1} de ${
      questions.length
    }`;

    // Atualiza o texto da pergunta
    questionEl.textContent = questions[currentQuestionIndex].question;

    // Remove as opções de resposta anteriores
    while (answerOptionsEl.firstChild) {
      answerOptionsEl.removeChild(answerOptionsEl.firstChild);
    }

    // Cria novas opções de resposta
    for (let i = 0; i < questions[currentQuestionIndex].options.length; i++) {
      const answerOption = document.createElement("button");
      answerOption.classList.add("btn", "answer-option");
      answerOption.textContent = questions[currentQuestionIndex].options[i];
      answerOptionsEl.appendChild(answerOption);
      answerOption.addEventListener("click", selectAnswer);
    }
  }
}

