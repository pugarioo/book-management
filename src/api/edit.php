<?php
include 'connect.php';


if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $id       = $_POST['id'];
    $title    = $_POST['title'];
    $author   = $_POST['author'];
    $year     = $_POST['year'];
    $category = $_POST['category'];
    $status   = $_POST['status'];


    if (empty($id) || empty($title) || empty($author) || empty($year) || empty($category) || empty($status)) {
        $response = [ "status" => "error", "message" => "All fields are required." ];
    } elseif (!is_numeric($year)) {
        $response = [ "status" => "error", "message" => "Year must be a number." ];
    } else {
        $query = "UPDATE books SET title = ?, author = ?, year = ?, category = ?, status = ? WHERE id = ?";
        $stmt = $conn->prepare($query);
        $stmt->bind_param("ssissi", $title, $author, $year, $category, $status, $id);


        if ($stmt->execute()) {
            $response = [ "status" => "success", "message" => "Book updated successfully." ];
        } else {
            $response = [ "status" => "error", "message" => "Failed to update book." ];
        }
        $stmt->close();
    }


    header('Content-Type: application/json');
    echo json_encode($response);
}
?>

