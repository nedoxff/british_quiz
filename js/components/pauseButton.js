
let pauseButton;
$(() => {
    pauseButton = new PauseButton();
})

class PauseButton
{
    #paused = false;
    #overlay;
    onPause;
    onUnpause;
    constructor() {
        $("body").prepend(`
<div id="pause-overlay">
<span class="wavy">P</span>
<span class="wavy">a</span>
<span class="wavy">u</span>
<span class="wavy">s</span>
<span class="wavy">e</span>
<span class="wavy">d</span>
</div>
<button id='pause-button'>||</button>`);
        this.#overlay = $("#pause-overlay");
        $("#pause-button").click(() => this.#trigger());
        $("body").keypress((e) => {
            const code = e.keyCode || e.which;
            if(code === 32)
                this.#trigger();
        });
    }    
    
    #trigger()
    {
        if(!this.#paused)
        {
            this.#paused = true;
            this.#overlay.css("display", "flex");
            this.onPause();
        }
        else
        {
            this.#paused = false;
            this.#overlay.css("display", "none");
            this.onUnpause();
        }
    }
}