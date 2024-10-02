document.getElementById('pretriage-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Evita o reload da página
    
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const temperature = document.getElementById('temperature').value;
    const symptoms = document.getElementById('symptoms').value;
    const medicalHistory = document.getElementById('medical-history').value;
    
    // Validação simples
    if (!name || !age || !temperature || !symptoms || !medicalHistory) {
        alert("Preencha todos os campos corretamente.");
        return;
    }

    // Enviar os dados ao back-end (PHP)
    fetch('pretriage.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: name,
            age: age,
            temperature: temperature,
            symptoms: symptoms,
            medicalHistory: medicalHistory
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Pré-triagem enviada com sucesso!');
        } else {
            alert('Erro ao enviar pré-triagem. Tente novamente.');
        }
    })
    .catch(error => {
        console.error('Erro:', error);
    });
});
