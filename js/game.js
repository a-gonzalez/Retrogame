import Player from "./player.js";
import Projectile from "./projectile.js";
import Wave from "./wave.js";

export default class Game
{
    constructor(screen)
    {
        this.screen = screen;
        this.width = this.screen.width;
        this.height = this.screen.height;
        this.keys = [];
        this.projectiles = [];
        this.projectile_count = 10;

        this.player = new Player(this);

        this.columns = 3;
        this.rows = 3;
        this.enemy_size = 60;

        this.waves = [];
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
        });
    }

    update(delta_time)
    {
        this.player.update(delta_time);

        this.projectiles.forEach((projectile) =>
        {
            projectile.update(delta_time);
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
}