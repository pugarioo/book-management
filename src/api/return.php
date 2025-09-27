<?php
include 'connect.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $id = $_POST['id'];

    if (empty($id)) {
        $response = ["status" => "error", "message" => "ID is required."];
    } else {
        // Check current status
        $checkQuery = "SELECT status FROM books WHERE book_id = ?";
        $checkStmt = $conn->prepare($checkQuery);
        $checkStmt->bind_param("i", $id);
        $checkStmt->execute();
        $result = $checkStmt->get_result();

        if ($result->num_rows === 0) {
            $response = ["status" => "error", "message" => "Book not found."];
        } else {
            $row = $result->fetch_assoc();
            $currentStatus = $row['status'];

            if ($currentStatus === "borrowed") {
                $updateQuery = "UPDATE books SET status = 'available' WHERE book_id = ?";
                $stmt = $conn->prepare($updateQuery);
                $stmt->bind_param("i", $id);
                if ($stmt->execute()) {

                    $transQuery = $conn->query("SELECT transaction_id FROM transactions WHERE book_id = " . $id . " AND date_returned IS NULL");
                    $row = $transQuery->fetch_assoc();
                    $transID = $row['transaction_id'];

                    $updateQuery = "UPDATE transactions SET date_returned = NOW(), status = 'completed' where transaction_id = ?";
                    $updatestmt = $conn->prepare($updateQuery);
                    $updatestmt->bind_param("i", $transID);

                    if ($updatestmt->execute()) {
                        $response = ["status" => "success", "message" => "Book returned successfully.", "transaction_closed" => true];
                    } else {
                        $response = ["status" => "success", "message" => "Book returned successfully.", "transaction_closed" => false];
                    }
                } else {
                    $response = ["status" => "error", "message" => "Failed to return book."];
                }
                $stmt->close();
            } else {
                $response = ["status" => "error", "message" => "Book is not borrowed."];
            }
        }
        $checkStmt->close();
    }

    header('Content-Type: application/json');
    echo json_encode($response);
}
?>