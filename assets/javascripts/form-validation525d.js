function CheckRequiredFields() {
var errormessage = new String();
// Put field checks below this point.

var msg = '';
var regex = /^.+\@(\[?)[a-zA-Z0-9\-\.]+\.([a-zA-Z]{2,3}|[0-9]{1,3})(\]?)$/;
var onlytext = /^[a-zA-Z ]*$/;
var regexNum = /^ *[0-9]+ *$/;
var regexPhone = /^[0-9\s\(\)\+\-]+$/;


var fname = document.getElementById('appformname-textboxTextbox').value;
if(document.getElementById('appformname-textboxTextbox').value == '')
	{ errormessage += '\n\nPlease enter your full name.'; }
if(fname !='' && !onlytext.test(fname))
	{ errormessage += '\n\nPlease enter a valid full name.'; }



if(document.getElementById('appformemail-textboxTextbox'))
{
	var email = document.getElementById('appformemail-textboxTextbox').value;
	
	if(WithoutContent(document.getElementById('appformemail-textboxTextbox').value))
	{ errormessage += '\n Email address'; }
	else if(email !='' && !regex.test(email))
	{ errormessage += '\n Please enter a valid email address.' ; }
}





if(document.getElementById("appformtick-checkboxCheckbox"))
{
	var check=document.getElementById('appformtick-checkboxCheckbox').checked;
	//alert(check);
	
	if(check == false)
	{
		//alert("false");
		errormessage += '\n Please tick the checkbox to submit the form.';
	}
	
}


var cnote = document.getElementById('appformnote-textareaTextarea').value;
if(document.getElementById('appformnote-textareaTextarea').value == '')
	{ errormessage += '\n\nPlease enter covering note.'; }
//if(cnote !='' && !onlytext.test(cnote))
	//{ errormessage += '\n\nPlease enter a valid covering note.'; }



var fup = document.getElementById('appformcv-fileuploadFileUpload');
var fileName = fup.value;

if ((fileName=="") || (fileName==null))
{
	errormessage += '\n Upload your CV.';
 // alert("Upload your CV");
  //return false;
}
else 
{
 	var ext = fileName.substring(fileName.lastIndexOf('.') + 1);
 	if(ext == "pdf" || ext == "doc" || ext == "docx")
 	{  } 
 	else
 	{
		errormessage += '\n Upload your CV in PDF, doc or docx format.';
	 //alert("Upload your CV in PDF, doc or docx format");
	 //fup.focus();
	 //return false;
 	} 
}

//document.getElementById('msg').style.visibility="hidden";


// Put field checks above this point.
if(errormessage.length > 2) {
	alert('Please provide the following information:\n\n' + errormessage);
	return false;
}
document.getElementById("appformrole-textboxTextbox").disabled = false;

return true;
} // end of function CheckRequiredFields()

function WithoutContent(ss) {
if(ss.length > 0) { return false; }
return true;
}


$j = jQuery.noConflict();
$j(document).ready(function() {
	$j("#appformSuccessContainer").prev("p.msg").css("display","none");					
$j("appformSubmitButton").click(function(){
alert("here");
$j("#appformrole-textboxTextbox").prop('disabled', false);

});

							
							});