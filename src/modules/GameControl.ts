import Snake from "./Snake";
import ScorePanel from "./ScorePanel";
import Food from './Food'

class GameControl{

    // 蛇
    snake: Snake;
    // 记分牌
    scorePanel: ScorePanel;
    // 食物
    food: Food;

    //创建一个属性来存储蛇的移动方向（也就是按键的方向）
    direction: string = 'ArrowRight';

    // 记录蛇是否活着
    isLive: boolean = true;

    constructor(){
        this.snake = new Snake();
        this.scorePanel = new ScorePanel();
        this.food = new Food();
        this.init();
    }

    // 游戏初始化方法，调用后游戏即开始
    init() {
        // 绑定键盘按键按下的事件
        document.addEventListener('keydown', this.keydownHandler.bind(this));
        this.run();
    }

    /**
     * 
     * @param event 
     * ArrowUp
     * ArrowDown
     * ArrowLeft
     * ArrowRight
     */
    // 创建一个键盘按下的响应函数
    keydownHandler(event: KeyboardEvent) {
        this.direction = event.key;
    }

    //控制蛇移动的方法
    run() {
        let X = this.snake.X;
        let Y = this.snake.Y;
        switch (this.direction) {
            case 'ArrowUp':
            case 'Up':
                Y -= 10;
                break;
            case 'ArrowDown':
            case 'Down':
                Y += 10;
                break;
            case 'ArrowLeft':
            case 'Left':
                X -= 10;
                break;
            case 'ArrowRight':
            case 'Right':
                X += 10;
                break;  
        }

        this.checkEat(X, Y);
           
        try {
            this.snake.X = X;
            this.snake.Y = Y;    
        } catch (error) {
            alert(error.message+'GAME OVER!');
            this.isLive = false;
        }

        // 开启一个定时器调用
        this.isLive && setTimeout(this.run.bind(this), 300 - (this.scorePanel.level - 1) * 30);
    }

    // 设置一个方法，用来检测蛇是否迟到食物
    checkEat(X: number, Y: number) {
        if (X === this.food.X && Y === this.food.Y) {
            this.food.change(); // 食物位置重置
            this.scorePanel.addScore(); // 加分
            this.snake.addBody(); // 蛇长一节
        }
    }
}

export default GameControl;