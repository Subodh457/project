let highestZ = 1;

class Paper {
  constructor(paper) {
    this.paper = paper;
    this.holdingPaper = false;
    this.touchStartX = 0;
    this.touchStartY = 0;
    this.currentPaperX = 0;
    this.currentPaperY = 0;
    this.prevTouchX = 0;
    this.prevTouchY = 0;
    this.velX = 0;
    this.velY = 0;
    this.rotation = Math.random() * 30 - 15;

    this.init();
  }

  init() {
    // 🖱 Mouse Drag Events
    this.paper.addEventListener("mousedown", this.startDrag.bind(this));
    document.addEventListener("mousemove", this.dragMove.bind(this));
    document.addEventListener("mouseup", this.endDrag.bind(this));

    // 📱 Touch Drag Events (Mobile)
    this.paper.addEventListener("touchstart", this.startDrag.bind(this), { passive: false });
    document.addEventListener("touchmove", this.dragMove.bind(this), { passive: false });
    document.addEventListener("touchend", this.endDrag.bind(this));

    // Prevents text selection while dragging
    this.paper.style.userSelect = "none";
    this.paper.style.touchAction = "none";
  }

  startDrag(event) {
    event.preventDefault();
    this.holdingPaper = true;

    // Set z-index to bring the dragged paper to front
    this.paper.style.zIndex = highestZ;
    highestZ++;

    // Detect touch or mouse event
    let clientX = event.touches ? event.touches[0].clientX : event.clientX;
    let clientY = event.touches ? event.touches[0].clientY : event.clientY;

    this.touchStartX = clientX;
    this.touchStartY = clientY;
    this.prevTouchX = this.touchStartX;
    this.prevTouchY = this.touchStartY;
  }

  dragMove(event) {
    if (!this.holdingPaper) return;

    event.preventDefault();

    let clientX = event.touches ? event.touches[0].clientX : event.clientX;
    let clientY = event.touches ? event.touches[0].clientY : event.clientY;

    this.velX = clientX - this.prevTouchX;
    this.velY = clientY - this.prevTouchY;

    this.currentPaperX += this.velX;
    this.currentPaperY += this.velY;

    this.prevTouchX = clientX;
    this.prevTouchY = clientY;

    // Move the paper
    this.paper.style.transform = `translate(${this.currentPaperX}px, ${this.currentPaperY}px) rotate(${this.rotation}deg)`;
  }

  endDrag() {
    this.holdingPaper = false;
  }
}

// 📝 Apply to all paper elements
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".paper").forEach((paperElement) => {
    new Paper(paperElement);
  });

  // 🎵 Background Music Autoplay
  let audio = document.getElementById("bg-music");
  
  // Try autoplay
  audio.play().catch(() => {
    console.log("Autoplay blocked. Waiting for user interaction...");
  });

  // Play on user interaction if blocked
  document.addEventListener("click", function () {
    if (audio.paused) {
      audio.play();
    }
  });
});
