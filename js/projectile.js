import Sound from "./sound.js";

export default class Projectile
{
    constructor(x, y)
    {
        this.width = 4;
        this.height = 10;
        this.x = x;
        this.y = y;
        this.speed = 15;
        this.free = true;

        //this.sound = new Sound("aud/laser.wav");
    }

    draw(context)
    {
        if (!this.free)
        {
            context.fillStyle = "#00ff00";
            context.fillRect(this.x, this.y, this.width, this.height);
        }
    }

    update(delta_time)
    {
        if (!this.free)
        {
            this.y -= this.speed;

            if (this.y < 0 - this.width)
            {
                this.sleep();
            }
        } 
    }

    wake(x, y)
    {
        this.free = false;
        this.x = x + this.width * 0.5;
        this.y = y;

        //this.play();
    }

    sleep()
    {
        this.free = true;
    }

   /* play()
    {
        this.sound.play();
    }*/
}