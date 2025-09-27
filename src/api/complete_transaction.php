<?php
include "connect.php";

header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $id = $_POST["id"];
    $book_id = $_POST['book_id'];

    $query = "UPDATE transactions SET date_returned = NOW(), status = 'completed' WHERE transaction_id = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("i", $id);

    if ($stmt->execute()) {

        $statusQuery = "UPDATE books SET status = 'available' WHERE book_id = ?";
        $statusstmt = $conn->prepare($statusQuery);
        $statusstmt->bind_param("i", $book_id);

        if ($statusstmt->execute()) {
            $response = ["status" => "success", "message" => "Transaction completed"];
        } else {
            $response = ["status" => "warning", "message" => "Transaction partially completed: book status failed to change"];
        }

    } else {
        $response = ["status" => "error", "message" => "Transaction completion failed"];
    }
    echo json_encode($response);
}
?>