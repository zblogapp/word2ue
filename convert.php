<?php
require '../../../zb_system/function/c_system_base.php';
require '../../../zb_system/function/c_system_admin.php';
$zbp->Load();
$action='root';
if (!$zbp->CheckRights($action)) {$zbp->ShowError(6);die();}

$post_data = '';
$post_array = array();
$boundary = explode('=', $_SERVER['HTTP_CONTENT_TYPE']);
$boundary = $boundary[1];

foreach($_POST as $name => $value)
{
	$post_data .= '--' . $boundary . "\r\n" . 'Content-Disposition: form-data; name="' . $name . '"';
	$post_data .= "\r\n\r\n" . $value . "\r\n";
}
foreach($_FILES as $name => $value)
{
	$post_data .= '--' . $boundary . "\r\n" . 'Content-Disposition: form-data; name="file"; filename="' . $value['name'] . '"';
	$post_data .= "\r\n"  . 'Content-Type: application/octet-stream';
	$post_data .= "\r\n\r\n" . file_get_contents($value['tmp_name']) . "\r\n";
}
$post_data .= "--" . $boundary . '--';
/*foreach($post_array as $child)
{
	$post_data .= ''
}*/
//var_dump($post_data);


$n = Network::Create();
//$n->open('POST', 'http://ueditor.baidu.com/build/wordlog.php');
$n->open('POST', 'http://convert.wenku.baidu.com/rtcs/convert?pn=1&rn=-1');
$n->setRequestHeader('Connection', 'keep-alive');
$n->setRequestHeader('Content-Type', $_SERVER['HTTP_CONTENT_TYPE']);
$n->setRequestHeader('Origin', 'http://ueditor.baidu.com');
$n->setRequestHeader('Accept', '*/*');
$n->setRequestHeader('Expect', '');
$n->setRequestHeader('Referer', 'http://ueditor.baidu.com/website/onlinedemo.html');
$n->setRequestHeader('Accept-Encoding', 'gzip,deflate,sdch');
$n->setRequestHeader('Accept-Language', 'zh-CN,zh;q=0.8,en;q=0.6');
$n->send($post_data);

header('Content-Type: ' . $n->getResponseHeader('Content-Type'));
echo $n->responseText;

?>