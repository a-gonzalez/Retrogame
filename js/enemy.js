export class Enemy
{
    constructor(game, position_x, position_y)
    {
        console.log(`Enemy .ctor @ ${new Date().toLocaleString()}`);

        this.game = game;
        this.width = this.game.enemy_size;
        this.height = this.game.enemy_size;
        this.x = 0;
        this.y = 0;
        this.remove = false;
        this.position_x = position_x;
        this.position_y = position_y;

        this.image = new Image();
        this.image.src = "img/beetlemorph.png";

        this.frame_x = 0;
        this.frame_y = 0;
        this.frame_max = 4;
        this.frame_timer = 0;
        this.frame_interval = 1500;
    }

    draw(context)
    {
        context.strokeRect(this.x, this.y, this.width, this.height);
        context.drawImage(this.image, this.x * this.frame_x, this.y * this.frame_y, this.width, this.height, this.x, this.y, this.width, this.height);
    }

    update(delta_time, x, y)
    {
        /*this.frame_timer += delta_time;

        if (this.frame_timer > this.frame_interval)
        {
            this.frame_timer = 0;
        }
        else
        {
            ++this.frame_y;

            if (this.frame_y > this.frame_max)
            {
                this.frame_y = 0;
            }
        }*/
        
        this.x = x + this.position_x;
        this.y = y + this.position_y;

        this.game.projectiles.forEach((projectile) =>
        {
            if (!projectile.free && this.game.isAHit(this, projectile))
            {
                this.remove = true;

                projectile.sleep();

                if (this.game.game_over === false)
                {
                    ++this.game.score;
                }
            }
        });

        if (this.game.isAHit(this, this.game.player) && this.game.game_over === false)
        {
            this.remove = true;

            if (!this.game.game_over && this.game.score > 0)
            {
                --this.game.score;
            }
            --this.game.player.lives;

            if (this.game.player.lives < 1)
            {
                this.game.game_over = true;
            }
        }

        if (this.y + this.height > this.game.height)
        {
            this.game.game_over = true;
            this.remove = true;
        }
    }
}

export class BettleMorph extends Enemy
{
    constructor(game, position_x, position_y)
    {
        super(game);
    }

    draw(context)
    {
        super.draw(context);
    }
}

export class RhinoMorph extends Enemy
{
    constructor(game, position_x, position_y)
    {
        super(game);
    }
}