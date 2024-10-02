<?php
header('Content-Type: application/json');

// Recebe os dados do request JSON
$input = json_decode(file_get_contents('php://input'), true);

if (isset($input['name']) && isset($input['age']) && isset($input['temperature']) && isset($input['symptoms']) && isset($input['medicalHistory'])) {
    // Conectar ao banco de dados (ajuste conforme necessário)
    $pdo = new PDO('mysql:host=localhost;dbname=clinic', 'username', 'password');
    
    // Preparar a inserção dos dados
    $stmt = $pdo->prepare('INSERT INTO pretriage (name, age, temperature, symptoms, medical_history) VALUES (:name, :age, :temperature, :symptoms, :medicalHistory)');
    
    // Executar com os dados enviados
    $stmt->execute([
        ':name' => $input['name'],
        ':age' => $input['age'],
        ':temperature' => $input['temperature'],
        ':symptoms' => $input['symptoms'],
        ':medicalHistory' => $input['medicalHistory']
    ]);
    
    // Retornar sucesso
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'Dados incompletos']);
}
?>
