<?php
// use a request variable as a basica api key
try {
  $dbh = new PDO('sqlite://'.dirname(__FILE__).'/db/amazebot.sqlite');
} catch (PDOException $e) {
  echo $e->getMessage();
}
?>
