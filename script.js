// Pegando o canvas e o contexto para desenhar
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Definindo variáveis
const raqueteAltura = 100;
const raqueteLargura = 10;
const bolaRaio = 10;
let bolaVelocidadeX = 5;
let bolaVelocidadeY = 5;
let raqueteVelocidade = 10;
let fase = 1;
let pontos1 = 0;
let pontos2 = 0;

// Definindo as raquetes e a bola
let raquete1  = { x: 30, y: canvas.height / 2 - raqueteAltura / 2, largura: raqueteLargura, altura: raqueteAltura };
let raquete2 = { x: canvas.width - 30 - raqueteLargura, y: canvas.height / 2 - raqueteAltura / 2, largura: raqueteLargura, altura: raqueteAltura };
let bola = { x: canvas.width / 2, y: canvas.height / 2, raio: bolaRaio, velocidadeX: bolaVelocidadeX, velocidadeY: bolaVelocidadeY };

// Variável para armazenar as teclas pressionadas
const teclasPressionadas = {};

// Função de desenhar a bola
function desenharBola() {
    ctx.beginPath();
    ctx.arc(bola.x, bola.y, bola.raio, 0, Math.PI * 2);
    ctx.fillStyle = '#fff';
    ctx.fill();
    ctx.closePath();
}

// Função de desenhar a raquete
function desenharRaquete(raquete) {
    ctx.fillStyle = '#fff';
    ctx.fillRect(raquete.x, raquete.y, raquete.largura, raquete.altura);
}

// Função de desenhar o placar
function desenharPlacar() {
    document.getElementById('score1').textContent = pontos1;
    document.getElementById('score2').textContent = pontos2;
}

// Função de mover a bola
function moverBola() {
    bola.x += bola.velocidadeX;
    bola.y += bola.velocidadeY;

    // Colisão com as bordas superior e inferior
    if (bola.y - bola.raio <= 0 || bola.y + bola.raio >= canvas.height) {
        bola.velocidadeY = -bola.velocidadeY;
    }

    // Colisão com a raquete 1
    if (bola.x - bola.raio <= raquete1.x + raquete1.largura && bola.y >= raquete1.y && bola.y <= raquete1.y + raquete1.altura) {
        bola.velocidadeX = -bola.velocidadeX;
    }

    // Colisão com a raquete 2
    if (bola.x + bola.raio >= raquete2.x && bola.y >= raquete2.y && bola.y <= raquete2.y + raquete2.altura) {
        bola.velocidadeX = -bola.velocidadeX;
    }

    // Pontuação
    if (bola.x - bola.raio <= 0) {
        pontos2++;
        resetarBola();
    }
    if (bola.x + bola.raio >= canvas.width) {
        pontos1++;
        resetarBola();
    }
}

// Função para resetar a bola no centro
function resetarBola() {
    bola.x = canvas.width / 2;
    bola.y = canvas.height / 2;
    bola.velocidadeX = bolaVelocidadeX;
    bola.velocidadeY = bolaVelocidadeY;
}

// Função para mover as raquetes com movimento contínuo
function moverRaquete() {
    // Raquete 1 (Jogador 1)
    if (teclasPressionadas['w'] && raquete1.y > 0) {
        raquete1.y -= raqueteVelocidade;
    }
    if (teclasPressionadas['s'] && raquete1.y + raquete1.altura < canvas.height) {
        raquete1.y += raqueteVelocidade;
    }

    // Raquete 2 (Jogador 2)
    if (teclasPressionadas['ArrowUp'] && raquete2.y > 0) {
        raquete2.y -= raqueteVelocidade;
    }
    if (teclasPressionadas['ArrowDown'] && raquete2.y + raquete2.altura < canvas.height) {
        raquete2.y += raqueteVelocidade;
    }
}

// Função para monitorar as teclas pressionadas
function controlarTeclado(event) {
    teclasPressionadas[event.key] = event.type === 'keydown';
}

// Função para atualizar o jogo
function atualizarJogo() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Atualizar e desenhar os elementos do jogo
    desenharBola();
    desenharRaquete(raquete1);
    desenharRaquete(raquete2);
    desenharPlacar();

    moverBola();
    moverRaquete();

    // Fases do jogo
    if (fase === 1 && (pontos1 + pontos2 >= 10)) {
        fase = 2;
        bola.velocidadeX *= 1.2;
        bola.velocidadeY *= 1.2;
    }

    if (fase === 2 && (pontos1 + pontos2 >= 20)) {
        fase = 3;
        raqueteVelocidade = 8;
    }

    if (fase === 3 && (pontos1 + pontos2 >= 30)) {
        fase = 4;
        bola.velocidadeX *= 1.2;
        bola.velocidadeY *= 1.2;
    }

    if (fase === 4 && (pontos1 + pontos2 >= 40)) {
        fase = 5;
        raqueteVelocidade = 6;
    }

    requestAnimationFrame(atualizarJogo);
}
// Função para atualizar o jogo
function atualizarJogo() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Atualizar e desenhar os elementos do jogo
    desenharBola();
    desenharRaquete(raquete1);
    desenharRaquete(raquete2);
    desenharPlacar();

    moverBola();
    moverRaquete();

    // Fases do jogo
    if (fase === 1 && (pontos1 + pontos2 >= 10)) {
        fase = 2; // Muda para a Fase 2
        bola.velocidadeX *= 1.2; // Aumenta a velocidade da bola
        bola.velocidadeY *= 1.2; // Aumenta a velocidade da bola
    }

    if (fase === 2 && (pontos1 + pontos2 >= 20)) {
        fase = 3; // Muda para a Fase 3
        raqueteVelocidade = 8; // Diminui a velocidade das raquetes
    }

    if (fase === 3 && (pontos1 + pontos2 >= 30)) {
        fase = 4; // Muda para a Fase 4
        bola.velocidadeX *= 1.2; // Aumenta ainda mais a velocidade da bola
        bola.velocidadeY *= 1.2; // Aumenta ainda mais a velocidade da bola
    }

    if (fase === 4 && (pontos1 + pontos2 >= 40)) {
        fase = 5; // Muda para a Fase 5
        raqueteVelocidade = 6; // Diminui mais ainda a velocidade das raquetes
    }

    requestAnimationFrame(atualizarJogo);
}


// Adicionando eventos de teclado
document.addEventListener('keydown', controlarTeclado);
document.addEventListener('keyup', controlarTeclado);

// Iniciar o jogo
atualizarJogo();
