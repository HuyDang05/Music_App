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
