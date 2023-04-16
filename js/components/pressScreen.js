const event = new Event("roundStart");
$(() => {
    $("body").prepend(`
    <div id="start-overlay">
    <h1 id="start-text">Tap to start the round!</h1>
</div>
    `);
    
    $("#start-overlay").click(() => {
        anime({
            targets: '#start-overlay',
            opacity: 0,
            duration: 250,
            easing: 'easeInOutQuad',
            complete: () => {
                $("#start-overlay").css("display", "none");
                $("body")[0].dispatchEvent(event);
            }
        });
    });
});