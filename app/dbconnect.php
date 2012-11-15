<?php
function get_PDO_connection() {
	return new PDO('sqlite://'.dirname(__FILE__).'/db/amazebot.sqlite');
}
?>
