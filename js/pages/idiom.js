const HINT_ANIMATION_DURATION = 500;
const AMOUNT = 10;

let controller;
$(() => {
    controller = new IdiomController();
})
let index = 1;
const hints = ["👎🥚", "👩👈👶🥣🫘", "🕐❔🐖✈️", "🗣😈", "🆒🥒", "🔽☔️", "💨🚬", "💔🦵", "🐺🐑👚", "☔️🐈🐕"];

class IdiomController
{
    #hint;
    #image;
    constructor()
    {
        const timer = $("#timer")[0];
        this.#hint = $("#idiom-hint")[0];
        this.#image = $("#idiom")[0];
        timer.addEventListener("timerTick", (e) => {
            if(e.ms <= 10000)
                this.#showHint();
        });
    }
    
    #showHint()
    {
        this.#hint.innerText = hints[index - 1];
        anime({
            targets: '#idiom-hint',
            opacity: 1,
            duration: HINT_ANIMATION_DURATION,
            easing: 'easeInOutQuad'
        });
    }
    
    switch()
    {
        switchQuestion(() => {
            this.#hint.style.opacity = "0";
            timer.object.innerText = "00:30";
            index++;
            if(index === AMOUNT + 1)
                fadeAndRedirect(`../gallery.html?id=musicTutorial&count=1&redirect=${encodeURI("tours/music.html")}`);
            else
                this.#image.src = `../../assets/idioms/${index}.jpg`;
        }, () => {
            timer.start(30000);
        }, index + 1 !== AMOUNT + 1);
    }
}