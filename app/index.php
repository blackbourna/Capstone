<?php 
/*
I Andrew Blackbourn, 000129408 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.
Source code licensed under 2-clause license ("Simplified BSD License" or "FreeBSD License"). See README.md for details.
*/

// used for debugging, will use the compiled version if the $_REQUEST['c'] variable is defined in the request

if (strlen($_REQUEST['c'])):
  include('compiled.php'); 
else:
  include('CapstoneProject_BlackbournA.php'); 
endif; ?>
