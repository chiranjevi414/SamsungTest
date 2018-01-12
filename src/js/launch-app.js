
var stompClient = null;
var setConnected = false;
var mousePressedTime = 0;
var mouseReleasedTime = 0;
var jsonCords = {
    "type": null,
    "payload": null,
    "screenCoordinates": {
        "x": null,
        "y": null,
        "x1": null,
        "y1": null
    }
};
function connect(deviceId) {
    console.log('websocket connect initiated');

    var headers = {
    }
    var sockerUrl = serverLb + ':8089/stream-service/web-socket';
    var wsUrl = 'ws://'+ sockerUrl
    var httpUrl = 'http://' + sockerUrl;
    var socket = new SockJS(httpUrl)
    //var socket = new WebSocket(wsUrl);

    console.log('socket:: ', socket);
    stompClient = Stomp.over(socket);
    stompClient.debug = null;
    stompClient.connect(headers, function (frame) {
        setConnected = true;
        //console.log('websocket connected successfully');
        stompClient.subscribe('/topic/response/rtl/ui/device/screen/'+deviceId, function (dataResponse) {
            displayImage(dataResponse.body);
        });

        stompClient.subscribe('/topic/response/rtl/ui/device/logs/'+deviceId, function (dataResponse) {
            displayLogs(dataResponse.body);
        });

        stompClient.subscribe('/topic/response/rtl/ui/device/audio/'+deviceId, function (dataResponse) {
            var data = JSON.parse(dataResponse.body).payload;
            playAudio(data);
        });

        startRemoteDesktop(deviceId);
    });
}

function disconnect() {
    console.log('disconnect operation initiated');
    $('.image-class1 img').removeClass('inactive-img').addClass('active-img');
    jsonCords.type='disconnect';
    jsonCords.payload='';
    var tmp = JSON.stringify(jsonCords);
    console.log('disconnect :: ', tmp);
    stompClient.send('/socket/rtl/ui/device/screen/'+deviceId, {},tmp);
    stompClient.send('/socket/rtl/ui/device/logs/'+deviceId, {},tmp);

    if (stompClient !== null) {
        stompClient.disconnect();
    }
    setConnected = false;
    $("#launch-btn").removeClass("btn btn-primary btn-lg").addClass("btn btn-default btn-lg");
    $("#disconnect-btn").removeClass("btn btn-primary btn-lg").addClass("btn btn-default btn-lg");
    $("#logger-btn").removeClass("btn btn-primary btn-lg").addClass("btn btn-default btn-lg");
    $("#install-btn").removeClass("btn btn-primary btn-lg").addClass("btn btn-default btn-lg");
    $("#launch-btn" ).prop("disabled", true);
    $("#disconnect-btn").prop("disabled", true);
    $("#logger-btn").prop("disabled", true);
    $("#install-btn" ).prop("disabled", true);
    $("#uninstall-btn" ).prop("disabled", true);
    $("#cleanup-btn" ).prop("disabled", true);
    $(".remote-injection").hide();
    $('.logs-panel').hide();
    $('.log-details').hide();
    $(".bandName").empty();
    $(".brand").empty();

    console.log("Disconnected");
}

function captureMouseEventsAndSend(deviceId, jsonCords){
    var tmp = JSON.stringify(jsonCords);
    //console.log('captureMouseEventsAndSend :: ',tmp);
    stompClient.send('/socket/rtl/ui/device/tracker/'+deviceId, {}, tmp);
}
function startRemoteDesktop(deviceId){
    console.log('startRemoteDesktop');
    jsonCords.type='RemoteDesktop';
    var tmp = JSON.stringify(jsonCords);
    console.log('startRemoteDesktop:: ', tmp);
    stompClient.send('/socket/rtl/ui/device/screen/'+deviceId, {},tmp);
}
function setMouseDownTime(){
    var d = new Date();
    mousePressedTime = d.getTime();
    jsonCords.screenCoordinates.x = (event.offsetX?(event.offsetX):(event.pageX-document.getElementById("bitmapdata").offsetLeft));
    jsonCords.screenCoordinates.y = (event.offsetY?(event.offsetY):(event.pageY-document.getElementById("bitmapdata").offsetTop));
    //console.log('X:: ', jsonCords.screenCoordinates.x, 'Y:: ', json.screenCoordinates.y);
}

function setMouseUpTime(){
    var d = new Date();
    mouseReleasedTime = d.getTime();
    jsonCords.screenCoordinates.x1 = (event.offsetX?(event.offsetX):(event.pageX-document.getElementById("bitmapdata").offsetLeft));
    jsonCords.screenCoordinates.y1 = (event.offsetY?(event.offsetY):(event.pageY-document.getElementById("bitmapdata").offsetTop));
    //console.log('X1:: ', jsonCords.screenCoordinates.x1, 'Y1:: ', jsonCords.screenCoordinates.y1);
}

function sendXYValues(event){
    console.log('capture mouse events');
    event.preventDefault();
    if( mouseReleasedTime - mousePressedTime > 500 ){
        if(jsonCords.screenCoordinates.x !== jsonCords.screenCoordinates.x1 || jsonCords.screenCoordinates.y !== jsonCords.screenCoordinates.y1 ){
            jsonCords.type = "Drag";
        }else {
            jsonCords.type = "Long Click";
        }
    } else {
        if(jsonCords.screenCoordinates.x !== jsonCords.screenCoordinates.x1 || jsonCords.screenCoordinates.y !== jsonCords.screenCoordinates.y1 ){
            jsonCords.type = "Swipe";
        }else {
            jsonCords.type = "Single Click";
        }
    }

    captureMouseEventsAndSend(deviceId, jsonCords);
    mousePressedTime = 0;
    mouseReleasedTime = 0;
}

function displayImage(data){
    var image= 'data:image/jpeg;base64,'+ data;
    $('#bitmapdata').attr('src', image);
}

function playAudio(data){
    var audio = 'data:audio/wav;base64,' + data;
    $('#audio-temp').attr('src', audio);
}

$(function () {
    $("form").on('submit', function (e) {
        e.preventDefault();
    });
    $("#launch-btn").click(function(){
        console.log("Launch Process initiated");
        $("#launch-btn").removeClass("btn btn-default btn-lg").addClass("btn btn-primary btn-lg");
        $("#logger-btn").prop("disabled", false);
        $("#install-btn").prop("disabled", false);
        $("#disconnect-btn").prop("disabled", false);
        connect(deviceId);
        console.log("selected device",selectedDevice);
        $('.image-class1 img').removeClass('active-img').addClass('inactive-img');
        $('#'+selectedDevice+'').removeClass('inactive-img').addClass('active-img');
    });

    $( "#disconnect-btn" ).click(function() {
        disconnect();
    });

});
