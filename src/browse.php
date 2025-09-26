<?php
include 'connect.php'; 

$sql = "SELECT book_id, title, author, year, category, status FROM books";
$result = $conn->query($sql);

$books = [];

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $books[] = $row;
    }
}

header('Content-Type: application/json');
echo json_encode($books, JSON_PRETTY_PRINT);
?>
