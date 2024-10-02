document.getElementById('appointment-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Evita o reload da página
    
    const name = document.getElementById('name').value;
    const reason = document.getElementById('reason').value;
    const appointmentType = document.getElementById('appointment-type').value;
    const selectedDate = document.getElementById('date').value;
    
    // Validação simples
    if (!name || !reason || !appointmentType || !selectedDate) {
        alert("Preencha todos os campos corretamente.");
        return;
    }

    // Enviar os dados ao back-end (PHP)
    fetch('schedule.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: name,
            reason: reason,
            appointmentType: appointmentType,
            date: selectedDate
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Consulta agendada com sucesso!');
        } else {
            alert('Erro ao agendar. Tente novamente.');
        }
    })
    .catch(error => {
        console.error('Erro:', error);
    });
});

// Carregar horários disponíveis para a data selecionada
document.getElementById('date').addEventListener('change', function() {
    const selectedDate = this.value;

    fetch(`available-times.php?date=${selectedDate}`)
        .then(response => response.json())
        .then(times => {
            let timesContainer = document.getElementById('available-times');
            timesContainer.innerHTML = ''; // Limpa os horários anteriores

            if (times.length > 0) {
                times.forEach(time => {
                    let timeOption = document.createElement('div');
                    timeOption.textContent = time;
                    timesContainer.appendChild(timeOption);
                });
            } else {
                timesContainer.innerHTML = '<p>Nenhum horário disponível para esta data.</p>';
            }
        })
        .catch(error => {
            console.error('Erro ao carregar horários:', error);
        });
});
