<?php
/* Created By: Alex Cadigan (https://github.com/AlexCadigan) */
$numberChecked = count($_POST['check_list']);
foreach ($_POST['check_list'] as $videoToRemove) {
	// Gets the current videos from the file
	$readVideos = fopen("../Videos.txt", "r");
	$videos = explode("\n", fread($readVideos, filesize("../Videos.txt")));
	fclose($readVideos);
	// Looks for any blank lines and removes them
	$arrayLength = count($videos);
	for ($index = 0; $index < $arrayLength; $index ++) {
		if (trim($videos[$index]) == "") {
			unset($videos[$index]);
		}
	}
	$videos = array_values($videos);
	// Removes current video from list
	$arrayLength = count($videos);
	for ($index = 0; $index < $arrayLength; $index += 2) {
		if (strcmp(trim($videos[$index]), trim($videoToRemove)) == 0) {
			unset($videos[$index]);
			unset($videos[$index + 1]);
		}
	}
	$videos = array_values($videos);
	// Writes the remaining videos back to list of videos
	$writeVideos = fopen("../Videos.txt", "w");
	for ($index = 0; $index < count($videos); $index ++) {
		if ($index == count($videos) - 1) {
			fwrite($writeVideos, trim($videos[$index]));
		}
		else {
			fwrite($writeVideos, trim($videos[$index]) . "\n");
		}
	}
	fclose($writeVideos);
}
header('Location: Module3.php'); ?>
