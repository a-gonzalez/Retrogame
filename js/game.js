import Player from "./player.js";
import Projectile from "./projectile.js";
import Wave from "./wave.js";
import { Boss } from "./enemy.js";

export default class Game
{
    constructor(screen)
    {
        console.log(`Game .ctor @ ${new Date().toLocaleString()}`);

        this.screen = screen;
        this.width = this.screen.width;
        this.height = this.screen.height;
        this.game_over = false;
        this.game_debug = false;
        this.score = 0;
        this.keys = [];
        this.projectiles = [];
        this.projectile_count = 10;
        this.projectile_fired = false;

        this.player = new Player(this);

        this.enemy_size = 80;
        this.sprite_update = false;
        this.sprite_timer = 0;
        this.sprite_interval = 150;

        this.waves = [];
        this.bosses = [];
        this.boss_lives = 10;
        
        this.restart();

        addEventListener("keydown", (event) =>
        {
            if (this.keys.indexOf(event.key) === -1 && this.game_over === false)
            {
                this.keys.push(event.key);
            }

            if (event.key === "R" && this.game_over === true)
            {
                this.restart(); //location.reload();
            }
        });

        addEventListener("keyup", (event) =>
        {
            this.projectile_fired = false;

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
        this.projectiles.forEach((projectile) =>
        {
            projectile.draw(context);
        });

        this.player.draw(context);

        this.bosses.forEach((boss) =>
        {
            boss.draw(context);
        });

        this.waves.forEach((wave) =>
        {
            wave.draw(context);

            if (wave.enemies.length < 1 && !wave.next_wave_trigger && !this.game_over)
            {
                this.nextWave();
                wave.next_wave_trigger = true;

                if (this.player.lives < this.player.lives_max)
                {
                    ++this.player.lives;
                }
            }
        });

        this.setGameText(context);
    }

    update(delta_time)
    {
        if (this.sprite_timer > this.sprite_interval)
        {
            this.sprite_timer = 0;
            this.sprite_update = true;
        }
        else
        {
            this.sprite_timer += delta_time;
            this.sprite_update = false;
        }
        this.player.update(delta_time);

        this.projectiles.forEach((projectile) =>
        {
            projectile.update(delta_time);
        });

        this.bosses.forEach((boss) =>
        {
            boss.update(delta_time);
        })

        this.waves.forEach((wave) =>
        {
            wave.update(delta_time);
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

    /*setIntroScreen(context)
    {
        context.save();
        context.shadowOffsetX = 5;
        context.shadowOffsetY = 5;
        context.shadowColor = "#000000";
        context.textAlign = "center";
        context.font = "80px space shards";
        context.fillStyle = "#ff0000";
        context.fillText("Space Defender", this.width * 0.5, this.height * 0.5);
        context.font = "25px arial";
        context.fillText("Press P To Play.", this.width * 0.5, this.height * 0.5 + 35);
        context.restore();
    }*/

    setGameText(context)
    {
        context.fillText(`Score  ${this.score}`, 20, 40);
        //context.fillText(`Wave  ${this.wave_count}`, this.width - 140, 40);
        context.fillText(`Wave  ${this.wave_count}`, 20, 65);
        
        context.fillText("Lives", 20, 120);

        for (let index = 0; index < this.player.lives_max; index++)
        {// possible lives
            context.strokeRect(10 * index + 100, 105, 5, 15)
        }

        for (let index = 0; index < this.player.lives; index++)
        {// actual lives
            context.fillRect(10 * index + 100, 105, 5, 15)
        }
        context.save();
        context.fillStyle = this.player.energy_depleted ? "#dc3545" : "#ffffff"; //"#ffd700";

        for (let index = 0; index < this.player.energy; index++)
        {// energy bar
            context.fillRect(2 * index + 20, 130, 2, 15);
        }
        context.restore();

        if (this.game_over)
        {
            context.save();
            context.shadowOffsetX = 5;
            context.shadowOffsetY = 5;
            context.shadowColor = "#000000";
            context.textAlign = "center";
            context.font = "80px space shards";
            context.fillStyle = "#ff0000";
            context.fillText("Game Over!", this.width * 0.5, this.height * 0.5);
            context.font = "25px arial";
            context.fillText("Press R To Restart.", this.width * 0.5, this.height * 0.5 + 35);
            context.restore();
        }
    }

    nextWave()
    {
        ++this.wave_count;

        if (this.player.lives < this.player.lives_max)
        {
            ++this.player.lives;
        }

        this.waves = this.waves.filter((wave) =>
        {
            return wave.remove === false;
        });

        if (this.wave_count % 5 === 0)
        {
            this.bosses.push(new Boss(this, this.boss_lives));
        }
        else
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
    }

    restart()
    {
        this.game_over = false;
        this.score = 0;
        this.columns = 1;
        this.rows = 1;

        this.waves = [];
        this.wave_count = 1;
        this.waves.push(new Wave(this));

        this.bosses = [];
        this.boss_lives = 10;
        //this.bosses.push(new Boss(this, this.boss_lives));

        this.player.restart();
    }

    isAHit(enemy, projectile)
    { // collision detection between two rectagles
        return (enemy.x < projectile.x + projectile.width &&
            enemy.x + enemy.width > projectile.x &&
            enemy.y < projectile.y + projectile.height &&
            enemy.y + enemy.height > projectile.y);
    }
}