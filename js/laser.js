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
        context.save();
        context.fillStyle = "#2dff1e"; // laser rbg
        context.fillRect(this.x, this.y, this.width, this.height);
        context.restore();
    }

    update(delta_time)
    {
        this.x = this.game.player.x;
    }
}

export  class SmallLaser extends Laser
{
    constructor(game)
    {
        super(game);

        this.width = 5;
    }

    draw(context)
    {
        super.draw(context);
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
    }
}