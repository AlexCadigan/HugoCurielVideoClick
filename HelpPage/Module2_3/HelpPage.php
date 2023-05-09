<!-- Created By: Alex Cadigan (https://github.com/AlexCadigan) -->
<!doctype html>
<html>
	<head>
		<title> Module 2.3 Help Page </title>
		<link rel = "icon" href = "../../Icon.png">
		<link rel = "stylesheet" href = "HelpPage.css">
	</head>
	<body>
		<div class = "page">
			<!-- Takes the user back to homepage -->
			<div id = "homepage" class = "actionBar">
				<button class = "headerButtons" onclick = "displayHomepage()"> Homepage </button>
			</div>
			<!-- Takes the user back to main help page -->
			<div id = "homepage" class = "actionBar">
				<button class = "headerButtons" onclick = "displayHelpPage()"> Main Help Page </button>
			</div>
			<div id = 'homepage' class = 'actionBar'>
				<button class = 'headerButtons' onclick = 'displayModule2_3()'> Module 2.3 </button>
			</div>
			<!-- Takes user to feedback page -->
			<div class = "actionBar">
				<button class = "headerButtons" onclick = "displayFeedbackPage()"> Give Feedback </button>
			</div>
		</div>
		<p id = "title" class = "page"> Module 2.3 Help Page </p>
		<p id = "description" class = "page"> In Module 2.3, users must press and hold buttons in order to play YouTube videos. </p>
		<p class = "page"> <b> Settings: </b> </p>
		<p id = "description" class = "page">
			<b> Select Videos: </b> Select 1 to 3 videos from the list provided.  These videos will be displayed when the module runs. <br> <br>
			<b> Remove Selected Video(s): </b> Removes all selected videos from the list. <br> <br> 
			<b> Name of Video: </b> Name of the video you want to add.  This name will be displayed in the list of videos. <br> <br>
			<b> Unique ID of Video: </b> The unique ID of the YouTube video.  The ID should be 11 characters long. <br> <br>
			<b> Add Video: </b> Adds the entered video to the list of videos. <br> <br>
			<b> Idle Timeout (minutes): </b> If no responses are made within this time period, the program will time out and end. <br> <br>
			<b> Total Runtime (minutes): </b> The module will end after this time period. <br> <br>
			<b> Video Play Time (seconds): </b> The maximum length that a video will play for. <br> <br>
			<b> Start Module: </b> Begins the module using the above settings.
		</p>
		<p class = "page"> <b> Results: </b> </p>
		<p id = "description" class = "page">
			<b> Video Title: </b> The name of the video. <br> <br>
			<b> Play Log: </b> A log of when the video was played and how many seconds it played for each time. <br> <br>
			<b> Number of Times Selected: </b> The number of times this video was selected. <br> <br>
			<b> Total Duration (seconds): </b> The total time the video was played. <br> <br>
			<b> Total Duration (minutes): </b> The total time the video was played. <br> <br>
			<b> Total Session Duration (seconds): </b> The total length of the session. <br> <br>
			<b> Total Session Duration (minutes): </b> The total length of the session. <br> <br>
		</p>
	</body>
	<script src = "HelpPage.js"> </script>
</html>
