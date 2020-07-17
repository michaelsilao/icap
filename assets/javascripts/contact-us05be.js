// JavaScript Document$j = jQuery.noConflict();

document.write('<style type="text/css">\n');
document.write('.contact-detail {display: none;}\n');
document.write('.contact-data li {cursor:pointer;}\n');
document.write('</style>\n');

var SCARPPED_LOADED = false;

function asyncload() {

	if (SCARPPED_LOADED) {
		return;
	}

	SCARPPED_LOADED = true;

	var counter = 0;
	var counter1 = 0;

	$j('.contact-detail-wrapper .region-data').each(function () {
		$j(this).hide();
		$j(this).find('.contact-data li').each(function () {

			//alert($j(this).find("div .location-title").next().attr("class"));
			if ($j(this).find('div .location-title').next().hasClass('currentloc')) {

				$j(this).parent().parent().show();
				$j(this).show();
				$j(this).addClass('currentLi');
				$j('ul.contact-data li.currentLi:odd').css('background-color', '#ffffff');
				counter1++;
			} else {
				$j(this).hide();
			}

		});


		$j('.contact-data li.currentLi').click(function () {

			$j('.location-title').html($j(this).find('span').first().html());
			$j('.contact-data li').removeClass('selected');
			$j(this).addClass('selected');
			var curId = $j(this).attr('id');
			//alert(curId);

			$j('.contact-data li div.contact-detail').each(function () {
				if ($j(this).hasClass(curId)) {
					$j(this).css({ 'display': 'block' });
				} else {
					$j(this).css({ 'display': 'none' });
				}
			});
		});

	});
}


$j = jQuery.noConflict();
$j(document).ready(function () {

	asyncload();

    var currentUrl = window.location.pathname;
    var asyncUrl = '';
    var regionVal = '';
    var serviceVal = '';
    var marketVal = '';
    regionVal = $j('#regionCon').val();
    serviceVal = $j('#serviceCon').val();
    marketVal = $j('#marketCon').val();

    asyncurl = currentUrl + '?async=1&ip3Rendering=Contact us - Async&ac=1&region=' + regionVal + '&market=' + marketVal + '&service=' + serviceVal;

    $j('#regionCon').change(function () {
        regionVal = $j('#regionCon').val();
        asyncurl = currentUrl + '?async=1&ip3Rendering=Contact us - Async&ac=1&region=' + regionVal + '&market=' + marketVal + '&service=' + serviceVal;

        asyncurl = encodeURI(asyncurl);

        asyncload();


//alert(asyncurl);
    });

    $j('#serviceCon').change(function () {
//var reg = document.getElementById("regionCon");
        serviceVal = $j('#serviceCon').val();
        asyncurl = currentUrl + '?async=1&ip3Rendering=Contact us - Async&ac=1&region=' + regionVal + '&market=' + marketVal + '&service=' + serviceVal;

        asyncurl = encodeURI(asyncurl);
//alert(asyncurl);
        asyncload();

//$j(".contact-detail-wrapper").html("<p class='center-content'>Loading...</p>");
//$j(".contact-detail-wrapper").load(asyncurl, function () {});


    });

    $j('#marketCon').change(function () {
//var reg = document.getElementById("regionCon");
        marketVal = $j('#marketCon').val();
        asyncurl = currentUrl + '?async=1&ip3Rendering=Contact us - Async&ac=1&region=' + regionVal + '&market=' + marketVal + '&service=' + serviceVal;

        asyncurl = encodeURI(asyncurl);
//alert(asyncurl);
//$j(".contact-detail-wrapper").html("<p class='center-content'>Loading...</p>");
//$j(".contact-detail-wrapper").load(asyncurl, function () {});
        asyncload();
    });


    var counter = 0;
    var k = 0;
    //$j(".contact-detail-wrapper .region-data").css("display","none");

});


