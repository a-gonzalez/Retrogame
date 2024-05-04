import { Enemy } from "./enemy.js";

export default class Wave
{
    constructor(game)
    {
        console.log(`Wave .ctor @ ${new Date().toLocaleString()}`);

        this.game = game;
        this.width = this.game.columns * this.game.enemy_size;
        this.height = this.game.rows * this.game.enemy_size;
        this.x = 0;
        this.y = -this.height;
        this.speed_x = 1.5;
        this.speed_y = 0;
        this.wave_trigger = false;

        this.enemies = [];
        this.create();
    }

    draw(context)
    {
        //context.lineWidth = 3;
        //context.strokeRect(this.x, this.y, this.width, this.height);

        this.enemies.forEach((enemy) =>
        {
            enemy.draw(context);
        });
    }

    update(delta_time)
    {
        this.enemies = this.enemies.filter((enemy) =>
        {
            return !enemy.remove;
        });

        if (this.y < 0) this.y += 5;

        this.speed_y = 0;

        if (this.x < 0 || this.x > this.game.width - this.width)
        {
            this.speed_x *= -1;
            this.speed_y = this.game.enemy_size;
        }
        this.x += this.speed_x;
        this.y += this.speed_y;

        this.enemies.forEach((enemy) =>
        {
            enemy.update(delta_time, this.x, this.y);
        });
    }

    create()
    {
        for (let y = 0; y < this.game.rows; y++)
        {
            for (let x = 0; x < this.game.columns; x++)
            {
                let enemy_x = x * this.game.enemy_size;
                let enemy_y = y * this.game.enemy_size;

                this.enemies.push(new Enemy(this.game, enemy_x, enemy_y));
            }
        }
    }
}