$(document).ready(function(){
    console.log('main loaded');
    $("#logout").hide();
    $("#disconnect").hide();
    /*$("#device-btn").prop("disabled", false);*/
    $("#file-upload").hide();
    /*$("#upload-btn").prop("disabled", true);*/
    $("#launch-btn" ).prop("disabled", true);
    $("#install-btn" ).prop("disabled", true);
    $("#uninstall-btn" ).prop("disabled", true);
    $("#cleanup-btn" ).prop("disabled", true);
    $("#disconnect-btn").prop("disabled", true);
    $("#logger-btn").prop("disabled", true);
    $(".remote-injection").hide();
    $(".file-upload").hide();
    $(".logs-panel").hide();
    $(".log-details").hide();


    $.getJSON('../video.json', function(data) {

        console.log("hiii");

        $.each(data.videos, function(key, val) {
            alert(val.videoID);
            alert(val.videoURL);
         })
    });

    
    var videoData = [
        {
            "videoID":1,
            "videoURL":"https://s3.amazonaws.com/haystack-rtl-mp4/12345_1514492836811.mp4"
        },
        {
            "videoID":2,
            "videoURL":"https://s3.amazonaws.com/haystack-rtl-mp4/12345_1514492906344.mp4"
        },
        {
            "videoID":3,
            "videoURL":"https://s3.amazonaws.com/haystack-rtl-mp4/12345_1514493035583.mp4"
        },
        {
            "videoID":4,
            "videoURL":"https://s3.amazonaws.com/haystack-rtl-mp4/12345_1514493265069.mp4"
        },
        {
            "videoID":5,
            "videoURL":"https://s3.amazonaws.com/haystack-rtl-mp4/12345_1514493593589.mp4"
        }
     ];

     var videoHtml = '';
     $.each(videoData, function(videoIdx, video){
        var newVideo = '<div class="eight wide column"><video class="videos"  width="100" height="200" src=' + video.videoURL  + ' controls="controls"></video></div>'
        videoHtml = videoHtml + newVideo;
     });

     $('#videosPlaceHolder').html(videoHtml);

    $('#menu-action').click(function() {
        $('.sidebar').toggleClass('active');
        $('.main').toggleClass('active');
        $(this).toggleClass('active');

        if ($('.sidebar').hasClass('active')) {
            $(this).find('i').addClass('fa-close');
            $(this).find('i').removeClass('fa-bars');
        } else {
            $(this).find('i').addClass('fa-bars');
            $(this).find('i').removeClass('fa-close');
        }
    });

// Add hover feedback on menu
    $('#menu-action').hover(function() {
        $('.sidebar').toggleClass('hovered');
    });
});

// $('.videos').on('click', function(event){
//         var video = $(this).get(0);
//         video.play();
   
// });


function myFunction() {
var popup = document.getElementById("myPopup");
popup.classList.toggle("show");

if (popup.paused){ 
    popup.play(); 
    popup.width = 250;
    popup.height = 500;
    }
  else{ 
    popup.pause();
    }
 
}



$('btn').click(function(){
    
})

