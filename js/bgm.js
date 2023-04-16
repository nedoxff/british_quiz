const COUNT = 2;
let current = localStorage.getItem("bgmIndex") == null ? 1: parseInt(localStorage.getItem("bgmIndex"));
let audio;
$(() => {
   if(current > COUNT)
      current = 1;
   $("body").prepend("<audio id='bgm' autoplay hidden='hidden'>");
   audio = $("#bgm")[0];
   audio.volume = 0.1;
   audio.addEventListener("ended", () => {
      current++;
      localStorage.setItem("bgmIndex", current);
      if(current === COUNT + 1)
         current = 1;
      audio.src = `../../assets/bgm/${current}.mp3`;
   });
   audio.src = `../../assets/bgm/${current}.mp3`;
   audio.play();
});

const fadeInBgm = (speed) => {
  anime({
     targets: audio,
     volume: 0.1,
     duration: speed,
     easing: 'easeInOutQuad'
  }); 
};

const fadeOutBgm = (speed) => {
   anime({
      targets: audio,
      volume: 0,
      duration: speed,
      easing: 'easeInOutQuad'
   });
};