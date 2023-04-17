const AMOUNT = 13;
let index = 1;

let visualizer;
$(() => {
    visualizer = new AudioVisualizer();
})

class AudioVisualizer {
    #audio;
    #visualizer;
    #canvas;
    #vinyl;
    #vinylRotateAnimation;

    constructor() {
        this.#audio = $("#audio")[0];
        this.#audio.addEventListener("ended", () => {
            this.#vinylRotateAnimation.pause();
            const turn = this.#vinyl.style.transform.replace(/[^\d.]/g, '') + "turn"
            anime({
                targets: '#vinyl',
                easing: 'easeInOutQuad',
                duration: 3000,
                keyframes: [
                    {rotateZ: turn},
                    {rotateZ: '1turn'}
                ],
                complete: () => {
                    index++;
                    if(index === AMOUNT + 1)
                        fadeAndRedirect(`../gallery.html?id=characterTutorial`);
                    else
                        this.play();
                }
            });
        });
        this.#visualizer = $("#visualizer");
        this.#canvas = this.#visualizer[0];
        this.#canvas.width = this.#visualizer.width();
        this.#canvas.height = this.#visualizer.height();

        this.#vinyl = $("#vinyl")[0];
        this.#vinylRotateAnimation = anime({
            targets: '#vinyl',
            easing: 'linear',
            duration: 15000,
            rotateZ: '1turn',
            loop: true,
            autoplay: false
        });
    }
    
    play()
    {
        this.#audio.src = `../../assets/music/${index}.mp3`;
        this.#audio.load();
        this.#vinylRotateAnimation.seek(0);
        this.#vinylRotateAnimation.play();
        this.visualize();
    }
    
    pause()
    {
        this.#audio.pause();
        this.#vinylRotateAnimation.pause();
    }
    
    resume()
    {
        this.#audio.play();
        this.#vinylRotateAnimation.play();
    }

    visualize() {
        {
            this.#audio.play();
            this.#vinylRotateAnimation.play();
            const context = new AudioContext();
            const src = context.createMediaElementSource(this.#audio);
            const analyser = context.createAnalyser();

            const ctx = this.#canvas.getContext("2d");

            src.connect(analyser);
            analyser.connect(context.destination);

            analyser.fftSize = 256;

            const bufferLength = analyser.frequencyBinCount;

            const dataArray = new Uint8Array(bufferLength);

            const WIDTH = this.#canvas.width;
            const HEIGHT = this.#canvas.height;

            const barWidth = (WIDTH / bufferLength) * 2.5;
            let barHeight;
            let x = 0;

            function renderFrame() {
                requestAnimationFrame(renderFrame);
                x = 0;

                analyser.getByteFrequencyData(dataArray);
                
                ctx.clearRect(0, 0, WIDTH, HEIGHT);


                for (let i = 0; i < bufferLength; i++) {
                    barHeight = scale(dataArray[i], 0, 255, 0, HEIGHT);

                    ctx.fillStyle = "rgba(255,255,255,0.55)";
                    ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

                    x += barWidth;
                }
            }

            this.#audio.play();
            renderFrame();
        }
    }
}

const scale = (number, inMin, inMax, outMin, outMax) => {
    return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}