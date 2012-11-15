<?php
require_once('dbconnect.php');
$types = array('CB', 'GR', 'NS', 'RG', 'PR', 'FM');
try {
	if (!$_GET['key'] == '8987645aafc5247fd7efc39b357b8955') {
		echo 'Invalid key';
		return;
	}
	$dbh = get_PDO_connection();
	$sql = <<<SQLSTR
PRAGMA legacy_file_format = TRUE;
PRAGMA foreign_keys=OFF;
DROP TABLE IF EXISTS "maze";
DROP TABLE IF EXISTS "highscore";
CREATE TABLE "highscore" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    "maze_id" INTEGER NOT NULL,
    "easy_mode" INTEGER NOT NULL,
    "user_name" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "hs_date" TEXT NOT NULL,
    "history" TEXT NOT NULL,
    FOREIGN KEY(maze_id) REFERENCES maze(id)
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
