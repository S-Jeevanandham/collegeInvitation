<?php
header('Content-Type: application/json');
header('Cache-Control: no-store');
$file = __DIR__ . '/views.txt';
$fp = fopen($file, 'c+');
flock($fp, LOCK_EX);
$count = (int) trim(stream_get_contents($fp));
if (isset($_GET['hit'])) {
  $count++;
  ftruncate($fp, 0); rewind($fp); fwrite($fp, (string)$count);
}
fflush($fp); flock($fp, LOCK_UN); fclose($fp);
echo json_encode(['views' => $count]);