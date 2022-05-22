











class Duration 
{
    milliseconds: number; 

    constructor(ms: number)
    {
        this.milliseconds = ms; 
    }

    digitalTimeFormat(padding = false) : string
    {
        function pad(num) {
            return `${num}`.padStart(2, '0');
        }
        let asSeconds = this.milliseconds / 1000;
    
        let hours = undefined;
        let minutes = Math.floor(asSeconds / 60);
        let seconds = Math.floor(asSeconds % 60);
    
        if (minutes > 59) {
            hours = Math.floor(minutes / 60);
            minutes %= 60;
        }
    
        return hours
            ? `${padding ? pad(hours) : hours}:${pad(minutes)}:${pad(seconds)}`
            : `${padding ? pad(minutes) : minutes}:${pad(seconds)}`;
    }
}

export { Duration }









