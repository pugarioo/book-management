<?php
include 'connect.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $title = $_POST['book-title'];
    $author = $_POST['book-author'];
    $year = $_POST['book-year'];
    $category = $_POST['book-category'];

    if (empty($title) || empty($author) || empty($year) || empty($category)) {
        $response = ["status" => "error", "message" => "All fields are required."];
    } elseif (!is_numeric($year)) {
        $response = ["status" => "error", "message" => "Year must be a number."];
    } else {
        $query = "INSERT INTO books (title, author, year, category) VALUES (?,?,?,?)";
        $stmt = $conn->prepare($query);
        $stmt->bind_param("ssis", $title, $author, $year, $category);

        if ($stmt->execute()) {
            $response = ["status" => "success", "message" => "Book added successfully."];
        } else {
            $response = ["status" => "error", "message" => "Failed to add book."];
        }
        $stmt->close();
    }

    header('Content-Type: application/json');
    echo json_encode($response);
}
?>