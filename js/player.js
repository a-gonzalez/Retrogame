export default class Player
{
    constructor(game)
    {
        console.log(`Player .ctor @ ${new Date().toLocaleString()}`);

        this.game = game;
        this.width = 140;
        this.height = 120;
        this.x = this.game.width * 0.5 - this.width * 0.5;
        this.y = this.game.height - this.height;
        this.lives = 3;
        this.frame_x = 0;
        this.frame_y = 0;
        this.frame_max = 3;
        this.speed = 10;
        this.timer = 0;
        this.interval = 1000;

        this.image = new Image();
        this.image.src = "img/player.png";
    }

    draw(context)
    {
        context.strokeRect(this.x, this.y - 5, this.width, this.height);
        context.drawImage(this.image, this.x * this.frame_x, this.y * this.frame_y, this.width, this.height, this.x, this.y + 10, this.width, this.height);
    }

    update(delta_time)
    {
        /*if (this.timer > this.interval)
        {
            this.timer += delta_time;
        }
        else
        {
            this.timer = 0;
            
            (this.frame_x > this.frame_max) ? this.frame_x = 0 : ++this.frame_x;
        }*/

        if (this.game.keys.indexOf("ArrowLeft") > -1)
        {
            if (this.x <= -this.width * 0.5)
            {
                this.x = -this.width * 0.5;
            }
            else
            {
                this.x -= this.speed;
            }
        }
        else if (this.game.keys.indexOf("ArrowRight") > -1)
        {
            if (this.x >= this.game.width - this.width * 0.5)
            {
                this.x = this.game.width - this.width * 0.5;
            }
            else
            {
                this.x += this.speed;
            }
        }
    }

    shoot()
    {
        const projectile = this.game.getProjectileFromPool();

        if (projectile)
        {
            projectile.wake(this.x + this.width * 0.5, this.y);
        }
    }
}