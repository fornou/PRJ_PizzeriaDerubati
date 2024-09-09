let carrello = JSON.parse(localStorage.getItem('carrello')) || [];

function visualizzaCarrello() {
    let container = document.getElementById('carrello');
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    carrello.forEach(item => {
        fetch(`api/pizze/${item.pizzaId}`)
            .then(response => response.json())
            .then(pizza => {
                let pizzaDiv = document.createElement('div');
                pizzaDiv.classList.add('pizza');

                let title = document.createElement('h2');
                title.textContent = pizza.nome;
                pizzaDiv.appendChild(title);

                let price = document.createElement('p');
                price.textContent = 'Prezzo: €' + pizza.prezzo;
                pizzaDiv.appendChild(price);

                let quantity = document.createElement('p');
                quantity.textContent = 'Quantità: ' + item.quantita;
                pizzaDiv.appendChild(quantity);

                let description = document.createElement('p');
                description.textContent = pizza.descrizione;
                pizzaDiv.appendChild(description);

                container.appendChild(pizzaDiv);
            });
    });
}

document.getElementById('invia').addEventListener('click', () => {
    fetch('api/ordini', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(carrello)
    })
    .then(response => response.json())
    .then(data => {
        alert('Ordine inviato con successo!');
        carrello = [];
        localStorage.setItem('carrello', JSON.stringify(carrello));
        visualizzaCarrello();
    });
});

visualizzaCarrello();