<?php
require_once('dbconnect.php');
try {
    $dbh = get_PDO_connection();
    $sql = "select * from highscore";
    $result = $dbh->query($sql);
    foreach ($result as $r) {
        var_dump($r);
    }
} catch (PDOException $e) {
    echo $e->getMessage();
}
?>
