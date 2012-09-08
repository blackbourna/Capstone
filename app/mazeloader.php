<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');

function strip_non_numeric($x) {
    return preg_replace('/\D/', '', $x);
}
// used for parsing out the commas and parentheses
function get_coordinates($x) {
    $x[0] = strip_non_numeric($x[0]);
    $x[1] = strip_non_numeric($x[1]);
    return $x;
}
// append the variables to the object, this function does NOT sum two points!
function add_coordinates(&$maze, $var, $array) {
    $maze->$var->x = $array[0];
    $maze->$var->y = $array[1];
}

class Maze {}

class MazeReader {
	function __construct() {
		$this->readMazeFile();
	}
	function readMazeFile($filename = 'assets/mazes/testmaze1.maze') {
		exec('java -jar ./amazegen/amazegen.jar mazegen -s 1 -m NS', $mazetext);
		for ($i = 1; $i < 45; $i++) {
			$mazetext[$i] = str_split($mazetext[$i]);
		}
		$maze = new Maze();
        
        //start
        $start = explode(',', $mazetext[45]);
        $start = get_coordinates($start);
        add_coordinates($maze, "start", $start);
        $maze->start->dir = preg_replace('/\)/i', '', $start[2]);
        
        //goal
        $goal = explode(',', $mazetext[46]);
        $goal = get_coordinates($goal);
        add_coordinates($maze, "goal", $goal);
        
        //recharger
        $recharger = explode(',', $mazetext[47]);
        $recharger = get_coordinates($recharger);
        add_coordinates($maze, "recharger", $recharger);
        
        //maze
		$maze->maze = array_slice($mazetext, 1, 44);
        
        //return json array
        
		echo json_encode($maze);
	}
}
new MazeReader();
?>
