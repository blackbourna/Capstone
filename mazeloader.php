<?
error_reporting(E_ALL);
ini_set('display_errors', '1');

class Maze {}

class MazeReader {
	function __construct() {
		$this->readMazeFile();
	}
	function readMazeFile($filename = 'assets/mazes/testmaze1.maze') {
		$filecontents = file_get_contents($filename);
		$mazetext = explode("\n", $filecontents);
		for ($i = 1; $i < 45; $i++) {
			$mazetext[$i] = str_split($mazetext[$i]);
		}
		$maze = new Maze();
		$maze->start = $mazetext[45];
		$maze->goal = $mazetext[46];
		$maze->recharger = $mazetext[47];
		$maze->maze = array_slice($mazetext, 1, 44);
		echo json_encode($maze);
	}
}
new MazeReader();
?>