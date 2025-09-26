<?php
include "connect.php";

if ($_SERVER['REQUEST_METHOD'] == 'GET' && isset($_GET["keyword"]) && $_GET["keyword"] !== "") {
    $keyword = trim($_GET['keyword']);

    $stmt = $conn->prepare("SELECT * FROM books 
                            WHERE title LIKE ? 
                               OR author LIKE ? 
                               OR year LIKE ? 
                               OR isbn LIKE ?");
    $like = "%" . $keyword . "%";
    $stmt->bind_param("ssss", $like, $like, $like, $like);
    $stmt->execute();
    $result = $stmt->get_result();

    $rows = [];
    while ($row = $result->fetch_assoc()) {
        $rows[] = $row;
    }

    // Return as JSON
    header('Content-Type: application/json');
    echo json_encode($rows);
}
?>