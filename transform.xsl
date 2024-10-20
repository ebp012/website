<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:template match="/">
<html>
	<head>
		<title>eshaan's website</title>
		<link href='style.css' rel='stylesheet' type='text/css' />
	
	</head>
	<body>
	<center>
		<h1>eshaan's website</h1>
		<hr/>
		<p>Choose your language: <a href='javascript:setLanguage("en")'>English</a> &bull; <a href='javascript:setLanguage("gu");'>ગુજરાતી</a></p>
		<hr />
		<p>Hello and welcome to this neat little corner of the web!</p>
		<hr />
		<p>My name is Eshaan, and I am a high school student and amateur front-end software developer.</p>
		<p>I created the programming language <a href='http://aspen.aeonic.me/'>Aspen</a> (<a href='http://dev.aeonic.me/aspen'>GitHub</a>), am working on composing a symphony, and am writing a fantasy novel entitled <i>The River</i>.</p>
		<p>I have also created many conlangs, including <a href='https://www.youtube.com/watch?v=U76DK3woxJE'>su Pama</a> and various others, most for my novel.</p>
		<p>I natively speak English and Gujarati, but am still learning Latin, Hindi, French, and Spanish on my own. (Maybe that's too many at once? <i>Pas pour moi</i>).</p>
		<p>This website is still under construction, so expect more soon.</p>
	 </center>
	 <hr />
	 <footer>
		<center>
			<p>Copyright (c) 2024 Eshaan B. Patel</p>
			<p>This page was last updated on 20/10/24.</p>
			<p>
				<img src='https://www.w3.org/Icons/valid-xml10-blue.png' alt='xml validated' />
				<img src='http://jigsaw.w3.org/css-validator/images/vcss-blue' alt='css validated' />
				<img src='https://hellnet.work/8831/img/buttons/Area51_Cavern_4556_thinkdifferent.gif' alt='made with macintosh' />
				<img src='https://hellnet.work/8831/img/buttons/Area51_Corridor_3621_anybrow.gif' alt='best viewed with any browser' />
			</p>
		</center>
	 </footer>
		<script>
			function setLanguage (code) {
				var filename = "index-" + code + ".xml";
				window.open(filename, "_blank");
			}
		</script>
	 </body>
</html>

</xsl:template>
</xsl:stylesheet>

