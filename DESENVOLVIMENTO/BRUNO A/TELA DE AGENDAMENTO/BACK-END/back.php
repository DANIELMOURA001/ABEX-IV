<?php
header('Content-Type: application/json');

// Recebe os dados do request JSON
$input = json_decode(file_get_contents('php://input'), true);

if (isset($input['name']) && isset($input['reason']) && isset($input['appointmentType']) && isset($input['date'])) {
    // Conectar ao banco de dados (ajuste conforme necessário)
    $pdo = new PDO('mysql:host=localhost;dbname=clinic', 'username', 'password');
    
    // Preparar a inserção dos dados
    $stmt = $pdo->prepare('INSERT INTO appointments (name, reason, type, date) VALUES (:name, :reason, :type, :date)');
    
    // Executar com os dados enviados
    $stmt->execute([
        ':name' => $input['name'],
        ':reason' => $input['reason'],
        ':type' => $input['appointmentType'],
        ':date' => $input['date']
    ]);
    
    // Retornar sucesso
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'Dados incompletos']);
}
?>
<?php
header('Content-Type: application/json');

// Recebe a data da requisição
$date = $_GET['date'] ?? null;

if ($date) {
    // Conectar ao banco de dados
    $pdo = new PDO('mysql:host=localhost;dbname=clinic', 'username', 'password');
    
    // Consultar os horários disponíveis para essa data
    $stmt = $pdo->prepare('SELECT time FROM available_times WHERE date = :date');
    $stmt->execute([':date' => $date]);
    
    // Retornar os horários
    $times = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode(array_column($times, 'time'));
} else {
    echo json_encode(['error' => 'Data não informada']);
}
?>
