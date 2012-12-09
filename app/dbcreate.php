<?php
/*
I Andrew Blackbourn, 000129408 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.
Source code licensed under 2-clause license ("Simplified BSD License" or "FreeBSD License"). See README.md for details.
*/

// used to create the database (must specify the key in the URL as basic security to avoid database drops

require_once('dbconnect.php');
$types = array('CB', 'GR', 'NS', 'RG', 'PR', 'FM');
if (!$_GET['key'] == '8987645aafc5247fd7efc39b357b8955') {
	echo 'Invalid key';
	return;
}
$dbh = get_PDO_connection();
try {
	$sql = <<<SQLSTR
PRAGMA legacy_file_format = TRUE;
PRAGMA foreign_keys=OFF;
DROP TABLE IF EXISTS "maze";
DROP TABLE IF EXISTS "highscore";
CREATE TABLE "highscore" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    "maze_id" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "easy_mode" INTEGER NOT NULL,
    "user_name" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "hs_date" TEXT NOT NULL,
    "history" TEXT NOT NULL
);
COMMIT;
SQLSTR;
    $dbh->beginTransaction();
	var_dump($dbh->exec($sql));
    var_dump($dbh->errorInfo());
    $dbh->commit();
} catch (PDOException $e) {
	echo $e->getMessage();
    var_dump($dbh->errorInfo());
}
?>
