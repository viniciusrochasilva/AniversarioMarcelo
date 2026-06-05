const cloudsContainer = document.querySelector('.clouds');
const totalClouds = 18;

function createCloud(index) {
  const cloud = document.createElement('span');
  cloud.className = 'cloud';

  const size = 70 + Math.random() * 120;
  const left = Math.random() * 100;
  const duration = 12 + Math.random() * 16;
  const delay = -(Math.random() * duration);
  const drift = (Math.random() * 120 - 60).toFixed(0) + 'px';
  const opacity = 0.22 + Math.random() * 0.32;

  cloud.style.left = `${left}%`;
  cloud.style.setProperty('--size', `${size}px`);
  cloud.style.setProperty('--duration', `${duration}s`);
  cloud.style.setProperty('--delay', `${delay}s`);
  cloud.style.setProperty('--drift', drift);
  cloud.style.setProperty('--opacity', opacity.toFixed(2));

  cloudsContainer.appendChild(cloud);
}

for (let i = 0; i < totalClouds; i++) {
  createCloud(i);
}

const video = document.getElementById('inviteVideo');

video.addEventListener('play', () => {
  video.controls = true;
});
