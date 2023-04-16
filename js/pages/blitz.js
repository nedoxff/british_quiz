let controller;
$(() => {
    controller = new BlitzController();
});

const AMOUNT = 25;
let index = 1;

class BlitzController {
    questions;
    text;
    a;
    b;
    c;
    d;

    constructor() {
        this.text = $("#question")[0];
        this.a = $("#a")[0];
        this.b = $("#b")[0];
        this.c = $("#c")[0];
        this.d = $("#d")[0];
        fetch('../../assets/blitz.json',).then(r => r.json().then(x => this.questions = x));
    }

    setQuestion()
    {
        const question = this.questions[index - 1];

        this.text.innerText = question.q;
        this.a.innerText = question.a;
        this.b.innerText = question.b;
        this.c.innerText = question.c;
        this.d.innerText = question.d;
        $(".answer").css("opacity", "0");
    }
    
    show() {
        anime({
            targets: '#content',
            duration: 250,
            easing: "easeInOutQuad",
            opacity: 1,
            complete: () => {
                anime({
                   targets: "#answers-container .answer",
                   opacity: 1,
                    delay: anime.stagger(1000, {start: 1000}),
                    complete: () => {
                       timer.start(10000);
                    }
                });
            }
        });
    }
    
    switch()
    {
        switchQuestion(() => {
            timer.object.innerText = "00:10";
            index++;
            if (index === AMOUNT + 1)
                fadeAndRedirect(`../pause.html`);
            else
                this.setQuestion();
        }, () => {
            if (index !== AMOUNT + 1)
                this.show();
        }, index + 1 !== AMOUNT + 1);
    }
}