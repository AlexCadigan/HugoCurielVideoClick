/* Created By: Alex Cadigan (https://github.com/AlexCadigan) */
function displayHomepage() { window.location.href = "../index.php"; }
function displaySettingsPage() { window.location.reload(true); }
function displayHelpPage() { window.location.href = "../HelpPage/Module3/HelpPage.php"; }
function displayFeedbackPage() { window.location.href = "../FeedbackPage/FeedbackPage.php"; }
/* Begins Module 2.3 */
function startModule() {
	// Collects user input
	var selectedVideos = [];
	var checkboxes = document.getElementById("videos").getElementsByTagName("input");
	var links = document.getElementById("videos").getElementsByTagName("a");
	for (var index = 0; index < checkboxes.length; index ++) {
		if (checkboxes[index].checked) {
			selectedVideos.push(links[index].text.trim());
			selectedVideos.push(links[index].href.trim().substring(32));
		}
	}
	if (selectedVideos.length == 0 || selectedVideos.length > 6) {
		alert("Error!  You selected " + (selectedVideos.length / 2) + " videos.  Please select 1 to 3 videos to use!");
		return;
	}
	if (document.getElementById("timeout").value.trim() == "" || document.getElementById("timeout").value.trim() <= 0) {
		alert("Error!  Please enter a number greater than 0 for idle timeout!");
		return;
	}
	if (document.getElementById("sessionTime").value.trim() == "" || document.getElementById("sessionTime").value.trim() <= 0) {
		alert("Error!  Please enter a number greater than 0 for total runtime!");
		return;
	}
	if (document.getElementById("clicks").value.trim() == "" || document.getElementById("clicks").value.trim() < 0) {
		alert("Error!  Please enter a non-negative number for clicks per second needed!");
		return;
	}
	if (document.getElementById("volume").value.trim() == "" || document.getElementById("volume").value.trim() < 0) {
		alert("Error!  Please enter a non-negative number for change in volume!");
		return;
	}
	if (document.getElementById("opacity").value.trim() == "" || document.getElementById("opacity").value.trim() < 0) {
		alert("Error!  Please enter a non-negative number for change in transparency!");
		return;
	}
	if (selectedVideos.length >= 2) {
		video1Name = selectedVideos[0];
		video1ID = selectedVideos[1];
	}
	if (selectedVideos.length >= 4) {
		video2Name = selectedVideos[2];
		video2ID = selectedVideos[3];
	}
	else {
		video2Name = "null";
		video2ID = "null";
	}
	if (selectedVideos.length == 6) {
		video3Name = selectedVideos[4];
		video3ID = selectedVideos[5];
	}
	else {
		video3Name = "null";
		video3ID = "null";
	}
	sessionTimeout = document.getElementById("timeout").value.trim();
	totalRuntime = document.getElementById("sessionTime").value.trim();
	clicksPerSecond = document.getElementById("clicks").value.trim();
	changeInVolume = parseInt(document.getElementById("volume").value.trim());
	changeInOpacity = parseInt(document.getElementById("opacity").value.trim()) / 100;
	buildRunModulePage();
}
/* Builds the HTML for running module 2.3 */
function buildRunModulePage() {
	document.getElementById("pageHolder").innerHTML = 
	`<!-- The YouTube videos -->
	<div id = "holder1" class = "holder"> </div>
	<div id = "holder2" class = "holder"> </div>
	<div id = "holder3" class = "holder"> </div> <br> <br> <br> <br> <br>
	<!-- The play button -->
	<div id = "buttonHolder">
		<button id = "playButton" onclick = "buttonClicked()" ontouchstart = "buttonClicked()"> Play Video </button>
	</div>`;
	var tag = document.createElement('script');
  	tag.src = "https://www.youtube.com/iframe_api";
  	var firstScriptTag = document.getElementsByTagName('script')[0];
  	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}
