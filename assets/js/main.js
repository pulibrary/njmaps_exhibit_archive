// JavaScript Document
 /* LOCAL FUNCTIONS FOR FINDINGAIDS PAGE
  * ======================================================= */
$(document).ready(function() {
    var pathname = window.location.href.split('#')[0];
    $('a[href^="#"]').each(function() {
        var $this = $(this),
            link = $this.attr('href');
        $this.attr('href', pathname + link);
    });
});


$(document).ready(function(){

	$( "nav .counties-deets" ).hide();
	$( "nav .background-deets" ).hide();

	$( ".counties" ).click(function() {
		$(this).find('ul').slideToggle();
	});
	$( ".background" ).click(function() {
		$(this).find('ul').slideToggle();
	});

	
	function closeModal() {
		// $("#lightbox").fadeOut( "slow" );
		$("#container").fadeOut( "slow" ).modal();
	}

	$("#closeModal").on( "click", closeModal );
	// $("#lightbox").on( "click", closeModal );
	
	$(".resource").on("click", function(event){
		event.preventDefault();
		// $("#lightbox").fadeIn( "slow" ).modal();
		$("#container").fadeIn( "slow" ).modal();

		$(".resource").removeClass("active");
		$(this).addClass("active");
		
		var thumb = $(this).find(".thumb");
		var label = $(this).find(".caption").text();
		var url = thumb.attr("data-info");
		
		// update the modal title
		// $("#imgZoomLabel").text(label);
	        var promises = []
		promises.push(setOverlaySize());
		promises.push( $.getJSON(url + CB,
			      function(data) {
				      if(typeof o !== 'undefined'){
					o.destroy();
				      }
				      updateTileSources(data);
				    
			      }
			)
		)
		$.when.apply($, promises).done(function() {
			o = OpenSeadragon(osd_config);
		});
		
		
		
	});
	
	/* LORIS stuff */
	var CB = '?callback=?'
	var rotation = 0;
	
	var osd_config = {
		id: "viewer",
		prefixUrl: "/njmaps/assets/js/vendor/openseadragon/images/",
		preserveViewport: true,
		showNavigator:  true,
		visibilityRatio: 1,
		tileSources: [{"profile": "http://library.stanford.edu/iiif/image-api/1.1/compliance.html#level2", "scale_factors": [1, 2, 4, 8, 16], "tile_height": 256, "height": 3600, "width": 2676, "tile_width": 256, "qualities": ["native", "bitonal", "grey", "color"], "formats": ["jpg", "png", "gif"], "@context": "http://library.stanford.edu/iiif/image-api/1.1/context.json", "@id": "http://libimages.princeton.edu/loris/pudl0001%2F5138415%2F00000011.jp2"}]
	}
	
	// initialize OpenSeadragon
	// o = OpenSeadragon(osd_config);
	
	function isCanvasSupported(){
	  var elem = document.createElement('canvas');
	  return !!(elem.getContext && elem.getContext('2d'));
        }  
	      
	function updateTileSources(data) {
		// osd_config.tileSources.push(data);
		osd_config.tileSources = data;
	}
	
	function setOverlaySize() {

		var c = $('#container');
		var v = $('#viewer');
		v.css("width", "100%");
		v.css("height", "90%");
		v.css("background-color", $("#bg").css("background-color"));
		v.css("color", $("#bg").css("color"));

		//$('.toolbar').width( dimensions.width );	
	}

	
	/* end LORIS stuff */
	
	$("#rotate").on("click", function(event){
		event.preventDefault();
		if(isCanvasSupported()){
			rotation = rotation + 90;
			if(rotation == 360){ rotation = 0; }
			o.viewport.setRotation(rotation);
		}else{
		    alert("Sorry, your browser doesn't support rotation.");
		}
	});

});