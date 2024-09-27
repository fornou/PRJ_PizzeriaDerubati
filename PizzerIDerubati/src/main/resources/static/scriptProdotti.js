let carrello = JSON.parse(localStorage.getItem('carrello')) || [];

function caricaProdotti(tipo) {
    fetch(`api/proj/pizze/tipo/${tipo}`)
        .then(response => response.json())
        .then(data => {

            let container = document.getElementById('products-container');

            data.forEach(product => {

                let pizzaDiv = document.createElement('div');
                pizzaDiv.classList.add('product');

                let title = document.createElement('h2');
                title.textContent = product.nome;
                pizzaDiv.appendChild(title);

                let img = document.createElement('img');
                img.src = product.img;
                pizzaDiv.appendChild(img);

                let price = document.createElement('p');
                price.classList.add('price');
                price.textContent = product.prezzo + '€';
                pizzaDiv.appendChild(price);

                let description = document.createElement('p');
                description.textContent = product.descrizione;
                pizzaDiv.appendChild(description);

                let quantityInput = document.createElement('input');
                quantityInput.type = 'number';
                quantityInput.min = '1';
                quantityInput.value = '1';
                pizzaDiv.appendChild(quantityInput);

                let addButton = document.createElement('button');
                addButton.textContent = '+';
                addButton.onclick = () => aggiungiAlCarrello(product.idp, quantityInput.value);
                pizzaDiv.appendChild(addButton);
                
                container.appendChild(pizzaDiv);
            });
        });
}

/*function aggiungiAlCarrello(id, quantita) {
    let item = carrello.find(item => item.pizzaId === id);
    if (item) {
        item.quantita += parseInt(quantita);
    } else {
        carrello.push({ pizzaId: id, quantita: parseInt(quantita) });
    }
    localStorage.setItem('carrello', JSON.stringify(carrello));
    alert('Pizza aggiunta al carrello!');
}*/

function aggiungiAlCarrello(id, quantita) {
    carrello.push({ pizzaId: id, quantita: parseInt(quantita) });
    localStorage.setItem('carrello', JSON.stringify(carrello));
    alert('Pizza aggiunta al carrello!');
}

document.addEventListener('DOMContentLoaded', () => {
    let tipoProdotto = document.getElementById('products-container').getAttribute('data-tipo');
    caricaProdotti(tipoProdotto);
});
