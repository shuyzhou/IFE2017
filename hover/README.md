### IFE2017
## 有趣的鼠标悬浮模糊效果
`css3`标准中有许多吸引人的新特性，但由于各种浏览器的存在，在使用时需要考虑到`兼容性`的问题。  
图片模糊效果是用`filter`属性实现的，顾名思义，`filter`是给图像数据加滤波器，利用`filter`可以对图片进行模糊、锐化、提亮等处理。  
文字流光效果首先用到了`background-clip: text;`这个属性可以将背景图案显示区域限制在文字上，然后是`background-image: linear-gradient(to right, red, yellow, green, blue, violet,  red, yellow, green, blue, violet,red);`CSS函数`linear-gradient()`可以产生一副颜色线性渐变的图像。这里为了让动画看上去衔接自然，借用轮播图的思想，将背景图案做成了两幅渐变拼接的图片，通过控制`background-position`属性来做出流光效果。   
边框从中间到两边扩开利用了`transform`的`scale`函数，写两个空`div`，一个`div`描上下两条边，一个`div`描左右两条边。当容器变成`hover`状态时，利用`scaleX`和`scaleY`函数将两个`div`展开，并将展开做出动画效果。另外，也可以用`transition`属性，当使用该属性时，`hover`状态消失时边框也会有一个收起来的动画效果。