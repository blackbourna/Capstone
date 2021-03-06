<?php
/*
I Andrew Blackbourn, 000129408 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.
Source code licensed under 2-clause license ("Simplified BSD License" or "FreeBSD License"). See README.md for details.
*/

// Used to insert a new highscore into the highscore table via ajax

date_default_timezone_set('America/New_York');
error_reporting(E_ALL);
ini_set('display_errors', '1');
require_once('dbconnect.php');
try {
    $hs_date = date('r');
    if ($_REQUEST['easyMode'] == true) {
        $_REQUEST['easyMode'] = "1";
    } else {
        $_REQUEST['easyMode'] = "0";
    }
    //var_dump($_REQUEST);
    $dbh = get_PDO_connection();
    $sql = "INSERT INTO highscore (`maze_id`, `type`, `easy_mode`, `user_name`, `score`, `hs_date`, `history`) VALUES(
        $_REQUEST[mazeSeed],
        '$_REQUEST[mazeType]',
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
    die(json_encode($errorinfo[0] == '00000' ? 'true' : 'false')); // error code 0 = successful transaction
} catch (PDOException $e) {
    echo "PDO Exception: ";
    echo $e->getMessage();
    var_dump($e);
    die(json_encode('false'));
} catch (Exception $e) {
    echo "General Exception: ";
    echo $e->getMessage();
    var_dump($e);
    die(json_decode('false'));
}
?>
