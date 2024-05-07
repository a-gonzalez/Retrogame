class Laser
{
    constructor(game)
    {
        this.game = game;
        this.x = 0;
        this.y = 0;
        this.height = this.game.height - 50;
    }

    draw(context)
    {
        this.game.player.energy -= this.damage;

        context.save();
        context.fillStyle = "#2dff1e"; // laser rbg
        context.fillRect(this.x, this.y, this.width, this.height);
        context.fillStyle = "#ffd700"; // gold rbg
        context.fillRect(this.x + this.width * 0.2, this.y, this.width * 0.6, this.height);
        context.restore();

        if (this.game.sprite_update)
        {
            this.game.waves.forEach((wave) =>
            {
                wave.enemies.forEach((enemy) =>
                {
                    if (this.game.isAHit(enemy, this))
                    {
                        enemy.hit(this.damage);
                    }
                });
            });

            this.game.bosses.forEach((boss) =>
            {
                if (this.game.isAHit(boss, this) && boss.y >= 0)
                {
                    boss.hit(this.damage);
                }
            });
        }
    }

    update(delta_time)
    {
        this.x = this.game.player.x + this.game.player.width * 0.5 - this.width * 0.5;
    }
}

export  class SmallLaser extends Laser
{
    constructor(game)
    {
        super(game);

        this.width = 5 ;
        this.damage = 0.5;
    }

    draw(context)
    {
        if (this.game.player.energy > 1 && this.game.player.energy_depleted === false)
        {
            super.draw(context);

            this.game.player.frame_x = 2;
        }
    }

    update(delta_time)
    {
        super.update(delta_time);
    }
}

export class BigLaser extends Laser
{
    constructor(game)
    {
        super(game);

        this.width = 25;
        this.damage = 0.8;
    }

    draw(context)
    {
        if (this.game.player.energy > 1 && this.game.player.energy_depleted === false)
        {
            super.draw(context);

            this.game.player.frame_x = 3;
        }
    }

    update(delta_time)
    {
        super.update(delta_time);
    }
}