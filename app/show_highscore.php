<?php
/*
I Andrew Blackbourn, 000129408 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.
Source code licensed under 2-clause license ("Simplified BSD License" or "FreeBSD License"). See README.md for details.
*/
// Used to output JSON containing the most recent 100 successful maze runs
require_once('dbconnect.php');
try {
    $dbh = get_PDO_connection();
    $sql = "select * from highscore order by maze_id DESC, score desc, type LIMIT 100";
    $result = $dbh->query($sql);
    $highscores = array();
    foreach ($result as $r) {
        $highscores[] = array(
            'date' => date('l F jS Y', $r['maze_id']),
            'easy_mode' => $r['easy_mode'],
            'type' => $r['type'],
            'user_name' => $r['user_name'],
            'score' => $r['score']
        );
    }
    $groupedHighscores = array();
    foreach ($highscores as $key => $value) {
        $groupedHighscores[$value['date']][$value['type']][] = $value;
    }
    die(json_encode($groupedHighscores));
} catch (PDOException $e) {
    echo $e->getMessage();
}
?>
