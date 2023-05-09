<!-- Created By: Alex Cadigan (https://github.com/AlexCadigan) -->
<html>
	<head>
		<title> Video Click Project </title>
		<link rel = "icon" href = "Icon.png">
		<link rel = "stylesheet" href = "index.css">
	</head>
	<body>
		<!-- Navigation buttons -->
		<div class = "page">
			<div id = "helpPage" class = "actionBar">
				<button class = "headerButtons" onclick = "displayHelpPage()"> Help Page </button>
			</div>
			<div class = "actionBar">
				<button class = "headerButtons" onclick = "displayFeedbackPage()"> Give Feedback </button>
			</div>
		</div>
		<!-- Title -->
		<p id = "title" class = "page"> Video Click Project </p>
		<!-- Module buttons -->
		<div class = "page">
			<button class = "moduleButtons" onclick = "displayModule1()"> Module 1 </button>
			<br> <br>
			<button class = "moduleButtons" onclick = "displayModule2()"> Module 2 </button>
			<br> <br>
			<button class = "moduleButtons" onclick = "displayModule2_1()"> Module 2.1 </button>
			<br> <br>
			<button class = "moduleButtons" onclick = "displayModule2_2()"> Module 2.2 </button>
			<br> <br>
			<button class = "moduleButtons" onclick = "displayModule2_3()"> Module 2.3 </button> <br> <br>
			<button class = "moduleButtons" onclick = "displayModule3()"> Module 3 </button>
		</div>
	</body>
	<script src = "index.js"> </script>
</html>
