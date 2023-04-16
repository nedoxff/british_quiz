const hints = [
    "It's a type of bird.",
    "It's a type of structure.",
    "You use it when doing a certain outdoor activity.",
    "It's a hard, round toy.",
    "It's a kind of food.",
    "It helps prevent injuries.",
    "It's something you can eat.",
    "You hold it above you.",
    "It's round.",
    "It's an insect",
    "It improves your eyesight.",
    "It's an animal that can't walk.",
    "It can be turned into butter.",
    "It's a tool you use to smash nails.",
    "It's typically pink colored.",
    "It's an electronic device.",
    "It's round and most often white.",
    "It's a nut that you can't eat.",
    "It falls from palm trees.",
    "You have it in your body."
];

const answers = [
    "a pigeon",
    "a windmill",
    "a helmet",
    "a marble",
    "cheese",
    "a seat belt",
    "popcorn",
    "an umbrella",
    "a button",
    "a grasshopper",
    "glasses",
    "a frog",
    "a peanut",
    "a hammer",
    "a flamingo",
    "headphones",
    "a golf ball",
    "an acorn",
    "a coconut",
    "a skull"
];

let index = 1;
const AMOUNT = 20;

const unblurHint = () => {
    anime({
        targets: '#hint',
        filter: 'blur(0px)',
        duration: 500,
        easing: 'easeInOutQuad'
    });
}

const showAnswer = () => {
    anime({
        targets: '#content',
        opacity: 0,
        easing: 'easeInOutQuad',
        duration: 250,
        complete: () => {
            $("#hint").css("opacity", "0");
            $("#image")[0].src = `../assets/guess/${index}a.jpg`;
            $("#question")[0].innerText = `It's ${answers[index - 1]}!`;
            anime({
                targets: '#content',
                opacity: 1,
                easing: 'easeInOutQuad',
                duration: 250,
                complete: () => {
                    setTimeout(() => {
                        switchQuestion(() => {
                            $("#question")[0].innerText = "What is shown on the picture?";
                            
                            index++;
                            if (index === AMOUNT + 1)
                                fadeAndRedirect(`wait.html`);
                            else
                                setData();
                        }, () => {
                        }, index + 1 !== AMOUNT + 1);
                    }, 5000);
                }
            })
        }
    });
}

const setData = () => {
    $("#image")[0].src = `../assets/guess/${index}.jpg`;
    $("#hint")[0].innerText = hints[index - 1];
    $("#hint").css("opacity", "1");
    $("#hint").css("filter", "blur(10px)");
}