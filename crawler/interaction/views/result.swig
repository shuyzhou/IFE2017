<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>interaction result</title>
	</head>
	<body>
	<table border="1" cellspacing="0">
  	<tr>
  		<th>标题</th>
  		<th>摘要</th>
  		<th>链接</th>
  		<th>缩略图</th>
  	</tr>
  	{% for data in dataList %}
  	<tr>
   		<td>{{data.title}}</td>
  		<td>{{data.info}}</td>
  		<td>{{data.link}}</td>
  		<td><img src="{{data.pic}}"></td>
  	</tr>
  	{% endfor %}
</table>
	</body>
</html>
