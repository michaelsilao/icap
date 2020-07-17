$j = jQuery.noConflict();
document.write('<style type="text/css">');
document.write(".product-title{cursor:pointer;}");
document.write("#noJobs{display:none;}");
document.write("</style>");

function Trim(myval) {
    var chklen = myval.length;
    var pos = 0;
    mychar = myval.charAt(0);
    if (mychar.charCodeAt(0) == 10) {
        myval = myval.substr(1)
    }
    while (pos >= 0 || lstpos >= 0) {
        pos = myval.indexOf(" ");
        if (pos == 0) {
            myval = myval.substring(1, chklen);
            chklen = myval.length;
            mychar = myval.charAt(0)
        }
        lstpos = myval.lastIndexOf(" ");
        if (lstpos == chklen - 1) {
            myval = myval.substring(0, chklen - 1);
            chklen = myval.length;
            mychar = myval.charAt(chklen - 1)
        }
        if (mychar != " ") {
            break
        }
    }
    return myval
}
$j(document).ready(function () {
    $j(".tabed-menu.productsTab ul li.first").addClass("current");
    $j(".productItems").css("display", "none");
    $j(".productItems:eq(0)").css("display", "block");
    $j(".tabed-menu.productsTab ul li").click(function () {
        $j(".tabed-menu.productsTab ul li").removeClass("current");
        $j(this).addClass("current");
        var curId = $j(this).children().attr("id");
        $j(".productItems").each(function () {
            if ($j(this).hasClass(curId)) {
                $j(this).css({
                    display: "block"
                })
            } else {
                $j(this).css({
                    display: "none"
                })
            }
        })
    });
    var x = 1;
    $j(".opportunitiesContent table.oppTable tbody tr").removeClass("evenRow");
    $j(".opportunitiesContent table.oppTable tbody tr").each(function () {
        if ($j(this).css("display") != "none") {
            if ((x % 2) == 0) {
                $j(this).addClass("evenRow")
            }
            x++
        }
    });
    $j(".opportunitiesContent table.oppTable tbody tr").each(function () {
        var classname = $j(this).attr("class");
        var clstrunc1 = classname.split(" ").join("");
        var clstrunc = clstrunc1.split(",").join(" ");
        //$j(this).attr("class", clstrunc)
    })
});
$j(document).ready(function () {
   	var hireAR = new Array();
    var regionAR = new Array();
    var businessAR = new Array();
    var finalAR = new Array();
    var curClass = "";
    var innerCounter = 0;
    var outerCounter = 0;
    $j(".filterService ul li ul").not(":has(li)").remove();
    $j(".filterClear a").click(function () {
        $j(".filterService ul li input, .filterRegion ul li input").each(function () {
            $j(this).attr("checked", false);
            $j(".opportunitiesContent table.oppTable tbody tr").show();
            regionAR = [];
            businessAR = [];
			hireAR = []
        })
    });
    $j(".filterMain ul li input[type=checkbox].level1").change(function () {
		//alert($j(this).is(":checked"));
		//alert("1");
        if ($j(this).is(":checked")) {
            $j(this).parent().find("ul li").each(function () {
				//alert($j(this).text());													   
                $j(this).find("input").attr("checked", true);
                $j(this).find("input").trigger("change")
            })
        } else {
            $j(this).parent().find("ul li").each(function () {
                $j(this).find("input").attr("checked", false);
                $j(this).find("input").trigger("change")
            })
        }
    });


    function compareClass() {
		showFlag = true;
		//alert(hireAR + regionAR);
        $j(".opportunitiesContent table.oppTable tbody tr").hide();
        $j(".opportunitiesContent table.oppTable tbody tr").each(function () {
			showFlag = false;
			
			businessARFlag=true;
			hireARFlag=true;
			regionARFlag=true;
			
            if (businessAR.length == 0 && regionAR.length == 0 && hireAR.length == 0) {
                $j(this).show()
            } else {
					//alert(businessAR.length + " - " + hireAR.length  + " - " + regionAR.length);
					if(businessAR.length > 0)
					{
						businessARFlag=false;
						for (k = 0; k < businessAR.length; k++) {
							curClass = Trim($j(this).attr("class"));
							if ($j(this).hasClass(businessAR[k])){
								
								businessARFlag = true;
							}
						}
					}
					
					if(hireAR.length > 0)
					{
						hireARFlag=false;
						for (h = 0; h < hireAR.length; h++) {
							curClass = Trim($j(this).attr("class"));
							//alert(hireAR[h] + "-" + curClass + " - " + curClass.indexOf(hireAR[h]));
							//console.log(hireAR[h] + " -- " + $j(this).hasClass(hireAR[h]));
							if ($j(this).hasClass(hireAR[h])){
								//console.log(
								hireARFlag = true;
							}
						}
					}
					if(regionAR.length > 0)
					{	
						regionARFlag=false;
						for (h = 0; h < regionAR.length; h++) {
							curClass = Trim($j(this).attr("class"));
							if ($j(this).hasClass(regionAR[h])){
							
								regionARFlag = true;
							}
						}
					}
					
					
					
					
					/*if (regionAR.length == 0) {
                    for (k = 0; k <= businessAR.length; k++) {
							curClass = Trim($j(this).attr("class"));
							if (curClass.indexOf(businessAR[k]) != "-1") {
								$j(this).show()
							}
						}
						} else {
						if (businessAR.length == 0) {
							for (k = 0; k <= regionAR.length; k++) {
								curClass = Trim($j(this).attr("class"));
								if (curClass.indexOf(regionAR[k]) != "-1") {
									$j(this).show()
								}
							}
						} else {
							for (p = 0; p <= regionAR.length; p++) {
								for (k = 0; k <= businessAR.length; k++) {
									vq = regionAR[p] + " " + businessAR[k];
									curClass = Trim($j(this).attr("class"));
									
									if (curClass.indexOf(regionAR[p]) != "-1" && curClass.indexOf(businessAR[k]) != "-1") {
										$j(this).show();
								
									}
								}
							}
						}
					}	*/
					
					if(businessARFlag && hireARFlag && regionARFlag)
					{
						$j(this).show();
					}
                
					/*alert(hireAR + " " + businessAR);*/
					
					
					
			}
            var x = 1;
            $j(".opportunitiesContent table.oppTable tbody tr").removeClass("evenRow");
            $j(".opportunitiesContent table.oppTable tbody tr").each(function () {
                if ($j(this).css("display") != "none") {
                    if ((x % 2) == 0) {
                        $j(this).addClass("evenRow");
                    }
                    x++;
                }

            });
        //alert(hireAR + " " + businessAR + " " + regionAR);
		});
		
		
    }
	
    $j(".filterHire ul li input[type=checkbox]").change(function () {
        var divId = $j(this).attr("id");
        if ($j(this).is(":checked")) {
            hireAR.push($j(this).attr("id"))
        } else {
            /*var ind = hireAR.indexOf(divId);*/
			var ind = $j.inArray((divId), hireAR);
			if(ind>=0)
			{
				hireAR.splice(ind, 1);
			}
            //hireAR.splice(xTemp, 1)
        }
		//alert(hireAR);
        outerCounter = 0;
        innerCounter = 0;
        $j(this).parent().parent().find("li").each(function () {
            outerCounter++;
            if ($j(this).find("input").is(":checked")) {
                innerCounter++
            }
        });
        if (innerCounter == outerCounter && innerCounter != 0) {
            $j(this).parent().parent().parent().find("input.level1").attr("checked", true)
        } else {
            $j(this).parent().parent().parent().find("input.level1").attr("checked", false)
        }
		
        compareClass();
    });
    $j(".filterService ul li input[type=checkbox]").change(function () {
        //alert("2");
		var divId = $j(this).attr("id");
        if ($j(this).is(":checked")) {
            businessAR.push($j(this).attr("id"))
        } else {
			
			/*var ind = businessAR.indexOf(divId);*/
			var ind = $j.inArray((divId), businessAR);

			if(ind>=0)
			{
				businessAR.splice(ind, 1);
			}
            
        }
		//alert(hireAR + " " + businessAR);
        outerCounter = 0;
        innerCounter = 0;
        $j(this).parent().parent().find("li").each(function () {
            outerCounter++;
            if ($j(this).find("input").is(":checked")) {
                innerCounter++
            }
        });
        if (innerCounter == outerCounter && innerCounter != 0) {
            //$j(this).parent().parent().parent().find("input.level1").attr("checked", true)
        } else {
            //$j(this).parent().parent().parent().find("input.level1").attr("checked", false)
        }
        compareClass()
    });
    $j(".filterRegion ul li input[type=checkbox].level2").change(function () {
        var divId = $j(this).attr("id");
        if ($j(this).is(":checked")) {
            regionAR.push($j(this).attr("id"))
        } else {
           	/*var ind = regionAR.indexOf(divId);*/
			var ind = $j.inArray((divId), regionAR);
			if(ind>=0)
			{
				regionAR.splice(ind, 1);
			}
        }
        outerCounter = 0;
        innerCounter = 0;
        $j(this).parent().parent().find("li").each(function () {
            outerCounter++;
            if ($j(this).find("input").is(":checked")) {
                innerCounter++
            }
        });
        if (innerCounter == outerCounter && innerCounter != 0) {
            $j(this).parent().parent().parent().find("input.level1").attr("checked", true)
        } else {
            $j(this).parent().parent().parent().find("input.level1").attr("checked", false)
        }
        compareClass()
    })
	
	/*No vaccancies check*/
	$j(".filterMain ul li input[type=checkbox]").change(function()
	{  
		if($j("table.oppTable tbody tr:visible").length < 1)
		{
		//alert(123);
    	$j("div#noJobs").css("display","block");
	
		}
		else{
			$j("div#noJobs").css("display","none");
		}

		
	});
	$j(".filterMain ul li input[type=checkbox]").click(function()
{
$j('html, body, #MainForm').animate({scrollTop:0}, 'slow');

});
	$j("p.filterClear a").click(function(){
		$j("div#noJobs").css("display","none");
        $j(".filterMain ul li input[type=checkbox]").attr("checked", false);
	});
	
});