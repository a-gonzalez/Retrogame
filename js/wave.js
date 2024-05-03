export default class Wave
{
    constructor(game)
    {
        this.game = game;
        this.width = this.game.columns * this.game.enemy_size;
        this.height = this.game.rows * this.game.enemy_size;
        this.x = 0;
        this.y = 0;
    }

    draw(context)
    {
        context.strokeRect(this.x, this.y, this.width, this.height);
    }
}