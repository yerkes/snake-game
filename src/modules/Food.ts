class Food {
    // 定义一个属性表示食物所对应的元素
    element: HTMLElement;
    constructor() {
        // 获取页面中food元素并将其赋值给element
        this.element = document.getElementById('food')!;
    }

    // 获取X轴
    get X() {
        return this.element.offsetLeft;
    }

    // 获取Y轴
    get Y() {
        return this.element.offsetTop;
    }

    change() {
        // 向上取整 坐标值在0~290之间
        let left = Math.round(Math.random() * 29) * 10;
        let top = Math.round(Math.random() * 29) * 10;
        this.element.style.left = left + 'px';
        this.element.style.top = top + 'px';
    }
}

export default Food;