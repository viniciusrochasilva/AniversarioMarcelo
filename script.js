const video = document.getElementById("videoConvite");
const capa = document.getElementById("capaVideo");
const botaoAudio = document.getElementById("playAudio");
const musica = document.getElementById("musicaFundo");
const contador = document.getElementById("contador");
const areaNuvens = document.getElementById("nuvens");

video.loop = false;
video.controls = false;
video.pause();

botaoAudio.addEventListener("click", () => {
  capa.style.display = "none";
  video.style.display = "block";

  video.pause();
  video.currentTime = 0;
  video.muted = false;

  video.play().catch(() => {});

  musica.volume = 0.02;
  musica.play().catch(() => {});
});

video.addEventListener("ended", () => {
  video.pause();
  video.currentTime = 0;

  video.style.display = "none";
  capa.style.display = "block";
});

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

setInterval(criarNuvem, 1600);

for (let i = 0; i < 10; i++) {
  criarNuvem();
}
