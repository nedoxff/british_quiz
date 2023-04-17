let id, redirect, count, slide = 0;

const length = {
    "start": 5,
    "musicTutorial": 3,
    "movieTutorial": 3,
    "idiomsTutorial": 4,
    "characterTutorial": 3,
    "blitzTutorial": 2
};

const redirects = {
    "start": "gallery.html?id=movieTutorial",
    "musicTutorial": "tours/music.html",
    "movieTutorial": "tours/film.html",
    "idiomsTutorial": "tours/idiom.html",
    "characterTutorial": "tours/character.html",
    "blitzTutorial": "tours/blitz.html"
};


$(() => {
    const query = new URLSearchParams(window.location.search);
    id = query.get("id");
    redirect = redirects[id];
    count = length[id];

    $("#image").attr("src", `../assets/gallery/${id}/${0}.png`);
    $("#previous").attr("disabled", "disabled");

    $("#next").click(next);

    $("#previous").click(previous);
    
    $("body").keydown((e) => {
        const code = e.keyCode || e.which;
        if(code === 37)
            previous();
        else if(code === 39)
            next();
    });
});

const previous = () => {
    if(slide === 0) return;
    slide--;
    $("#image").attr("src", `../assets/gallery/${id}/${slide}.png`);
    if (slide === 0)
        $("#previous").attr("disabled", "disabled");
};

const next = () => {
    if (slide + 1 === count)
        fadeAndRedirect(redirect, 1000);
    else {
        slide++;
        $("#image").attr("src", `../assets/gallery/${id}/${slide}.png`);
        if (slide !== 0)
            $("#previous").removeAttr("disabled");
    }
}