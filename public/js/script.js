// APlayer
const aplayer = document.querySelector("#aplayer");

if (aplayer) {
  let dataSong = aplayer.getAttribute("data-song");
  dataSong = JSON.parse(dataSong);

  let dataSinger = aplayer.getAttribute("data-singer");
  dataSong = JSON.parse(dataSinger);

  const ap = new APlayer({
    container: aplayer,
    audio: [{
        name: dataSong.title,
        artist: dataSinger.fullName,
        url: dataSong.audio,
        cover: dataSong.avatar
    }],
    autoplay: true
  });

  const avatar = document.querySelector(".singer-detail .inner-avatar");

  ap.on('play', function () {
    avatar.computedStyleMap.animationPlayState = "running";
  });

  ap.on('pause', function () {
    avatar.computedStyleMap.animationPlayState = "paused";
  })
}
// End APlayer

// Button Like
const buttonLike = document.querySelector("[button-like]");
if (buttonLike) {
  buttonLike.addEventListener("click", () => {
    const idSong = buttonLike.getAttribute("button-like");
    const isActive = buttonLike.classList.contains("active");
     
    const typeLike = isActive ? "dislike" : "like";

    const option = {
      method:  "PATCH"
    }

    const link = `/songs/like/${typeLike}/${idSong}`;

    fetch(link, option)
      .then(res => res.json())
      .then(data => {
        const span = buttonLike.querySelector("span");
        span.innerHTML = `${data.like} thích`;

        buttonLike.classList.toggle("active");
      });
  });
};
// End Button Like

