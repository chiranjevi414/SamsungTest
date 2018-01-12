$("#install-btn").click(function(){
    $('.file-upload').show();
});
$("#file-upload-btn").click(function(){

    var formData = new FormData(this);
    formData.append( 'file', apkUpload.files[0] );

    var serviceUrl ='/upload-service/api/files';
    var url = baseUrl+ serviceUrl;
    $.ajax({
        url: url,
        type: 'POST',
        data: formData,
        crossDomain: true,
        enctype: 'multipart/form-dat;charset=UTF-8',
        cache: false,
        contentType: false,
        processData: false,
        async: false,
        beforeSend: function(xhr){
            xhr.withCredentials = true;
            xhr.setRequestHeader('Authorization', 'bearer '+token);
        },
        success: function (res) {
            console.log('success Call of FileUpload');
        },
        error: function(xhr, status) {
            console.log('error processing your request', xhr.status);
        }
    }).then(function(res){
        console.log(res.files[0].key);
        if(res.files[0].key !== undefined){
            $("#install-btn").removeClass("btn btn-default btn-lg").addClass("btn btn-primary btn-lg");
            $(".file-upload").hide();
            $("#uninstall-btn").prop("disabled", false);
            $("#cleanup-btn").prop("disabled", false);
            jsonCords.type='file-upload';
            jsonCords.payload=res.files[0].url!== undefined?res.files[0].url:'';
            var tmp = JSON.stringify(jsonCords);
            console.log('fileupload :: ', tmp);
            stompClient.send('/socket/rtl/ui/device/screen/'+deviceId, {},tmp);
        }
    });
});

$("#uninstall-btn").click(function(){
    jsonCords.type='file-upload';
    jsonCords.payload='uninstall';
    var tmp = JSON.stringify(jsonCords);
    console.log('fileupload uninstall :: ', tmp);
    stompClient.send('/socket/rtl/ui/device/screen/'+deviceId, {},tmp);
});

$("#cleanup-btn").click(function(){
    jsonCords.type='celan-up';
    jsonCords.payload='device';
    var tmp = JSON.stringify(jsonCords);
    console.log('device- clean up :: ', tmp);
    stompClient.send('/socket/rtl/ui/device/screen/'+deviceId, {},tmp);
});
