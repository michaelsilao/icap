$j = jQuery.noConflict();

$j(document).ready(function()
{
$j('.disablePicker').toggle(function() {
		$j(this).text('Enable').siblings('.hasDatepick').
			datepick('disable');
	},
	function() {
		$j(this).text('Disable').siblings('.hasDatepick').
			datepick('enable');
	}
);

$j('#removePicker').toggle(function() {
		$j(this).text('Re-attach');
		$j('#defaultPopup,#defaultInline').datepick('destroy');
	},
	function() {
		$j(this).text('Remove');
		$j('#defaultPopup,#defaultInline').datepick();
	});


$j('#appformdate-textboxTextbox').datepick();
$j('#appformdate-textboxTextbox').datepick("setDate", new Date());
});