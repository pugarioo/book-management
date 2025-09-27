<?php
include 'connect.php';


if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $id = $_POST['book-id'];
    $title = $_POST['book-title'];
    $author = $_POST['book-author'];
    $year = $_POST['book-year'];
    $category = $_POST['book-category'];


    if (empty($id) || empty($title) || empty($author) || empty($year) || empty($category)) {
        $response = ["status" => "error", "message" => "All fields are required."];
    } elseif (!is_numeric($year)) {
        $response = ["status" => "error", "message" => "Year must be a number."];
    } else {
        $query = "UPDATE books SET title = ?, author = ?, year = ?, category = ? WHERE book_id = ?";
        $stmt = $conn->prepare($query);
        $stmt->bind_param("ssisi", $title, $author, $year, $category, $id);


        if ($stmt->execute()) {
            $response = ["status" => "success", "message" => "Book updated successfully."];
        } else {
            $response = ["status" => "error", "message" => "Failed to update book."];
        }
        $stmt->close();
    }


    header('Content-Type: application/json');
    echo json_encode($response);
}
?>