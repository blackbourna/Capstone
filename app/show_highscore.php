<?php
try {
    $dbh = new PDO('sqlite://'.dirname(__FILE__).'/db/amazebot.sqlite');
    $sql = "select * from highscore";
    $result = $dbh->query($sql);
    foreach ($result as $r) {
        var_dump($r);
    }
} catch (PDOException $e) {
    echo $e->getMessage();
}
?>
