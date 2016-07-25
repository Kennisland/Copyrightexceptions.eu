function displayActLinks(info) {
	result = "";
	if (info['Link to article (URL)'] != '' && info['Link to WIPO LEX (URL)'] != '') {
		result = '(<a href="' + encodeURI(info['Link to article (URL)'].replace(/"/g, '&quot;')) + '">Local act</a>, <a href="' + encodeURI(info['Link to WIPO LEX (URL)'].replace(/"/g, '&quot;')) + '">WIPO Lex</a>)';
	} else if (info['Link to article (URL)'] != '') {
		result = '(<a href="' + encodeURI(info['Link to article (URL)'].replace(/"/g, '&quot;')) + '">Local act</a>)';
	} else if (info['Link to WIPO LEX (URL)'] != '') {
		result = '(<a href="' + encodeURI(info['Link to WIPO LEX (URL)'].replace(/"/g, '&quot;')) + '">WIPO Lex</a>)';
	}
	return result;

}

function loadTable(data) {
	page = "";
	Object.keys(data['exceptions'])
      .sort()
      .forEach(function(key, i) {
          	exception = data['exceptions'][key];
          	console.log(exception);
          	page += ('<div class="shortcode clearfix box article-box fa-check" >' +
				'<h3 id="' + key.replace(/[ \.()]/g, "") + '">' + key + '</h3>' +
				'<p><b>Implemented:</b> ' + exception['Implemented'] + '</p>' +
				'<p><b>Remunerated:</b> ' + exception['Remuneration'] + '</p>' +
				'<p><b>Article number in local act:</b><br>' + 
				exception['Article Number in local act (TEXT)'] + '</p>' +
				displayActLinks(exception) +
				'<p><b>Remarks:</b> </p>' + 
				'<p>' + exception['Remarks']+ '</p>' +
			'</div>');
       });
	
	return page;
}

var Exceptions = Exceptions || (function(){
    var _args = {}; // private
	page = '';
    return {
        init : function(Args) {
            _args = Args;
        },
                
        load : function() {
        	country = _args[0];
        	// Load data
			var myGeoJSONPath = '/data/result.json';
			var exceptionsTable = [];

            $.getJSON(myGeoJSONPath,function(data){
            	console.log('data loaded.')
            	console.log('Looking for ' + country);
				$.each( data['features'], function( key, val ) {
					console.log(val['properties']['name'] + ' found.');
					if (country == (val['properties']['name']).replace(/[ ]/g, "-")) {
						var page = loadTable(val['properties']);
					}
				});
				$("#exceptions").html(page);
			})
        }
    };
}());