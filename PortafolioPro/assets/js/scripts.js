
function obtenerDatosUsuario(username){

    const url = `https://api.github.com/users/${username}` 



    fetch(url)
    .then(response => response.json())
    .then(data => {

        console.log(data)

        document.getElementById("Nombre").textContent = data.name;
        document.getElementById("Bio").textContent = data.bio;
        document.getElementById("Seguidores").textContent = data.followers;
        document.getElementById("Repositorios").textContent = data.public_repos;
    });

    
    
};

obtenerDatosUsuario('CuatroPeso');


// Inicializar EmailJS con tu Public Key
emailjs.init('SQ88GOzas5vGXZ520');


function enviarCorreo() {

    var formData = {
        name: document.getElementById('From_name').value,
        email: document.getElementById('From_email').value,
        message: document.getElementById('message').value
    };

    // Enviar el correo electrónico 
    emailjs.send('service_sew0ruh', 'template_l3j5so5', formData) 
        .then(function(response) {
            console.log('Correo electrónico enviado con éxito!', response);
            alert('¡Mensaje enviado correctamente!');
            document.getElementById('contactForm').reset();
        }, function(error) {
            console.error('Error al enviar el correo electrónico:', error);
            alert('Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo más tarde.');
        });
}


