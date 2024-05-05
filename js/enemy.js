class Enemy
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
    }

    draw(context)
    {
        if (this.game.debug === true)
        {
            context.strokeRect(this.x, this.y, this.width, this.height);
        }
        context.drawImage(this.image, this.width * this.frame_x, this.height * this.frame_y, this.width, this.height, this.x, this.y, this.width, this.height);
    }

    update(delta_time, x, y)
    {   
        this.x = x + this.position_x;
        this.y = y + this.position_y;

        this.game.projectiles.forEach((projectile) =>
        {
            if (!projectile.free && this.game.isAHit(this, projectile) && this.lives > 0)
            {
                this.hit(1);

                projectile.sleep();
            }
        });

        if (this.lives < 1)
        {
            if (this.game.sprite_update === true)
            {
                ++this.frame_x;
            }

            if (this.frame_x > this.frame_max)
            {
                this.remove = true;

                if (this.game.game_over === false)
                {
                    this.game.score += this.lives_max;
                }
            }
        }

        if (this.game.isAHit(this, this.game.player) && this.lives > 0)
        {
            this.lives = 0;
            this.game.player.lives--;
        }

        if (this.y + this.height > this.game.height || this.game.player.lives < 1)
        {
            this.game.game_over = true;
            //this.remove = true;
        }
    }

    hit(damage)
    {
        this.lives -= damage;
    }
}

export class BeetleMorph extends Enemy
{
    constructor(game, position_x, position_y)
    {
        super(game, position_x, position_y);

        this.lives = 1;
        this.lives_max = this.lives;
        this.frame_x = 0;
        this.frame_y = Math.floor(Math.random() * 4);
        this.frame_max = 2;

        this.image = new Image();
        this.image.src = "img/beetlemorph.png";
    }
}

export class RhinoMorph extends Enemy
{
    constructor(game, position_x, position_y)
    {
        super(game, position_x, position_y);

        this.image = new Image();
        this.image.src = "img/rhinomorph.png";

        this.frame_x = 0;
        this.frame_y = 0;
    }
}