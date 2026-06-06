const video = document.getElementById("videoConvite");
const botaoAudio = document.getElementById("playAudio");
const musica = document.getElementById("musicaFundo");
const contador = document.getElementById("contador");

video.muted = true;
video.play().catch(() => {});

botaoAudio.addEventListener("click", () => {
  video.muted = false;
  video.currentTime = 0;
  video.play();

  musica.volume = 0.08;
  musica.play().catch(() => {});

  botaoAudio.style.display = "none";
});

function atualizarContador() {
  const dataFesta = new Date("2026-07-09T15:00:00");
  const agora = new Date();

  const diferenca = dataFesta - agora;

  if (diferenca <= 0) {
    contador.innerHTML = "🎉 Chegou o grande dia!";
    return;
  }

  const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diferenca / (1000 * 60 * 60)) % 24);
  const minutos = Math.floor((diferenca / (1000 * 60)) % 60);

  contador.innerHTML = `⏳ Faltam ${dias} dias, ${horas}h e ${minutos}min`;
}

setInterval(atualizarContador, 1000);
atualizarContador();
