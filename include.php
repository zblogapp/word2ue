<?php
#注册插件
RegisterPlugin("word2ue","ActivePlugin_word2ue");

function ActivePlugin_word2ue()
{
	Add_Filter_Plugin('Filter_Plugin_Edit_Response5', 'word2ue_edit_response5');
	Add_Filter_Plugin('Filter_Plugin_Edit_End', 'word2ue_edit_end');
}

function word2ue_edit_end()
{
	global $bloghost;	echo '<script>$("#response3").before(\'<span id="uploadbtn" class="uploadbtn">导入Word文档</span><br/><a class="uploadhelp" href="javascript:void(0)">导入Word文档出错了?</a>\')</script>';

	//echo '<script>$(document).ready(function(){editor_api.editor.content.obj.ready(function(){$("head").append(\'';
	echo '<script src="' . $bloghost . 'zb_users/plugin/word2ue/docparser/docparser.js" type="text/javascript"></script>';
	echo '<script src="' . $bloghost . 'zb_users/plugin/word2ue/docparser/webuploader/webuploader.flashonly.js" type="text/javascript"></script>';
	echo '<link rel="stylesheet" href="' . $bloghost . 'zb_users/plugin/word2ue/docparser/webuploader/webuploader.css"/>';
	echo '<script src="' . $bloghost . 'zb_users/plugin/word2ue/docparser/outerbtn.js" type="text/javascript"></script>';
	echo '<script src="' . $bloghost . 'zb_users/plugin/word2ue/docparser/wordlog.js" type="text/javascript"></script>';
	//echo '\')})})</scr'.'ipt>';
}

function word2ue_edit_response5()
{


}
function InstallPlugin_word2ue() {}
function UninstallPlugin_word2ue() {}