var legenda = '<div id="logo">' + '<a href="/"><img src="/copyright_exceptions_logo.svg"/></a>' + '</div>' + 
				'<p><span class="exception Art51"><href id="Art51">5.1 Temporary acts of reproduction</href></span></p>' + 
				'<p><span class="exception Art52a"><href id="Art52a">5.2(a) Photocopying/photo-reproduction</href></span></p>' + 
				'<p><href id="Art52b"><span class="exception Art52b">5.2(b) Private copying</span></href></p>' + 
				'<p><href id="Art52c"><span class="exception Art52c">5.2(c) Reproductions by Libraries, Archives & Museums</span></href></p>' + 
				'<p><href id="Art52d"><span class="exception Art52d">5.2(d) Ephemeral recordings made by broadcasters</span></href></p>' + 
				'<p><href id="Art52e"><span class="exception Art52e">5.2(e) Reproduction of broadcasts by social institutions</span></href></p>' + 
				'<p><href id="Art53a"><span class="exception Art53a">5.3(a) Illustration for teaching or scientific research</span></href></p>' + 
				'<p><href id="Art53b"><span class="exception Art53b">5.3(b) Use for the benefit of people with a disability</span></href></p>' + 
				'<p><href id="Art53c"><span class="exception Art53c">5.3(c) Reporting by the press on current events</span></href></p>' + 
				'<p><href id="Art53d"><span class="exception Art53d">5.3(d) Quotation for criticism or review</span></href></p>' + 
				'<p><href id="Art53e"><span class="exception Art53e">5.3(e) Use for public security purposes</span></href></p>' + 
				'<p><href id="Art53f"><span class="exception Art53f">5.3(f) Use of public speeches and public lectures</span></href></p>' + 
				'<p><href id="Art53g"><span class="exception Art53g">5.3(g) Use during religious or official celebrations</span></href></p>' + 
				'<p><href id="Art53h"><span class="exception Art53h">5.3(h) Use of works of architecture or sculptures in public spaces</span></href></p>' + 
				'<p><href id="Art53i"><span class="exception Art53i">5.3(i) Incidental inclusion</span></href></p>' + 
				'<p><href id="Art53j"><span class="exception Art53j">5.3(j) Use for advertising the exhibition or sale of works of art</span></href></p>' + 
				'<p><href id="Art53k"><span class="exception Art53k">5.3(k) Use for the purpose of caricature, parody or pastiche</span></href></p>' + 
				'<p><href id="Art53l"><span class="exception Art53l">5.3(l) Use for the demonstration or repair of equipment</span></href></p>' + 
				'<p><href id="Art53m"><span class="exception Art53m">5.3(m) Use for the purpose of reconstructing a building</span></href></p>' + 
				'<p><href id="Art53n"><span class="exception Art53n">5.3(n) Use for the purpose of research or private study</span></href></p>' + 
				'<p><href id="Art53o"><span class="exception Art53o">5.3(o) Pre-existing exceptions of minor importance</span></href></p>' +
				'<p><href id="Orphan"><span class="exception Orphan">Reproducing and making available of orphan works</span></href></p>' + 
				'<div id=switch><href class="SwitchMAP"><span class="exception">SHOW TABLE</span></href></div>'


var exceptionsTable = [];

function resetHighlight(e) {
	var layer = e.target;

	
	if (!L.Browser.ie && !L.Browser.opera) {
		layer.bringToFront();
	}
}

function highlightFeature(e) {
	var layer = e.target;		

	if (!L.Browser.ie && !L.Browser.opera) {
		layer.bringToFront();
	}
}
function onEachFeature(feature, layer) {
	layer.on({
		click : registerClick,
		mouseout: resetHighlight,
	});
	if(layer.hasOwnProperty("feature")){
		layer.setStyle(style(layer.feature))
		popup = layer.bindPopup('<div style="text-align:center;">' + layer.feature.properties.name + '</div>', {closeButton:false});

	 }
}

function registerClick(e) {
	var layer = e.target;
	map.closePopup();
	info.update(layer.feature.properties);
}

// Style each feature
function style(feature) {
	if (feature.hasOwnProperty('properties')) {
		if (feature.properties.hasOwnProperty('exceptions')) {
			color =  getColor(feature.properties.exceptions[selected_exception].Implemented);
		} else {
			color = getColor('n/a');
		}
	} else {
		color = '#ff77f8';
	}
	return {	
		fillColor: color,
		weight: 1,
		opacity: 1,
		color: 'black',
		fillOpacity: 0.7
	};
}

