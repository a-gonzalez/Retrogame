import { SmallLaser, BigLaser } from "./laser.js";

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
        this.energy = 50;
        this.energy_max = 100;
        this.energy_depleted = false;

        this.small_laser = new SmallLaser(this.game);
        this.big_laser = new BigLaser(this.game);

        this.image = new Image();
        this.image.src = "img/player.png";
        this.jets = new Image();
        this.jets.src = "img/player_jets.png";
    }

    draw(context)
    {
        if (this.game.keys.indexOf(" ") > -1)
        {
            this.frame_x = 1;
        }
        else if (this.game.keys.indexOf("s") > -1)
        {
            //this.frame_x = 2;
            
            this.small_laser.draw(context);
        }
        else if (this.game.keys.indexOf("d") > -1)
        {
            //this.frame_x = 3;
            
            this.big_laser.draw(context);
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
        if (this.energy < this.energy_max && this.game.game_over === false)
        {
            this.energy += 0.05;
        }

        if (Math.floor(this.energy) < 1)
        {// over-heating laser weapon, cooldown
            this.energy_depleted = true;
        }
        else if (this.energy > this.energy_max * 0.2)
        {// when at least 20% of energy is recharged
            this.energy_depleted = false;
        }

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

        this.small_laser.update(delta_time);
        this.big_laser.update(delta_time);

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