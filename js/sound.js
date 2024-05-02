export default class Sound
{
    constructor(path)
    {
        this.path = path
        //this.free = true;
        this.audio = new Audio(path);
        this.audio.autoplay = false;
    }

    play()
    {
        this.audio.currentTime = 0;
        this.audio.play();
    }

    pause()
    {
        this.audio.pause();
    }

    /*sleep()
    {
        this.audio.pause();
    }

    wake()
    {
        this.audio.play();
    }*/
}