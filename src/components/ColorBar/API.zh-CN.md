| 参数       | 说明           | 类型             | 默认值       |
|------------|----------------|------------------|--------------|
| model      | 拾色模式，未指定则由ColorPicker传入 | 之一: 'rgb.r' 'rgb.g' 'rgb.b' 'hsv.h' 'hsv.s' 'hsv.v' | hsv.h  |
| onChange   | 变化回调，返回对应色彩模式的颜色值  | function    | 无      |
| pointer    | 指针，       | node | CirclePointer |
| direction | 组件方向  | 之一：'vertical' 'horizontal'  | 'horizontal'    |
| color      | 颜色，由ColorPicker传入 | array    | 无        |
| style      | 容器样式       | object     | 无           |
| pointerStyle | 指针样式  | object  | 无         |