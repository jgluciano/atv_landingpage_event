const dataDoEvento = new Date("Mar 12, 2024 19:00:00");
const timeStampEvento = dataDoEvento.getTime();

const contaAsHoras = setInterval(function () {
  const agora = new Date();
  const timeStampAtual = agora.getTime();

  const distanciaAteEvento = timeStampEvento - timeStampAtual;
  const diasMs = 1000 * 60 * 60 * 24;
  const horasMs = 1000 * 60 * 60;
  const minutosMs = 1000 * 60;

  const diasAteEvento = Math.floor(distanciaAteEvento / (diasMs));
  const horasAteEvento = Math.floor((distanciaAteEvento % diasMs) / (horasMs));
  const minutosAteEvento = Math.floor((distanciaAteEvento % horasMs) / (minutosMs));
  const segundosAteEvento = Math.floor((distanciaAteEvento % minutosMs) / 1000);

  document.getElementById('counter').innerHTML = `${diasAteEvento}d ${horasAteEvento}h ${minutosAteEvento}m ${segundosAteEvento}s`
  document.getElementById('counter-text').innerHTML = 'A maratona começa em:&nbsp;';

  if (distanciaAteEvento <= 0) {
    clearInterval(contaAsHoras);
    document.getElementById('counter-text').innerHTML = 'A maratona&nbsp;';
    document.getElementById('counter').innerHTML = 'ja iniciou!'
  }

}, 1000);

setTimeout(function() {
  AOS.init();
}, 1000);

function smoothScroll(target, duration) {
  var targetElement = document.querySelector(target);
  var targetPosition = targetElement.offsetTop;
  var startPosition = window.pageYOffset;
  var distance = targetPosition - startPosition;
  var startTime = null;

  function animation(currentTime) {
      if (startTime === null) startTime = currentTime;
      var timeElapsed = currentTime - startTime;
      var run = ease(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
  }

  function ease(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t + b;
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
  }

  requestAnimationFrame(animation);
}

var links = document.querySelectorAll('.smooth-scroll');
links.forEach(link => {
  link.addEventListener('click', function(e) {
      e.preventDefault();
      var target = this.getAttribute('href');
      var duration = 1000;
      smoothScroll(target, duration);
  });
});