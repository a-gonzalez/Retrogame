import { SmallLaser } from "./laser.js";

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
        this.lives_max = 5;
        this.frame_x = 0;
        this.frame_y = 0;
        this.frame_max = 3;
        this.frame_jets = 1;
        this.speed = 5;
        this.laser = new SmallLaser(this.game);

        this.image = new Image();
        this.image.src = "img/player.png";
        this.jets = new Image();
        this.jets.src = "img/player_jets.png";
    }

    draw(context)
    {
        if (this.game.debug === true)
        {
            context.strokeRect(this.x, this.y - 5, this.width, this.height);
        }

        if (this.game.keys.indexOf(" "))
        {
            this.frame_x = 1;
        }
        else
        {
            this.frame_x = 0;
        }
        context.drawImage(this.jets, this.width * this.frame_jets, this.height * this.frame_y, this.width, this.height, this.x, this.y + 10, this.width, this.height);
        context.drawImage(this.image, this.width * this.frame_x, 0, this.width, this.height, this.x, this.y, this.width, this.height);
    }

    update(delta_time)
    {
        if (this.game.keys.indexOf("ArrowLeft") > -1)
        {
            if (this.x <= -this.width * 0.5)
            {
                this.x = -this.width * 0.5;
            }
            else
            {
                this.x -= this.speed;
                this.frame_jets = 0;
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
                this.frame_jets = 2;
            }
        }
        else
        {
            this.frame_jets = 1;
        }

        if (this.game.keys.indexOf(" ") > -1 && this.game.projectile_fired === false)
        {
            this.frame_x = 1;
            this.game.projectile_fired = true;
            this.shoot();
        }
        else
        {
            this.frame_x = 0;
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

    restart()
    {
        this.x = this.game.width * 0.5 - this.width * 0.5;
        this.y = this.game.height - this.height;
        this.lives = 3;
    }
}