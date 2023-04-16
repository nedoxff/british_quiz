const fadeAndRedirect = (url, speed = 1000) => {
    /*anime({
       targets: 'body',
       backgroundColor: '#000000',
       duration: speed,
       easing: 'easeInOutQuad' 
    });

    anime({
        targets: '#button-container',
        opacity: 0,
        duration: speed,
        easing: 'easeInOutQuad'
    });
    
    anime({
        targets: '#content',
        opacity: 0,
        duration: speed,
        easing: 'easeInOutQuad'
    });*/
    
    anime({
        targets: 'body',
        opacity: 0,
        duration: speed,
        easing: 'easeInOutQuad',
        backgroundColor: '#000000',
        complete: () => {
            window.location.replace(url);
        }
    });

   /* anime({
        targets: '#bg',
        opacity: 0,
        duration: speed,
        easing: 'easeInOutQuad',
        
    });*/
}

document.addEventListener("DOMContentLoaded", () => {
    if($("body").attr("fadein") !== undefined) {
        const color = $("body").css('background-color');
        document.body.style.backgroundColor = "#000000";
        document.body.style.opacity = "0";
        anime({
            targets: 'body',
            opacity: 1,
            duration: 1000,
            easing: 'easeInOutQuad',
            backgroundColor: color,
        });
    } 
});