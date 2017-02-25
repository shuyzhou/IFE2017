正则表达式的对象可由字面量或者RegExp构造函数得到：
/pattern/flags
new RegExp(pattern[, flags])
其中pattern为需要匹配的正则，flags为匹配时的参数，如g代表全局匹配，i代表不区分大小写
如下三种方式得到的正则表达式相等：
/ab+c/i;
new RegExp('ab+c', 'i');
new RegExp(/ab+c/, 'i');
注意，当pattern为字符串时，由于javascript引擎在读字符串时会进行一次转义，所以在所有之前还要加上一个才能得到预期的结果。
正则表达式在匹配时为贪婪匹配，会尽可能的匹配较多的字符。而如果想某分组尽可能少匹配的话，可以在该分组后面加上懒惰量词？。
正则表达式中的后向匹配(?<=exp)和给子表达式指定组名(?<name>exp)等javascript正则引擎不支持，要查看javascript中的正则表达式看网页https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
b代表单词的开始或结束，而javascript正则引擎定义的单词由大小写英文字母、数字0-9和下划线组成，具体定义在http://www.ecma-international.org/ecma-262/5.1/#sec-15.10.2.6