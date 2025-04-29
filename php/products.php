<?php
require 'db.php';

header('Content-Type: application/json');

$featured = isset($_GET['featured']) ? true : false;
$category = isset($_GET['category']) ? $_GET['category'] : null;

if ($featured) {
    // For simplicity, return first 8 products as featured
    $sql = "SELECT * FROM products LIMIT 8";
} elseif ($category) {
    $allowed_categories = ['laptop', 'phone', 'accessory', 'component'];
    if (!in_array($category, $allowed_categories)) {
        echo json_encode([]);
        exit;
    }
    $stmt = $conn->prepare("SELECT * FROM products WHERE category = ?");
    $stmt->bind_param("s", $category);
    $stmt->execute();
    $result = $stmt->get_result();
    $products = $result->fetch_all(MYSQLI_ASSOC);
    echo json_encode($products);
    $stmt->close();
    exit;
} else {
    $sql = "SELECT * FROM products";
}

$result = $conn->query($sql);
$products = [];
if ($result) {
    while ($row = $result->fetch_assoc()) {
        $products[] = $row;
    }
}
echo json_encode($products);
?>
