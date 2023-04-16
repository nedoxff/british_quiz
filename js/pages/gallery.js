let id, redirect, count, slide = 0;

$(() => {
    const query = new URLSearchParams(window.location.search);
    id = query.get("id");
    redirect = query.get("redirect");
    count = parseInt(query.get("count"));

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