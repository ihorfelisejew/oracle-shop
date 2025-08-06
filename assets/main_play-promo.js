document.addEventListener("DOMContentLoaded", function () {
  const videoBlock = document.querySelector(".video-block__content");
  const video = videoBlock.querySelector("video");
  const playButton = videoBlock.querySelector(".video-block__play");
  playButton.addEventListener("click", function () {
    playButton.style.display = "none";
    video.play();
  });
});
//# sourceMappingURL=main_play-promo.js.map
