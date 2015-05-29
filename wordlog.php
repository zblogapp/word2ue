<?php
require '../../../zb_system/function/c_system_base.php';
require '../../../zb_system/function/c_system_admin.php';
$zbp->Load();
$action='root';
if (!$zbp->CheckRights($action)) {$zbp->ShowError(6);die();}

$post_data = '';

foreach($_POST as $name => $value)
{
	$post_data .= (strlen($post_data) == 0 ? '' : '&') . urlencode($name) . '=' . urlencode($value);
}


$n = Network::Create();
$n->open('POST', 'http://ueditor.baidu.com/build/wordlog.php');
$n->setRequestHeader('Connection', 'keep-alive');
$n->setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
$n->setRequestHeader('Origin', 'http://ueditor.baidu.com');
$n->setRequestHeader('Accept', '*/*');
$n->setRequestHeader('Expect', '');
$n->send($post_data);

header('Content-Type: ' . $n->getResponseHeader('Content-Type'));
echo $n->responseText;

?>