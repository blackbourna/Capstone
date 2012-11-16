<?php
try {
    $hs_date = date('r');
    if ($_REQUEST[easyMode] !== "true") {
        $_REQUEST[easyMode] = 1;
    } else {
        $_REQUEST[easyMode] = 0;
    }
    var_dump($_REQUEST);
    $dbh = new PDO('sqlite://'.dirname(__FILE__).'/db/amazebot.sqlite');
    $sql = "INSERT INTO highscore (`maze_id`, `easy_mode`, `user_name`, `score`, `hs_date`, `history`) VALUES(
        $_REQUEST[mazeSeed],
        $_REQUEST[easyMode],
        '$_REQUEST[name]',
        $_REQUEST[energy],
        '$hs_date',
        '$_REQUEST[history]'
    );
    COMMIT;";

    $dbh->prepare($sql);
    var_dump($dbh->errorInfo());
} catch (PDOException $e) {
    echo $e->getMessage();
}
?>
