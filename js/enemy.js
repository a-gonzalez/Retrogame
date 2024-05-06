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

        this.lives = 4;
        this.lives_max = this.lives;
        this.frame_x = 0;
        this.frame_y = Math.floor(Math.random() * 4);
        this.frame_max = 5;

        this.image = new Image();
        this.image.src = "img/rhinomorph.png";
    }

    hit(damage)
    {
        this.lives -= damage;
        this.frame_x = this.lives_max - Math.floor(this.lives);
    }
}

export class Boss
{
    constructor(game, lives)
    {
        console.log(`Boss .ctor @ ${new Date().toLocaleString()}`);

        this.game = game;
        this.width = 200;
        this.height = 200;
        this.x = this.game.width * 0.5 - this.width * 0.5;
        this.y = -this.height;
        this.frame_x = 0;
        this.frame_y = Math.floor(Math.random() * 4);
        this.frame_max = 11;
        this.speed_x = Math.random() < 0.5 ? -1 : 1;
        this.speed_y = 0;
        this.lives = lives;
        this.lives_max = this.lives;
        this.remove = false;

        this.image = new Image();
        this.image.src = "img/boss.png";
    }

    draw(context)
    {
        context.drawImage(this.image, this.width * this.frame_x, this.height * this.frame_y, this.width, this.height, this.x, this.y, this.width, this.height);

        /*context.save();
        context.fillStyle = "#2dff1e"; // "#ffd700";
        context.fillText(this.lives, this.x + this.width * 0.43, this.y + this.height * 0.43);
        context.restore();*/
    }

    update(delta_time)
    {
        this.speed_y = 0;

        if (this.game.sprite_update === true && this.lives > 0)
        {
            this.frame_x = 0;
        }
  
        if (this.y < 0)
        {
            this.y += 4;
        }

        if (this.x <= 0 || this.x >=  this.game.width - this.width && this.lives > 0)
        {
            this.speed_x *= -1;
            this.speed_y = this.height * 0.5;
        }
        this.x += this.speed_x;
        this.y += this.speed_y;

        this.game.projectiles.forEach((projectile) =>
        {
            if (this.game.isAHit(this, projectile) && projectile.free === false && this.lives > 0 && this.y >= 0)
            {
                this.hit(1);

                projectile.sleep();
            }
        });

        if (this.game.isAHit(this, this.game.player) && this.lives > 0)
        { // did boss collide with player? Game Over!
            this.game.game_over = true;
            this.lives = 0;
        }

        if (this.lives < 1 && this.game.sprite_update === true)
        { // boss' lives have been depleted - blow up
            ++this.frame_x;

            if (this.frame_x > this.frame_max)
            {
                this.remove = true;
                this.game.score += this.lives_max;
                this.game.boss_lives += 5;

                this.game.bosses = this.game.bosses.filter((boss) =>
                {
                    return boss.remove === false;
                });

                if (this.game.game_over === false)
                {
                    this.game.nextWave();
                }
            }
        }

        if (this.y + this.height > this.game.height)
        { // lose condition
            this.game.game_over = true;
        }
    }

    hit(damage)
    {
        this.lives -= damage;

        if (this.lives > 0)
        {
            this.frame_x = 1;
        }
    }
}