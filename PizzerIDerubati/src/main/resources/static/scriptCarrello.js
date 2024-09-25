let carrello = JSON.parse(localStorage.getItem('carrello')) || [];

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
    enterButton = document.getElementById('invia');
    enterButton.style.display = 'none';
}

function visualizzaCarrello() {

    let container = document.getElementById('products-container');
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    
    let totalPrice = 0;
    let last = 0;
    
    carrello.forEach(object => {
        fetch(`api/pizze/codice/${object.pizzaId}`)
            .then(response => response.json())
            .then(pizza => {
                
                let selectedProducts = document.createElement('div');
                selectedProducts.classList.add('product');

                let title = document.createElement('h2');
                title.textContent = pizza.nome;
                selectedProducts.appendChild(title);

                let img = document.createElement('img');
                img.src = pizza.img;
                selectedProducts.appendChild(img);

                let price = document.createElement('p');
                price.classList.add('price');
                price.textContent = pizza.prezzo + '€';
                selectedProducts.appendChild(price);

                let quantity = document.createElement('p');
                quantity.textContent = 'Quantità: ' + object.quantita;
                selectedProducts.appendChild(quantity);
				
                let removeButton = document.createElement('button');
                removeButton.classList.add('remove');
                removeButton.innerHTML = 'X';
                removeButton.onclick = () => rimuoviDalCarrello(pizza.idp, object.quantita);
                selectedProducts.appendChild(removeButton);

                container.appendChild(selectedProducts);
                
                totalPrice += pizza.prezzo * object.quantita;
                last++;
                
                if(last === carrello.length) {
                    let totalDiv = document.createElement('div');
                    totalDiv.classList.add('totale');

                    let totalLabel = document.createElement('h3');
                    totalLabel.textContent = 'Total: €' + totalPrice.toFixed(2);
                    totalDiv.appendChild(totalLabel);

                    container.appendChild(totalDiv);

                    enterButton = document.getElementById('invia');
                    enterButton.style.display = 'block';
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
        document.getElementById('invia').style.display = 'none';
        visualizzaCarrello();
    });
});

visualizzaCarrello();