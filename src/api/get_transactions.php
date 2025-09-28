<?php
include 'connect.php';

// Use JOIN so book title comes from books table
$sql = "SELECT t.transaction_id, 
               t.book_id, 
               b.title AS book_title, 
               t.date_borrowed, 
               t.date_returned, 
               t.status
        FROM transactions t
        JOIN books b ON t.book_id = b.book_id";

$result = $conn->query($sql);

$transactions = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $transactions[] = $row;
    }
}

header('Content-Type: application/json');
echo json_encode($transactions, JSON_PRETTY_PRINT);
?>
