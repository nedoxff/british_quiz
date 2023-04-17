const AMOUNT = 10;
let index = 1;
let image;
$(() => {
    image = $("#character")[0];
})
const next = () => {
    switchQuestion(() => {
        timer.object.innerText = "00:15";
        index++;
        if (index === AMOUNT + 1)
            fadeAndRedirect(`../gallery.html?id=blitzTutorial`);
        else
            image.src = `../../assets/character/${index}.jpg`;
    }, () => {
        if (index !== AMOUNT + 1)
            timer.start(15000);
    }, index + 1 !== AMOUNT + 1);
};