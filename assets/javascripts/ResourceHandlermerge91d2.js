
/*!---- autocomplete-----*/
$j(document).ready(function () {
	//main search textbox
	if($j("#SearchTextbox").length > 0)
	{
     if (!($j('body').hasClass('ip3-preview'))) {
		$j("#SearchTextbox").autocomplete({
			source: function (request, response) {

				$j.ajax({
					url: "/Investis/AdvancedSearch/PredictiveSearch.aspx",
					data: {
						ps_lang: 'en',
						PS_HOSTNAME: autoCompleteDomain,
						PS_SEARCHTERM: encodeURIComponent(request.term),
						PS_MAXSUGGESTIONCOUNT: 7
					},
					async: true,
					success: function (data) {


						response(data);
					},
					error: function (result) {
						//alert("Error loading the data" + result.responseText);
					}
				});
			},
			minLength: 1,
			select: function (event, ui) {
				$j("#SearchTextbox").val(ui.item.value);
				$j("#searchButton").trigger("click");
			}
		}).data("ui-autocomplete")._renderItem = function (ul, item) {
			return $j("<li class='ui-corner-all'>")
				.append("<a> <span style='float:left;'>" + item.label + "</span><span style='float:right;'>(" + item.count + ")</span></a>").appendTo(ul);
		};
		}
		
	}
	
	
	// Search result page textbox
	if($j("#SearchTextboxRP").length > 0)
		{
			 $j("#SearchTextboxRP").autocomplete({
				source: function (request, response) {
					$j.ajax({
						url: "/Investis/AdvancedSearch/PredictiveSearch.aspx",
						data: {
							ps_lang: 'en',
							PS_HOSTNAME: autoCompleteDomain,
							PS_SEARCHTERM: encodeURIComponent(request.term),
							PS_MAXSUGGESTIONCOUNT: 7
						},
						async: true,
						success: function (data) {
							response(data);
						},
						error: function (result) {
							//alert("Error loading the data" + result.responseText);
						}
					});
				},
				minLength: 1,
				select: function (event, ui) {
					$j("#SearchTextboxRP").val(ui.item.value);
					$j("#SearchbuttonRP").trigger("click");
				}
			}).data("ui-autocomplete")._renderItem = function (ul, item) {
				return $j("<li class='ui-corner-all'>")
					.append("<a> <span style='float:left;'>" + item.label + "</span><span style='float:right;'>(" + item.count + ")</span></a>").appendTo(ul);
			};
		}
});
/*!---- twitter-api-jtweets-----*/
$j = jQuery.noConflict();
(function ($j)
{
	function twitterConstruct(_self, params)
	{
		var JQTWEET = $j.extend({}, 
		{
			search:params.search,
			user:params.user,
			numTweets:params.numTweets,
			appendTo:params.appendTo,
			template:params.template,
			ip3_setting:params.ip3_setting,
			ip3_lang:params.ip3_lang
			
		}, params);
		
		
	   var loadTweets=function(op) 
	  {
		 
		 return;
		  if(JQTWEET.search==undefined){JQTWEET.search = false;}
		  if(JQTWEET.numTweets==undefined){JQTWEET.numTweets = 5;}
		   	//template: '<li class="item">{IMG}<div class="tweet-wrapper"><span class="text">{TEXT}</span>\
	    	//           <span class="time"><a href="{URL}" target="_blank">{AGO}</a></span>\
	    	//           by <span class="user">{USER}</span></div></li>',
		  if(JQTWEET.template==undefined){JQTWEET.template = '<li class="jtweet-item"><div class="tweet-wrapper"><span class="text">{TEXT}</span></div><div class="jta-clear"> </div></li>';}
		  if(JQTWEET.ip3_setting==undefined){JQTWEET.ip3_setting = '';}
		  if(JQTWEET.ip3_lang==undefined){JQTWEET.ip3_lang = 'en';}
		  
		  
		  
		 // alert(JQTWEET.numTweets);
		 
		  
		  FeedURL = "/tools/socialmedia/TwitterFeed.aspx?SettingName="+JQTWEET.ip3_setting+"&sc_lang="+JQTWEET.ip3_lang;
		  //alert(FeedURL);
		  //FeedURL = "/sm/twitter-oauth/twitter-oauth/grabtweets.php?q=from:britishlandCR OR from:BritishLandPLC&count=5&api=search_tweets";
		  //FeedURL = "/sm/twitter-oauth/twitter-oauth/grabtweets.php?q=from:britishlandCR OR from:BritishLandPLC&count=5&api=search_tweets";
		  //if (!window.console){console.log(FeedURL);}
		  $j.ajax({
			  url: FeedURL,
			  type: 'GET',
			  dataType: 'json',
			  //data: request,
			  success: function(data, textStatus, xhr) {
					
				  if (textStatus == "success") {
					  
					  if (JQTWEET.search) data = data.statuses;
					
				  var text, name, img;	 
					 
				  //$j(".info-wrapper").html(JSON.stringify(data));	                
				  try {
					// append tweets into page
					
					for (var i = 0; i < JQTWEET.numTweets; i++) {		
					 
					  img = '';
					  url = 'http://twitter.com/' + data[i].user.screen_name + '/status/' + data[i].id_str;
					  try {
						if (data[i].entities['media']) {
						  img = '<a href="' + url + '" target="_blank"><img src="' + data[i].entities['media'][0].media_url + '" /></a>';
						}
					  } catch (e) {  
						//no media
					  }
					  
					  
					  //console.log(_self.attr("id")+"------"+clean(data[i].text));
					  _self.append( JQTWEET.template.replace('{TEXT}', clean(data[i].text) )
						  .replace('{USER}', data[i].user.screen_name)
						  .replace('{IMG}', img)                                
						  .replace('{AGO}', timeAgo(data[i].created_at) )
						  .replace('{URL}', url )			                            
						  );
					
					  
					}
				
				} catch (e) {
					//item is less than item count
				}
				
						  
					  
				 } else 
				 {
					 //alert('no data returned');
				 }
			   
			  }   
   
		  });
   
	  }
	   
		   
	  /**
		* relative time calculator FROM TWITTER
		* @param {string} twitter date string returned from Twitter API
		* @return {string} relative time like "2 minutes ago"
		*/
	  var timeAgo=function(dateString) 
	  {
		  var rightNow = new Date();
		  var then = new Date(dateString);
		   
		  if ($j.browser.msie) {
			  // IE can't parse these crazy Ruby dates
			  then = Date.parse(dateString.replace(/( \+)/, ' UTC$1'));
		  }
   
		  var diff = rightNow - then;
   
		  var second = 1000,
		  minute = second * 60,
		  hour = minute * 60,
		  day = hour * 24,
		  week = day * 7;
   
		  if (isNaN(diff) || diff < 0) {
			  return ""; // return blank string if unknown
		  }
   
		  if (diff < second * 2) {
			  // within 2 seconds
			  return "right now";
		  }
   
		  if (diff < minute) {
			  return Math.floor(diff / second) + " seconds ago";
		  }
   
		  if (diff < minute * 2) {
			  return "about 1 minute ago";
		  }
   
		  if (diff < hour) {
			  return Math.floor(diff / minute) + " minutes ago";
		  }
   
		  if (diff < hour * 2) {
			  return "about 1 hour ago";
		  }
   
		  if (diff < day) {
			  return  Math.floor(diff / hour) + " hours ago";
		  }
   
		  if (diff > day && diff < day * 2) {
			  return "yesterday";
		  }
   
		  if (diff < day * 365) {
			  return Math.floor(diff / day) + " days ago";
		  }
   
		  else {
			  return "over a year ago";
		  }
	  } // timeAgo()
	   
	   
	  /**
		* The Twitalinkahashifyer!
		* http://www.dustindiaz.com/basement/ify.html
		* Eg:
		* ify.clean('your tweet text');
		*/
			
		var link=function(tweet) 
		{
		  return tweet.replace(/\b(((https*\:\/\/)|www\.)[^\"\']+?)(([!?,.\)]+)?(\s|$))/g, function(link, m1, m2, m3, m4) 
		  {
			var http = m2.match(/w/) ? 'http://' : '';
			//return '<a class="twtr-hyperlink" target="_blank" href="' + http + m1 + '">' + ((m1.length > 25) ? m1.substr(0, 24) + '...' : m1) + '</a>' + m4;
			return '<a class="twtr-hyperlink" target="_blank" href="' + http + m1 + '">' + ((m1.length > 18) ? m1.substr(0, 17) + '...' : m1) + '</a>' + m4;
		  });
		}
   
	   var  at=function(tweet) 
	   {
		  return tweet.replace(/\B[@＠]([a-zA-Z0-9_]{1,20})/g, function(m, username)
		  {
			return '<a target="_blank" class="twtr-atreply" href="http://twitter.com/intent/user?screen_name=' + username + '">@' + username + '</a>';
		  });
		}
   
		var list=function(tweet) 
		{
		  return tweet.replace(/\B[@＠]([a-zA-Z0-9_]{1,20}\/\w+)/g, function(m, userlist) 
		  {
			return '<a target="_blank" class="twtr-atreply" href="http://twitter.com/' + userlist + '">@' + userlist + '</a>';
		  });
		}
   
		var hash=function(tweet) 
		{
		  return tweet.replace(/(^|\s+)#(\w+)/gi, function(m, before, hash) 
		  {
			return before + '<a target="_blank" class="twtr-hashtag" href="http://twitter.com/search?q=%23' + hash + '">#' + hash + '</a>';
		  });
		}
		var clean=function(tweet) 
		{
		  return hash(at(list(link(tweet))));
		}
		loadTweets();
	}
	$j.fn.jsTwitter = function (params) // namespace - Plugin Startup
	{
		var me = $j(this);
		var dataname='jsTwitter';
		if (typeof params === 'object' || !params)
		{
			if(me.length<=0)
			{
				return false;
			}
			return me.data(dataname,  new twitterConstruct(me, params));	
		}		
	};
})($j);

$j(document).ready(function()
{
	 
	$j('#tweetfeeds').html("<ul></ul>");
	$j('#tweetfeeds ul').jsTwitter
	(
		 {
		 	search: false,
			ip3_setting: 'CharityDay',     // for CharityDay site only
			ip3_lang: 'en',
			numTweets: 1 //number of tweets
		 }
	);

$j('#lefttweets').html("<ul></ul>");
	$j('#lefttweets ul').jsTwitter
	(
		 {
		 	search: false,
			ip3_setting: 'Futs-Opts',     // for Futs-Opts site only
			ip3_lang: 'en',
			numTweets: 1 //number of tweets
		 }
	);
	
	
	$j('#tweet-plc').html("<ul></ul>");
	$j('#tweet-plc ul').jsTwitter
	(
		 {
		 
			search: false,
			ip3_setting: 'PLC', // PLC
			ip3_lang: 'en',
			numTweets: 3 //number of tweets
			
		 }
	);
	
	
	
	
	$j('#tweet-plc-whatsnew').html("<ul></ul>");
	$j('#tweet-plc-whatsnew ul').jsTwitter
	(
		 {
		 
			search: false,
			ip3_setting: 'PLC', // PLC
			ip3_lang: 'en',
			numTweets: 1 //number of tweets
			
		 }
	);
	
	
	//$j('#tweet-co').html("<ul></ul>");
//	$j('#tweet-co ul').jsTwitter
//	(
//		 {
//		 
//			search: false,
//			ip3_setting: 'ICAP-CO', // ICAP-CO
//			ip3_lang: 'en',
//			numTweets: 3 //number of tweets
//			
//		 }
//	);
	
	$j('#tweet-icapglobal').html("<ul></ul>");
	$j('#tweet-icapglobal ul').jsTwitter
	(
		 {
		 
			search: false,
			ip3_setting: 'ICAPGlobal', // ICAPGlobal
			ip3_lang: 'en',
			numTweets: 3 //number of tweets
			
		 }
	);
	
	$j('#tweet-co-whatsnew').html("<ul></ul>");
	$j('#tweet-co-whatsnew ul').jsTwitter
	(
		 {
		 
			search: false,
			ip3_setting: 'ICAP-CO', // PLC
			ip3_lang: 'en',
			numTweets: 1 //number of tweets
			
		 }
	);
	
	
	

$j('#tweet-charity').html("<ul></ul>");
	$j('#tweet-charity ul').jsTwitter
	(
		 {
		 
			search: false,
			ip3_setting: 'CharityDay', 
			ip3_lang: 'en',
			numTweets: 3 //number of tweets
			
		 }
	);
	
	
$j('#tweet-lp2014').html("<ul></ul>");
	$j('#tweet-lp2014 ul').jsTwitter
	(
		 {
		 
			search: false,
			ip3_setting: 'ICAPL2P', 
			ip3_lang: 'en',
			numTweets: 3 //number of tweets
			
		 }
	);


$j('#tweet-futsopts').html("<ul></ul>");
	$j('#tweet-futsopts ul').jsTwitter
	(
		 {
		 
			search: false,
			ip3_setting: 'Futs-Opts', 
			ip3_lang: 'en',
			numTweets: 3 //number of tweets
			
		 }
	);
	


$j('#lefttweet-futsopts').html("<ul></ul>");
	$j('#lefttweet-futsopts ul').jsTwitter
	(
		 {
		 
			search: false,
			ip3_setting: 'Futs-Opts', 
			ip3_lang: 'en',
			numTweets: 1 //number of tweets
			
		 }
	);



$j('#tweet-campus').html("<ul></ul>");
	$j('#tweet-campus ul').jsTwitter
	(
		 {
		 
			search: false,
			ip3_setting: 'Campus', 
			ip3_lang: 'en',
			numTweets: 3 //number of tweets
			
		 }
	);
		
	
	
});

/*!---- cookie-consent-----*/
var _cookiePlaceHolderSelector = ".footer-wrapper"; //.footer-wrapper  placeholder for cookie consent data and accept button
var _cookieWrapper = "_cookieConsentWrapper"
var _cookieName = "_cookieConsent";				// name of the cookie which will be used to store flag if user has clicked on i accept button
var _cookieContent = '<p>We use cookies to analyse how visitors use our website and to help us provide the best possible experience for users. We will take your continued use of our site as your consent to allow us to use cookies. However, you can <a href="/site-services/cookie-policy.aspx">disable cookies</a> at any time if you wish. View our <a href="/site-services/privacy-policy.aspx">Privacy Policy</a>. <input type="button" value="Close" onclick="setCookies();" id="cookie-agree" name="cookieagree"></p>';		// disclaimer content
document.write('<style type="text/css">');
document.write('#'+_cookieWrapper+'{}');
document.write('#'+_cookieWrapper+' p{margin:0;padding-bottom:10px;}');
document.write('#'+_cookieWrapper+' a{color:#fff;text-decoration: underline;}');
document.write('#'+_cookieWrapper+' input{border:1px solid;margin:4px 0 0 10px;}');
document.write('</style>');
function setCookies(name, value, hours)
{
	name = typeof name !== 'undefined' ? name : _cookieName;
   	value = typeof value !== 'undefined' ? value : 'yes';
	hours = typeof hours !== 'undefined' ? hours : 720;
	
	var expire = "";
	if(hours != null)
	{
	    expire = new Date((new Date()).getTime() + hours * 3600000);
		expire = "; expires=" + expire.toGMTString();
	}
	document.cookie = name + "=" + escape(value) + expire+"; path=/" ;
	$j("#"+_cookieWrapper).fadeOut(1000);
    $j("."+_cookieWrapper).css("display", "none");
//$j("#Homepage .bx-wrapper .bx-pager").css("top", "-465px");
}

function GetCookie(name) {
	var cookieValue = "";
	var search = name + "=";
	if(document.cookie.length > 0)
	{ 
		offset = document.cookie.indexOf(search);
		if (offset != -1)
		{ 
			offset += search.length;
			end = document.cookie.indexOf(";", offset);
			if (end == -1) end = document.cookie.length;
			cookieValue = unescape(document.cookie.substring(offset, end))
		}
	}
	return cookieValue;
}
function checkCookies()
{
	var cval=GetCookie(_cookieName);
	if(cval=="yes")
	{
		$j("#"+_cookieWrapper).css("display", "none");
        $j("."+_cookieWrapper).css("display", "none");
		//$j("#Homepage .bx-wrapper .bx-pager").css("top", "-465px");
	}
	else
	{
		$j("#"+_cookieWrapper).fadeIn(2000);
        $j("."+_cookieWrapper).css("display", "block");
		//$j("#Homepage .bx-wrapper .bx-pager").css("top", "-390px");
	}
}

function cookieSetup()
{
	wrapperDiv = '<div id="'+_cookieWrapper+'">'+_cookieContent+'</div>';
	$j(wrapperDiv).insertBefore($j(_cookiePlaceHolderSelector));
	checkCookies();
	
}
window.onload=cookieSetup
/*!---- data-load-----*/
$j = jQuery.noConflict();
$j(document).ready(function () {
	  if (!($j('body').hasClass('ip3-preview'))) {									 
	$j(".next-tab a").on("click", function(e)
	{
		e.preventDefault();
		var targetURL = $j(this).attr("href") + " .newsWrapper";
		$parentDiv = $j(this).parents(".removeWrapper");
		$j(".loading").css("display", "block");
		$j(".nextdataLoad").css("display", "none");
		$j(".nextdataLoad").load(targetURL, function(){
			$parentDiv.remove();
			htmlContent = $j(this).find(".newsWrapper").html()
			$j(this).replaceWith(htmlContent);
			if($j(".next-tab a").attr("href").search("javascript") >=0)
			{
				$j(".next-tab a").replaceWith("End!");
			}
		});
		
	});}
});	
/*!---- dropdown-----*/
/***************************************************************************

	good-combo 2.1.3	: A jQuery date time picker.
	
	Authors: 
		Kadalashvili.Vladimir@gmail.com - Vladimir Kadalashvili
		thetoolman@gmail.com 
		
	Version: 2.1.3
	
	Website: http://code.google.com/p/good-combo/
	

 *   This program is free software; you can redistribute it and/or modify  *
 *   it under the terms of the GNU General Public License as published by  *
 *   the Free Software Foundation; either version 2 of the License, or     *
 *   (at your option) any later version.                                   *
 *                                                                         *
 *   This program is distributed in the hope that it will be useful,       *
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of        *
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the         *
 *   GNU General Public License for more details.                          *
 *                                                                         *
 *   You should have received a copy of the GNU General Public License     *
 *   along with this program; if not, write to the                         *
 *   Free Software Foundation, Inc.,                                       *
 *   59 Temple Place - Suite 330, Boston, MA  02111-1307, USA.             *
 *                                                                         *
 ***************************************************************************/

;(function($) {
    $.fn.goodCombo = function(config) {
        return this.each(function() {
		if ("SELECT" != this.tagName.toUpperCase()) {
		    return;	
		}
	    new $sc(this, config);
	    });  
    };
    
    //default config options
    var defaults = {
        //skin name
        skin: "good",
	
	    //this suffix will be appended to the selectbox's name and will be text input's name
	    suffix: "__goodCombo",
	
	    //the same as the previous, but for hidden input
	    hiddenSuffix: "__goodComboHidden",
	    
	    //rename original select, and call the hidden field the original name attribute?
	    renameOriginal: false,
	    
	   //initial / default hidden field value.
	   //Also applied when user types something that is not in the options list
	    initialHiddenValue: "",
	
	    //if provided, will be the value of the text input when it has no value and focus
	    emptyText: "",
	
	    //if true, autofilling will be enabled
	    autoFill: false,
	
	    //if true, selected option of the selectbox will be the initial value of the combo
	    triggerSelected: true,
	
	    //function for options filtering
	    filterFn: null,
	
	    //if true, the options list will be placed above text input
	    dropUp: false,
	
	    //separator for values of multiple combos
	    separator: ",",
			
		//key json name for key/value pair
		key: "value",
		
		//value json for key/value pair
		value: "text",

	    //all callback functions are called in the scope of the current goodCombo instance
	
	    //called after dropdown list appears
	    showListCallback: null,
	
	    //called after dropdown list disappears
	    hideListCallback: null,
	
	    //called at the end of constructor
	    initCallback: null,
	
	    //called at the end of initEvents function
	    initEventsCallback: null,
		    
	    //called when both text and hidden inputs values are changed
	    changeCallback: null,
	
	    //called when text input's value is changed
	    textChangeCallback: null,
	    
		checkWidth: true
    };
    
    //constructor
    //creates initial markup and does some initialization
    $.goodCombo = function(selectbox, config) {
		
        if (selectbox.tagName.toUpperCase() != "SELECT")
	        return;
	    
	    this.config = $.extend({}, defaults, config || {}); 
	
	   
	    
	    this.selectbox = $(selectbox);
	    this.options = this.selectbox.children().filter("option");
	
	    this.wrapper = this.selectbox.wrap("<div>").
	    hide().
	    parent().
	    addClass("combo").
	    addClass(this.config.skin); 
		
	    this.input = $("<input type='text' />").
	    appendTo(this.wrapper).
	    attr("autocomplete", "off").
	    attr("value", "").
	    attr("readonly", "readonly").
	    attr("name", this.selectbox.attr("name") + this.config.suffix);
	    
	    var origName = this.selectbox.attr("name");
	    var newName = origName + this.config.hiddenSuffix;
	    if(this.config.renameOriginal) { 
	    	this.selectbox.attr("name", newName);
	    }
	    	
	    this.hidden = $("<input type='hidden' />").
	    appendTo(this.wrapper).
	    attr("autocomplete", "off").
	    attr("value", this.config.initialHiddenValue).
	    attr("name", this.config.renameOriginal ? origName : newName);
	
        this.icon = $("<div />").
	    appendTo(this.wrapper).
	    addClass("icon"); 
	
	    this.listWrapper = $("<div />").
	    appendTo(this.wrapper).
	    //addClass("invisible").
	    addClass("list-wrapper"); 

	    this.updateDrop();
	
	    this.list = $("<ul />").appendTo(this.listWrapper); 
	    var self = this;
		var optWidths = [];
	    this.options.each(function() {					   
	        var optionText = $.trim($(this).text());
			if (self.config.checkWidth) {
				cls = "";
				if($(this).attr("class")!==undefined)
				{
					cls=$(this).attr("class");
				}
			    optWidths.push($("<li />").
	            appendTo(self.list)
				.addClass(cls)
				.html("<span>" + optionText + "</span>")
	            .addClass("visible").find("span").outerWidth());	
			}
			else {
	            $("<li />").
	            appendTo(self.list).
	            html("<span>" + optionText + "</span>").
	            addClass("visible");
			}
	    });  
		
	
	    this.listItems = this.list.children();
		
		
		
		
		/*this.listItems.find("span").each(function() {
		    optWidths.push($(this).outerWidth());										  
		});*/
		if (optWidths.length) {
		    optWidths = optWidths.sort(function(a, b) {
		        return a - b;									
		    });
		    var maxOptionWidth = optWidths[optWidths.length - 1];
			
			
		}
		

        this.singleItemHeight = this.listItems.outerHeight();
		//bgiframe causes some problems, let's remove it
		/*if ("function" == typeof this.listWrapper.bgiframe) {
		    this.listWrapper.bgiframe({height: this.singleItemHeight * this.wrapper.find("li").height()});
		}*/
		this.listWrapper.addClass("invisible");
		
       
	    if ($.browser.opera) {
	        this.wrapper.css({position: "relative", left: "0", top: "0"});
	    } 
	
	
	
	    this.filterFn = ("function" == typeof(this.config.filterFn)) ? this.config.filterFn : this.filterFn;
	
	    this.lastKey = null;
	    //this.overflowCSS = "overflow";
	
	    this.multiple = this.selectbox.attr("multiple");
	
	    var self = this;
	
	    this.wrapper.data("sc:lastEvent", "click");
	
	    this.overflowCSS = "overflowY";
	
	    if ((this.config.checkWidth) && (this.listWrapper.innerWidth() < maxOptionWidth)) {
		    this.overflowCSS = "overflow";	
			
		}
        
		
	    this.notify("init");
	    this.initEvents();
    };
    
    //shortcuts
    var $sc = $.goodCombo;
    $sc.fn = $sc.prototype = {};
    $sc.fn.extend = $sc.extend = $.extend;
    
    $sc.fn.extend({
        //TOC of our plugin
	    //initializes all event listeners
        initEvents: function() {
	        var self = this;
			
	        this.icon.bind("click", function(e) {
	            if (!self.wrapper.data("sc:positionY"))	{
		            self.wrapper.data("sc:positionY", e.pageY);	    	
		        }
	        });
	
	        this.input.bind("click", function(e) {
	            if (!self.wrapper.data("sc:positionY"))	{
		            self.wrapper.data("sc:positionY", e.pageY);	    	
		        }								 
	        });
	

	        this.wrapper.bind("click", function(e) {
	            if (!self.wrapper.data("sc:positionY"))	{
		            self.wrapper.data("sc:positionY", e.pageY);	 
		        }									   
	        });					
	    
	        this.icon.bind("click", function() {
		        if (self.input.attr("disabled")) {
			         self.input.attr("disabled", false);   
		        }
		        self.wrapper.data("sc:lastEvent", "click");
		        self.filter();
	            self.iconClick();
	        }); 
	    
	        this.listItems.bind("mouseover", function(e) {
	            //self.highlight(e.target);
				if ("LI" == e.target.nodeName.toUpperCase()) {
				    self.highlight(e.target);	
				}
				else {
				    self.highlight($(e.target).parent());	
				}
	        });
	    
	        this.listItems.bind("click", function(e) {
				if($(this).hasClass("optGroup"))
				{
					//return false;
				}
	            self.listItemClick($(e.target));
	        });
		
			this.input.bind("keyup", function(e) {
				self.wrapper.data("sc:lastEvent", "key");							                
				//$sc.log(self.wrapper.data("sc:lastEvent"));
				self.keyUp(e);
			});		
	    
	      
			

	    
	        this.input.bind("keypress", function(e) {
	            if ($sc.KEY.RETURN == e.keyCode) {
	                e.preventDefault();
			    }
		        if ($sc.KEY.TAB == e.keyCode)
			        e.preventDefault();
	        });
	    
	        $(document).bind("click", function(e) {
	            if ((self.icon.get(0) == e.target) || (self.input.get(0) == e.target))
		            return;
		    
		        self.hideList();    
	        });
	    
	        this.triggerSelected();
	        this.applyEmptyText();
	    
	        
		
		    this.input.bind("click", function(e) {
			    self.wrapper.data("sc:lastEvent", "click");	
			    self.icon.trigger("click");
		    });
			
			
			//here
	        this.wrapper.bind("click", function() {
	            self.wrapper.data("sc:lastEvent", "click");								
	        });
	
	        this.input.bind("keydown", function(e) {
	            if (9 == e.keyCode) {
		            e.preventDefault();
		        }
	        });
	
	        this.wrapper.bind("keyup", function(e) {
		        var k = e.keyCode;
		        for (key in $sc.KEY) {
		            if ($sc.KEY[key] == k) {
			            return;	
			        }
		        }
	            self.wrapper.data("sc:lastEvent", "key");	
				//$sc.log("Last evt is key");
	        });	
	
	        this.input.bind("click", function() {
	            self.wrapper.data("sc:lastEvent", "click");		
            });
	
	        this.icon.bind("click", function(e) {
	            if (!self.wrapper.data("sc:positionY"))	{
		            self.wrapper.data("sc:positionY", e.pageY);	    	
		        }
	        });
	
	        this.input.bind("click", function(e) {
	            if (!self.wrapper.data("sc:positionY"))	{
		            self.wrapper.data("sc:positionY", e.pageY);	    	
		        }								 
	        });
	

	        this.wrapper.bind("click", function(e) {
	            if (!self.wrapper.data("sc:positionY"))	{
		            self.wrapper.data("sc:positionY", e.pageY);	 
		        }									   
	        });				
			
			this.notify("initEvents");
	    },
	
	
	    getTextValue: function() {
            return this.__getValue("input");
	    },
	
	    getCurrentTextValue: function() {
            return this.__getCurrentValue("input");
	    },
	
	    getHiddenValue: function() {
            return this.__getValue("hidden");
	    },
	
	    getCurrentHiddenValue: function() {	    
	        return this.__getCurrentValue("hidden");
	    },
	
	    __getValue: function(prop) {
	        prop = this[prop];
	        if (!this.multiple)
	            return $.trim(prop.val());
		
	        var tmpVals = prop.val().split(this.config.separator);
	        var vals = [];
	    
	        for (var i = 0, len = tmpVals.length; i < len; ++i) {
	            vals.push($.trim(tmpVals[i]));
	        }	
	    
	        vals = $sc.normalizeArray(vals);
	    
	        return vals;
	    },
	
	    __getCurrentValue: function(prop) {
	        prop = this[prop];
	        if (!this.multiple)
	            return $.trim(prop.val());
		 
            return $.trim(prop.val().split(this.config.separator).pop());		 
	    },
	
	    //icon click event listener
	    iconClick: function() {
	        if (this.listVisible()) { 
	            this.hideList();
			    this.input.blur();
		    }
	        else {			
	            this.showList();
			    this.input.focus();
	            if (this.input.val().length) {
		            this.selection(this.input.get(0), 0, this.input.val().length);    	
		        }			
		    }          
	    },
	
	    //returns true when dropdown list is visible
	    listVisible: function() {
	        return this.listWrapper.hasClass("visible");
	    },
	
	    //shows dropdown list
	    showList: function() {
	        if (!this.listItems.filter(".visible").length)
	            return;

	        this.listWrapper.removeClass("invisible").
	        addClass("visible");
	        this.wrapper.css("zIndex", "99999");
	        this.listWrapper.css("zIndex", "99999");
	        this.setListHeight();
		
		    var listHeight = this.listWrapper.height();
		    var inputHeight = this.wrapper.height();
		
		    var bottomPos = parseInt(this.wrapper.data("sc:positionY")) + inputHeight + listHeight;
		    var maxShown = $(window).height() + $(document).scrollTop();
		    if (bottomPos > maxShown) {
		        this.setDropUp(true); 
		    }
		    else {
		        this.setDropUp(false);	
		    }
		
		    if ("" == $.trim(this.input.val())) {
	            this.highlightFirst();
	            this.listWrapper.scrollTop(0);
			}
			else {
			    this.highlightSelected();	
			}
	        this.notify("showList");
	    },
	
	    //hides dropdown list
	    hideList: function() {
	        if (this.listWrapper.hasClass("invisible"))
	            return;
	        this.listWrapper.removeClass("visible").
	        addClass("invisible");
	        this.wrapper.css("zIndex", "0");
	        this.listWrapper.css("zIndex", "99999");	
	    
	        this.notify("hideList");
	    },
	
	    //returns sum of all visible items height
	    getListItemsHeight: function() {
	       
			var itemHeight = this.singleItemHeight;
	        return itemHeight * this.liLen();
	    },
	
	    //changes list wrapper's overflow from hidden to scroll and vice versa (depending on list items height))
	    setOverflow: function() {
		    var maxHeight = this.getListMaxHeight();
		    
	        if (this.getListItemsHeight() > maxHeight)
	            this.listWrapper.css(this.overflowCSS, "scroll");
	        else
	            this.listWrapper.css(this.overflowCSS, "hidden");	
	    },
	
	    //highlights active item of the dropdown list
	    highlight: function(activeItem) {
	        if (($sc.KEY.DOWN == this.lastKey) || ($sc.KEY.UP == this.lastKey))
	            return;
		
	        this.listItems.removeClass("active");   
	        $(activeItem).addClass("active");
	    },
	

	
	    //sets text and hidden inputs value
	    setComboValue: function(val, pop, hideList) {
	        var oldVal = this.input.val();
	    
	        var v = "";
	        if (this.multiple) {
	            v = this.getTextValue();
		        if (pop) 
		            v.pop();
		        v.push($.trim(val));
		        v = $sc.normalizeArray(v);
		        v = v.join(this.config.separator) + this.config.separator;   
		 
	        } else {
	            v = $.trim(val);
	        }
	        this.input.val(v);
	        this.setHiddenValue(val);
	        this.filter();
	        if (hideList)
	            this.hideList();
	        this.input.removeClass("empty");

	    
	        if (this.multiple)
	            this.input.focus();
		
	        if (this.input.val() != oldVal)
	            this.notify("textChange");	
				
	    },
	
	
	
	    //sets hidden inputs value
	    //takes text input's value as a param
	    setHiddenValue: function(val) {
	        var set = false;
	        val = $.trim(val);
	        var oldVal = this.hidden.val();
	    	    
	        if (!this.multiple) {
	            for (var i = 0, len = this.options.length; i < len; ++i){
		            if (val == this.options.eq(i).text()) {
		                this.hidden.val(this.options.eq(i).val());
			            set = true;
			            break;
		            }
		        }
	         }
	        else {
	            var comboVals = this.getTextValue();
		        var hiddenVals = [];
		        for (var i = 0, len = comboVals.length; i < len; ++i) {
		            for (var j = 0, len1 = this.options.length; j < len1; ++j) {
		                if (comboVals[i] == this.options.eq(j).text()) {
			                hiddenVals.push(this.options.eq(j).val());
			            }      
		            }
		        }
		
		        if (hiddenVals.length) {
		            set = true;
		        this.hidden.val(hiddenVals.join(this.config.separator));
		    }
	     }
	    
	    if (!set) {
	        this.hidden.val(this.config.initialHiddenValue);
	    }
	    
	    if (oldVal != this.hidden.val())
	        this.notify("change");
		
	    this.selectbox.val(this.hidden.val());
		this.selectbox.trigger("change");
	},
	
	
	    listItemClick: function(item) {
	        this.setComboValue(item.text(), true, true);
	        this.inputFocus();
	    },
	
	    //adds / removes items to / from the dropdown list depending on combo's current value
	    filter: function() {
		    if ("yes" == this.wrapper.data("sc:optionsChanged")) {
		        var self = this;
		        this.listItems.remove();
                this.options = this.selectbox.children().filter("option");
	            this.options.each(function() {
	                var optionText = $.trim($(this).text());
	                $("<li />").
	                appendTo(self.list).
	                text(optionText).
	                addClass("visible");
	    
	            }); 
	
	            this.listItems = this.list.children();
	
	            this.listItems.bind("mouseover", function(e) {
	                self.highlight(e.target);
	            });
	    
	            this.listItems.bind("click", function(e) {
	                self.listItemClick($(e.target));
	            });
			
			    self.wrapper.data("sc:optionsChanged", "");
		    }
			
	        var comboValue = this.input.val();
	        var self = this;

	        this.listItems.each(function() {
	            var $this = $(this);
	            var itemValue = $this.text();
		        if (self.filterFn.call(self, self.getCurrentTextValue(), itemValue, self.getTextValue())) {
		           $this.removeClass("invisible").
		           addClass("visible");
		        } else {
		            $this.removeClass("visible").
		            addClass("invisible");
		        }
	        });
	     
	        this.setOverflow();
	        this.setListHeight();
	    },
	
	//default dropdown list filtering function
	filterFn: function(currentComboValue, itemValue, allComboValues) {
		if ("click" == this.wrapper.data("sc:lastEvent")) {
		    return true;	
		}
		//alert(currentComboValue.toSource());
	    if (!this.multiple) {
	        return itemValue.toLowerCase().indexOf(currentComboValue.toLowerCase()) == 0;
	    }
	    else {
	        //exclude values that are already selected

		for (var i = 0, len = allComboValues.length; i < len; ++i) {
		    if (itemValue == allComboValues[i]) {
		        return false;
		    }
		}
		
		return itemValue.toLowerCase().search(currentComboValue.toLowerCase()) == 0;
	    }
	},
	
	//just returns integer value of list wrapper's max-height property
	getListMaxHeight: function() {
			
		var result = parseInt(this.listWrapper.css("maxHeight"), 10);
		if (isNaN(result)) {
		    result = this.singleItemHeight * 10;	
		}
		
		return result;
	},
	
	//corrects list wrapper's height depending on list items height
	setListHeight: function() {
	
	    var liHeight = this.getListItemsHeight();
		
	    var maxHeight = this.getListMaxHeight();
		
	
	    var listHeight = this.listWrapper.height();
	    if (liHeight < listHeight) {
	        this.listWrapper.height(liHeight); 
			
			return liHeight;
	    }
	    else if (liHeight > listHeight) {
	        this.listWrapper.height(Math.min(maxHeight, liHeight));
			
			return Math.min(maxHeight, liHeight);
	    }
				
	},
	
	//returns active (hovered) element of the dropdown list
	getActive: function() {
	    return this.listItems.filter(".active");
	},
	
	keyUp: function(e) {
	    this.lastKey = e.keyCode;
	    var k = $sc.KEY;
	    switch (e.keyCode) {
	        case k.RETURN:
			case k.TAB:
			//this.input.focus();
		    this.setComboValue(this.getActive().text(), true, true);
		    if (!this.multiple)
		        //this.input.blur(); //
		    	
		break;
		case k.DOWN:
		    this.highlightNext();
		break;
		case k.UP:
		    this.highlightPrev();
		break;
		case k.ESC:
		    this.hideList();
		break;
		default:
		    this.inputChanged();
		break;
	    }
	    
	    
	},
	
	//returns number of currently visible list items
	liLen: function() {
	    return this.listItems.filter(".visible").length;
	},
	
	//triggered when the user changes combo value by typing
	inputChanged: function() {
	    this.filter();

	    if (this.liLen()) {
	        this.showList();
		this.setOverflow();
		this.setListHeight();
	    } else {
	        this.hideList();
	    }
	    
	    this.setHiddenValue(this.input.val());
	    this.notify("textChange");
	    
	},
	
	//highlights first item of the dropdown list
	highlightFirst: function() {
	    this.listItems.removeClass("active").filter(".visible:eq(0)").addClass("active");
	    this.autoFill();
	},
	
	highlightSelected: function() {
        this.listItems.removeClass("active");
		var val = $.trim(this.input.val());
		
		try {
			this.listItems.each(function() {
			    var $this = $(this);
				if ($this.text() == val) {
				    $this.addClass("active");	
					self.listWrapper.scrollTop(0);
					self.scrollDown();
					
				}
			});
			//no match, must be partial input string; highlight first item
			this.highlightFirst();
			
		} catch (e) {}
	},
	
	//highlights item of the dropdown list next to the currently active item
	highlightNext: function() {
	    var $next = this.getActive().next();
	    
	    while ($next.hasClass("invisible") && $next.length) {
	        $next = $next.next();
	    }
	    
	    if ($next.length) {
	        this.listItems.removeClass("active");
		$next.addClass("active");
		this.scrollDown();
	    }
	},
	
	//scrolls list wrapper down when needed
	scrollDown: function() {
	    if ("scroll" != this.listWrapper.css(this.overflowCSS))
	        return;
		
            var beforeActive = this.getActiveIndex() + 1;
			/*if ($.browser.opera)
			    ++beforeActive;*/
	    
	    var minScroll = this.listItems.outerHeight() * beforeActive - this.listWrapper.height();
        
		if ($.browser.msie)
            minScroll += beforeActive;
	    
	    if (this.listWrapper.scrollTop() < minScroll)
	        this.listWrapper.scrollTop(minScroll);
	},
	
	
	//highlights list item before currently active item
	highlightPrev: function() {
	    var $prev = this.getActive().prev();
	    
	    while ($prev.length && $prev.hasClass("invisible"))
	        $prev = $prev.prev();
		
            if ($prev.length) {
	        this.getActive().removeClass("active");
		$prev.addClass("active");
		this.scrollUp();
	    }
	},
	
	//returns index of currently active list item
	getActiveIndex: function() {
	    return $.inArray(this.getActive().get(0), this.listItems.filter(".visible").get());
	},
	
	
	//scrolls list wrapper up when needed
	scrollUp: function() {
	    
	    if ("scroll" != this.listWrapper.css(this.overflowCSS))
	        return;
		
	    var maxScroll = this.getActiveIndex() * this.listItems.outerHeight();
	    
	    if (this.listWrapper.scrollTop() > maxScroll) {
	        this.listWrapper.scrollTop(maxScroll);
	    }     
	},
	
	//emptyText stuff
	applyEmptyText: function() {
	    if (!this.config.emptyText.length)
	        return;
		
	    var self = this;	
	    this.input.bind("focus", function() {
                self.inputFocus();
	    }).
	    bind("blur", function() {
                self.inputBlur();
	    });	
	    
	    if ("" == this.input.val()) {
	        this.input.addClass("empty").val(this.config.emptyText);
	    }
	},
	
	inputFocus: function() {
	    if (this.input.hasClass("empty")) {
		this.input.removeClass("empty").
		val("");
        }
	},
	
	inputBlur: function() {
	    if ("" == this.input.val()) {
		this.input.addClass("empty").
		val(this.config.emptyText);
	    }
	    
	},
	
	//triggerSelected stuff
	triggerSelected: function() {
	    if (!this.config.triggerSelected)
	        return;
		
	    var self = this;	
		try {
	    this.options.each(function() {
	        if ($(this).attr("selected")) {
		        self.setComboValue($(this).text(), false, true);
				throw new Error();
		    }
	    });	
		} catch (e) {
		    return;	
		}
		
        self.setComboValue(this.options.eq(0).text(), false, false);
	},
	
	//autofill stuff
	autoFill: function() {
	    if (!this.config.autoFill || ($sc.KEY.BACKSPACE == this.lastKey) || this.multiple)
	        return;
		    	
	    var curVal = this.input.val();
	    var newVal = this.getActive().text();
	    this.input.val(newVal);
	    this.selection(this.input.get(0), curVal.length, newVal.length);
	   
	    	
	},
	
	//provides selection for autofilling
	//borrowed from jCarousel
	selection: function(field, start, end) {
	    if( field.createTextRange ){
		var selRange = field.createTextRange();
		selRange.collapse(true);
		selRange.moveStart("character", start);
		selRange.moveEnd("character", end);
		selRange.select();
	    } else if( field.setSelectionRange ){
		field.setSelectionRange(start, end);
	    } else {
		if( field.selectionStart ){
			field.selectionStart = start;
			field.selectionEnd = end;
		}
	    }
	   // field.focus();	
	},
	
	
	//for internal use
	updateDrop: function() {
	    if (this.config.dropUp)
	        this.listWrapper.addClass("list-wrapper-up");
	    else 
	        this.listWrapper.removeClass("list-wrapper-up");		
	},
	
	//updates dropUp config option
	setDropUp: function(drop) {
        this.config.dropUp = drop;   
	    this.updateDrop(); 
	},
	
	notify: function(evt) {
	    if (!$.isFunction(this.config[evt + "Callback"]))
	        return;
		
	    this.config[evt + "Callback"].call(this);	
	}
    });
    
    $sc.extend({
        //key codes
	//from jCarousel
        KEY: {
	    UP: 38,
	    DOWN: 40,
	    DEL: 46,
	    TAB: 9,
	    RETURN: 13,
	    ESC: 27,
	    COMMA: 188,
	    PAGEUP: 33,
	    PAGEDOWN: 34,
	    BACKSPACE: 8	
	},
	
	//for debugging
	log: function(msg) {
	    var $log = $("#log");
	    $log.html($log.html() + msg + "<br />");
	},
	
    createSelectbox: function(config) {
	    var $selectbox = $("<select />").
	    appendTo(config.container).
	    attr({name: config.name, id: config.id, size: "1"});
	    
	    if (config.multiple)
	        $selectbox.attr("multiple", true);
	    
	    var data = config.data;
	    var selected = false;
	    
	    for (var i = 0, len = data.length; i < len; ++i) {
	        selected = data[i].selected || false;
	        $("<option />").appendTo($selectbox).
			attr("value", data[i][config.key]).
			text(data[i][config.value]).
			attr("selected", selected);
	    }
	    
	    return $selectbox.get(0);
	},
	
	create: function(config) {
            var defaults = {
	        //the name of the selectbox
	        name: "",
		//the ID of the selectbox
		id: "",
		//data for the options
		/*
		This is an array of objects. The objects should contain the following properties:
		(string)value - the value of the <option>
		(string) text - text of the <option>
		(bool) selected - if set to true, "selected" attribute of this <option> will be set to true
		*/
		data: [],
		
		//if true, combo with multiple choice will be created
		multiple: false,
		
		//key json name for key/value pair
		key: "value",
		
		//value json for key/value pair
		value: "text",		
		
		//an element that will contain the widget
		container: $(document),
		//url that contains JSON object for options data
		//format is the same as in data config option
		//if passed, "data" config option will be ignored
		url: "",
		//params for AJAX request
		ajaxData: {}
	    };
	    config = $.extend({}, defaults, config || {});
	    
            if (config.url) {
	        return $.getJSON(config.url, config.ajaxData, function(data) {
		    delete config.url;
		    delete config.ajaxData;
		    config.data = data;
		    return $sc.create(config);
		});
	    }
	    
	    config.container = $(config.container);
	    
            var selectbox = $sc.createSelectbox(config);
	    return new $sc(selectbox, config);
	    
	},
	
	deactivate: function($select) {
	    $select = $($select);
		$select.each(function() {
		    if ("SELECT" != this.tagName.toUpperCase()) {
			    return;	
			}
			var $this = $(this);
			if (!$this.parent().is(".combo")) {
			    return;	
			}
			//$this.parent().find("input[type='text']").attr("disabled", true);
			
		});
	},
	
	activate: function($select) {
	    $select = $($select);
		$select.each(function() {
		    if ("SELECT" != this.tagName.toUpperCase()) {
			    return;	
			}
			var $this = $(this);
			if (!$this.parent().is(".combo")) {
			    return;	
			}
			$this.parent().find("input[type='text']").attr("disabled", false);
		});		
	},
	
	changeOptions: function($select) {
		$select = $($select);
        $select.each(function() {
		    if ("SELECT" != this.tagName.toUpperCase()) {
			    return;	
			}
			
			var $this = $(this);
			var $wrapper  = $this.parent();
			var $input = $wrapper.find("input[type='text']");
			var $listWrapper = $wrapper.find("ul").parent();
			
	        $listWrapper.removeClass("visible").
	        addClass("invisible");
	        $wrapper.css("zIndex", "0");
	        $listWrapper.css("zIndex", "99999");			
			
			$input.val("");
			$wrapper.data("sc:optionsChanged", "yes");
			var $selectbox = $this;
		    $selectbox.parent().find("input[type='text']").val($selectbox.find("option:eq(0)").text());
		    $selectbox.parent().data("sc:lastEvent", "click");
		    $selectbox.find("option:eq(0)").attr('selected','selected');
		});
	},
	
	normalizeArray: function(arr) {
	    var result = [];
	    for (var i = 0, len =arr.length; i < len; ++i) {
	        if ("" == arr[i])
		    continue;
		    
		result.push(arr[i]);    
	    }
	    
	    return result;
	}
    });
})(jQuery); 


//Manual input for particular ID needs to be given as below

$j = jQuery.noConflict();
$j(function () {

    	$j("#groupSite, #groupSiteFooter, #regionData").goodCombo();

    	$j.goodCombo.deactivate("#groupSite, #groupSiteFooter, #regionData");
    	$j("#activate").bind("click", function () {
    		$j.goodCombo.activate("#groupSite, #groupSiteFooter, #regionData");
            $j ("div.good input").addClass('clicked')
    	});
		
    	var data = [];
    	$j("#selectbox").children().each(function () {
    		var $this = $j(this);
    		data.push({
    			value: $this.attr("value"),
    			text: $this.text()
    		});
    	});
    });

/* "ArcelorMittal segments" - site opens in a new window */
$j = jQuery.noConflict();
$j(function () {
$j("#groupSite, #groupSiteFooter, #regionData").change(function(){
var $this = $j(this);
if($this.attr("value"))
window.open($this.attr("value"));				  
})				  
});		  




/*!---- dynamic-adobe-----*/
/*---------------- Dynamic adobe JS ------------------------*/
$j = jQuery.noConflict();
    var _targetDivs = new Array(); tdcnt = 0;
    _adobeWrapper = "#dyn-adobe"
    _targetDivs[tdcnt] = new Array();
    if (window.location.href.indexOf("our-mifid-ii-venues") > -1) {
      _targetDivs[tdcnt]['wrapperToCheck']=".content-rightcol"; _targetDivs[tdcnt]['wrapperToAppend']=".rulebook-section";tdcnt++;
    } else {
      _targetDivs[tdcnt]['wrapperToCheck']=".content-rightcol"; _targetDivs[tdcnt]['wrapperToAppend']="#maincontent";tdcnt++;
    }
	
	_pageExcludes = new Array(); pecnt = 0;
	_pageExcludes[pecnt] = "pagename.aspx"; pecnt++;
	
	_pageIncludes = new Array(); picnt = 0;
	_pageIncludes[picnt] = "regulatory-news.aspx"; picnt++;
    checkFlag = false;
	pathName = window.location.pathname;
	$j(document).ready(function()
    {
        
		for(var i=0;i<pecnt;i++)
        {
            if(pathName.search(_pageExcludes[i]) > 0)
            {
               checkFlag = true;
               break;
            }
        }
		
		if(!checkFlag)
		{
			for(var i=0;i<picnt;i++)
			{
				if(pathName.search(_pageIncludes[i]) > 0)
				{
				   $j($j(_adobeWrapper).html()).appendTo(_targetDivs[i]['wrapperToAppend']);
				   checkFlag = true;
				   break;
				}
			}
		}
		if(!checkFlag)
		{
			for(var i=0;i<tdcnt;i++)
			{
				if($j(_targetDivs[i]['wrapperToCheck']+" a[href$='.pdf']").length > 0)
				{
					$j($j(_adobeWrapper).html()).appendTo(_targetDivs[i]['wrapperToAppend']);
					break;
				}
			}
		}
    });
/*------------------ Dynamic adobe js ends here ---------------------------*/
/*!---- main-----*/
/* -------------- word triming ----------------- */
//Trim Function for removing space before Header Tags
function Trim(myval) {
    var chklen = myval.length;
    var pos = 0;
    mychar = myval.charAt(0);

    if (mychar.charCodeAt(0) == 10) {
        myval = myval.substr(1);
    }
    while (pos >= 0 || lstpos >= 0) {
        pos = myval.indexOf(" ");
        if (pos == 0) {
            myval = myval.substring(1, chklen);
            chklen = myval.length;
            mychar = myval.charAt(0);
        }
        lstpos = myval.lastIndexOf(" ");

        if (lstpos == chklen - 1) {
            myval = myval.substring(0, chklen - 1);
            chklen = myval.length;
            mychar = myval.charAt(chklen - 1);
        }

        if (mychar != " ")
            break;

    }
    return myval;
}

$j(document).ready(function(){




    $j(".group-site ul li").hover(function(){
        $j(this).css("background", "#fff none repeat scroll 0 0"); 
 });      
	$j(".group-site ul ul li a").hover(function(){
        $j(this).css("text-decoration", "underline", "background-image", "none", "color", "#999");
	});       
	$j(".group-site ul li ul.websites").hover(function(){
        $j(this).css("display", "block");
    }); 
	$j(".group-site ul li").hover(function(){
        $j(this).css("background-position", "left -40px");
    });      


var searchTerm= GetParameterValues('referrer');

function GetParameterValues(param) {
var url = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
for (var i = 0; i < url.length; i++) {
var urlparam = url[i].split('=');
if (urlparam[0] == param) {
return urlparam[1];
}
}
}
//alert(searchTerm)

if (typeof searchTerm ==="undefined"){
//alert("No Param");
}else{
//alert("Yes Param");

var initRef=$j('a.appposition').attr('href');		
//alert(initRef);
var hrefRef = initRef+"&referrer="+searchTerm;
$j("a.appposition").attr("href",hrefRef);

}
$j("#appformreferrer-txtboxTextboxContainer").css('clear', 'both');
                 $j("#appformreferrer-txtboxTextbox").css({'visibility' : 'hidden',width : '30px',height : '1px'});

}); 


$j(document).ready(function () {


	
    $j("p.lan-news-title a, p.lan-tweet-title").each(function () {
        var dataTemp = Trim($j(this).text());
        if (dataTemp.length < 25) return;
        dataTemp = dataTemp.substring(0, 85);
        dataTemp = dataTemp + " ...";
        $j(this).text(dataTemp);
    });

    $j(".banner-left .left-bottom .bann-txt p").each(function () {
        var dataTemp = Trim($j(this).text());
        if (dataTemp.length > 140) {
            if (dataTemp.length < 25) return;
            dataTemp = dataTemp.substring(0, 135);
            dataTemp = dataTemp + " ...";
            $j(this).text(dataTemp);
        }

    });

    $j(".jobDetails ul li:odd").css("background-color", "#F6F6F6");


snapopen2 = getParamVal("exp-date");

    if (snapopen2) {
      
	     
		 $j("#appformexp-date-textboxTextbox").val(snapopen2);
		 
        $j("#appformexp-date-textboxTextbox").prop('disabled', true);

    }


snapopen3 = getParamVal("emailid");

    if (snapopen3) {
      
	     
		 $j("#appformfree-text-email-addressFreeTextEmailText").val(snapopen3);

    }

snapopen4 = getParamVal("referrer");

    if (snapopen4) {
      
	     
		 $j("#appformreferrer-txtboxTextbox").val(snapopen4);
                 $j("#appformreferrer-txtboxTextboxContainer").css('clear', 'both');
                 $j("#appformreferrer-txtboxTextbox").css({'visibility' : 'hidden',width : '30px',height : '1px'});


    }

//alert($j("#appformexp-date-textboxTextbox").val());

if($j("#appformexp-date-textboxTextbox").val() == "")
{
	//alert("hiiii");
	$j("#appformexp-date-textboxTextboxContainer").css('display','none');
	$j("#appformexp-dateLabelContainer").css('display','none');
}
    
	snapopen = getParamVal("type");

    if (snapopen) {
        //alert(snapopen);
        if (snapopen == "Agencies") {
            $j("p.msg").html("Agencies");
        }

        if (snapopen == "No agencies") {
            $j("p.msg").html("No agencies");
        }

    }

    snapopen1 = getParamVal("title");
    if (snapopen1) {
        //alert(snapopen1);

        $j("#appformrole-textboxTextbox").val(snapopen1);
        $j("#appformrole-textboxTextbox").prop('disabled', true);
    }



    $j("#appformyesRadioList").click(function () {
        if ($j("#appformyesRadioList").is(':checked')) {
            $j("#appformemp-nameLabelContainer").css("display", "block");
            $j("#appformempname-textboxTextboxContainer").css("display", "block");

        }

    });

    $j("#appformnoRadioList").click(function () {
        if ($j("#appformnoRadioList").is(':checked')) {
            $j("#appformemp-nameLabelContainer").css("display", "none");
            $j("#appformempname-textboxTextboxContainer").css("display", "none");

        }

    });




});


function getParamVal(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.search);
    if (results == null)
        return "";
    else
        return decodeURIComponent(results[1].replace(/\+/g, " "));
}



/* ------------- fancy drop list --------------- */

$j = jQuery.noConflict();
$j(document).ready(function () {



    $j('select#catNews, select#regNews, select#year_dropdown, select#regionCon, select#serviceCon, select#marketCon').each(function () {
        var title = $j(this).attr('title');
        if ($j('option:selected', this).val() != '') title = $j('option:selected', this).text();
        $j(this)
            .css({
                'z-index': 10,
                'opacity': 0,
                '-khtml-appearance': 'none'
            })
            .after('<span class="select">' + title + '</span>')
            .change(function () {
                val = $j('option:selected', this).text();
                $j(this).next().text(val);
            })
    });

});




/* ------------- Product snap down ------------------- */


$j = jQuery.noConflict();
document.write('<style type="text/css">');
document.write('.product-title{cursor:pointer;}');
document.write('.filterHire p.filterHireTitle{cursor:pointer;}');
document.write('.filterService p.filterServiceTitle{cursor:pointer;}');
document.write('.filterRegion p.filterRegionTitle{cursor:pointer;}');
document.write('</style>');

$j(document).ready(function () {

    $j('.product-desc:gt(0)').css("display", "none");
    $j('.product-title:eq(0)').addClass('product-selected');
    $j('.product-box:eq(0)').addClass('selected-box');


    $j(".product-title, .filterHire p.filterHireTitle, .filterService p.filterServiceTitle, .filterRegion p.filterRegionTitle").click(function () {
        if ($j(this).next().css("display") == "none") {
            $j(this).addClass("product-selected");
            $j(this).parent().addClass("selected-box");
            $j(this).next().animate({
                height: 'toggle'
            }, 200);
        } else {
            $j(this).removeClass("product-selected");
            $j(this).parent().removeClass("selected-box");
            $j(this).next().animate({
                height: 'toggle'
            }, 200);
        }
    });
});




$j = jQuery.noConflict();
$j(document).ready(function ($j) {
    /* ------------------ Search - Following function is used for <enter> issue in IE ------------ */
    $j("form").keypress(function (e) {
        if (e.keyCode == 13) {
            return false;

        }
    });
    $j("#SearchTextbox").keypress(function (e) {
        if (e.keyCode == 13) {
            document.getElementById("searchButton").click();
            //return false;

        }
		
    });
	$j("#SearchTextboxRP").keypress(function (e) {
        if (e.keyCode == 13) {
            document.getElementById("SearchbuttonRP").click();
            //return false;

        }
		
    });
    /* ------------------ <END> Following function is used for <enter> issue in IE ------------ */
	
if(typeof Prototype=="object")
    {$j("body").addClass("ip3-selfserve");}
	
    /*------------------- Dynamic Adobe - Script for Plugining Adobe dynamically. ------------- */

    var _targetDivs = new Array();
    cnt = 0;
    _adobeWrapper = "#dyn-adobe"
    _targetDivs[cnt] = new Array();
    _targetDivs[cnt]['wrapperToCheck'] = "#content-container";
    _targetDivs[cnt]['wrapperToAppend'] = "#content-container";
    cnt++;
    for (var i = 0; i < cnt; i++) {
        if ($j(_targetDivs[i]['wrapperToCheck'] + " a[href$='.pdf']").length > 0) {
            $j($j(_adobeWrapper).html()).appendTo(_targetDivs[i]['wrapperToAppend']);
            break;
        }
    }


    /*------------------- <END> Dynamic Adobe - Script for Plugining Adobe dynamically. ------------- */

    /*-- start twitter dropdownbox ---*/
      if (!($j('body').hasClass('ip3-preview'))) {
    $j('#selectbox').on("change", function () {
        var selectVal = $j('#selectbox :selected').val();
        $j(".hm-tweetfeeds").hide();
        $j("#" + selectVal).show();
		
		var twitter_link = $j('option:selected', this).attr('data-url');
		       $j('.blue-box p.wht-link a').attr('href',twitter_link);
	   
	   var twitter_text = $j('option:selected', this).attr('data-text');
	   
		       $j('.blue-box p.wht-link a').html(twitter_text);
	   
	   
		
		
    });
} 
    /*-- end twitter dropdownbox ---*/
	
	/*--- start tab menu hide when it is blank ----*/
	
	
	if($j(".tabed-menu ul li").length > 0){
	}
	else {
	$j(".tabed-menu").css("display","none");	
}
	
	
	/*--- end tab menu hide when it is blank ----*/
	
    /*---- start video player ------*/

    if ($j("#inv_playerContainer1").length > 0) {
        $j("#inv_playerContainer1").embedCode({width:640,height:360,videoId:"icap092"});
        //$j("#inv_playerContainer1").embedCode({

          //  playerType: "singleplayer",
           // videoId: "icap092",
           // overlayPlay: true,
            //autoPlay: false
        //});
    }

    /*---- end video player ------*/

    $j(".group-site ul,.group-site-ft ul").hover(
        function () {
            $j("body.ie7 #image-container").css("z-index", "-1");
            $j("body.ie7 .homecontent").css("z-index", "-1");

        },
        function () {
            $j("body.ie7 #image-container").css("z-index", "1");
            $j("body.ie7 .homecontent").css("z-index", "1");
        }
    );
	
	/*------- start equal height box -----------*/
	setEqualHeight(['#who-we-are .our-business','#who-we-are .associated-companies','#who-we-are .global-presence']);
		setEqualHeight(['#who-we-are .directors','#who-we-are .team','#who-we-are .awards']);

		setEqualHeight(['#what-we-do .broking','#what-we-do .electronic','#what-we-do .post-trade-risk']);

setEqualHeight(['#what-makes-us-different .create-value','#what-makes-us-different .people','#what-makes-us-different .technology']);

setEqualHeight(['#what-makes-us-different .in-on-news','#what-makes-us-different .culture-value','#what-makes-us-different .day-charity']);


setEqualHeight(['#careers .wwa','#careers .global-broking','#careers .electronic-markets']);
setEqualHeight(['#experienced-hire .wwa','#experienced-hire .global-broking','#experienced-hire .electronic-markets']);

setEqualHeight(['#careers .current-opportunities','#careers .working-at-icap','#careers .graduate-recruitment ']);
setEqualHeight(['#experienced-hire .current-opportunities','#experienced-hire .working-at-icap','#experienced-hire .graduate-recruitment ']);

setEqualHeight(['#careers .post-risk','#careers .box8','#careers .box9']);
setEqualHeight(['#experienced-hire .post-risk','#experienced-hire .box8','#experienced-hire .box9']);

setEqualHeight(['#investor-relations .annual-report','#investor-relations .share-price-info','#investor-relations .regulatory-news']);

setEqualHeight(['#investor-relations .monthly-data','#investor-relations .result-centre','#investor-relations .landing-calendar']);


	/*------- end equal height box -----------*/

});
// JavaScript Document


function loadCss()
{
	$j("#bxslider1 li").each(function () {

		
        $j(this).find(".outer-hm .outerBox").each(function () {

            if ($j(this).find(".bannerbox").hasClass("fullbox") && $j(this).find(".bannerbox img").width() >= 929) {
                
				$j(this).find(".bannerbox").addClass("rad-clear");
            } 
			else if ($j(this).find(".bannerbox").hasClass("twobox") && $j(this).find(".bannerbox img").width() >= 609 ) {
                //alert("twobox");
				//alert($j(this).find(".bannerbox").attr("class"));
                $j(this).find(".bannerbox").addClass("rad-clear");

            }
			else if ($j(this).find(".bannerbox img").width() >= 289) {
				//alert($j(this).find(".bannerbox").attr("class"));
				
				$j(this).find(".bannerbox").addClass("rad-clear");
				//alert("here");
				$j(this).find(".bannerbox").addClass("singlebox");
			}
			
			else if ($j(this).find(".bannerbox .iframebox")) {
				//alert("iframe");
				//$j(this).find(".bannerbox .iframebox").parent().addClass("rad-clear");
				//$j(this).find(".bannerbox .iframebox").parent().addClass("singlebox");
				$j(this).find(".bannerbox .iframebox").parent().addClass("redbox");
			}
				//$j(this).find(".bannerbox").addClass("singlebox");
        });

    });

	}
	
	
	function setEqualHeight(arr) {
    var x = new Array;
    for (i = 0; i < arr.length; i++) {
		$j(arr[i]).height('auto');
        x[i] = $j(arr[i]).height();
    }
    Max_Value = Array.max(x);
    for (i = 0; i < arr.length; i++) {
        if($j(arr[i]).height() != Max_Value)
		{x[i] = $j(arr[i]).height(Max_Value);}
    }
}

Array.max = function (array) {
    return Math.max.apply(Math, array);
}

/*Home Banner Text and Image animation FadeIn FadeOut effect starts*/

$j = jQuery.noConflict();
document.write('<style type="text/css">');
document.write('.subBoxSlide1 li, .subBoxSlide2 li{ margin: 0 0 15px 0; height:178px;}');
document.write('</style>');

$j(document).ready(function () {

 	var i = 1;
	$j("ul#bxslider1 li.homebanner2 div.bannercontent div.outer-hm div.bannerbox ul").each(function() {
	//alert("test");
	$j(this).attr("class", "subBoxSlide" + i);
	i++;
	});
	
	$j("ul#bxslider1 li.homebanner2 div.bannercontent div.outer-hm div.bannerbox ul li").each(function() {
	//alert("test");
	$j(this).attr("class", "item" + i);
	i++;
	});
	

    var speed = 5000;
    var first, first2 = 0;
    var pause = 10000;

    function tick() {
        first = $j('ul#bxslider1 li.homebanner2 div.bannercontent div.outer-hm div.bannerbox ul.subBoxSlide1 li:first').html();
        $j('ul#bxslider1 li.homebanner2 div.bannercontent div.outer-hm div.bannerbox ul.subBoxSlide1 li:first').fadeOut(500, function() {
            $j(this).remove();
            last = '<li>' + first + '</li>';
            $j('ul#bxslider1 li.homebanner2 div.bannercontent div.outer-hm div.bannerbox ul.subBoxSlide1').append(last);
        });
    
        first2 = $j('ul#bxslider1 li.homebanner2 div.bannercontent div.outer-hm div.bannerbox ul.subBoxSlide2 li:first').html();
        $j('ul#bxslider1 li.homebanner2 div.bannercontent div.outer-hm div.bannerbox ul.subBoxSlide2 li:first').fadeOut(500, function() {
            $j(this).remove();
            last2 = '<li>' + first2 + '</li>';
            $j('ul#bxslider1 li.homebanner2 div.bannercontent div.outer-hm div.bannerbox ul.subBoxSlide2').append(last2);
        });
    }
    /*$j('ul#bxslider1 li.homebanner1 div.bannercontent div.outer-hm div.bannerbox ul.subBoxSlide1').click(function() {
        tick();
        return false;
    });

    $j('ul#bxslider1 li.homebanner1 div.bannercontent div.outer-hm div.bannerbox ul.subBoxSlide2').click(function() {
        tick();
        return false;
    });*/
    setInterval(tick, speed, pause);

});
/*Home Banner Text and Image animation FadeIn FadeOut effect ends*/



/*!---- top-of-page-----*/
/*---------------- Top of page starts here -------------------------*/

/**
 * Copyright (c) 2007-2012 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 * @author Ariel Flesler
 * @version 1.4.3.1
 */
;(function($j){var h=$j.scrollTo=function(a,b,c){$j(window).scrollTo(a,b,c)};h.defaults={axis:'xy',duration:parseFloat($j.fn.jquery)>=1.3?0:1,limit:true};h.window=function(a){return $j(window)._scrollable()};$j.fn._scrollable=function(){return this.map(function(){var a=this,isWin=!a.nodeName||$j.inArray(a.nodeName.toLowerCase(),['iframe','#document','html','body'])!=-1;if(!isWin)return a;var b=(a.contentWindow||a).document||a.ownerDocument||a;return/webkit/i.test(navigator.userAgent)||b.compatMode=='BackCompat'?b.body:b.documentElement})};$j.fn.scrollTo=function(e,f,g){if(typeof f=='object'){g=f;f=0}if(typeof g=='function')g={onAfter:g};if(e=='max')e=9e9;g=$j.extend({},h.defaults,g);f=f||g.duration;g.queue=g.queue&&g.axis.length>1;if(g.queue)f/=2;g.offset=both(g.offset);g.over=both(g.over);return this._scrollable().each(function(){if(e==null)return;var d=this,$elem=$j(d),targ=e,toff,attr={},win=$elem.is('html,body');switch(typeof targ){case'number':case'string':if(/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(targ)){targ=both(targ);break}targ=$j(targ,this);if(!targ.length)return;case'object':if(targ.is||targ.style)toff=(targ=$j(targ)).offset()}$j.each(g.axis.split(''),function(i,a){var b=a=='x'?'Left':'Top',pos=b.toLowerCase(),key='scroll'+b,old=d[key],max=h.max(d,a);if(toff){attr[key]=toff[pos]+(win?0:old-$elem.offset()[pos]);if(g.margin){attr[key]-=parseInt(targ.css('margin'+b))||0;attr[key]-=parseInt(targ.css('border'+b+'Width'))||0}attr[key]+=g.offset[pos]||0;if(g.over[pos])attr[key]+=targ[a=='x'?'width':'height']()*g.over[pos]}else{var c=targ[pos];attr[key]=c.slice&&c.slice(-1)=='%'?parseFloat(c)/100*max:c}if(g.limit&&/^\d+$/.test(attr[key]))attr[key]=attr[key]<=0?0:Math.min(attr[key],max);if(!i&&g.queue){if(old!=attr[key])animate(g.onAfterFirst);delete attr[key]}});animate(g.onAfter);function animate(a){$elem.animate(attr,f,g.easing,a&&function(){a.call(this,e,g)})}}).end()};h.max=function(a,b){var c=b=='x'?'Width':'Height',scroll='scroll'+c;if(!$j(a).is('html,body'))return a[scroll]-$j(a)[c.toLowerCase()]();var d='client'+c,html=a.ownerDocument.documentElement,body=a.ownerDocument.body;return Math.max(html[scroll],body[scroll])-Math.min(html[d],body[d])};function both(a){return typeof a=='object'?a:{top:a,left:a}}})(jQuery);

$j.fn.topLink = function (settings) {
    settings = jQuery.extend({
        min: 1,
        fadeSpeed: 200,
        ieOffset: 50
    }, settings);
    return this.each(function () {
        //listen for scroll
        var el = $j(this);
        el.css('display', 'none'); //in case the user forgot
        $j(window).scroll(function () {
            if (!jQuery.support.hrefNormalized) {
                el.css({
                    //'position': 'absolute',
                    //'top': $j(window).scrollTop() + $j(window).height() - settings.ieOffset
                });
            }
            if ($j(window).scrollTop() >= settings.min) {
                el.fadeIn(settings.fadeSpeed);
            } else {
                el.fadeOut(settings.fadeSpeed);
            }
        });
    });
};

	
	$j(document).ready(function() {
		/*$j(".footer-rowThree #topofpage").append('<style type="text/css">#auto-top-link{ display:none; position:fixed; right:25px; bottom:25px; color:#fff; font-weight:bold; text-decoration:none; background:#000; padding:7px 12px; -webkit-border-radius: 7px; border-radius: 7px; border:1px solid #fff; height:12px; float:left;}</style>');*/
		$j(".footer-rowThree #topofpage").append('<div style="clear:both;"><a href="#MainForm" id="auto-top-link"><span class="hidetopofpage" title="Top of page">Top of page</span></a></div>');				
		$j('#auto-top-link').topLink({
			min: 0, // Specify the height of the page
			fadeSpeed: 600
		});
		//smoothscroll
		$j('#auto-top-link').click(function(e) {
			e.preventDefault();
			$j.scrollTo(0,300);
		});
		
	});
	
	
/*------------------------- Top of page ends here --------------------------------*/

/*!---- gatag-----*/
//    This javascript tags file downloads and external links in Google Analytics.
//    You need to be using the Google Analytics New Tracking Code (ga.js) 
//    for this script to work.
//    To use, place this file on all pages just above the Google Analytics tracking code.
//    All outbound links and links to non-html files should now be automatically tracked.
//
//    This script has been provided by Goodwebpractices.com
//    Thanks to ShoreTel, MerryMan and Colm McBarron
//
//    www.goodwebpractices.com
//    VKI has made changes as indicated below.                                            
if (document.getElementsByTagName) {
        // Initialize external link handlers
        var hrefs = document.getElementsByTagName("a");
        for (var l = 0; l < hrefs.length; l++) {
                        // try {} catch{} block added by erikvold VKI
                  try{
                      //protocol, host, hostname, port, pathname, search, hash
                      if (hrefs[l].protocol == "mailto:") {
                              startListening(hrefs[l],"click",trackMailto);
                      } else if (hrefs[l].hostname == location.host) {
                              var path = hrefs[l].pathname + hrefs[l].search;
                                          var isDoc = path.match(/\.(?:doc|eps|jpg|png|svg|xls|ppt|pdf|xls|zip|txt|vsd|vxd|js|css|rar|exe|wma|mov|avi|wmv|mp3)($|\&|\?)/);
                              if (isDoc) {
                                      startListening(hrefs[l],"click",trackExternalLinks);
                              }
                      } else {
                              startListening(hrefs[l],"click",trackExternalLinks);
                      }
                  }
                  catch(e){
                              continue;
                  }
        }
}
function startListening (obj,evnt,func) {
        if (obj.addEventListener) {
                obj.addEventListener(evnt,func,false);
        } else if (obj.attachEvent) {
                obj.attachEvent("on" + evnt,func);
        }
}
function trackMailto (evnt) {
        var href = (evnt.srcElement) ? evnt.srcElement.href : this.href;
        var mailto = "/mailto/" + href.substring(7);
        if (typeof(pageTracker) == "object") pageTracker._trackPageview(mailto);
}
function trackExternalLinks (evnt) {
        var e = (evnt.srcElement) ? evnt.srcElement : this;
        while (e.tagName != "A") {
                e = e.parentNode;
        }
        var lnk = (e.pathname.charAt(0) == "/") ? e.pathname : "/" + e.pathname;
        if (e.search && e.pathname.indexOf(e.search) == -1) lnk += e.search;
        if (e.hostname != location.host) lnk = "/external/" + e.hostname + lnk;
        if (typeof(pageTracker) == "object") pageTracker._trackPageview(lnk); 
}

$j(document).ready(function(){


$j("a[href$='.pdf'], a[href$='.zip'], a[href$='.doc'], a[href$='.docx'], a[href$='.xls'], a[href$='.xlsx'], a[href$='.ppt'], a[href$='.pptx'], a[href$='.mp3'], a[href$='.txt'], a[href$='.vsd'], a[href$='.rar'], a[href$='.wma'], a[href$='.avi'], a[href$='.mmv'], a[href$='.mp4'], a[href$='.eps'], a[href$='.jpg'], a[href$='.gif'], a[href$='.png'], a[href$='.js'], a[href$='.css'], a[href$='.mov'], a[href$='.svg'], a[href$='.exe']").click(function(){

		var url = $j(this).attr("href");
        var fileName= url;
        var fileExtension = fileName.replace(/^.*\./, '');
        fileExtension = fileExtension.toUpperCase();

		ga('send', 'pageview', url);
		ga('newTracker.send', 'pageview', url);
		ga('send', 'event', fileExtension, 'click', url);

    });


$j("div.tabed-menu ul li a").click(function(){
	var linktextf1="";
	var winloc= window.location.href;
	linktextf1 = $j(this).text();
setTimeout(function(){ga('send', 'event', linktextf1, linktextf1+ ' tab clicked', winloc);});
});

















$j("#banner ul li a" ).each(function(){
tempvid = $j(this).attr("href");
if(tempvid=="http://www.icapcharityday.com/"){
$j(this).addClass("icapchartiday-click")
}
});

$j(".icapchartiday-click").click(function(){
ga('send', 'event', 'Icap Charity Day link', 'Icap Charity Day link - Clicked', "Icap Charity Day link - Clicked");

//_gaq.push(["_trackEvent","Icap Charity Day link","Icap Charity Day link - Clicked", window.location.href]); 
});


	
});
/*!---- new-filters-----*/
$j(document).ready(function(){
   
   /*------------------- News Category starts ------------------*/
   var dropDownVal = '';
   
   $j("#catNews option").each(function(i){
      var currVal = getParamVal2("category").replace("%20"," ");
      if(currVal == $j(this).html()) 
      {
          dropDownVal = $j(this).attr("value");
      }
      if(i == ($j("#catNews option").length-1))
      {
          if(dropDownVal != '')
          {
             $j("#catNews").val(dropDownVal);
             $j("#catNews").siblings(".select").html(currVal);
          }
      }
   });
   
   if(location.href.indexOf("/news")>0 && location.href.indexOf("?ac=1&category")>0)
	   {
         $j("#MainForm").attr('action',$j("#MainForm").attr('action').split("?")[0]);
         $j(".next-tab>a").attr("href",encodeURI($j(".next-tab>a").attr("href")));
       }
   
   /*------------------- News Category ends ------------------*/
   
   /*------------------ Careers Filter starts -------------*/
   setTimeout(function(){
   if(getParamVal2("hireNature")!= "*")
    if($j("#"+getParamVal2("hireNature")).length > 0 )
	   $j("#"+getParamVal2("hireNature")).attr("checked","true").trigger("change");
   if(getParamVal2("businessArea") != "*")    
    if($j("#"+getParamVal2("businessArea")).length > 0)
	   $j("#"+getParamVal2("businessArea")).attr("checked","true").trigger("change");
   if(getParamVal2("region") != "*")    
      if($j("#"+getParamVal2("region")).length > 0)
   	   $j("#"+getParamVal2("region")).attr("checked","true").trigger("change");},200);
   /*------------------ Careers Filter ends -------------*/
   
    /*------------------ Contact us starts ----------------*/
   
   if(location.href.indexOf("service=")>0)
   {
       var counter = 0;
	   var counter1 = 0;
       
       $j(".contact-detail-wrapper .region-data").each(function(){
		$j(this).hide();
			$j(this).find(".contact-data li").each(function(){
				
				if($j(this).find("div .location-title").next().hasClass("currentloc")){
					
				$j(this).parent().parent().show();
				$j(this).show();
				$j(this).addClass("currentLi");
				$j("ul.contact-data li.currentLi:odd").css("background-color", "#ffffff");
				counter1++;
				}
				else
				$j(this).hide();			
				
				});

		$j('.contact-data li.currentLi').click(function(){
	
		$j(".location-title").html($j(this).find("span").first().html());
		$j('.contact-data li').removeClass('selected');
		$j(this).addClass('selected');
		var curId = $j(this).attr("id");
		//alert(curId);

$j(".contact-data li div.contact-detail").each(function(){
			if($j(this).hasClass(curId)){
				$j(this).css({"display":"block"});
			} else {
				$j(this).css({"display":"none"});
			}
		});
		
				
	});

		$j(this).find(".contact-data li .currentloc").each(function(){
			counter++;
			});

if(counter1 == 0)	{
	$j(this).hide();
	}

});

if(counter == 0)
		{$j(".region-data").hide(); $j(".errorMsg").show();}
		else
		
		{$j(".errorMsg").hide();}
		
		if(document.getElementById("regionCon").value == "-1" && document.getElementById("serviceCon").value == "-1" && document.getElementById("marketCon").value == "-1")	$j(this).hide();
   }
   
   var regionVal = getParamVal2("region");
   var serviceVal = getParamVal2("service");
   var companyVal = getParamVal2("market");
   
   if(regionVal!= "*" && regionVal!= "")
        {
           $j("#regionCon").val(regionVal);
           $j("#regionCon").siblings(".select").html($j("#regionCon option[value='"+regionVal+"']").html());
        }
   if(serviceVal!= "*" && serviceVal!= "")
        {
           $j("#serviceCon").val(serviceVal);
           $j("#serviceCon").siblings(".select").html($j("#serviceCon option[value='"+serviceVal+"']").html());
        }
    if(companyVal!= "*" && companyVal!= "")
        {
           $j("#marketCon").val(companyVal);
           $j("#marketCon").siblings(".select").html($j("#marketCon option[value='"+companyVal+"']").html());
        }
   /*------------------ Contact us ends ----------------*/
  
   
});


$j( document ).ajaxComplete(function() {
   
     if(location.href.indexOf("/news")>0 && location.href.indexOf("?ac=1&category")>0)
	   {
         $j(".next-tab>a").attr("href",encodeURI($j(".next-tab>a").attr("href")));
       }
   
});

function getParamVal2(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.search);
    if (results == null) return "";
    else return decodeURIComponent(results[1].replace(/\+/g, " "));
}
/*!---- iframe-groupsnapdown-----*/
$j(document).ready(function(){
$j('#grpsitesContainer iframe').hover(
    function () {
        $j(this).css('z-index','9999').css('height','700px');
    },
    
    function() {
        $j(this).css('z-index','0').css('height','auto');
    }
);
});
