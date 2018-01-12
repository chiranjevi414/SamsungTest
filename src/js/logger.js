
function displayLogs(data) {
    var wtf = $('.log-details');
    var height = wtf[0].scrollHeight;
    wtf.scrollTop(height);
    if(height >= 30000){
        $('.log-details').empty()
    }
    $('.log-details').append(data);
}

function disConnectLogs(){
    jsonCords.type= "stop";
    var tmp = JSON.stringify(jsonCords);
    console.log('disConnectLogs: ',tmp);
    stompClient.send('/socket/rtl/ui/device/logs/'+deviceId, {},tmp);
}
$("#logger-btn").click(function(){
    console.log('Logs button clicked');
    $("#logger-btn").removeClass("btn btn-default btn-lg").addClass("btn btn-primary btn-lg");
    $('.logs-panel').show();
    $('.log-details').show();
    $('.inactive, .active').toggle();
    $('.log-btn').click(function () {
        $('.log-details').empty();
        var btnValue = ($(this).attr("value"));
        resetJsonCords();
        jsonCords.type= "logLevel";
        jsonCords.payload= btnValue;
        var tmp = JSON.stringify(jsonCords);
        console.log('logger-btn function : ',tmp);
        stompClient.send('/socket/rtl/ui/device/logs/'+deviceId, {},tmp);
    });
});
