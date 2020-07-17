$j = jQuery.noConflict();

$j(document).ready(function () {
	$j("a#subscribe-form").click(function () {
        $j('#subscribe-form-wrapper').show();
        $j('.form-FillerWrapper').css('display', 'block');
    });

    $j('.form-FillerWrapper').click(function () {
        $j('#subscribe-form-wrapper').css('display', 'none');
        $j(this).css('display', 'none');
    });

	$j('.close').click(function () {
        $j('.form-FillerWrapper').trigger("click");
        $j('#subscribe-form-wrapper').css('display', 'none');
        //$j(this).css('display', 'none');
    });
	
	$j(function(){
	checkCB();
	$j("#checkboxes .itemNone").click(checkCB);
	});
	
	function checkCB(){
	if (this.checked){
			$j(".itemWRI").attr("disabled", true);
			$j(".itemRbC").attr("disabled", true);
			$j(".itemSO").attr("disabled", true);
			$j(".itemGenA").attr("disabled", true);
            $j(".itemWRI").attr("checked", false);
			$j(".itemRbC").attr("checked", false);
			$j(".itemSO").attr("checked", false);
			$j(".itemGenA").attr("checked", false);
			}
			else {
            //alert("Zero");
			$j(".itemWRI").removeAttr("disabled");
			$j(".itemRbC").removeAttr("disabled");
			$j(".itemSO").removeAttr("disabled");
			$j(".itemGenA").removeAttr("disabled");
		
			}
		
	}
	
	$j("#SEFSignup").submit(function(e){
        var isValid = true;
       
		$j('input[type="text"]').each(function() {
            if ($j.trim($j(this).val()) == '') {
                isValid = false;
                //$j(this).css({"border": "1px solid red","background": "#FFCECE"});
				$j("span.error").css({"display": "block"});
               
            }
            else {
                //$j(this).css({"border": "","background": ""});
				$j("span.error").css({"border": "","background": "", "display": "none"});
            }
        	
		});
		if($j("#first_name").val() == ''){
		$j("span.error").css({"display": "block"});
		return false;	
		}
		if($j("#last_name").val() == ''){
		$j("span.error").css({"display": "block"});
		return false;	
		}
		if( ValidateEmail($j("#email").val()) == ''){
		$j("span.error").css({"display": "block"});
		return false;	
		}
		if($j("#company").val() == ''){
		$j("span.error").css({"display": "block"});
		return false;	
		}

	  
	  
		if($j('#checkboxes').find('input[type=checkbox]:checked').length == 0)
    	{
        //alert('Please select atleast one checkbox');
		$j("span.error").css({"display": "block"});
		return false;
    	} else  {
		$j("span.error").css({"border": "","background": "", "display": "none"});
		return true;
		}
		
			
		if (isValid == false)
            e.preventDefault();
        else
            return true;
	
	
	
	
	});

});


function echeck(str) {
 
  var at="@";
  var dot=".";
  var lat=str.indexOf(at);
  var lstr=str.length;
  var ldot=str.indexOf(dot);
  
 
  
  if (str.indexOf(at)==-1){
     alert("Email address should be in the form of xyz@domainname");
     return false;
  }
 
  if (str.indexOf(at)==-1 || str.indexOf(at)==0 || str.indexOf(at)==lstr){
     alert("Email address should be in the form of xyz@domainname");
     return false;
  }
 
  if (str.indexOf(dot)==-1 || str.indexOf(dot)==0 || str.indexOf(dot)==lstr){
      alert("Email address should be in the form of xyz@domainname");
      return false;
  }
 
   if (str.indexOf(at,(lat+1))!=-1){
      alert("Email address should be in the form of xyz@domainname");
      return false;
   }
 
   if (str.substring(lat-1,lat)==dot || str.substring(lat+1,lat+2)==dot){
      alert("Email address should be in the form of xyz@domainname");
      return false;
   }
 
   if (str.indexOf(dot,(lat+2))==-1){
      alert("Email address should be in the form of xyz@domainname");
      return false;
   }
  
   if (str.indexOf(" ")!=-1){
      alert("Email address should be in the form of xyz@domainname");
      return false;
   }
   
   
 
    return true;     
 }
 

function SubscribeFormValidate(){
	
  var f_name = document.getElementById("subscribeformtextNameTextbox").value;
  if ((f_name==null)||(f_name=="")){
  alert("Please enter your name");
  return false;
}
	
  var emailID= document.getElementById("subscribeformtextEmailTextbox");
  //alert(emailID);
  if ((emailID.value==null)||(emailID.value=="")){
  alert("Please enter your email address");
  emailID.focus();
  return false;
}
  if (echeck(emailID.value)==false){
  emailID.value="";
  emailID.focus();
  return false;
 }
 
 var c_name = document.getElementById("subscribeformtextCompanyTextbox").value;
 if ((c_name==null)||(c_name=="")){
  alert("Please enter your company name");
  return false;
 }
var value =  $j("option:selected", "#subscribeformm-CountryListDropDown").attr("value");
 if(document.getElementById("subscribeformm-CountryListDropDown") !=null)
 {
	if((document.getElementById("subscribeformm-CountryListDropDown").selectedIndex==0) && (value=="Please Select Country"))
	 {
		  alert("Please select a country");
  		  return false;
	 }	 
 }
 
 var cb1= document.getElementById("subscribeformmarket-data-notifyCheckbox").checked;
 var cb2= document.getElementById("subscribeformsef-rule-notifyCheckbox").checked;
 /*alert(cb1); alert(cb2);*/
 if(( cb1 == false) && (cb2 == false)){
 alert("Please choose the item you want to Subscribe");
 return false;
 }
 
 var c_code = document.getElementById("subscribeformcaptchaCaptchaText").value;
 if ((c_code==null)||(c_code=="")){
  alert("Please enter the captcha code");
  return false;
 }
 
}




function ValidateEmail(inputText)
{
var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
if(inputText.match(mailformat))
{
return true;
}
else
{
alert("Email address should be in the form of xyz@domainname.xxx");
return false;
}
}