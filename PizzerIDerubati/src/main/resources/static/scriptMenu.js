fetch('api/pizze/tipi')
    .then(response => response.json())
    .then(data => {
        let containerButton = document.getElementById('button-container')
        data.forEach(tipo => {
            let buttontype = document.createElement('button');
            buttontype.textContent = tipo;
            buttontype.classList.add('action-btn-menu');

            buttontype.onclick = function() {
                window.location.href = '/' +  tipo.toLowerCase();
            };

            containerButton.appendChild(buttontype);

        });
    
    
    });