class Snake {
    // 蛇头
    head: HTMLElement;
    // 蛇身体（包括头）
    bodies: HTMLCollection;
    // 获取蛇容器
    element: HTMLElement;

    constructor() {
        this.head = document.querySelector('#snake > div')!;
        this.bodies = document.getElementById('snake')!.getElementsByTagName('div');
        this.element = document.getElementById('snake')!;
    }

    get X() {
        return this.head.offsetLeft;
    }

    get Y() {
        return this.head.offsetTop;
    }

    set X(value: number) {
        if (this.X === value) return;
        if (value < 0 || value > 290)  throw new Error('蛇撞墙了！');
        if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === value) {
            console.log('蛇掉头了');
            if (value > this.X) { // 向右掉头
                value = this.X - 10;
            } else {
                value = this.X + 10;
            }
        }
        this.moveBody();
        this.head.style.left = value + 'px';
        this.checkHeadBody();
    }
    
    set Y(value: number) {
        if (this.Y === value) return;
        if (value < 0 || value > 290) throw new Error('蛇撞墙了！');
        if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value) {
            console.log('蛇掉头了');
            if (value > this.Y) { // 向下掉头
                value = this.Y - 10;
            } else {
                value = this.Y + 10;
            }
        }
        this.moveBody();
        this.head.style.top = value + 'px';
        this.checkHeadBody();
    }

    // 蛇增加身体的方法
    addBody() {
        // 向element中添加一个div
        this.element.insertAdjacentHTML('beforeend', '<div></div>');
    }

    // 添加一个蛇移动的方法
    moveBody() {
        for (let i = this.bodies.length - 1; i > 0; i--) {
            let X = (this.bodies[i - 1] as HTMLElement).offsetLeft;
            let Y = (this.bodies[i - 1] as HTMLElement).offsetTop;
            (this.bodies[i] as HTMLElement).style.left = X + 'px';
            (this.bodies[i] as HTMLElement).style.top = Y + 'px';
        }
    }

    // 检查蛇头是否和身体碰撞
    checkHeadBody() {
        for (let i = 1; i < this.bodies.length; i++ ) {
            let bd = this.bodies[i] as HTMLElement;
            if (this.X === bd.offsetLeft && this.Y === bd.offsetTop) {
                throw new Error('撞到自己了~~');
            }
        }
    }
}

export default Snake;