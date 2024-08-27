<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:template match="/page">
<html> 
<body>
  <div id='header'>
	<div id='links'>
		<xsl:for-each select='header/link'>
			<a href='https://google.com'><xsl:value-of select='text'/></a>
		</xsl:for-each>
	</div>
  </div>
</body>
</html>
</xsl:template>
</xsl:stylesheet>