function showValue (name, value, row = false) {
	result = (value != '' ? '#aee300' : "");
	if (row) {
		result = '<tr><td>'
	}
	else {
		return value != '' ? '#aee300' : "";
	}
}

function getColor(d) {
	return d == 'Yes' 		? '#aee300' :
		   d == 'No'  		? '#f80000' :
		   d == 'Unkown'  	? '#ff9100' :
		   d == 'Partly'	? '#ff9100'	:
		   d == 'n/a'		? '#000000'	:
							  '#DDDDDD';
}

// Converts YYYY/MM/DD to DD-MM-YYYY
function convertDate (date) {
	if ((date.match(/\//g) || []).length == 2) {
		date = date.split("/");
		return date[2] + "-" + date[1] + "-" + date[0];
	}
	return "";
}

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
	var result = [];
	var countries = [];
  	
  	exceptions_names = ['<p><span class="exception">5.1 Temporary acts of reproduction</span></p>',
						'<p><span class="exception">5.2(a) Photocopying/photo-reproduction</span></p>',
						'<p><span class="exception">5.2(b) Private copying</span></p>',
						'<p><span class="exception">5.2(c) Reproductions by Libraries, Archives & Museums</span></p>',
						'<p><span class="exception">5.2(d) Ephemeral recordings made by broadcasters</span></p>', 
						'<p><span class="exception">5.2(e) Reproduction of broadcasts by social institutions </span></p>', 
						'<p><span class="exception">5.3(a) Illustration for teaching or scientific research</span></p>', 
						'<p><span class="exception">5.3(b) Use for the benefit of people with a disability</span></p>', 
						'<p><span class="exception">5.3(c) Reporting by the press on current events</span></p>', 
						'<p><span class="exception">5.3(d) Quotation for criticism or review</span></p>', 
						'<p><span class="exception">5.3(e) Use for public security purposes</span></p>', 
						'<p><span class="exception">5.3(f) Use of public speeches and public lectures </span></p>', 
						'<p><span class="exception">5.3(g) Use during religious or official celebrations</span></p>', 
						'<p><span class="exception">5.3(h) Use of works of architecture or sculptures in public spaces</span></p>', 
						'<p><span class="exception">5.3(i) Incidental inclusion</span></p>', 
						'<p><span class="exception">5.3(j) Use for advertising the exhibition or sale of works of art</span></p>', 
						'<p><span class="exception">5.3(k) Use for the purpose of caricature, parody or pastiche</span></p>', 
						'<p><span class="exception">5.3(l) Use for the demonstration or repair of equipment</span></p>', 
						'<p><span class="exception">5.3(m) Use for the purpose of reconstructing a building</span></p>', 
						'<p><span class="exception">5.3(n) Use for the purpose of research or private study</span></p>', 
						'<p><span class="exception">5.3(o) Pre-existing exceptions of minor importance</span></p>',
						'<p><span class="exception">Reproducing and making available of orphan works</span></p>'];
  	
  	
  	$.each( data['features'], function( key, val ) {
		// countries[<iso>] = <name>
		countries[val['properties']['iso']] = val['properties']['name'].replace(/[ ]/g, "-");
		hashtags = [];
		country = val['properties']['iso'];
		if ('exceptions' in val['properties']) {
			result[country] = [];
			$.each( val['properties']['exceptions'], function( exception, val ) {
				if ('Implemented' in val) {
					result[country][exception] = val['Implemented'];
					hashtags[exception] = val['short_code'];
				}
			});
		}
	});
  
	var table = $("<table/>").addClass('data-table');
	var row = $("<tr/>").addClass( "table_header" );
	row.append($("<th/>").text(''));
	for (var country in result) {
		cell = $("<th/>");
		cell.attr('title', countries[country]);
		$('<a>'+ country +'</a>').attr({'href': '/project/' + countries[country]}).appendTo(cell);
		row.append(cell);
	};
	table.append(row);
	exceptions = Object.keys(result['DE']);
	exceptions.sort();
	
	$.each (exceptions, function( key, exception ) {
		var row = $("<tr/>");
		cell = $("<td/>");
		cell.html(exceptions_names[0]);
		row.append(cell);
		exceptions_names.shift();
		for (var country in result) {
			cell = $("<td/>").css("background-color", getColor(result[country][exception]));
			$('<a></a>').attr({'href': '/project/' + countries[country] + '/#' + hashtags[exception] }).appendTo(cell);
			row.append(cell);
		};
		table.append(row);
	});
	return table;
}

// 47, 4
var selected_exception = "Art. 5.1";
var map = L.map('map', {zoomControl: false, minZoom:3, maxZoom:6, attributionControl: false, closePopupOnClick: false}).setView([55, 10], 4);
L.control.zoom({position:'topright'}).addTo(map);

map.createPane('labels');
map.getPane('labels').style.zIndex = 650;
map.getPane('labels').style.pointerEvents = 'none';
map.getPane('labels').closeButton = false;
map.getPane('labels').autoPan = false;
map.getPane('labels').offset = [0, 0];

map.fitBounds(map.getBounds(), {padding: [0, 0]});

var myGeoJSONPath = '/data/result.json';
var exceptionsTable = [];

// Load data
$.getJSON(myGeoJSONPath,function(data){
	L.geoJson(data, {
		clickable: true,
		style: style,
		onEachFeature: onEachFeature
	}).addTo(map);
	table = loadTable(data)
	$("#table").html('<div id="logo">' + '<a href="/"><img src="/copyright_exceptions_logo.svg"/></a>' + '</div>' +  table[0].outerHTML + '<div id=switch><href class="SwitchTABLE"><span class="" style="color: rgb(73, 73, 73); background: url(&quot;&quot;) rgba(242, 242, 242, 0.701961);">SHOW MAP</span></href></div>');
})

// INFORMATION pane

// control that shows info on click
var info = L.control();

info.onAdd = function (map) {
	this._div = L.DomUtil.create('div', 'info');
	return this._div;
};

info.update = function (props) {
	this._div.style = "visibility: visible;"	

	this._div.innerHTML = ""
	
	this._div.innerHTML += "<span class=country-name>" + props.name + '</span>';
	this._div.innerHTML += 	"<table><tr><td>Implemented: </td><td>" + props.exceptions[selected_exception].Implemented + '</td></tr>';
	if (props.exceptions[selected_exception]['Time in effect (YYYY-MM-DD)'] != "") {
		this._div.innerHTML += 	"<tr><td>Implemented on: </td><td>" + convertDate(props.exceptions[selected_exception]['Time in effect (YYYY-MM-DD)']) + '</td></tr>';
	}
	if (props.exceptions[selected_exception].Remuneration != "") {
		this._div.innerHTML += 	"<tr><td>Remuneration: </td><td>" + props.exceptions[selected_exception].Remuneration + '</td></tr>';
	}
	this._div.innerHTML += 	'</table>';
	this._div.innerHTML += 	"<p>&nbsp;</p>";
	if (props.exceptions[selected_exception]['Article Number in local act (TEXT)'] != '') {
		this._div.innerHTML += 	"<p>Article Number in local act: </p><p><span>" + props.exceptions[selected_exception]['Article Number in local act (TEXT)'] +  '</span></p>';
		this._div.innerHTML += 	"<p>" + displayActLinks(props.exceptions[selected_exception]) + "</p>";
		this._div.innerHTML += 	"<p>&nbsp;</p>";
	}
	if (props.exceptions[selected_exception].Remarks != "") {
		this._div.innerHTML += 	"<p>Remarks: </p><p><span>" + props.exceptions[selected_exception].Remarks +  '</span></p>';
		this._div.innerHTML += 	"<p>&nbsp;</p>";
	}
	this._div.innerHTML += 	"<p><a href='/feedback'><span>FEEDBACK</span></a> <a href='/project/" + props.name.replace(/[ ]/g, "-") + "/#" + selected_exception.replace(/[ \.()]/g, "") + "'><span>MORE INFORMATION</span></a></p>";
	this._div.innerHTML += "<p><a href='/project/" + props.name.replace(/[ ]/g, "-") + "/'><span>SEE ALL EXCEPTIONS</span></a> <a href='javascript:info.clear()' id=closeinfo><span>X</span></a></p>";

	this._div.firstChild.onmousedown = this._div.firstChild.ondblclick = L.DomEvent.stopPropagation;
};

info.clear = function () {
	this._div.style = "visibility: hidden;"	
	map.closePopup();
};

info.addTo(map);

// Disable dragging when user's cursor enters the element
info.getContainer().addEventListener('mouseover', function () {
	map.dragging.disable();
	map.doubleClickZoom.disable();
});

// Re-enable dragging when user's cursor leaves the element
info.getContainer().addEventListener('mouseout', function () {
	map.dragging.enable();
	map.doubleClickZoom.enable();
});


// LEGEND

var legend = L.control({position: 'topleft'});

legend.onAdd = function (map) {
	
	this._div = L.DomUtil.create('div', 'exceptions');
	this._div.innerHTML =  legenda;

    return this._div;
};

legend.update = function (props) {
	this._div.innerHTML = "";
	this._div.innerHTML = props;
};

legend.addTo(map);

changeException('Art. 5.1');  
highlight('Art51');

function changeException(value) {
  $( ".exception" ).css( "background", "url('')" ); 
  $( ".exception" ).css( "background-color", "rgba(242,242,242,0.7)"); 
  $( ".exception" ).css( "color", "#494949");
  info.clear();
  selected_exception = value;
  map.eachLayer(function (layer) {
	if(layer.hasOwnProperty("feature")){
		layer.setStyle(style(layer.feature))
	}
	   
	})
  map.closePopup();
}

function highlight(excep) {
	$( ".exception" + "." + excep ).css( "color", "#feffff");
	$( ".exception" + "." + excep ).css( "background", "url('434343-1.png')"); 
}


function showMap () {
	legend.update(legenda);
}

function switchView () {
	if ($("#table").css("z-index") > $("#map").css("z-index")) {
		$("#table").css("z-index", "0");
		$("#map").css("z-index", "1");
	} else {
		$("#table").css("z-index", "1");
		$("#map").css("z-index", "0");
	}
	map.setView([55, 10], 4);	
}

$('#Art51').click(function(){ changeException('Art. 5.1');  highlight('Art51'); return false;});
$('#Art52a').click(function(){ changeException('Art. 5.2(a)');  highlight('Art52a'); return false;});
$('#Art52b').click(function(){ changeException('Art. 5.2(b)');  highlight('Art52b'); return false;});
$('#Art52c').click(function(){ changeException('Art. 5.2(c)');  highlight('Art52c'); return false;});
$('#Art52d').click(function(){ changeException('Art. 5.2(d)');  highlight('Art52d'); return false;});
$('#Art52e').click(function(){ changeException('Art. 5.2(e)');  highlight('Art52e'); return false;});
$('#Art53a').click(function(){ changeException('Art. 5.3(a)');  highlight('Art53a'); return false;});
$('#Art53b').click(function(){ changeException('Art. 5.3(b)');  highlight('Art53b'); return false;});
$('#Art53c').click(function(){ changeException('Art. 5.3(c)');  highlight('Art53c'); return false;});
$('#Art53d').click(function(){ changeException('Art. 5.3(d)');  highlight('Art53d'); return false;});
$('#Art53e').click(function(){ changeException('Art. 5.3(e)');  highlight('Art53e'); return false;});
$('#Art53f').click(function(){ changeException('Art. 5.3(f)');  highlight('Art53f'); return false;});
$('#Art53g').click(function(){ changeException('Art. 5.3(g)');  highlight('Art53g'); return false;});
$('#Art53h').click(function(){ changeException('Art. 5.3(h)');  highlight('Art53h'); return false;});
$('#Art53i').click(function(){ changeException('Art. 5.3(i)');  highlight('Art53i'); return false;});
$('#Art53j').click(function(){ changeException('Art. 5.3(j)');  highlight('Art53j'); return false;});
$('#Art53k').click(function(){ changeException('Art. 5.3(k)');  highlight('Art53k'); return false;});
$('#Art53l').click(function(){ changeException('Art. 5.3(l)');  highlight('Art53l'); return false;});
$('#Art53m').click(function(){ changeException('Art. 5.3(m)');  highlight('Art53m'); return false;});
$('#Art53n').click(function(){ changeException('Art. 5.3(n)');  highlight('Art53n'); return false;});
$('#Art53o').click(function(){ changeException('Art. 5.3(o)');  highlight('Art53o'); return false;});
$('#Orphan').click(function(){ changeException('Orphan Works');  highlight('Orphan'); return false;});
$('.SwitchMAP').click(function(){ switchView(); return false;});
$('.SwitchTABLE').click(function(){ switchView(); return false;});
$('#closeinfo').click(function(){ switchView(); return false;});

/*
$(document).on('mouseenter mouseleave', '.data-table td', function () {
  var i = $(this).index(),
      col = $(this);
  console.log('trigger');
  col
  	.add(col.closest('tr').find('td').first())
    .add(col.closest('table').find('.data-table th').eq(i))
    .toggleClass('header-hightlight');
});
*/

$(document).on('mouseenter mouseleave', '.data-table td', function () {
  var i = $(this).index(),
      col = $(this);

  col
    .add(col.closest('tr').find('td').first())
    .add(col.closest('data-table').find('th').eq(i))
    .toggleClass('bg');
});


$(document).on('click', '.SwitchTABLE', function(e){
    e.preventDefault(); // stop default action
    switchView(); 
    return false;
});