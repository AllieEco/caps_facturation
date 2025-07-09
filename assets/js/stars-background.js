// Effet d'étoiles qui flottent doucement dans le fond du site, avec des lignes reliant les étoiles proches
(function() {
  const STAR_COLORS = ['#fff', '#e0e6ff', '#b3c6ff'];
  const STAR_MIN_SIZE = 1.2;
  const STAR_MAX_SIZE = 3.2;
  const STAR_COUNT = 80;
  const LINE_DISTANCE = 140; // galaxies plus grandes
  const LINE_COLOR = 'rgba(230,240,255,0.28)';
  const LINE_WIDTH = 1.2;

  let stars = [];
  let canvas, ctx, width, height, animationId;
  let startTime = Date.now();

  function randomBetween(a, b) {
    return a + Math.random() * (b - a);
  }

  function createStar() {
    const baseX = Math.random() * width;
    const baseY = Math.random() * height;
    return {
      baseX,
      baseY,
      x: baseX,
      y: baseY,
      size: randomBetween(STAR_MIN_SIZE, STAR_MAX_SIZE),
      color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
      opacity: randomBetween(0.7, 1),
      angle: Math.random() * Math.PI * 2,
      radius: randomBetween(4, 18),
      speed: randomBetween(0.15, 0.35)
    };
  }

  function resizeCanvas() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    for (let star of stars) {
      star.baseX = Math.random() * width;
      star.baseY = Math.random() * height;
    }
  }

  function drawStars() {
    ctx.clearRect(0, 0, width, height);
    // Lignes entre étoiles proches
    for (let i = 0; i < stars.length; i++) {
      for (let j = i + 1; j < stars.length; j++) {
        const dx = stars[i].x - stars[j].x;
        const dy = stars[i].y - stars[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < LINE_DISTANCE) {
          ctx.save();
          ctx.globalAlpha = 0.7 * (1 - dist / LINE_DISTANCE);
          ctx.strokeStyle = LINE_COLOR;
          ctx.lineWidth = LINE_WIDTH;
          ctx.beginPath();
          ctx.moveTo(stars[i].x, stars[i].y);
          ctx.lineTo(stars[j].x, stars[j].y);
          ctx.stroke();
          ctx.restore();
        }
      }
    }
    // Étoiles
    for (let star of stars) {
      ctx.globalAlpha = star.opacity;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, 2 * Math.PI);
      ctx.fillStyle = star.color;
      ctx.shadowColor = star.color;
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
    ctx.globalAlpha = 1;
  }

  function updateStars(time) {
    for (let star of stars) {
      const t = (time / 1000) * star.speed + star.angle;
      star.x = star.baseX + Math.cos(t) * star.radius;
      star.y = star.baseY + Math.sin(t * 0.7) * (star.radius * 0.7);
    }
  }

  function animate() {
    const now = Date.now() - startTime;
    updateStars(now);
    drawStars();
    animationId = requestAnimationFrame(animate);
  }

  function init() {
    canvas = document.createElement('canvas');
    canvas.className = 'stars-bg-canvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '0';
    document.body.prepend(canvas);
    ctx = canvas.getContext('2d');
    resizeCanvas();
    stars = Array.from({length: STAR_COUNT}, createStar);
    window.addEventListener('resize', resizeCanvas);
    animate();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})(); 