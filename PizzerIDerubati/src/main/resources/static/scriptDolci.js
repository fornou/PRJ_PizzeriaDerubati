let carrello = JSON.parse(localStorage.getItem('carrello')) || [];

fetch('api/dolci')
    .then(response => response.json())
    .then(data => {
        let container = document.getElementById('pizze');
        data.forEach(pizza => {
            let pizzaDiv = document.createElement('div');
            pizzaDiv.classList.add('pizza');

            let title = document.createElement('h2');
            title.textContent = pizza.nome;
            pizzaDiv.appendChild(title);

            let price = document.createElement('p');
            price.textContent = 'Prezzo: ' + pizza.prezzo + '€';
            pizzaDiv.appendChild(price);

            let img = document.createElement('img');
            img.src = pizza.img;
            pizzaDiv.appendChild(img);
            
            let br = document.createElement('p');
            pizzaDiv.appendChild(br);
            
            let quantityInput = document.createElement('input');
            quantityInput.type = 'number';
            quantityInput.min = '1';
            quantityInput.value = '1';
            pizzaDiv.appendChild(quantityInput);
            
            let br2 = document.createElement('p');
            pizzaDiv.appendChild(br2);

			let addButton = document.createElement('button');
            addButton.textContent = 'Aggiungi al Carrello';
            addButton.onclick = () => aggiungiAlCarrello(pizza.idp, quantityInput.value);
            pizzaDiv.appendChild(addButton);
            
            let br3 = document.createElement('p');
            pizzaDiv.appendChild(br3);
           
            let removeButton = document.createElement('button');
            removeButton.textContent = 'Rimuovi dal Carrello';
            removeButton.onclick = () => rimuoviDalCarrello(pizza.idp, quantityInput.value);
            pizzaDiv.appendChild(removeButton);

            let description = document.createElement('p');
            description.textContent = pizza.descrizione;
            pizzaDiv.appendChild(description);

            container.appendChild(pizzaDiv);
        });
    });

function aggiungiAlCarrello(id, quantita) {
    let item = carrello.find(item => item.pizzaId === id);
    if (item) {
        item.quantita += parseInt(quantita);
    } else {
        carrello.push({ pizzaId: id, quantita: parseInt(quantita) });
    }
    localStorage.setItem('carrello', JSON.stringify(carrello));
    alert('Pizza aggiunta al carrello!');
}

function rimuoviDalCarrello(id, quantita) {
    let item = carrello.find(item => item.pizzaId === id);
    if (item) {
        item.quantita -= parseInt(quantita);
        if (item.quantita <= 0) {
            carrello = carrello.filter(item => item.pizzaId !== id);
        }
    }
    localStorage.setItem('carrello', JSON.stringify(carrello));
    alert('Pizza rimossa dal carrello!');
    visualizzaCarrello();
}