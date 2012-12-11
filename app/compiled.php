<!DOCTYPE HTML>

<html>
<head>
	<title>AmazeBot Online</title>
	<script type="text/javascript" src="compiled.js"></script>
	<!-- Jquery is needed for noty lib -->
	<script type="text/javascript" src="js/jquery/jquery-1.8.2.min.js"></script>
	<script type="text/javascript" src="js/noty/js/noty/jquery.noty.js"></script>
	<script type="text/javascript" src="js/noty/js/noty/layouts/inline.js"></script>
	<script type="text/javascript" src="js/noty/js/noty/layouts/center.js"></script>
	<script type="text/javascript" src="js/noty/js/noty/themes/default.js"></script>
	<script type="text/javascript">
		$(function() {
			$.noty.consumeAlert({layout: 'center', type: 'success', dismissQueue: true});
		});
	</script>
	<meta property="og:type" content="website"/>
	<meta property="og:url" content="http://capstone-blackbourna.dotcloud.com/?c=c"/>
	<meta property="og:image" content="http://capstone-blackbourna.dotcloud.com/assets/sprites/bot.png"/>
	<meta property="og:site_name" content="AmazeBot Online"/>
	<meta property="og:title" content="AmazeBot Online"/>
	<meta property="og:description" content="Fun for the whole family! Run through a maze using a complex control scheme and impress all of your friends!!!"/>
	<link rel="image_src" href="http://capstone-blackbourna.dotcloud.com/assets/sprites/splash.png"/>
	
    <link rel="shortcut icon" href="assets/sprites/favicon.ico" />
	<style>
		body {background-color: #000;}
	</style>
</head>

<body onload="CapstoneProject_BlackbournA.start()"></body>

</html>
