<link rel="stylesheet" type="text/css" href="../../../assets/stylesheets/ResourceHandlermergeall96a8.css?css=1&amp;0=%7BF72A003D-1F07-4547-810D-0866026A0517%7D&amp;1=%7B5C7BFD37-3AE9-4C74-97E1-8093ACDEF03B%7D&amp;3=%7B70868301-A790-4A87-9B1D-8D469A007E25%7D&amp;4=%7B23631D57-CBEA-453D-8430-0196F9937E68%7D&amp;6=%7B492ACD79-AD07-47EA-9FC5-F57AA5FCD582%7D&amp;sc_lang=en&amp;revision=d1d5a151-1a28-4c20-9ce8-512e01d57baf" media="all" /><link rel="stylesheet" type="text/css" href="../../../assets/stylesheets/ResourceHandlermergeprint8008.css?css=1&amp;5=%7B5866C375-10E4-49DB-AE07-82AA7A0D3447%7D&amp;sc_lang=en&amp;revision=d1d5a151-1a28-4c20-9ce8-512e01d57baf" media="print" /><link rel="stylesheet" type="text/css" href="../../../assets/stylesheets/ResourceHandlermergescreene617.css?css=1&amp;2=%7BD027FD95-3AF0-41A7-AC14-3444A8A681CC%7D&amp;sc_lang=en&amp;revision=d1d5a151-1a28-4c20-9ce8-512e01d57baf" media="screen" />
<link href="../../../assets/stylesheets/sef-form.css" rel="stylesheet" type="text/css" media="all">
<script type="text/javascript" language="javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>

<script type="text/javascript" language="javascript" src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.10.0/jquery-ui.min.js"></script>
<script type="text/javascript" src="../../../assets/javascripts/market-data-form.js" ></script>

<div id="subscribeForm">

<form id="SEFSignup" action="https://www.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8" method="POST">
<!--<p><strong>Subscribe to SEF Market Data or SEF Rule Notifications</strong></p>-->
<p>Fill in your details here to subscribe to receive notifications about the ICAP SEF. <br />Please complete all fields in the form.</p>
<input type=hidden name="oid" value="00D20000000N1hh">
<input type=hidden name="retURL" value="http://www.icap.com/what-we-do/global-broking/sef/thankyou.aspx?async=1&ref=thankyou">

<input type="hidden" name="SEF_website_lead__c" value=1>
<!--  ----------------------------------------------------------------------  -->
<!--  NOTE: These fields are optional debugging elements. Please uncomment    -->
<!--  these lines if you wish to test in debug mode.                          -->
<!--  <input type="hidden" name="debug" value=1>   -->                          
<!--<input type="hidden" name="debugEmail" value="alex.hamilton-mcleod@icap.com"> -->                                 
<!--  ----------------------------------------------------------------------  -->

<label for="first_name">First Name</label><input  id="first_name" maxlength="40" name="first_name" size="20" type="text" /><br>

<label for="last_name">Last Name</label><input  id="last_name" maxlength="80" name="last_name" size="20" type="text" /><br>

<label for="email">Email</label><input  id="email" maxlength="80" name="email" size="20" type="text" /><br>

<label for="company">Company</label><input  id="company" maxlength="40" name="company" size="20" type="text" /><br>

<div id="checkboxes">


<label>Web reporting issues:</label><input class="itemWRI"  id="00Nw0000008Qreh" name="00Nw0000008Qreh" type="checkbox" value="1" /><br>

<label>Rulebook changes:</label><input class="itemRbC"  id="00Nw0000008Qrew" name="00Nw0000008Qrew" type="checkbox" value="1" /><br>

<label>System outages:</label><input class="itemSO"  id="00Nw0000008Qrf1" name="00Nw0000008Qrf1" type="checkbox" value="1" /><br>

<label>General announcements:</label><input class="itemGenA"  id="00Nw0000008QrfB" name="00Nw0000008QrfB" type="checkbox" value="1" /><br>

<label>Unsubscribe from all notifications:</label><input class="itemNone"  id="00Nw0000008Qrh2" name="00Nw0000008Qrh2" type="checkbox" value="1" /><br>

</div>
<span class="error" style="display:none;">Please complete the form and select at least one category.</span>
<input type="submit" name="submit" value="Submit" class="sefSubmit">

</form>
</div>
