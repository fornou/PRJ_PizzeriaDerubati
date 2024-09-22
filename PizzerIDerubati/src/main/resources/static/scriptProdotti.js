let carrello = JSON.parse(localStorage.getItem('carrello')) || [];

function caricaProdotti(tipo) {
    fetch(`api/pizze/tipo/${tipo}`)
        .then(response => response.json())
        .then(data => {
            let container = document.getElementById('pizze');
            container.innerHTML = ''
            data.forEach(pizza => {
                let pizzaDiv = document.createElement('button');
                pizzaDiv.classList.add('pizza');

                let title = document.createElement('h2');
                title.textContent = pizza.nome;
                pizzaDiv.appendChild(title);

                let img = document.createElement('img');
                img.src = pizza.img;
                pizzaDiv.appendChild(img);

                let price = document.createElement('p');
                price.textContent = pizza.prezzo + '€';
                pizzaDiv.appendChild(price);

                

                let description = document.createElement('p');
                description.textContent = pizza.descrizione;
                pizzaDiv.appendChild(description);

                // let quantityInput = document.createElement('input');
                // quantityInput.type = 'number';
                // quantityInput.min = '1';
                // quantityInput.value = '1';
                // pizzaDiv.appendChild(quantityInput);

                // let addButton = document.createElement('button');
                // addButton.textContent = 'Aggiungi';
                // addButton.onclick = () => aggiungiAlCarrello(pizza.idp, quantityInput.value);
                // pizzaDiv.appendChild(addButton);

                // let removeButton = document.createElement('button');
                // removeButton.classList.add('remove');
                // removeButton.innerHTML = 'Rimuovi';
                // removeButton.onclick = () => rimuoviDalCarrello(pizza.idp, quantityInput.value);
                // pizzaDiv.appendChild(removeButton);
                container.appendChild(pizzaDiv);
            });
        });
}

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

document.addEventListener('DOMContentLoaded', () => {
    let tipoProdotto = document.getElementById('pizze').getAttribute('data-tipo');
    caricaProdotti(tipoProdotto);
});
