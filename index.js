const durationInput = document.getElementById("duration");
const startButton = document.getElementById("startButton");
const pauseButton = document.getElementById("pauseButton");
const circle = document.querySelector('circle');

const perimeter = circle.getAttribute('r') * 2 * Math.PI;
circle.setAttribute('stroke-dasharray',perimeter);

let duration;

const timer = new Timer(durationInput,startButton,pauseButton,{
    onStart(totalDuration) {
        duration = totalDuration;
    },
    onTick(timeRemaining) {
        circle.setAttribute('stroke-dashoffset',
        perimeter * timeRemaining / duration - perimeter
        );   
    },
    onComplete() {
        circle.setAttribute('stroke-dashoffset',0);
    },
    onStop() {
        circle.setAttribute('stroke-dashoffset',0);
    }
});

