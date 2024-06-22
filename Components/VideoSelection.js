/* Created By: Alex Cadigan (https://github.com/AlexCadigan) */
/**
 * Generates HTML content for the list of videos to select.
 */
function buildVideos() {
	// Handle cases where localStorage hasn't been initialized yet
	var videoNames = JSON.parse(localStorage.videoNames || null) ?? [];
	var videoIDs = JSON.parse(localStorage.videoIDs || null) ?? [];

	// Create HTML content for each video
	for (var i = 0; i < videoNames.length; i ++) {
		document.getElementById("videoCheckboxes").innerHTML += `
		<input id="` + i + `" type = "checkbox" name = "videoCheckbox" value = "` + videoNames[i] + `"> 
		<label> 
			<a href = "https://www.youtube.com/watch?v=` + videoIDs[i] + `">
			` + videoNames[i] + `
			</a>
		</label> 
		<br />`;
	}
}

/**
 * Removes selected YouTube videos from the module.
 */
function removeVideos() {
	var checkboxes = document.getElementsByName("videoCheckbox");
	var indicesToRemove = [];

	// Handle cases where localStorage hasn't been initialized yet
	var videoNames = JSON.parse(localStorage.videoNames || null) ?? [];
	var videoIDs = JSON.parse(localStorage.videoIDs || null) ?? [];

	// Find indices that should be removed
	for (var i = 0; i < checkboxes.length; i ++) {
		if (checkboxes[i].checked) {
			indicesToRemove.push(i);
		}
	}

	// Remove selected videos
	for (var i = indicesToRemove.length - 1; i >= 0; i --) {
		videoNames.splice(indicesToRemove[i], 1);
		videoIDs.splice(indicesToRemove[i], 1);
	}

	localStorage.videoNames = JSON.stringify(videoNames);
	localStorage.videoIDs = JSON.stringify(videoIDs);
	displaySettingsPage();
}

/**
 * Stores a new YouTube video for use in the module.
 */
function addVideo() {
	var videoName = document.getElementById("name").value;
	var videoID = document.getElementById("id").value;

	// Validate user actually entered data
	if (videoName == "" || videoID == "") {
		return;
	}

	// Handle cases where localStorage hasn't been initialized yet
	var videoNames = JSON.parse(localStorage.videoNames || null) ?? [];
	var videoIDs = JSON.parse(localStorage.videoIDs || null) ?? [];

	videoNames.push(videoName);
	videoIDs.push(videoID);
	localStorage.videoNames = JSON.stringify(videoNames);
	localStorage.videoIDs = JSON.stringify(videoIDs);
	displaySettingsPage();
}
