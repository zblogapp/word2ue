
(function(){

function renderUploader(id, ue) {

    var uploader = WebUploader.create({
        pick: {
            id: "#" + id,
            multiple: false
        },
        accept: {
            title: "Word文档",
            extensions: "doc,docx",
            mimeTypes: "application/msword"
        },
        swf: '../../zb_users/plugin/word2ue/docparser/webuploader/Uploader.swf',
        //server: 'http://cq01-rdqa-pool150.cq01.baidu.com:8989/rtcs/convert?pn=1&rn=-1',
        server: '../../convert.php',
        fileVal: 'file',
        duplicate: true
    });

    uploader.on('filesQueued', function(files){
        uploader.upload();
        uploader.disable();
    });

    uploader.on('uploadFinished', function(files){
        setTimeout(function () {
            uploader.enable();
        },2000);
    });

    uploader.on('all', function(){
        var args = UE.utils.clone([], arguments);
        args[0] = 'uploader_' + args[0];
        return ue.fireEvent.apply(ue, args);
    });

    //创建提示的dialog
    var dialog = new UE.ui.Dialog({
        //指定弹出层中页面的路径，这里只能支持页面,因为跟addCustomizeDialog.js相同目录，所以无需加路径
        iframeUrl:'../../zb_users/plugin/word2ue/docparser/dochelp.html',
        //需要指定当前的编辑器实例
        editor:ue,
        //指定dialog的名字
        name:'dochelp',
        //dialog的标题
        title:"导入Word功能介绍",
        //指定dialog的外围样式
        cssRules:"width:500px;height:248px;",
        //如果给出了buttons就代表dialog有确定和取消
        buttons:[
            {
                className:'edui-okbutton',
                label:'确定',
                onclick:function () {
                    dialog.close(true);
                }
            }
        ]
    });
    $('.uploadhelp').click(function (){
        dialog.render();
        dialog.open();
    });

}
$(document).ready(function(){
	renderUploader('uploadbtn', editor_api.editor.content.obj);
});
})();