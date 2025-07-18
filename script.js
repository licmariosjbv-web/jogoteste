document.addEventListener('DOMContentLoaded', function() {
    // Banco de perguntas completo com flags coringa
    const perguntas = [
        {
            pergunta: "Qual é o destino de viagem dos meus sonhos?",
            opcoes: ["Estados Unidos", "China", "Islândia", "Antártica"],
            resposta: 3
        },
        {
            pergunta: "Qual meu esporte favorito?",
            opcoes: ["Vôlei", "Curly", "Musculação", "Lambaeróbica"],
            resposta: 2
        },
        {
            pergunta: "Qual a sobremesa favorita do Mario?",
            opcoes: ["Pudim", "Torta de limão", "Petit Gateou", "Sorvete"],
            resposta: 1
        },
        {
            pergunta: "Qual nome da minha cachorra(o)?",
            opcoes: ["Daniela", "Luna", "Robert", "Zeus"],
            resposta: 1
        },
        {
            pergunta: "Qual o dia do meu aniversário?",
            opcoes: ["8 de junho", "5 de maio", "6 de abril", "7 de março"],
            resposta: 3
        },
        {
            pergunta: "Por que você deu um match com ele no Tinder?",
            opcoes: ["Porque ele tem cara de viado", "Porque ele é um grande gostoso", "Passei para a esquerda sem querer", "Porque estava entediada"],
            resposta: 1,
            coringa: true
        },
        {
            pergunta: "Quantos irmãos eu tenho?",
            opcoes: ["2 irmão", "1 irmã", "1 irmã e 2 irmãos", "1 irmão e 1 irmã"],
            resposta: 3
        },
        {
            pergunta: "Qual meu gênero Musical favorito?",
            opcoes: ["Metal", "Trap", "Rock Nacional", "Rap"],
            resposta: 0
        },
        {
            pergunta: "Quando você viu o Mario pela primeira vez, o que você pensou?",
            opcoes: [
                "Era melhor nas fotos", 
                "É frango, deve ter até gripe aviária", 
                "Sério? Tomara que não demore muito esse encontro", 
                "Nossa que homem gostoso, quero dar para ele aqui e agora!"
            ],
            resposta: 3,
            coringa: true
        },
        {
            pergunta: "Qual modelo de carro o Mario sonha em ter um dia?",
            opcoes: ["Aston Martin Esportivo", "Mercedez SUV", "Ferrari", "Kombi"],
            resposta: 1
        },
        {
            pergunta: "Qual meu prato de comida favorito?",
            opcoes: ["Arroz com frango", "Moqueca de camarão", "Arroz, feijão com carne de panela", "Lasanha de queijo"],
            resposta: 2
        },
        {
            pergunta: "Nesses dias que você não o viu durante suas 'Férias' <s>desempregada</s> o que você mais sentiu falta?",
            opcoes: [
                "Do Gato Torrada", 
                "Do meu vizinho ou de qualquer outro menino aleatório sem graça que eu dei match no Tinder", 
                "Do Mario, aquele lindo, Grande, Gostoso", 
                "De nada, se pudesse nem voltava"
            ],
            resposta: 2,
            coringa: true
        }
    ];

    // Mensagens especiais
    const mensagensEspeciais = [
        {
            acerto: "Muito bem, você acaba de ganhar uma carona até Poços, caso contrário você teria de ir a pé",
            erro: "Não é possível que tu errou as 3 primeiras, vou dar mais uma chance, porque a nota é DÓ!"
        },
        {
            acerto: "Parabéns você acaba de ganhar um chocolatinho! mas será que foi sorte?",
            erro: "Mano, porque você ainda fala comigo, sai do meu carro! Mentira, tenta de novo do começo vai, quem sabe decorando tu passa"
        },
        {
            acerto: "Já foram 9 perguntas, e você esta indo muito bem, ganhou um presente",
            erro: "Foi mais longe do que eu esperava, começa de novo, porque em matéria de amor você está R-E-P-R-O-V-A-D-A!"
        },
        {
            acerto: "Aeeeee sempre acreditei! ganhpu um presente pra mim hehehehe",
            erro: "Credo! tinha que ser psicanalista, mas se liberar o CÚ deixo até tentar de novo, afinal o último presente era o melhor de todos hehehe"
        }
    ];

    // Variáveis do jogo
    let perguntaAtual = 0;
    let pontuacao = 0;
    let vidas = 3;
    let respostaSelecionada = null;
    let faseAtual = 0;

    // Elementos do DOM
    const telaInicial = document.getElementById('tela-inicial');
    const jogo = document.getElementById('jogo');
    const elementoPergunta = document.getElementById('pergunta');
    const elementoOpcoes = document.getElementById('opcoes');
    const elementoResultado = document.getElementById('resultado');
    const elementoPontuacao = document.getElementById('pontos');
    const elementoTotalPerguntas = document.getElementById('total-perguntas');
    const elementoVidas = document.getElementById('vidas');
    const botaoIniciar = document.getElementById('iniciar-jogo');
    const botoesNavegacao = document.getElementById('botoes-navegacao');
    const botaoVoltar = document.getElementById('voltar');
    const botaoProxima = document.getElementById('proxima');

    // Iniciar o jogo
    botaoIniciar.addEventListener('click', iniciarJogo);

    function iniciarJogo() {
        telaInicial.style.display = 'none';
        jogo.style.display = 'block';
        elementoTotalPerguntas.textContent = perguntas.length;
        reiniciarJogo();
    }

    // Atualizar display de vidas
    function atualizarVidas() {
        const vidasElements = elementoVidas.querySelectorAll('.vida');
        vidasElements.forEach((vida, index) => {
            if (index < vidas) {
                vida.classList.remove('perdida');
            } else {
                vida.classList.add('perdida');
            }
        });
    }

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
        botoesNavegacao.style.display = 'none';
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
            
            // Verificar se completou uma fase (3 perguntas)
            if ((perguntaAtual + 1) % 3 === 0) {
                faseAtual = Math.floor(perguntaAtual / 3);
                elementoResultado.textContent = mensagensEspeciais[faseAtual].acerto;
            } else {
                elementoResultado.textContent = "Parabéns! sabia que ia acertar, mas não fez mais que sua obrigação também né S2";
            }
            
            elementoResultado.style.backgroundColor = '#e8f5e9';
            elementoResultado.style.color = '#2e7d32';
            
            // Configuração para acerto
            botoesNavegacao.style.display = 'flex';
            botaoVoltar.style.display = 'none';
            botaoProxima.style.display = 'block';
        } else {
            // Destacar a resposta errada em vermelho
            botoes[index].style.backgroundColor = '#f44336';
            botoes[index].style.color = 'white';
            
            // Verificar se é pergunta coringa
            if (pergunta.coringa) {
                vidas = 0;
                elementoResultado.textContent = "Você errou uma pergunta coringa! Não há perdão, não há esperanças, Adeus!";
                elementoResultado.style.backgroundColor = '#ffcdd2';
                elementoResultado.style.color = '#c62828';
                
                // Configuração para erro fatal
                botoesNavegacao.style.display = 'flex';
                botaoVoltar.style.display = 'block';
                botaoVoltar.textContent = "Voltar ao Início";
                botaoProxima.style.display = 'none';
                
                atualizarVidas();
                return;
            }
            
            // Perde uma vida normal
            vidas--;
            atualizarVidas();
            
            // Mensagens de perda de vida
            if (vidas === 2) {
                elementoResultado.textContent = "Eita! a primeira vida já foi";
            } else if (vidas === 1) {
                elementoResultado.textContent = "Caramba, dois erros, será que o amor era falso?";
            }
            
            elementoResultado.style.backgroundColor = '#ffebee';
            elementoResultado.style.color = '#c62828';
            
            // Verificar se perdeu todas as vidas
            if (vidas <= 0) {
                faseAtual = Math.floor(perguntaAtual / 3);
                elementoResultado.textContent = mensagensEspeciais[faseAtual].erro;
                
                botoesNavegacao.style.display = 'flex';
                botaoVoltar.style.display = 'block';
                botaoVoltar.textContent = "Voltar ao Início";
                botaoProxima.style.display = 'none';
                
                return;
            } else {
                botoesNavegacao.style.display = 'flex';
                botaoVoltar.style.display = 'none';
                botaoProxima.style.display = 'block';
            }
        }
    }

    // Botão próxima pergunta
    botaoProxima.addEventListener('click', function() {
        perguntaAtual++;
        if (perguntaAtual < perguntas.length) {
            carregarPergunta();
        } else {
            finalizarJogo();
        }
    });

    // Botão voltar
    botaoVoltar.addEventListener('click', reiniciarJogo);

    // Função para finalizar o jogo
    function finalizarJogo() {
        elementoPergunta.textContent = "Parabéns, Daniela!, você passou no QUIZ!";
        elementoOpcoes.innerHTML = '';
        elementoResultado.textContent = `Você terminou o quiz de perguntas, com Nota ${pontuacao} acerto de ${perguntas.length} perguntas`;
        elementoResultado.style.backgroundColor = '#e8f5e9';
        elementoResultado.style.color = '#2e7d32';
        botoesNavegacao.style.display = 'none';
        
        // Botão para reiniciar
        const botaoReiniciar = document.createElement('button');
        botaoReiniciar.textContent = "Jogar Novamente";
        botaoReiniciar.addEventListener('click', reiniciarJogo);
        botaoReiniciar.style.backgroundColor = '#f44336';
        botaoReiniciar.style.color = 'white';
        elementoOpcoes.appendChild(botaoReiniciar);
    }

    // Função para reiniciar o jogo
    function reiniciarJogo() {
        perguntaAtual = 0;
        pontuacao = 0;
        vidas = 3;
        elementoPontuacao.textContent = pontuacao;
        atualizarVidas();
        carregarPergunta();
    }

    // Inicialização
    telaInicial.style.display = 'block';
    jogo.style.display = 'none';
});