var videoTimer, resultsTimer;
/* Called when the YouTube API loads */
function onYouTubeIframeAPIReady() {
	totalSessionTime = 0;
	clickCounter = 0;
	video1 = [0];
	video2 = [0];
	video3 = [0];
	video1Duration = 0;
	video2Duration = 0;
	video3Duration = 0;
	video1Location = "";
	video2Location = "";
	video3Location = "";
	video1Clicks = 0;
	video2Clicks = 0;
	video3Clicks = 0;
	numberSelectedOfVideo1 = 0;
	numberSelectedOfVideo2 = 0;
	numberSelectedOfVideo3 = 0;
	selectedHolder = "";
	// Creates temporary YouTube players
	player1 = new YT.Player("holder1", { height: '450' });
	player2 = new YT.Player("holder2", { height: '450' });
	player3 = new YT.Player("holder3", { height: '450' });
	displayVideos();
	// Initiates timers
	lengthOfSessionTimer = setInterval(addTime, 500, "session");
	endSessionTimer = setTimeout(endModule, totalRuntime * 60000);
	idleTimer = setTimeout(endModule, sessionTimeout * 60000);
}
/* Displays the available videos in random order */
function displayVideos() {
	firstTimeBuffering = true;
	isVideoStarting = true;
	opacity = 1;
	// Display video 1
	var generatedNumbers = [];
	var randomNumber = Math.floor((Math.random() * 3) + 1);
	if (randomNumber == 1) {
		player1.destroy();
		player1 = new YT.Player("holder1", { videoId: video1ID, height: '450', playerVars: { start: Math.round(video1Duration) }, events: { 'onReady': function() { onPlayerReady("holder1"); }, 'onStateChange': function(event) { onYouTubePlayerStateChange(event, "holder1"); } } });
		video1Location = "player1";
	}
	else if (randomNumber == 2) {
		player2.destroy();
		player2 = new YT.Player("holder2", { videoId: video1ID, height: '450', playerVars: { start: Math.round(video1Duration) }, events: { 'onReady': function() { onPlayerReady("holder2"); }, 'onStateChange': function(event) { onYouTubePlayerStateChange(event, "holder2"); } } });
		video1Location = "player2";
	}
	else {
		player3.destroy();
		player3 = new YT.Player("holder3", { videoId: video1ID, height: '450', playerVars: { start: Math.round(video1Duration) }, events: { 'onReady': function() { onPlayerReady("holder3"); }, 'onStateChange': function(event) { onYouTubePlayerStateChange(event, "holder3"); } } });
		video1Location = "player3";
	}
	generatedNumbers.push(randomNumber);
	// Display video 2
	if (video2Name != "null") {
		while (randomNumber == generatedNumbers[0]) {
			randomNumber = Math.floor((Math.random() * 3) + 1);
		}
		if (randomNumber == 1) {
			player1.destroy();
			player1 = new YT.Player("holder1", { videoId: video2ID, height: '450', playerVars: { start: Math.round(video2Duration) }, events: { 'onReady': function() { onPlayerReady("holder1"); }, 'onStateChange': function(event) { onYouTubePlayerStateChange(event, "holder1"); } } });
			video2Location = "player1";
		}
		else if (randomNumber == 2) {
			player2.destroy();
			player2 = new YT.Player("holder2", { videoId: video2ID, height: '450', playerVars: { start: Math.round(video2Duration) }, events: { 'onReady': function() { onPlayerReady("holder2"); }, 'onStateChange': function(event) { onYouTubePlayerStateChange(event, "holder2"); } } });
			video2Location = "player2";
		}
		else {
			player3.destroy();
			player3 = new YT.Player("holder3", { videoId: video2ID, height: '450', playerVars: { start: Math.round(video2Duration) }, events: { 'onReady': function() { onPlayerReady("holder3"); }, 'onStateChange': function(event) { onYouTubePlayerStateChange(event, "holder3"); } } });
			video2Location = "player3";
		}
		generatedNumbers.push(randomNumber);
	}
	// Display video 3
	if (video3Name != "null") {
		while (randomNumber == generatedNumbers[0] || randomNumber == generatedNumbers[1]) {
			randomNumber = Math.floor((Math.random() * 3) + 1);
		}
		if (randomNumber == 1) {
			player1.destroy();
			player1 = new YT.Player("holder1", { videoId: video3ID, height: '450', playerVars: { start: Math.round(video3Duration) }, events: { 'onReady': function() { onPlayerReady("holder1"); }, 'onStateChange': function(event) { onYouTubePlayerStateChange(event, "holder1"); } } });
			video3Location = "player1";
		}
		else if (randomNumber == 2) {
			player2.destroy();
			player2 = new YT.Player("holder2", { videoId: video3ID, height: '450', playerVars: { start: Math.round(video3Duration) }, events: { 'onReady': function() { onPlayerReady("holder2"); }, 'onStateChange': function(event) { onYouTubePlayerStateChange(event, "holder2"); } } });
			video3Location = "player2";
		}
		else {
			player3.destroy();
			player3 = new YT.Player("holder3", { videoId: video3ID, height: '450', playerVars: { start: Math.round(video3Duration) }, events: { 'onReady': function() { onPlayerReady("holder3"); }, 'onStateChange': function(event) { onYouTubePlayerStateChange(event, "holder3"); } } });
			video3Location = "player3";
		}
	}
}
/* Increments the given timer by half a second */
function addTime(timer) {
	if (timer == "session") {
		totalSessionTime += 0.5;
	}
	else {
		clearTimeout(idleTimer);
		idleTimer = setTimeout(endModule, sessionTimeout * 60000);
		if (timer == "video1") {
			video1[video1.length - 1] += 0.5;
		}
		else if (timer == "video2") {
			video2[video2.length - 1] += 0.5;
		}
		else {
			video3[video3.length - 1] += 0.5;
		}
	}
}
/* Ends the module */
function endModule() {
	clearInterval(lengthOfSessionTimer);
	clearTimeout(endSessionTimer);
	clearTimeout(idleTimer);
	clearTimeout(videoTimer);
	clearInterval(resultsTimer);
	// Checks if last element of video timing arrays is 0
	if (video1[video1.length - 1] == 0 && video2[video2.length - 1] == 0 && video3[video3.length - 1] == 0) {
		video1.splice(video1.length - 1, 1);
		video2.splice(video2.length - 1, 1);
		video1.splice(video3.length - 1, 1);
	}
	buildResultsPage();
}
/* Shows the YouTube video */
function onPlayerReady(holder) {
	document.getElementById(holder).style.opacity = "1";
	document.getElementById(holder).style.pointerEvents = "auto";
}
/* Called when the YouTube player changes states */
function onYouTubePlayerStateChange(event, holder) {
	// If video is buffering for the first time
	if (event.data == 3 && firstTimeBuffering) {
		clearTimeout(idleTimer);
		idleTimer = setTimeout(endModule, sessionTimeout * 60000);
		// Enlarges the video that's playing
		if (holder == "holder1") {
			selectedHolder = "holder1";
			document.getElementById("holder1").style.pointerEvents = "none";
			document.getElementById("holder2").style.opacity = "0";
			document.getElementById("holder2").style.width = "0%";
			document.getElementById("holder3").style.opacity = "0";
			document.getElementById("holder3").style.width = "0%";
			document.getElementById("holder1").style.width = "98%";
		}
		else if (holder == "holder2") {
			selectedHolder = "holder2";
			document.getElementById("holder2").style.pointerEvents = "none";
			document.getElementById("holder1").style.opacity = "0";
			document.getElementById("holder1").style.width = "0%";
			document.getElementById("holder3").style.opacity = "0";
			document.getElementById("holder3").style.width = "0%";
			document.getElementById("holder2").style.width = "98%";
		}
		else {
			selectedHolder = "holder3";
			document.getElementById("holder3").style.pointerEvents = "none";
			document.getElementById("holder1").style.opacity = "0";
			document.getElementById("holder1").style.width = "0%";
			document.getElementById("holder2").style.opacity = "0";
			document.getElementById("holder2").style.width = "0%";
			document.getElementById("holder3").style.width = "98%";
		}
		firstTimeBuffering = false;
	}
	// If the video is playing for the first time
	if (event.data == 1 && isVideoStarting) {
		clearTimeout(idleTimer);
		idleTimer = setTimeout(endModule, sessionTimeout * 60000);
		// Display button
		document.getElementById("buttonHolder").style.visibility = "visible";
		document.getElementById("buttonHolder").style.pointerEvents = "auto";
		isVideoStarting = false;
		timeVideo(holder);
	}
	// If the video ends
	if (event.data == 0) {
		clearInterval(resultsTimer);
		clearTimeout(videoTimer);
		// Sets videos to play from beginning
		if (holder == "holder1") {
			if (video1Location == "player1") {
				video1Duration = 0;
			}
			else if (video2Location == "player1") {
				video2Duration = 0;
			}
			else {
				video3Duration = 0;
			}
		}
		else if (holder == "holder2") {
			if (video1Location == "player2") {
				video1Duration = 0;
			}
			else if (video2Location == "player2") {
				video2Duration = 0;
			}
			else {
				video3Duration = 0;
			}
		}
		else {
			if (video1Location == "player3") {
				video1Duration = 0;
			}
			else if (video2Location == "player3") {
				video2Duration = 0;
			}
			else {
				video3Duration = 0;
			}
		}
		stopVideos(false);
	}
}
/* Begins timing video */
function timeVideo(holder) {
	// Times how long the video plays for
	if (player1.getPlayerState() == 1 || player1.getPlayerState() == 3) {
		if (video1Location == "player1") {
			resultsTimer = setInterval(addTime, 500, "video1");
			numberSelectedOfVideo1 ++;
		}
		else if (video2Location == "player1") {
			resultsTimer = setInterval(addTime, 500, "video2");
			numberSelectedOfVideo2 ++;
		}
		else {
			resultsTimer = setInterval(addTime, 500, "video3");
			numberSelectedOfVideo3 ++;
		}
	}
	else if (player2.getPlayerState() == 1 || player2.getPlayerState() == 3) {
		if (video1Location == "player2") {
			resultsTimer = setInterval(addTime, 500, "video1");
			numberSelectedOfVideo1 ++;
		}
		else if (video2Location == "player2") {
			resultsTimer = setInterval(addTime, 500, "video2");
			numberSelectedOfVideo2 ++;
		}
		else {
			resultsTimer = setInterval(addTime, 500, "video3");
			numberSelectedOfVideo3 ++;
		}
	}
	else {
		if (video1Location == "player3") {
			resultsTimer = setInterval(addTime, 500, "video1");
			numberSelectedOfVideo1 ++;
		}
		else if (video2Location == "player3") {
			resultsTimer = setInterval(addTime, 500, "video2");
			numberSelectedOfVideo2 ++;
		}
		else {
			resultsTimer = setInterval(addTime, 500, "video3");
			numberSelectedOfVideo3 ++;
		}
	}
	videoTimer = setInterval(checkClicks, 1000, holder);
}
/* Stops the videos from playing */
function stopVideos(getTime) {
	clearInterval(resultsTimer);
	clearInterval(videoTimer);
	// Hide button
	document.getElementById("buttonHolder").style.pointerEvents = "none";
	document.getElementById("buttonHolder").style.visibility = "hidden";
	// Gets the current time of the videos
	if (getTime) {
		if (player1.getPlayerState() == 1 || player1.getPlayerState() == 3) {
			if (video1Location == "player1") {
				video1Duration = player1.getCurrentTime();
			}
			else if (video2Location == "player1") {
				video2Duration = player1.getCurrentTime();
			}
			else {
				video3Duration = player1.getCurrentTime();
			}
		}
		else if (player2.getPlayerState() == 1 || player2.getPlayerState() == 3) {
			if (video1Location == "player2") {
				video1Duration = player2.getCurrentTime();
			}
			else if (video2Location == "player2") {
				video2Duration = player2.getCurrentTime();
			}
			else {
				video3Duration = player2.getCurrentTime();
			}
		}
		else {
			if (video1Location == "player3") {
				video1Duration = player3.getCurrentTime();
			}
			else if (video2Location == "player3") {
				video2Duration = player3.getCurrentTime();
			}
			else {
				video3Duration = player3.getCurrentTime();
			}
		}
	}
	player1.pauseVideo();
	player2.pauseVideo();
	player3.pauseVideo();
	// Resets the video layout
	document.getElementById("holder1").style.opacity = "0";
	document.getElementById("holder2").style.opacity = "0";
	document.getElementById("holder3").style.opacity = "0";
	document.getElementById("holder1").style.width = "33%";
	document.getElementById("holder2").style.width = "33%";
	document.getElementById("holder3").style.width = "33%";
	video1.push(0);
	video2.push(0);
	video3.push(0);
	displayVideos();
}
/* Called when play button is clicked */
function buttonClicked() {
	if (selectedHolder == "holder1") {
		if (video1Location == "player1") {
			video1Clicks ++;
		}
		else if (video2Location == "player1") {
			video2Clicks ++;
		}
		else {
			video3Clicks ++;
		}
	}
	else if (selectedHolder == "holder2") {
		if (video1Location == "player2") {
			video1Clicks ++;
		}
		else if (video2Location == "player2") {
			video2Clicks ++;
		}
		else {
			video3Clicks ++;
		}
	}
	else {
		if (video1Location == "player3") {
			video1Clicks ++;
		}
		else if (video2Location == "player3") {
			video2Clicks ++;
		}
		else {
			video3Clicks ++;
		}
	}
	clickCounter ++;
}
/* Modifies the volume and transparency of the given video as appropriate */
function checkClicks(holder) {
	if (clickCounter < clicksPerSecond) {
		if (holder == "holder1") {
			player1.setVolume(player1.getVolume() - changeInVolume);
		}
		else if (holder == "holder2") {
			player2.setVolume(player2.getVolume() - changeInVolume);
		}
		else {
			player3.setVolume(player3.getVolume() - changeInVolume);
		}
		opacity -= changeInOpacity;
		if (opacity < 0 && (player1.getVolume() == 0 || player2.getVolume() == 0 || player3.getVolume() == 0)) {
			stopVideos(true);
		}
		else {
			document.getElementById(holder).style.opacity = opacity;
		}
	}
	else {
		if (holder == "holder1") {
			player1.setVolume(player1.getVolume() + changeInVolume);
		}
		else if (holder == "holder2") {
			player2.setVolume(player2.getVolume() + changeInVolume);
		}
		else {
			player3.setVolume(player3.getVolume() + changeInVolume);
		}
		opacity += changeInOpacity
		if (opacity > 1) {
			opacity = 1;
		}
		document.getElementById(holder).style.opacity = opacity;
	}
	clickCounter = 0;
}
/* Builds the results page */
function buildResultsPage() {
	document.getElementById("pageHolder").innerHTML =
	`<div class = "page">
		<!-- Navigation bar -->
		<div id = "homepage" class = "actionBar">
			<button class = "headerButtons" onclick = "displayHomepage()"> Homepage </button>
		</div>
		<div id = "settingsPage" class = "actionBar">
			<button class = "headerButtons" onclick = "displaySettingsPage()"> Settings </button>
		</div>
		<div id = "helpPage" class = "actionBar">
			<button class = "headerButtons" onclick = "displayHelpPage()"> Help Page </button>
		</div>
		<div class = "actionBar">
			<button class = "headerButtons" onclick = "displayFeedbackPage()"> Give Feedback </button>
		</div>
	</div>
	<p id = "title" class = "page"> Module 3 Results </p>
	<!-- Results information -->
	<div id = "video1" class = "page"> </div>
	<div id = "results1" class = "page"> </div>
	<div id = "numberClicks1" class = "page"> </div>
	<div id = "totalClicks1" class = "page"> </div>
	<div id = "durationSec1" class = "page"> </div>
	<div id = "durationMin1" class = "page"> </div> <br>
	<div id = "video2" class = "page"> </div>
	<div id = "results2" class = "page"> </div>
	<div id = "numberClicks2" class = "page"> </div>
	<div id = "totalClicks2" class = "page"> </div>
	<div id = "durationSec2" class = "page"> </div>
	<div id = "durationMin2" class = "page"> </div> <br>
	<div id = "video3" class = "page"> </div>
	<div id = "results3" class = "page"> </div>
	<div id = "numberClicks3" class = "page"> </div>
	<div id = "totalClicks3" class = "page"> </div>
	<div id = "durationSec3" class = "page"> </div>
	<div id = "durationMin3" class = "page"> </div> <br>
	<div id = "totalTimeSec" class = "page"> </div>
	<div id = "totalTimeMin" class = "page"> </div>`
	displayResults();
}
/* Displays the results */
function displayResults() {
	var durationSec1 = 0;
	var durationSec2 = 0;
	var durationSec3 = 0;
	document.getElementById("video1").innerHTML = "<label> Video Title: " + video1Name + "</label>";
	document.getElementById("results1").innerHTML = "Play Log: ";
	if (video2Name != "null") {
		document.getElementById("video2").innerHTML = "<label> Video Title: " + video2Name + "</label>";
		document.getElementById("results2").innerHTML = "Play Log: ";
	}
	if (video3Name != "null") {
		document.getElementById("video3").innerHTML = "<label> Video Title: " + video3Name + "</label>";
		document.getElementById("results3").innerHTML = "Play Log: ";
	}
	for (var index = 0; index < video1.length; index ++) {
		if (index == video1.length - 1) {
			document.getElementById("results1").innerHTML += Math.ceil(video1[index]);
			if (video2Name != "null") {
				document.getElementById("results2").innerHTML += Math.ceil(video2[index]);
				if (video3Name != "null") {
					document.getElementById("results3").innerHTML += Math.ceil(video3[index]);
				}
			}
		}
		else {
			document.getElementById("results1").innerHTML += Math.ceil(video1[index]) + ", ";
			if (video2Name != "null") {
				document.getElementById("results2").innerHTML += Math.ceil(video2[index]) + ", ";
				if (video3Name != "null") {
					document.getElementById("results3").innerHTML += Math.ceil(video3[index]) + ", ";
				}
			}
		}
		durationSec1 += parseInt(Math.ceil(video1[index]));
		durationSec2 += parseInt(Math.ceil(video2[index]));
		durationSec3 += parseInt(Math.ceil(video3[index]));
	}
	document.getElementById("numberClicks1").innerHTML = "<label> Number of Times Selected: " + numberSelectedOfVideo1 + "</label>";
	document.getElementById("totalClicks1").innerHTML = "<label> Number of Times Clicked: " + video1Clicks + "</label>";
	document.getElementById("durationSec1").innerHTML = "<label> Total Duration (seconds): " + Math.ceil(durationSec1) + "</label>";
	document.getElementById("durationMin1").innerHTML = "<label> Total Duration (minutes): " + (durationSec1 / 60).toFixed(2) + "</label>";
	if (video2Name != "null") {
		document.getElementById("numberClicks2").innerHTML = "<label> Number of Times Selected: " + numberSelectedOfVideo2 + "</label>";
		document.getElementById("totalClicks2").innerHTML = "<label> Number of Times Clicked: " + video2Clicks + "</label>";
		document.getElementById("durationSec2").innerHTML = "<label> Total Duration (seconds): " + Math.ceil(durationSec2) + "</label>";
		document.getElementById("durationMin2").innerHTML = "<label> Total Duration (minutes): " + (durationSec2 / 60).toFixed(2) + "</label>";
	}
	if (video3Name != "null") {
		document.getElementById("numberClicks3").innerHTML = "<label> Number of Times Selected: " + numberSelectedOfVideo3 + "</label>";
		document.getElementById("totalClicks3").innerHTML = "<label> Number of Times Clicked: " + video3Clicks + "</label>";
		document.getElementById("durationSec3").innerHTML = "<label> Total Duration (seconds): " + Math.ceil(durationSec3) + "</label>";
		document.getElementById("durationMin3").innerHTML = "<label> Total Duration (minutes): " + (durationSec3 / 60).toFixed(2) + "</label>";
	}
	document.getElementById("totalTimeSec").innerHTML = "<label> Total Session Duration (seconds): " + Math.ceil(totalSessionTime) + "</label>";
	document.getElementById("totalTimeMin").innerHTML = "<label> Total Session Duration (minutes): " + (Math.ceil(totalSessionTime) / 60).toFixed(2) + "</label>";
}
