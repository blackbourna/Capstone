<?php
/*
I Andrew Blackbourn, 000129408 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.
Source code licensed under 2-clause license ("Simplified BSD License" or "FreeBSD License"). See README.md for details.
*/

// Used to return a JSON object representing a maze using Aravin's Jarfile

date_default_timezone_set('America/New_York');
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
    @$maze->$var->x = $array[0];
    @$maze->$var->y = $array[1];
}

class Maze {}

class MazeReader {
	function __construct() {
		$types = array('CB', 'GR', 'NS', 'RG', 'PR', 'FM');
		$type = 'CB';
		if (isset($_GET['type'])) {
			$type = $_GET['type'];
		}
		$this->readMazeFile($type);
	}

	function readMazeFile($type) {
		$seed = strtotime(date('Y-m-d'));
		exec('java -jar ./amazegen/amazegen.jar mazegen -s '. $seed .' -m ' . $type, $mazetext);
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
        
        //seed
        $maze->seed = $seed;
        $maze->type = $type;
        //return json array
        
		echo json_encode($maze);
	}
}
new MazeReader();
?>
