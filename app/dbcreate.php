<?php
$types = array('CB', 'GR', 'NS', 'RG', 'PR', 'FM');
try {
	//if (!$_GET['key'] == 'abcdef') {
	//	echo 'Invalid key';
	//	return;
	//}
	$dbh = new PDO('sqlite://'.dirname(__FILE__).'/db/amazebot.sqlite');
	$sql = <<<SQLSTR
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
	$dbh->exec($sql);
	$sql = "select date('now', 'start of month', '+1 month', '-1 days')";
	$result = $dbh->query($sql)->fetch(PDO::FETCH_NUM);
	
	$year = substr($result[0], 0, 4);
	$month = substr($result[0], 5, 2);
	$end_date = substr($result[0], 8);
	
	//for ($d = 1; $d <= $end_date; $d++) {
	//	$seed = rand(0, 999999999);
	//	$type = $types[rand(0, count($types) - 1)];
	//	$sql = "INSERT INTO 'maze' values (null, )";
	//}
	//for ($x = 1; $x < )
} catch (PDOException $e) {
	echo $e->getMessage();
}
?>
