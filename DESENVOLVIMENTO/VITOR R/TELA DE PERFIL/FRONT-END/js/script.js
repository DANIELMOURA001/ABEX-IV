function toggleEdit() {
    var inputs = document.querySelectorAll('.profile-field input');
    var editBtn = document.querySelector('.edit-btn');
    var saveBtn = document.querySelector('.save-btn');

    // Habilita ou desabilita os inputs
    inputs.forEach(function(input) {
        input.disabled = !input.disabled;
    });

    // Alterna entre o botão de editar e o botão de salvar
    if (editBtn.style.display !== 'none') {
        editBtn.style.display = 'none';
        saveBtn.style.display = 'inline-block';
    } else {
        editBtn.style.display = 'inline-block';
        saveBtn.style.display = 'none';
    }
}

function saveChanges() {
    // Aqui você pode adicionar a lógica para salvar as informações editadas
    toggleEdit();
    alert('Informações salvas com sucesso!');
}

function revelarSenha() {
    var senhaField = document.getElementById("senha");
    if (senhaField.type === "password") {
        senhaField.type = "text";
    } else {
        senhaField.type = "password";
    }
}

function previewImage(event) {
    var reader = new FileReader();
    var profilePic = document.getElementById("profilePic");

    reader.onload = function() {
        // Define a nova imagem de perfil
        profilePic.src = reader.result;
    }

    // Lê a imagem selecionada
    reader.readAsDataURL(event.target.files[0]);
}
