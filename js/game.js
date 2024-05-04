import Player from "./player.js";
import Projectile from "./projectile.js";
import Wave from "./wave.js";

export default class Game
{
    constructor(screen)
    {
        console.log(`Game .ctor @ ${new Date().toLocaleString()}`);

        this.screen = screen;
        this.width = this.screen.width;
        this.height = this.screen.height;
        this.game_over = false;
        this.score = 0;
        this.keys = [];
        this.projectiles = [];
        this.projectile_count = 10;

        this.player = new Player(this);

        this.columns = 2;
        this.rows = 3;
        this.enemy_size = 80;

        this.waves = [];
        this.wave_count = 1;
        this.waves.push(new Wave(this));

        addEventListener("keydown", (event) =>
        {
            if (this.keys.indexOf(event.key) === -1)
            {
                this.keys.push(event.key);
            }

            if (event.key === " ")
            {
                this.player.shoot();
            }
        });

        addEventListener("keyup", (event) =>
        {
            const index = this.keys.indexOf(event.key);

            if (index > -1)
            {
                this.keys.splice(index, 1);
            }
        });

        this.createProjectilePool();
    }

    draw(context)
    {
        this.player.draw(context);

        this.projectiles.forEach((projectile) =>
        {
            projectile.draw(context);
        });

        this.waves.forEach((wave) =>
        {
            wave.draw(context);

            if (wave.enemies.length < 1 && !wave.wave_trigger && !this.game_over)
            {
                this.newWave();
                this.wave_count++;
                wave.wave_trigger = true;
            }
        });

        this.setGameText(context);
    }

    update(delta_time)
    {
        this.player.update(delta_time);

        this.projectiles.forEach((projectile) =>
        {
            projectile.update(delta_time);
        });

        this.waves.forEach((wave) =>
        {
            wave.update();
        });
    }

    createProjectilePool()
    {
        for (let index = 0; index < this.projectile_count; index++)
        {
            this.projectiles.push(new Projectile(0, 0));
        }
    }

    getProjectileFromPool()
    {
        for (let index = 0; index < this.projectile_count; index++)
        {
            if (this.projectiles[index].free)
            {
                return this.projectiles[index];
            }
        }
    }

    setGameText(context)
    {
        context.fillText(`Score: `, 20, 40);
        context.fillText(this.score, 120, 40);
        context.fillText(`Wave: `, this.width - 140, 40);
        context.fillText(this.wave_count, this.width - 40, 40);

        if (this.game_over)
        {
            context.shadowOffsetX = 5;
            context.shadowOffsetY = 5;
            context.shadowColor = "#000000";
            context.textAlign = "center";
            context.font = "80px impact";
            context.fillStyle = "#ff0000";
            context.fillText("Game Over!", this.width * 0.5, this.height * 0.5);
        }
    }

    newWave()
    {
        if (Math.random() < 0.5 && this.columns * this.enemy_size < this.width * 0.8)
        {
            this.columns++;
        }
        else if (this.rows * this.enemy_size < this.height * 0.6)
        {
            this.rows++;
        }
        this.waves.push(new Wave(this));
    }

    isAHit(enemy, projectile)
    { // collision detection between two rectagles
        return (enemy.x < projectile.x + projectile.width &&
            enemy.x + enemy.width > projectile.x &&
            enemy.y < projectile.y + projectile.height &&
            enemy.y + enemy.height > projectile.y);
    }
}