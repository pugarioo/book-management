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

            if ($currentStatus === "available") {
                $updateQuery = "UPDATE books SET status = 'borrowed' WHERE book_id = ?";
                $stmt = $conn->prepare($updateQuery);
                $stmt->bind_param("i", $id);
                if ($stmt->execute()) {

                    $titleQuery = $conn->query("SELECT title FROM books WHERE book_id = " . $id);

                    $row = $titleQuery->fetch_assoc();

                    $title = $row['title'];

                    $transQuery = "INSERT into transactions (book_id, book_title) VALUES (?, ?)";
                    $transstmt = $conn->prepare($transQuery);
                    $transstmt->bind_param("is", $id, $title);

                    if ($transstmt->execute()) {
                        $response = ["status" => "success", "message" => "Book borrowed successfully.", "transaction_created" => true];
                    } else {
                        $response = ["status" => "success", "message" => "Book borrowed successfully.", "transaction_created" => false];
                    }



                } else {
                    $response = ["status" => "error", "message" => "Failed to borrow book."];
                }
                $stmt->close();
            } else {
                $response = ["status" => "error", "message" => "Book is already borrowed."];
            }
        }
        $checkStmt->close();
    }

    header('Content-Type: application/json');
    echo json_encode($response);
}
?>