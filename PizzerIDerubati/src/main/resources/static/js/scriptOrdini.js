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
        printOrdinations();
    })
    .catch(error => console.error('Errore durante l\'aggiornamento dell\'ordine:', error));
}

function printOrdinations() {
    let loadingText = document.getElementById('desc');
    loadingText.textContent = 'Caricamento ordini...';

    fetch('api/ordini/stato/In%20Attesa')
    .then(response => response.json())
    .then(data => {
        if (data.length === 0) {
            loadingText.textContent = 'Nessun ordine!';
        } else {
            let container = document.getElementById('products-container');

            while (container.firstChild) {
                container.removeChild(container.firstChild);
            }
            loadingText.textContent = '';
            data.forEach(order => {
                let ordineDiv = document.createElement('div');
                ordineDiv.classList.add('product');
                
                let title = document.createElement('h2');
                title.textContent = 'Ordine: ' + order.cod;
                ordineDiv.appendChild(title);
                
                let date = document.createElement('p');
                date.textContent = 'Data: ' + order.data;
                ordineDiv.appendChild(date);

                order.ordiniPizze.forEach(prodotto => {
                    let prodottoDiv = document.createElement('div');
                    prodottoDiv.classList.add('pizza');

                    let prodottoTitle = document.createElement('h3');
                    prodottoTitle.textContent = prodotto.pizza.nome + ' - ' + prodotto.pizza.tipo + ' - ' + prodotto.quantita  ;
                    prodottoDiv.appendChild(prodottoTitle);

                    let ingredientiList = document.createElement('ul');

                    // Cerca se ci sono ingredienti personalizzati per questo prodotto
                    let customIngredients = order.ingredientiPersonalizzati.find(ing => 
                        ing.tipo === prodotto.pizza.tipo
                    );

                    // Usa ingredienti personalizzati se presenti, altrimenti usa gli ingredienti standard
                    if (customIngredients && customIngredients.ingredienti.trim() !== '') {
                        let customIngredientiArray = customIngredients.ingredienti.split(',');

                        let prodMod = document.createElement('p');
                        prodMod.textContent =  ' Ingredienti totali: ' ;
                        prodottoDiv.appendChild(prodMod);

                        customIngredientiArray.forEach(ingrediente => {
                            let ingredienteItem = document.createElement('li');
                            ingredienteItem.textContent = ingrediente.trim();
                            ingredientiList.appendChild(ingredienteItem);
                        });
                    } else {
                        prodotto.pizza.ingredienti.forEach(ingrediente => {
                            let ingredienteItem = document.createElement('li');
                            ingredienteItem.textContent = ingrediente.nome + ` (${ingrediente.prezzo}€)`;
                            ingredientiList.appendChild(ingredienteItem);
                        });
                    }

                    prodottoDiv.appendChild(ingredientiList);
                    ordineDiv.appendChild(prodottoDiv);
                });

                let buttonDone = document.createElement('button');
                buttonDone.classList.add('remove');
                buttonDone.innerHTML = 'X';
                buttonDone.onclick = () => setOrdineAsDone(order.cod);
                ordineDiv.appendChild(buttonDone);

                container.appendChild(ordineDiv);
            });
        }
    })
    .catch(error => console.error('Error fetching or processing data:', error));
}

printOrdinations();

