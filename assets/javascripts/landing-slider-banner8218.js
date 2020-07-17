$j = jQuery.noConflict();
$j(document).ready(function(){

			$j('#slides2').slides({
				auto: false,
                             //  play: 6000,
                             // pause: 1500,
				preload: true,
				preloadImage: '/assets/_/media/Images/I/Icap-Corp/css/loading.gif',
				pagination: true,
                                hoverPause: true,
                                  generateNextPrev: false

							});


			$j('#slides').slides({
				preload: true,
				preloadImage: '/assets/_/media/Images/I/Icap-Corp/css/loading.gif',
				play: 6000,
				pause: 1500,
				hoverPause: true,
                
				animationStart: function(current){
					//$j('.caption').animate({
						//bottom:0
					//},100);
					if (window.console && console.log) {
						// example return of current slide number
						console.log('animationStart on slide: ', current);
					};
				},
				animationComplete: function(current){
					//$j('.caption').animate({
						//bottom:0
					//},200);
					if (window.console && console.log) {
						// example return of current slide number
						console.log('animationComplete on slide: ', current);
					};
				},
                                slidesLoaded: function() {
					$j('.caption').animate({
						//bottom:0
					},200);
				}
			});
								
      
			
			
			
			
		});
