var tokenize = require('./tokenize.js');
var join = require('./join.js');
var input = document.querySelector('#in');
var output = document.querySelector('#out');
var text = `这是一个阉割版markdown解析器

对markdown解析主要参考[这里](http://daringfireball.net/projects/markdown/syntax#header)
# 标题
支持类\`atx\`形式的标题，并支持选择性的闭合
# H1
## H2
### H3
#### H4 #
##### H5 ##
###### H6
# 列表
支持有序列表和无序列表，并支持多个段落
*   这是一段无序列表。
    这是一段无序列表。
    这是一段无序列表。
*   这是一段无序列表
1. 有序列表
5. 有序列表
3. 有序列表
# 引用
支持区块引用
> 这是一段引用。这是一段引用。
> 这是一段引用。
这是一段引用。

> 这是另一段引用。这是另一段引用。
这是另一段引用。

# 代码块
支持行内代码和缩进产生的代码块，代码块区域中的&、<和>会被转义，暂不支持由反引号\` \`\`\` \`包括的代码块
    <h1>hello</h1>
    &alt
# todo
1. 实现由反引号\`\`\`包括的代码块的解析
2. 实现链接、图片解析
3. 看marked源码
# 最后
欢迎找BUG `;
input.innerHTML = text;
parse();
input.addEventListener('keyup',parse);
function parse() {
	var result = tokenize(input.value);
	output.innerHTML = join(result);
}