let highestZ = 1;

class Paper {
  constructor(paper) {
    this.paper = paper;
    this.holdingPaper = false;
    this.currentX = 0;
    this.currentY = 0;
    this.startX = 0;
    this.startY = 0;
    this.prevX = 0;
    this.prevY = 0;
    this.velX = 0;
    this.velY = 0;
    this.rotation = Math.random() * 30 - 15;

    this.init();
  }

  init() {
    this.paper.style.touchAction = "none"; // Prevent background scrolling

    this.paper.addEventListener("mousedown", (e) => this.startDrag(e));
    document.addEventListener("mousemove", (e) => this.dragMove(e));
    document.addEventListener("mouseup", () => this.endDrag());

    this.paper.addEventListener("touchstart", (e) => this.startDrag(e), { passive: false });
    document.addEventListener("touchmove", (e) => this.dragMove(e), { passive: false });
    document.addEventListener("touchend", () => this.endDrag());
  }

  startDrag(e) {
    e.preventDefault();
    this.holdingPaper = true;
    this.paper.style.zIndex = highestZ++;
    let clientX = e.touches ? e.touches[0].clientX : e.clientX;
    let clientY = e.touches ? e.touches[0].clientY : e.clientY;

    this.startX = clientX;
    this.startY = clientY;
    this.prevX = clientX;
    this.prevY = clientY;
  }

  dragMove(e) {
    if (!this.holdingPaper) return;

    e.preventDefault();
    let clientX = e.touches ? e.touches[0].clientX : e.clientX;
    let clientY = e.touches ? e.touches[0].clientY : e.clientY;

    this.velX = clientX - this.prevX;
    this.velY = clientY - this.prevY;
    this.currentX += this.velX;
    this.currentY += this.velY;

    this.prevX = clientX;
    this.prevY = clientY;

    this.paper.style.transform = `translate(${this.currentX}px, ${this.currentY}px) rotate(${this.rotation}deg)`;
  }

  endDrag() {
    this.holdingPaper = false;
  }
}

// Apply script to all papers
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".paper").forEach((paper) => new Paper(paper));

  // 🎵 Auto Play Music Fix for Mobile
  let audio = document.getElementById("bg-music");
  
  audio.play().catch(() => console.log("Autoplay blocked, waiting for user interaction."));
  
  document.addEventListener("click", () => {
    if (audio.paused) audio.play();
  });
  
  document.addEventListener("touchstart", () => {
    if (audio.paused) audio.play();
  });
});
