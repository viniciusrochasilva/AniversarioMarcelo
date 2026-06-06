const cloudsContainer = document.querySelector('.clouds');
const totalClouds = 28;

function createCloud() {
  const cloud = document.createElement('span');
  cloud.className = 'cloud';

  const size = 55 + Math.random() * 125;
  const left = Math.random() * 100;
  const duration = 10 + Math.random() * 16;
  const delay = -(Math.random() * duration);
  const drift = `${Math.random() * 130 - 65}px`;
  const opacity = 0.22 + Math.random() * 0.32;

  cloud.style.left = `${left}%`;
  cloud.style.setProperty('--size', `${size}px`);
  cloud.style.setProperty('--duration', `${duration}s`);
  cloud.style.setProperty('--delay', `${delay}s`);
  cloud.style.setProperty('--drift', drift);
  cloud.style.setProperty('--opacity', opacity.toFixed(2));

  cloudsContainer.appendChild(cloud);
}

for (let i = 0; i < totalClouds; i++) createCloud();

const video = document.getElementById('inviteVideo');
const audioButton = document.getElementById('audioButton');
const countdown = document.getElementById('countdown');

function playMutedVideo() {
  video.muted = true;
  video.volume = 1;
  video.controls = false;
  video.play().catch(() => {});
}

function hearMarcelinho() {
  video.currentTime = 0;
  video.muted = false;
  video.volume = 1;
  video.controls = false;
  video.play().catch(() => {});
  startBackgroundMusic();
  audioButton.textContent = '🔊 Áudio ativado';
  setTimeout(() => audioButton.classList.add('hidden'), 1200);
}

video.addEventListener('contextmenu', (event) => event.preventDefault());
video.addEventListener('loadeddata', playMutedVideo);
document.addEventListener('DOMContentLoaded', playMutedVideo);
window.addEventListener('pageshow', playMutedVideo);
audioButton.addEventListener('click', hearMarcelinho);

// Contador regressivo para 09/07/2026 às 15h.
function updateCountdown() {
  const partyDate = new Date(2026, 6, 9, 15, 0, 0); // mês 6 = julho
  const now = new Date();
  const diff = partyDate - now;

  if (diff <= 0) {
    countdown.textContent = '🎉 Chegou o grande dia!';
    return;
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  countdown.textContent = `Faltam ${days} dias, ${hours}h ${minutes}min ${seconds}s 🎈`;
}

updateCountdown();
setInterval(updateCountdown, 1000);

/*
  Música de fundo baixinha gerada pelo próprio navegador.
  Importante: navegadores bloqueiam áudio automático sem interação.
  Por isso, a música e a voz são liberadas quando a pessoa toca no botão.
*/
let musicStarted = false;
let audioContext;
let masterGain;

const melody = [
  392, 440, 494, 440, 392, 330, 392, 440,
  392, 330, 294, 330, 392, 0, 330, 392
];

function startBackgroundMusic() {
  if (musicStarted) return;
  musicStarted = true;

  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return;

  audioContext = new AudioContextClass();
  masterGain = audioContext.createGain();
  masterGain.gain.value = 0.025;
  masterGain.connect(audioContext.destination);

  let index = 0;

  function playNote() {
    if (!audioContext || audioContext.state === 'closed') return;

    const freq = melody[index % melody.length];
    index += 1;

    if (freq > 0) {
      const osc = audioContext.createOscillator();
      const noteGain = audioContext.createGain();

      osc.type = 'sine';
      osc.frequency.value = freq;

      noteGain.gain.setValueAtTime(0, audioContext.currentTime);
      noteGain.gain.linearRampToValueAtTime(0.18, audioContext.currentTime + 0.08);
      noteGain.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.72);

      osc.connect(noteGain);
      noteGain.connect(masterGain);
      osc.start();
      osc.stop(audioContext.currentTime + 0.78);
    }

    setTimeout(playNote, 900);
  }

  audioContext.resume().then(playNote).catch(() => {
    musicStarted = false;
  });
}
