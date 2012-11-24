<?php
require_once('dbconnect.php');
try {
    $hs_date = date('r');
    if ($_REQUEST[easyMode] !== "true") {
        $_REQUEST[easyMode] = 1;
    } else {
        $_REQUEST[easyMode] = 0;
    }
    //var_dump($_REQUEST);
    $dbh = get_PDO_connection();
    $sql = "INSERT INTO highscore (`maze_id`, `easy_mode`, `user_name`, `score`, `hs_date`, `history`) VALUES(
        $_REQUEST[mazeSeed],
        $_REQUEST[easyMode],
        '$_REQUEST[name]',
        $_REQUEST[energy],
        '$hs_date',
        '$_REQUEST[history]'
    );
    COMMIT;";

    $stmt = $dbh->prepare($sql);
    $stmt->execute();
    $errorinfo = $dbh->errorInfo();
    die(json_encode($errorinfo[0] == '00000' ? "true" : "false")); // error code 0 = successful transaction
} catch (PDOException $e) {
    //echo "PDO Exception: ";
    //echo $e->getMessage();
    //var_dump($e);
    die(json_encode('false'));
} catch (Exception $e) {
    //echo "General Exception: ";
    //echo $e->getMessage();
    //var_dump($e);
    die(json_decode('false'));
}
?>
