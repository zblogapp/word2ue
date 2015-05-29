/*
(function (){

    var WordLog = function(editor){
        this.ue = editor;
        this.data = {};
        this.url = '../../zb_users/plugin/word2ue/wordlog.php';
    };

    WordLog.prototype = {
        start: function (){
            try{
                this.agent = this.getAgent();
                this.setUploadListener();
                this.setImageListener();
            } catch (e){
                console.error('start log error');
            }
        },
        getAgent: function (){
            return window.navigator.appVersion;
        },
        setUploadListener: function (){
            var me = this;
            me.ue.on('uploader_uploadSuccess', function (type, file, ret){
                try{
                    var status, bdjson, filemd5 = '', loadtime = 0, r = ret._raw;

                    if (r) {
                        try{
                            bdjson = eval('(' + r + ')');
                            if (bdjson['status'] && bdjson['status']['success'] == true) {
                                if (bdjson['document.xml'] && bdjson['document.xml'].length > 0) {
                                    status = 'convert success';
                                } else {
                                    status = 'no responseText';
                                }
                            } else {
                                status = 'status error:' + bdjson['status']['error'] + '; errno: ' + bdjson['status']['errno'] + ';';
                            }
                            filemd5 = bdjson['md5sum'] || '';
                            loadtime = bdjson['during'] || 0;
                        } catch (e) {
                            status = 'json decode error';
                        }
                    } else {
                        status = 'no responseText';
                    }

                    me.sendLog({
                        'action': 'uploadinfo',
                        'agent': me.agent,
                        'filename': file.name,
                        'filesize': file.size,
                        'filemd5': filemd5,
                        'loadtime': loadtime,
                        'status': status
                    });
                } catch(e) {
                    console.log('setUploadInfoListener error');
                }
            });
            me.ue.on('uploader_uploadError', function (type, file, code){
                try{
                    me.sendLog({
                        'action': 'uploadinfo',
                        'agent': me.agent,
                        'filename': file.name,
                        'filesize': file.size,
                        'filemd5': '',
                        'loadtime': 0,
                        'status': 'uploaderror-' + code
                    });
                } catch(e) {
                    console.log('setUploadInfoListener error');
                }
            });
        },
        setImageListener: function (){
            try {
                var me = this;
                me.ue.on('aftersetwkcontent', function (type, html){
                    $(html).find('img').each(function(i, img){
                        if (img.src) {
                            var image = new Image();
                            image.onerror = function(){
                                me.sendLog({
                                    'action': 'imageerror',
                                    'src': img.src,
                                    'width': img.width,
                                    'height': img.height,
                                    'alt': img.alt
                                });
                            };
                            image.src = img.src;
                        }
                    });
                });
            } catch (e) {

            }
        },
        sendLog: function (data){
            try{
                $.post(this.url, data, function (r){
                });
            } catch (e){
                console.error('send log error');
            }
        },
        getCount: function (callback){
            try{
                $.post(this.url, {'action': 'count'}, function (r){
                    var json = eval('(' + r + ')');
                    json.count && callback(json.count);
                });
            } catch (e){
                console.error('get count error');
            }
        }
    };
$(document).ready(function(){
		var log = new WordLog(editor_api.editor.content.obj);
    	log.start();
});
    
	
	/*editor_api.editor.content.obj.on('ready uploader_uploadComplete', function(type){
        setTimeout(function(){
            log.getCount(function(count) {
                $('.uploadcount').text('已转换' + count + '个文档');
            });
        }, type == 'ready' ? 0:500);
    });

})();

*/