// Banco de perguntas
const perguntas = [
    {
        pergunta: "Qual é a capital do Brasil?",
        opcoes: ["Rio de Janeiro", "Brasília", "São Paulo", "Salvador"],
        resposta: 1
    },
    {
        pergunta: "Quantos planetas existem no sistema solar?",
        opcoes: ["7", "8", "9", "10"],
        resposta: 1
    },
    {
        pergunta: "Quem pintou a Mona Lisa?",
        opcoes: ["Van Gogh", "Picasso", "Leonardo da Vinci", "Michelangelo"],
        resposta: 2
    },
    {
        pergunta: "Qual o maior oceano da Terra?",
        opcoes: ["Atlântico", "Índico", "Ártico", "Pacífico"],
        resposta: 3
    }
];

let perguntaAtual = 0;
let pontuacao = 0;
let respostaSelecionada = null;

// Elementos do DOM
const elementoPergunta = document.getElementById('pergunta');
const elementoOpcoes = document.getElementById('opcoes');
const elementoResultado = document.getElementById('resultado');
const elementoPontuacao = document.getElementById('pontos');
const botaoProxima = document.getElementById('proxima');

// Função para carregar a pergunta
function carregarPergunta() {
    const pergunta = perguntas[perguntaAtual];
    elementoPergunta.textContent = pergunta.pergunta;
    
    elementoOpcoes.innerHTML = '';
    pergunta.opcoes.forEach((opcao, index) => {
        const botao = document.createElement('button');
        botao.textContent = opcao;
        botao.addEventListener('click', () => selecionarResposta(index));
        elementoOpcoes.appendChild(botao);
    });
    
    elementoResultado.textContent = '';
    botaoProxima.style.display = 'none';
    respostaSelecionada = null;
}

// Função para selecionar resposta
function selecionarResposta(index) {
    respostaSelecionada = index;
    const botoes = elementoOpcoes.querySelectorAll('button');
    
    botoes.forEach(botao => {
        botao.disabled = true;
    });
    
    const pergunta = perguntas[perguntaAtual];
    if (index === pergunta.resposta) {
        elementoResultado.textContent = "Correto!";
        elementoResultado.style.color = "green";
        pontuacao++;
        elementoPontuacao.textContent = pontuacao;
    } else {
        elementoResultado.textContent = `Incorreto! A resposta correta é: ${pergunta.opcoes[pergunta.resposta]}`;
        elementoResultado.style.color = "red";
    }
    
    botaoProxima.style.display = 'block';
}

// Função para próxima pergunta
function proximaPergunta() {
    perguntaAtual++;
    if (perguntaAtual < perguntas.length) {
        carregarPergunta();
    } else {
        // Fim do jogo
        elementoPergunta.textContent = "Fim do Jogo!";
        elementoOpcoes.innerHTML = '';
        elementoResultado.textContent = `Sua pontuação final: ${pontuacao} de ${perguntas.length}`;
        botaoProxima.style.display = 'none';
        
        // Botão para reiniciar
        const botaoReiniciar = document.createElement('button');
        botaoReiniciar.textContent = "Jogar Novamente";
        botaoReiniciar.addEventListener('click', reiniciarJogo);
        elementoOpcoes.appendChild(botaoReiniciar);
    }
}

// Função para reiniciar o jogo
function reiniciarJogo() {
    perguntaAtual = 0;
    pontuacao = 0;
    elementoPontuacao.textContent = pontuacao;
    carregarPergunta();
}

// Evento para o botão próxima pergunta
botaoProxima.addEventListener('click', proximaPergunta);

// Iniciar o jogo
carregarPergunta();