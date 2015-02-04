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
		tileSources: [{"profile": ["http://iiif.io/api/image/2/level2.json", {"supports": ["canonicalLinkHeader", "profileLinkHeader", "mirroring", "rotationArbitrary", "sizeAboveFull"], "qualities": ["default", "bitonal", "gray", "color"], "formats": ["jpg", "png", "gif", "webp"]}], "tiles": [{"width": 1024, "scaleFactors": [1, 2, 4, 8, 16, 32, 64, 128]}], "protocol": "http://iiif.io/api/image", "sizes": [{"width": 42, "height": 60}, {"width": 83, "height": 119}, {"width": 166, "height": 237}, {"width": 332, "height": 474}, {"width": 663, "height": 947}, {"width": 1325, "height": 1893}, {"width": 2650, "height": 3786}, {"width": 5299, "height": 7572}], "height": 7572, "width": 5299, "@context": "http://iiif.io/api/image/2/context.json", "@id": "http://libimages.princeton.edu/loris2/exhibits%2Fnj-historic-maps%2Fintro%2F1834-new-sersey-map-gordon-foldout.jp2"}]
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