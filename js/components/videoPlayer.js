let video;
let questionIndex = 1;
const videoCount = 14;
$(() => {
    video = new VideoPlayer();
})

class VideoPlayer {
    player;
    constructor() {
        this.player = $("#video")[0];
        this.player.src = `../../assets/videos/${questionIndex}.mp4`;
        this.player.addEventListener("ended", () => this.zoomOut());
    }

    zoomAndPlay() {
        fadeOutBgm(1000);
        anime({
            targets: '#video',
            width: '100vw',
            duration: 1000,
            easing: 'easeInOutQuad',
            borderRadius: 0,
            complete: () => this.player.play()
        });
    }

    zoomOut() {
        timer.object.innerText = "00:05";
        fadeInBgm(1000);
        anime({
            targets: '#video',
            width: '35vw',
            duration: 1000,
            borderRadius: 20,
            easing: 'easeInOutQuad',
            complete: () => timer.start(5000)
        });
    }

    switch() {
        switchQuestion(() => {
            timer.object.innerText = "00:05";
            questionIndex++;
            if (questionIndex === videoCount + 1)
                fadeAndRedirect(`../gallery.html?id=idiomsTutorial&count=1&redirect=${encodeURI("tours/idiom.html")}`);
            else
                this.player.src = `../../assets/videos/${questionIndex}.mp4`;
        }, () => {
            if (questionIndex !== videoCount + 1)
                this.zoomAndPlay();
        }, questionIndex + 1 !== videoCount + 1);
    }
}