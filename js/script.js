

//searchbar handler





function nextPage(){

	var token = $('#next-button').data('token');
	var q = $('#next-button').data('query');

	//clear results
	$('#results').html('');
	$('#buttons').html('');

	//get form input
	q = $('#query').val();

	//run get request on API
	$.get(
		"https://www.googleapis.com/youtube/v3/search", {
			part: 'snippet, id',
			q: q, 
			pageToken: token,
			type: 'video', 
			key: 'AIzaSyC61rwdV4Tyy9ChypmQfTODXznQXZfFvl4'},
			function(data){
				var nextPageToken = data.nextPageToken;
				var prevPageToken = data.prevPageToken;
				console.log(data);
				
				$.each(data.items, function(i, item){
					// Get Output
					var output = getOutput(item);
					
					// Display Results
					$('#results').append(output);
				});

				var buttons = getButtons(prevPageToken, nextPageToken);
					//display buttons
					$('#buttons').append(buttons);
			}
	);

}

function prevPage(){

	var token = $('#prev-button').data('token');
	var q = $('#prev-button').data('query');

	//clear results
	$('#results').html('');
	$('#buttons').html('');

	//get form input
	q = $('#query').val();

	//run get request on API
	$.get(
		"https://www.googleapis.com/youtube/v3/search", {
			part: 'snippet, id',
			q: q, 
			pageToken: token,
			type: 'video', 
			key: 'AIzaSyC61rwdV4Tyy9ChypmQfTODXznQXZfFvl4'},
			function(data){
				var nextPageToken = data.nextPageToken;
				var prevPageToken = data.prevPageToken;
				console.log(data);
				
				$.each(data.items, function(i, item){
					// Get Output
					var output = getOutput(item);
					
					// Display Results
					$('#results').append(output);
				});

				var buttons = getButtons(prevPageToken, nextPageToken);
					//display buttons
					$('#buttons').append(buttons);
			}
	);

}

//Build Output
function getOutput(item){
	var videoId = item.id.videoId;
	var title = item.snippet.title;
	var description = item.snippet.description;
	var thumb = item.snippet.thumbnails.high.url;
	var channelTitle = item.snippet.channelTitle;
	var date = item.snippet.publishedAt;

	//Build output string
	var output = '<li>' +
	'<div class="list-left">' +
	'<img src="'+thumb+'">' +
	'</div>' +
	'<div class="list-right">' +
	'<h3><a class="fancybox fancybox.iframe" href="http://www.youtube.com/embed/'+videoId+'?autoplay=1 ">'+title+'</a></h3>'+
	'<small>By <span class="cTitle">'+channelTitle+'</span>on '+date+'</small>' +
	'<p>'+description+'</p>' +
	'</div>' +
	'</li>' +
	'<div class="clearFix"></div>' +
	'';

	return output;
}

//Build the buttons
function getButtons(prevPageToken, nextPageToken){
	if(!prevPageToken){
		var btnOutput = '<div class="button-container">'+
						'<button id="next-button" class="paging-button" data-token="'+nextPageToken+'" data-query="'+q+'"' +
						'onclick="nextPage();">Next Page</button></div>';
	} else{
		var btnOutput = '<div class="button-container">'+
						'<button id="prev-button" class="paging-button" data-token="'+prevPageToken+'" data-query="'+q+'" '+
						'onclick="prevPage();">Prev Page</button>' + 
						'<button id="next-button" class="paging-button" data-token="'+nextPageToken+'" data-query="'+q+'"' +
						'onclick="nextPage();">Next Page</button></div>';
	}

	return btnOutput;
}

