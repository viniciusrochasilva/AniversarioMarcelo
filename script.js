const cloudsContainer = document.querySelector('.clouds');
const totalClouds = 20;

function createCloud() {
  const cloud = document.createElement('span');
  cloud.className = 'cloud';

  const size = 70 + Math.random() * 130;
  const left = Math.random() * 100;
  const duration = 13 + Math.random() * 18;
  const delay = -(Math.random() * duration);
  const drift = (Math.random() * 120 - 60).toFixed(0) + 'px';
  const opacity = 0.20 + Math.random() * 0.30;

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

function playVideo() {
  video.muted = true;
  video.controls = false;
  const playPromise = video.play();
  if (playPromise && typeof playPromise.catch === 'function') {
    playPromise.catch(() => {
      // Alguns navegadores só liberam após o primeiro toque na tela.
    });
  }
}

video.addEventListener('contextmenu', (event) => event.preventDefault());
video.addEventListener('loadeddata', playVideo);
document.addEventListener('DOMContentLoaded', playVideo);
window.addEventListener('pageshow', playVideo);

/*
  Canção de fundo baixinha gerada pelo próprio navegador.
  Observação: celulares e navegadores podem bloquear áudio automático.
  Por isso, o código tenta iniciar sozinho e também libera no primeiro toque/clique na tela.
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
  masterGain.gain.value = 0.035;
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
      noteGain.gain.linearRampToValueAtTime(0.22, audioContext.currentTime + 0.08);
      noteGain.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.70);

      osc.connect(noteGain);
      noteGain.connect(masterGain);
      osc.start();
      osc.stop(audioContext.currentTime + 0.76);
    }

    setTimeout(playNote, 850);
  }

  audioContext.resume().then(playNote).catch(() => {
    musicStarted = false;
  });
}

startBackgroundMusic();
document.addEventListener('click', startBackgroundMusic, { once: true });
document.addEventListener('touchstart', startBackgroundMusic, { once: true });
document.addEventListener('keydown', startBackgroundMusic, { once: true });
