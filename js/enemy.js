class Enemy
{
    constructor(game)
    {
        this.game = game;
        this.width = 0;
        this.height = 0;
        this.x = 0;
        this.y = 0;
    }

    draw(context)
    {
        context.fillStyle = "#ff0000";
        context.strokeRect(this.x, this.y, this.width, this.height);
    }

    update(delta_time)
    {
        
    }
}

export class BettleMorph extends Enemy
{
    constructor(game)
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
    constructor(game)
    {
        super(game);
    }
}