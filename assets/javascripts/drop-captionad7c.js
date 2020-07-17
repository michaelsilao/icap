$j = jQuery.noConflict();
$j(document).ready(function(){
$j(".caption-area").css("display", "none");

$j(".bussiness-box, .director-box, .technology-box, .joint-venture, .people-box, .global-box, .charity-box, .culture-box").live("mouseenter", function(){
	//alert("Enter");
	$j(this).children(".caption-area").slideDown(600);
	    $j(this).children(".caption-area").css("display", "block");   
	
});   
$j(".bussiness-box, .director-box, .technology-box, .joint-venture, .people-box, .global-box, .charity-box, .culture-box").live("mouseleave", function(){
	//alert("Leave");
	    $j(this).children(".caption-area").slideUp(600);  
	  	$j(this).removeClass("hover");
});

});