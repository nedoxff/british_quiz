switchQuestion = (callback, afterCallback = null, fadeIn = true, duration = 500) =>
{
    anime({
        targets: '#content',
        opacity: 0,
        duration: duration,
        easing: "easeInOutQuad",
        complete: () => {
            callback();
            if(fadeIn) {
                anime({
                    targets: '#content',
                    opacity: 1,
                    duration: duration,
                    easing: "easeInOutQuad",
                    complete: () => {
                        if (afterCallback != null)
                            afterCallback();
                    }
                });
            }
        }
    })
};