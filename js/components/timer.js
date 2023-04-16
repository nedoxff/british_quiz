class Timer
{
    #targetDate;
    #pausedDistance;
    #intervalId;
    object;
    #paused;
    stoppedEvent;
    tickEvent;
    
    constructor()
    {
        this.object = $("#timer")[0]; // supposed to be h1
        this.stoppedEvent = new Event("timerStopped");
        this.tickEvent = new CustomEvent("timerTick");
    }
    
    start(time)
    {
        const now = new Date().getTime();
        this.#targetDate = new Date(now + time);
        this.#update();
        this.#intervalId = setInterval(() => this.#update(), 1000);
    }
    
    #update()
    {
        if(this.#paused) return;
        const distance = this.#targetDate.getTime() - new Date().getTime();
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.round((distance % (1000 * 60)) / 1000);
        if(minutes === -1 || seconds === -1 || distance <= 0) {
            this.stop();
            return;
        }
        this.object.innerText = `${(minutes < 10 ? '0': '')}${minutes}:${(seconds < 10 ? '0': '')}${seconds}`;
        
        this.tickEvent.ms = distance;
        this.object.dispatchEvent(this.tickEvent);
    }
    
    stop()
    {
        this.object.innerText = "00:00";
        clearInterval(this.#intervalId);
        this.object.dispatchEvent(this.stoppedEvent);   
    }
    
    pause()
    {
        this.#pausedDistance = this.#targetDate.getTime() - new Date().getTime();
        this.#paused = true;
    }
    
    unpause()
    {
        this.#targetDate = new Date(new Date().getTime() + this.#pausedDistance);
        this.#paused = false;
    }
    
    isRunning()
    {
        return this.#targetDate.getTime() - new Date().getTime() > 0 && !this.#paused;
    }
}

let timer;
$(() => {
    timer = new Timer();
})