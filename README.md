TODO:<br/>
=

Recharger pickup
Goal collision
HUD

-Move logs in JSON array to be put in database<br/>
-SOUND<br/>
-ZOOM IN/OUT<br/>
-HIGH SCORES<br/>
-DATABASE<br/>
-USE ARAVINS JARFILE<br/>
<br />
SCHEMA:<br/>
ID (integer, primary key) – MBUN<br/>

MazeId(Integer, foreign key)<br/>

Name(varchar) - The name entered by the user who has achieved a high score.<br/>

Score(integer) – The highscore achieved.<br/>

HighScoreDate(date/time)- Timestamp<br/>

MazeRun(varchar)- A JSON array of all bot actions that were logged during the round.<br/>



