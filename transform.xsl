<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:template match="/page">
<html>
	<head>
		<title><xsl:value-of select='header/title' /></title>
		<link href='style.css' rel='stylesheet' type='text/css' />
	
	</head>
	<body>
	<center>
		<h1><xsl:value-of select='header/title' /></h1>
		<hr/>
		<p> <xsl:value-of select='header/chooselang' /><a href='javascript:setLanguage("en")'>English</a> • <a href='javascript:setLanguage("gu");'>ગુજરાતી</a> • <a href='javascript:setLanguage("la");'>Latina</a></p>
		<hr />
		<p><xsl:value-of select='body/welcome' /></p>
		<hr />
		<p><xsl:value-of select='body/pi1' /><xsl:value-of select='personal-info/occupation' /><xsl:value-of select='body/pi2' /><xsl:value-of select='personal-info/aspiration' /><xsl:value-of select='body/pi3' /></p>
		<xsl:for-each select='body/p'>
			<p><xsl:value-of select='c' /></p>
		</xsl:for-each>
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
				window.open(filename, "_self");
			}
		</script>
	 </body>
</html>

</xsl:template>
</xsl:stylesheet>

