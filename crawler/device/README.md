���������Ҫ�õ���`page.settings['userAgent']`��`page.viewportSize`�������ԡ��÷����£�
```
page.settings.userAgent = ��Ҫģ����豸��userAgent;
page.viewportSize = {
  width: ��������Ļ��,
  height:��������Ļ��
};
```
��ȡ�����ļ������õ���һ�����ļ���ģ��fs��
```
var fs = require("fs");
//��ȡ�����ļ�
/*fs.encoding="GB2312";
//���ö��ķ���
file=fs.open("option.json",'r');
option=JSON.parse(file.read());
//��ȡ��Ϻ�ر�
file.close();
```
�������������˵Ĵ��뷢����`require`���С�����
```
var option = require('./option.json');
```
���о��ǽ�������Ϊ`url`����Ĳ���ʱ������Բ�������`����`��������������յ��Ŀ��������롣