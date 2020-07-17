$j = jQuery.noConflict();
document.write('<style type="text/css">');
document.write('.product-title{cursor:pointer;}');
document.write('</style>');

$j(document).ready(function(){
$j(".tabed-menu.productsTab ul li.first").addClass("current");
$j(".productItems").css("display","none");
$j(".productItems:eq(0)").css("display","block");


$j('.tabed-menu.productsTab ul li').click(function(){
	
	$j('.tabed-menu.productsTab ul li').removeClass('current');
	$j(this).addClass('current');
	var curId = $j(this).children().attr("id");
	
	$j(".productItems").each(function(){
		if($j(this).hasClass(curId))
		{
	    	$j(this).css({"display":"block"});
		}
		else
		{
			$j(this).css({"display":"none"});
		}
	});
});

$j(".productItems a").on("click", function(){
		var theId = $j(this).attr("href");
		$j('.tabed-menu.productsTab ul li a'+theId).trigger("click");
										   })

/*-------------------- Filter JS starts here ---------------*/

/*---------- For class seperation  --------------------*/

$j(".marketProducts ul li").each(function(){
	var classname = $j(this).attr("class");
	var clstrunc1 = classname.split(' ').join('');
	var clstrunc = clstrunc1.split(',').join(' ');	
	$j(this).attr("class", clstrunc);

});

});

/*-------- Class seperation ends ----------------*/

/*----------- Filter starts -----------------------*/


var myclasses = new Array();

$j(document).ready(function() {
							
	$j('.filterService ul li ul').not(':has(li)').remove();						
							
	$j(".filterClear a").click(function(){


$j(".product-box").show(); 
	
	$j(".filterService ul li input, .filterRegion ul li input").each(function(){
		$j(this).attr("checked",false);
		$j(".marketProducts ul li, .opportunitiesContent table.oppTable tbody tr").show();
		myclasses = [];
    });
	
});

    $j(".filterMain ul li input[type=checkbox]").change(function()
    {
        var divId = $j(this).attr("id");
	   if ($j(this).is(":checked")) {
			
			
			
			myclasses.push($j(this).attr('id'));
			$j(".marketProducts ul li, .opportunitiesContent table.oppTable tbody tr").hide();
			
			$j(".product-box").each(function(){
					$j(this).hide();
					for(n=0; n<=myclasses.length; n++){
						//alert($j(this).attr("class"))
						if($j(this).hasClass(myclasses[n])){
							//alert(myclasses[n]);
						$j(this).show();

						}
					}
					
					})
			
			for(n=0; n<=myclasses.length; n++)
			{
				
				$j(".marketProducts ul li, .opportunitiesContent table.oppTable tbody tr").each(function(){
					var allClasses = $j(this).attr("class");
					if(allClasses.indexOf(myclasses[n]) != "-1")
					{
						$j(this).show();
					}
				
				});
				
			}
			
        }
        else{
			var temp = $j(this).attr("id");
				for(n=0; n<=myclasses.length; n++){
						//alert($j(this).attr("class"))
						if(temp == myclasses[n])
							$j("."+myclasses[n]).hide();
					}
		
			
			for(n=0; n<=myclasses.length; n++)
			{
				if(temp == myclasses[n]){				
				myclasses.splice(n,1);						
				
				$j(".marketProducts ul li, .opportunitiesContent table.oppTable tbody tr").each(function(){
					var allClasses = $j(this).attr("class");
					if(allClasses.indexOf(temp) != "-1")
					{
						$j(this).hide();
					}
					
				});
				}
			}
			
			for(n=0; n<=myclasses.length; n++)
			{
				$j(".marketProducts ul li, .opportunitiesContent table.oppTable tbody tr").each(function(){
					var allClasses = $j(this).attr("class");
					if(allClasses.indexOf(myclasses[n]) != "-1")
					{
						$j(this).show();
					}
				});
			}
			
		}

var t=0;
$j(".filterMain ul li input[type=checkbox]").each(function(){
if ($j(this).is(":checked")) 	t++;
});
if(t == 0) {$j(".marketProducts ul li").show();

}

		$j(".product-box .marketProducts ul").each(function(){
			
			var liCount = $j(this).children().length;
			var liHide = 0;
			
			$j(this).find("li").each(function(){
				if($j(this).css("display") == "none")
				{
					liHide++;
				}
				
			});
			//alert(liHide);
			if(liCount == liHide)
			{
				$j(this).parent().parent().parent().css("display","none");
			}
			else
			{
				$j(this).parent().parent().parent().css("display","block");
			}
			
			liCount = 0;
			liHide = 0;
			

		});
		if(myclasses.length == 0)	$j(".product-box").show();

});

/*----------------- Filter ends here ---------------------*/






});