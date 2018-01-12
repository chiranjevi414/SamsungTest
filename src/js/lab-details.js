$(document).ready(function(){
    console.log('labdetails');
	var serviceUrl ='device-service/api/labs/SRID/devices/';
    var object = '';
    var str = '' ;
    var url = baseUrl+serviceUrl;

	jQuery.ajax({
	    type: 'GET',
	    url: url,
	    processData: true,
        data: {},
        dataType: "json",
	    contentType: "application/json;charset=utf-8",
		beforeSend: function(xhr){
			xhr.withCredentials = true;
			xhr.setRequestHeader('Authorization', 'bearer '+token);
		},
	    success: function(res) {
	    	object = res;
	    },
	    error: function(xhr, status) {
	    	console.log('error processing your request', xhr.status);
	    }
    }).then(function(res){
    	//console.log(res);
		populateImages();
    });

    function populateImages(){
        $.each(object, function(i, obj){
            $(".image-class1").append('<img class="logotest active-img" src='+obj.imageUrl+ ' id="'+obj.deviceId+'">');
        });

		$('img').click(function(){
            showImageData(this.id);
		});
    };

  	function showImageData(id){
  		//console.log("Populate Images activated", id);
        $("#launch-btn" ).prop("disabled", true);
        $("#disconnect-btn").prop("disabled", true);
        $("#launch-btn").removeClass("btn btn-primary btn-lg").addClass("btn btn-default btn-lg");
        for (i = 0; i <object.length; i++) {
  			if(object[i].deviceId === id){
                deviceId = object[i].deviceId;
                $(".bandName").empty();
                $(".brand").empty();
                $(".device-model").empty();
                $(".bandName").append('<b> Band Name: '+object[i].bandName+'</b>');
                $(".brand").append('<b> Device ID: '+object[i].deviceId+'</b>');
                $("#launch-btn" ).prop( "disabled", false );
                $(".remote-injection").show();
	  		}
  		}
  	};

    $('.image-class1').on('click', 'img', function(e){
        //console.log('Selected Device is : ', $(this).attr('id'));
        selectedDevice=$(this).attr('id');
    });
});
