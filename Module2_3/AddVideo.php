<?php
/* Created By: Alex Cadigan (https://github.com/AlexCadigan) */
if (trim($_POST['name']) !== "" && trim($_POST['id']) !== "") {
	// Reads in the existing videos
	$fileSize = filesize("../Videos.txt");
	
	if ($fileSize > 0) {
		$readVideos = fopen("../Videos.txt", "r");
		$videos = explode("\n", fread($readVideos, $fileSize));
		fclose($readVideos);
		// Looks for any blank lines and removes them
		$arrayLength = count($videos);
		for ($index = 0; $index < $arrayLength; $index ++) {
			if (trim($videos[$index]) == "") {
				unset($videos[$index]);
			}
		}
		$videos = array_values($videos);
		// Writes the videos to the list of videos
		$writeVideos = fopen("../Videos.txt", "w");
		for ($index = 0; $index < count($videos); $index ++) {
			fwrite($writeVideos, trim($videos[$index]) . "\n");
		}
	}
	else {
		$writeVideos = fopen("../Videos.txt", "w");
	}

	fwrite($writeVideos, trim($_POST['name']) . "\n" . trim($_POST['id']));
	fclose($writeVideos);
}
header('Location: Module2_3.html'); ?>
