<?php
$server = "db";
$username = "root";
$password = "rootpassword";
$database = "books_db";

$conn = new mysqli($server, $username, $password, $database);
if ($conn->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
}
?>