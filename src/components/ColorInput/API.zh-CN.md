| 参数       | 说明           | 类型             | 默认值       |
|------------|----------------|------------------|--------------|
| model      | 拾色模式 | enum: 'rgb.r' 'rgb.g' 'rgb.b' 'hsv.h' 'hsv.s' 'hsv.v' 'lab.l' 'lab.a' 'lab.b' 'cmyk.c' 'cmyk.m' 'cmyk.y' 'cmyk.k'|  无  |
| onChange   | 变化回调  | function    | 由`ColorPicker`传入       |
| color      | 制定颜色 | array    | 由`ColorPicker`传入       |
| min | 最小值  | number  | 见表        |
| max | 最大值  | number  | 见表        |
| step | 每次点击`up` `down`所加减的值  | number  | 见表         |
| fixed | 精度  | number  | 见表         |
| scale | 缩放比例  | number  | 1         |
| label | 左侧标签 | node | 见表 |
| rightLabel | 右侧标签 | node | 无 |
| style  | 容器样式 | object | 无 |
| labelStyle  | 左侧标签样式 | object | 无 |
| inputStyle  | 输入框样式 | object | 无 |
| rightLabelStyle  | 右侧标签样式 | object | 无 |
| sharp | hex 的'#'标签 | boolean | false |

默认值：

| 模式  | min | max | step | fixed | label |
|-------|-----|-----|------|-------|-------|
| rgb.r |  0  | 255 |  1   |   0   |   R   |
| rgb.g |  0  | 255 |  1   |   0   |   G   |
| rgb.b |  0  | 255 |  1   |   0   |   B   |
| hsv.h |  0  | 360 |  1   |   0   |   H   |
| hsv.s |  0  |  1  | 0.01 |   2   |   S   |
| hsv.v |  0  |  1  | 0.01 |   2   |   V   |
| lab.l |  0  | 100 |  1   |   0   |   L   |
| lab.a |-128 | 127 |  1   |   0   |   a   |
| lab.b |-128 | 127 |  1   |   0   |   b   |
|cmyk.c |  0  |  1  | 0.01 |   2   |   C   |
|cmyk.m |  0  |  1  | 0.01 |   2   |   M   |
|cmyk.y |  0  |  1  | 0.01 |   2   |   Y   |
|cmyk.k |  0  |  1  | 0.01 |   2   |   K   |
| hex   |000000|FFFFFF| 1  |   0   |  HEX  |
| alpha |  0  |  1  | 0.01 |   2   |   A   |