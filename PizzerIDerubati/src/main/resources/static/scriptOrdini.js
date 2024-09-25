function setOrdineAsDone(idp) {
    fetch(`api/ordini/stato/aggiorna/${idp}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Errore: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Ordine aggiornato con successo:', data);
        alert(`Ordine ${idp} segnato come fatto.`);
        printOrdinations()
    })
    .catch(error => console.error('Errore durante l\'aggiornamento dell\'ordine:', error));
}

function printOrdinations(){
    fetch('api/ordini/stato/In%20Attesa')
    .then(response => response.json())
    .then(data => {
        console.log('Full API response:', data);  

        let container = document.getElementById('products-container');
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }

        data.forEach(order => {
            let ordineDiv = document.createElement('div');
            ordineDiv.classList.add('product');

            // Order Code
            let title = document.createElement('h2');
            title.textContent = 'Ordine: ' + order.cod;
            ordineDiv.appendChild(title);

            // Order Date
            let date = document.createElement('p');
            date.textContent = 'Data: ' + order.data;
            ordineDiv.appendChild(date);

            order.ordiniPizze.forEach(pizzaOrder => {
                let nomePizza = document.createElement('h2');
                nomePizza.textContent = pizzaOrder.pizza.nome;
                ordineDiv.appendChild(nomePizza);

                let quantita = document.createElement('p');
                quantita.textContent = 'Quantità: ' + pizzaOrder.quantita;
                ordineDiv.appendChild(quantita);
            });

            let buttonDone = document.createElement('button');
            buttonDone.classList.add('remove');
            buttonDone.innerHTML = 'X';
            buttonDone.onclick = () => setOrdineAsDone(order.cod);
            ordineDiv.appendChild(buttonDone);

            container.appendChild(ordineDiv);
        });
    })
    .catch(error => console.error('Error fetching or processing data:', error));
}

printOrdinations()
