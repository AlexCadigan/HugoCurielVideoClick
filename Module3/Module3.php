<!-- Created By: Alex Cadigan (https://github.com/AlexCadigan) -->
<head>
	<title> Module 3 </title>
	<link rel = "icon" href = "../Icon.png">
	<link rel = "stylesheet" href = "Module3.css">
	<meta name = "viewport" content = "user-scalable = 0">
</head>
<body>
	<br> <div id = "pageHolder">
		<!-- Navigation buttons -->
		<div class = "page">
			<div id = "homepage" class = "actionBar">
				<button class = "headerButtons" onclick = "displayHomepage()"> Homepage </button>
			</div>
			<div id = "helpPage" class = "actionBar">
				<button class = "headerButtons" onclick = "displayHelpPage()"> Help Page </button>
			</div>
			<div class = "actionBar">
				<button class = "headerButtons" onclick = "displayFeedbackPage()"> Give Feedback </button>
			</div>
		</div>
		<p id = "title" class = "page"> Module 3 Settings </p>
		<!-- Available videos -->
		<div id = "videos" class = "page">
			<form action = "RemoveVideo.php" method = "post">
				<label> Select at most 3 videos: </label> <br>
				<?php
				$videos = explode("\n", file_get_contents("../Videos.txt"));
				$numLines = count($videos);
				if ($numLines >= 2) {
					for ($index = 0; $index < $numLines; $index += 2) {
						echo "<input type = 'checkbox' name = 'check_list[]' value = '" . $videos[$index] . "'> <label> <a href = 'https://www.youtube.com/watch?v=" . $videos[$index + 1] . "'> " . $videos[$index] . " </a> </label> <br>";
					}
				} ?> 
				<br>
				<input class = "pageButtons" type = "submit" value = "Remove Selected Video(s)">
			</form>
		</div>
		<div class = "page">
			<form action = "AddVideo.php" method = "post">
				Name of video: <input type = "text" name = "name"> <br> <br>
				Unique ID of video: <input type = "text" name = "id"> <br> <br>
				<input class = "pageButtons" type = "submit" value = "Add Video">
			</form>
		</div>
		<!-- Other settings -->
		<div class = "page">
			<label> Idle Timeout (minutes): </label> <input id = "timeout" type = "number"> <br> <br>
			<label> Total Runtime (minutes): </label> <input id = "sessionTime" type = "number"> <br> <br>
			<label> Clicks Per Second Needed: </label> <input id = "clicks" type = "number"> <br> <br>
			<label> Change in Volume (percent): </label> <input id = "volume" type = "number"> <br> <br>
			<label> Change in Transparency (percent): </label> <input id = "opacity" type = "number"> <br> <br>
			<button class = "pageButtons" onclick = "startModule()"> Start Module </button>
		</div>
	</div> <br> <br>
</body>
<script src = "Module3.js"> </script>
