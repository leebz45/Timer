class Timer{
    constructor(durationInput,startButton,pauseButton,callbacks){
        this.durationInput = durationInput;
        this.startButton = startButton;
        this.pauseButton = pauseButton;
        if(callbacks){
            this.onStart = callbacks.onStart;
            this.onTick = callbacks.onTick;
            this.onComplete = callbacks.onComplete;
            this.onStop = callbacks.onStop;
        }

        this.startButton.addEventListener("click",this.start);
        this.pauseButton.addEventListener("click",this.pause);

        this.durationInput.addEventListener("focus",this.durationOnFocus);
        this.durationInput.addEventListener("keydown",this.durationOnKeyDown);
    }

    start = () => {
        // if already running - stop;
        if(this.interval) this.stop();
        else if(isNaN(this.timeRemaining)) alert("Not a number!");
        else {
            // if paused continue where we left off;
            if(!this.paused && this.onStart){
                this.onStart(this.timeRemaining);
            }
            this.tick();
            this.interval = setInterval(this.tick,10);
            //this.startButton.innerHTML = "<i class='fas fa-stop'></i>";
            let icon = this.startButton.children[0];
            if(icon) icon.classList.replace("fa-play","fa-stop");
    }
    };

    pause = () => {
        clearInterval(this.interval);
        this.interval = null;
        this.paused = true;
        let icon = this.startButton.children[0];
        if(icon) icon.classList.replace("fa-stop","fa-play");
    };

    stop = () => {
        clearInterval(this.interval);
        this.interval = null;
        this.timeRemaining = 0;
        this.paused = null;
        let icon = this.startButton.children[0];
        if(icon) icon.classList.replace("fa-stop","fa-play");
        if(this.onStop) this.onStop();
    }

    tick = () => {
        if (this.timeRemaining <= 0){
            if(this.onComplete) this.onComplete();
            this.stop();
        } else{
            this.timeRemaining = this.timeRemaining - 0.01;
            if(this.onTick) this.onTick(this.timeRemaining);
        }
    };

    get timeRemaining() {
        return parseFloat(this.durationInput.value);
    }

    set timeRemaining(time) {
        this.durationInput.value = time.toFixed(2);
    }

    durationOnFocus = () => {
        this.durationInput.select();
    }

    durationOnKeyDown = (e) => {
        if(e.key === "Enter") {
            this.start();
            this.durationInput.blur();
        }
    }
}