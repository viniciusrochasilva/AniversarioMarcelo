const video = document.getElementById("videoConvite");
const botaoAudio = document.getElementById("playAudio");
const musica = document.getElementById("musicaFundo");
const contador = document.getElementById("contador");
const areaNuvens = document.getElementById("nuvens");

// vídeo começa parado e sem controles
video.removeAttribute("controls");
video.loop = false;
video.muted = false;

// botão executa vídeo + música
botaoAudio.addEventListener("click", () => {
  video.currentTime = 0;
  video.muted = false;
  video.play();

  musica.volume = 0.07;
  musica.play().catch(() => {});

  botaoAudio.style.display = "none";
});

// quando o vídeo terminar, o botão aparece de novo
video.addEventListener("ended", () => {
  botaoAudio.style.display = "block";
});

// contador
function atualizarContador() {
  const dataFesta = new Date("2026-07-09T15:00:00");
  const agora = new Date();

  const diferenca = dataFesta - agora;

  if (diferenca <= 0) {
    contador.innerHTML = "🎉 É hoje!";
    return;
  }

  const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diferenca / (1000 * 60 * 60)) % 24);
  const minutos = Math.floor((diferenca / (1000 * 60)) % 60);

  contador.innerHTML = `⏳ Faltam ${dias} dias, ${horas}h e ${minutos}min`;
}

setInterval(atualizarContador, 1000);
atualizarContador();

// criar nuvens subindo
function criarNuvem() {
  const nuvem = document.createElement("div");
  nuvem.classList.add("cloud");

  const tamanho = Math.random() * 80 + 90;
  const posicao = Math.random() * 100;
  const duracao = Math.random() * 10 + 18;
  const atraso = Math.random() * 4;

  nuvem.style.width = `${tamanho}px`;
  nuvem.style.height = `${tamanho * 0.4}px`;
  nuvem.style.left = `${posicao}%`;
  nuvem.style.animationDuration = `${duracao}s`;
  nuvem.style.animationDelay = `${atraso}s`;

  areaNuvens.appendChild(nuvem);

  setTimeout(() => {
    nuvem.remove();
  }, (duracao + atraso) * 1000);
}

setInterval(criarNuvem, 1800);

for (let i = 0; i < 8; i++) {
  criarNuvem();
}
