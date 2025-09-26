<?php
include 'connect.php';


if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $id = $_POST['id'];


    if (empty($id)) {
        $response = [ "status" => "error", "message" => "ID is required." ];
    } else {
        $query = "DELETE FROM books WHERE id = ?";
        $stmt = $conn->prepare($query);
        $stmt->bind_param("i", $id);


        if ($stmt->execute()) {
            if ($stmt->affected_rows > 0) {
                $response = [ "status" => "success", "message" => "Book deleted successfully." ];
            } else {
                $response = [ "status" => "error", "message" => "Book not found." ];
            }
        } else {
            $response = [ "status" => "error", "message" => "Failed to delete book." ];
        }
        $stmt->close();
    }


    header('Content-Type: application/json');
    echo json_encode($response);
}
?>



