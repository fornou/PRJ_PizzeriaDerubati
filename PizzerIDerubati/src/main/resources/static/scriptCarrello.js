let carrello = JSON.parse(localStorage.getItem('carrello')) || [];

function visualizzaCarrello() {

    let container = document.getElementById('carrello');
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    
    let totalPrice = 0;
    let last = 0;
    
    carrello.forEach(object => {
        fetch(`api/pizze/codice/${object.pizzaId}`)
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
                quantity.textContent = 'Quantità: ' + object.quantita;
                pizzaDiv.appendChild(quantity);
				
				
                // let description = document.createElement('p');
                // description.textContent = pizza.descrizione;
                // pizzaDiv.appendChild(description);

                container.appendChild(pizzaDiv);
                
                totalPrice += pizza.prezzo * object.quantita;
                last++;
                
                if(last === carrello.length) {
                    let totalDiv = document.createElement('div');
                    totalDiv.classList.add('totale');

                    let totalLabel = document.createElement('h3');
                    totalLabel.textContent = 'Total: €' + totalPrice.toFixed(2);
                    totalDiv.appendChild(totalLabel);

                    container.appendChild(totalDiv);
                }
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
    .then(success => {
        alert('Ordine inviato con successo!');
        carrello = [];
        localStorage.setItem('carrello', JSON.stringify(carrello));
        visualizzaCarrello();
    });
});

visualizzaCarrello();