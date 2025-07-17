// Banco de perguntas personalizado
const perguntas = [
    {
        pergunta: "Qual a sobremesa favorita do Mario?",
        opcoes: ["Pudim", "Torta de limão", "Petit Gateou", "Sorvete"],
        resposta: 1,
        mensagemAcerto: "Muito bem, você acaba de ganhar uma carona até Poços, caso contrário você teria de ir a pé",
        mensagemErro: "Não é possível que tu errou a primeira, vou dar mais uma chance, mas vai ter castigo mais tarde"
    },
    {
        pergunta: "Por que você deu um match com ele no Tinder?",
        opcoes: ["Porque ele tem cara de viado", "Porque ele é um grande gostoso", "Passei para a esquerda sem querer", "Porque estava entediada"],
        resposta: 1,
        mensagemAcerto: "Acho bom mesmo! Ganhou um chocolatinho",
        mensagemErro: "Ta de tiração né! Vai a pé para Poços"
    },
    {
        pergunta: "Quando você o Mario pela primeira vez, o que você pensou?",
        opcoes: ["Era melhor nas fotos", "É frango, deve ter até gripe aviária", "Sério? Tomara que não demore muito esse encontro", "Nossa que homem gostoso, quero dar para ele aqui e agora!"],
        resposta: 3,
        mensagemAcerto: "Essa tava difícil né? Acabou de ganhar um kit vinho! É humilde, mas é o que tem pra hoje",
        mensagemErro: "Errou?! você me odeia? vai voltar a pé para aprender a respeitar quem manda!"
    },
    {
        pergunta: "Nesses dias que você esteve vijando por São Paulo durante suas 'Férias/desempregada', o que você mais sentiu falta?",
        opcoes: ["Do Gato Torrada", "Do meu vizinho ou de qualquer outro menino aleatório sem graça que eu dei match no Tinder", "Do Mario, aquele lindo, Grande, Gostoso", "De nada, se pudesse nem voltava"],
        resposta: 2,
        mensagemAcerto: "Aeeee, sempre soube que ia acertar todas, hoje a noite tem uma surpresa a mais hehe",
        mensagemErro: "Errar essa, não tem perdão! Perdeu o cú!"
    }
];

let perguntaAtual = 0;
let pontuacao = 0;
let respostaSelecionada = null;

// Elementos do DOM
const telaInicial = document.getElementById('tela-inicial');
const jogo = document.getElementById('jogo');
const elementoPergunta = document.getElementById('pergunta');
const elementoOpcoes = document.getElementById('opcoes');
const elementoResultado = document.getElementById('resultado');
const elementoPontuacao = document.getElementById('pontos');
const elementoTotalPerguntas = document.getElementById('total-perguntas');
const botaoIniciar = document.getElementById('iniciar-jogo');

// Iniciar o jogo
botaoIniciar.addEventListener('click', () => {
    telaInicial.style.display = 'none';
    jogo.style.display = 'block';
    elementoTotalPerguntas.textContent = perguntas.length;
    carregarPergunta();
});

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
    respostaSelecionada = null;
}

// Função para selecionar resposta
function selecionarResposta(index) {
    respostaSelecionada = index;
    const botoes = elementoOpcoes.querySelectorAll('button');
    const pergunta = perguntas[perguntaAtual];
    
    // Desabilitar todos os botões
    botoes.forEach(botao => {
        botao.disabled = true;
    });
    
    // Destacar a resposta correta em verde
    botoes[pergunta.resposta].style.backgroundColor = '#4CAF50';
    botoes[pergunta.resposta].style.color = 'white';
    
    if (index === pergunta.resposta) {
        pontuacao++;
        elementoPontuacao.textContent = pontuacao;
        elementoResultado.textContent = pergunta.mensagemAcerto;
        elementoResultado.style.backgroundColor = '#e8f5e9';
        elementoResultado.style.color = '#2e7d32';
    } else {
        // Destacar a resposta errada em vermelho
        botoes[index].style.backgroundColor = '#f44336';
        botoes[index].style.color = 'white';
        elementoResultado.textContent = pergunta.mensagemErro;
        elementoResultado.style.backgroundColor = '#ffebee';
        elementoResultado.style.color = '#c62828';
    }
    
    // Avançar para próxima pergunta ou finalizar
    setTimeout(() => {
        if (index === pergunta.resposta) {
            proximaPergunta();
        } else {
            reiniciarJogo();
        }
    }, 3000);
}

// Função para próxima pergunta
function proximaPergunta() {
    perguntaAtual++;
    if (perguntaAtual < perguntas.length) {
        carregarPergunta();
    } else {
        // Fim do jogo com vitória
        elementoPergunta.textContent = "Parabéns, Daniela! Bem vinda de volta, estava com saudades";
        elementoOpcoes.innerHTML = '';
        elementoResultado.textContent = `Você acertou ${pontuacao} de ${perguntas.length} perguntas sobre o Mario!`;
        elementoResultado.style.backgroundColor = '#e8f5e9';
        elementoResultado.style.color = '#2e7d32';
        
        // Botão para reiniciar
        const botaoReiniciar = document.createElement('button');
        botaoReiniciar.textContent = "Jogar Novamente";
        botaoReiniciar.addEventListener('click', reiniciarJogo);
        botaoReiniciar.style.backgroundColor = '#f44336';
        botaoReiniciar.style.color = 'white';
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

// Mostrar tela inicial inicialmente
telaInicial.style.display = 'block';
jogo.style.display = 'none';
