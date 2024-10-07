let carrello = JSON.parse(localStorage.getItem('carrello')) || [];
let ingredientiMatrice = JSON.parse(localStorage.getItem('ingredientiMatrice')) || {};
let rimuoviCounter = parseInt(localStorage.getItem('rimuoviCounter')) || 0;
let aggiungiCounter = parseInt(localStorage.getItem('aggiungiCounter')) || 0;


function rimuoviDalCarrello(id) {
    carrello = carrello.map(item => {
        if (item.pizzaId === id) {
            item.rimosso = true;
        }
        return item;
    });
    delete ingredientiMatrice[id];

    localStorage.setItem('carrello', JSON.stringify(carrello));
    localStorage.setItem('ingredientiMatrice', JSON.stringify(ingredientiMatrice));

    alert('Pizza rimossa dal carrello!');
    visualizzaCarrello();
}

function visualizzaCarrello() {
    let container = document.getElementById('products-container');
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    totalPrice = 0;
    let last = 0;
    let hasNonRemovedPizza = false;
    let nonRemovedCount = carrello.filter(object => !object.rimosso).length;

    carrello.forEach((object, index) => {
        if (object.rimosso) {
            return;
        }

        hasNonRemovedPizza = true;

        fetch(`api/proj/pizze/codice/${object.pizzaId}`)
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
                removeButton.onclick = () => rimuoviDalCarrello(pizza.idp);
                selectedProducts.appendChild(removeButton);
                
                let loadingText = document.createElement('p');
                loadingText.textContent = 'Caricamento ingredienti...';
                selectedProducts.appendChild(loadingText);

                if (ingredientiMatrice[`${pizza.pizzaId}_${index}`]) {
                    aggiornaIngredienti(selectedProducts, `${pizza.pizzaId}_${index}`);
                    loadingText.style.display = 'none';
                }

                if (!ingredientiMatrice[`${object.pizzaId}_${index}`]) {
                    fetch(`api/pizze/codice/${object.pizzaId}`)
                        .then(response => response.json())
                        .then(pizzaConIngredienti => {
                            ingredientiMatrice[`${object.pizzaId}_${index}`] = pizzaConIngredienti.ingredienti;
                            localStorage.setItem('ingredientiMatrice', JSON.stringify(ingredientiMatrice));
                            aggiornaIngredienti(selectedProducts, `${object.pizzaId}_${index}`);
                            loadingText.style.display = 'none';
                        });
                } else {
                    aggiornaIngredienti(selectedProducts, `${object.pizzaId}_${index}`);
                    loadingText.style.display = 'none';
                }

                if (object.pizzaId <= 77) {
                    let addIngredientButton = document.createElement('button');
                    addIngredientButton.classList.add('listIng')
                    addIngredientButton.textContent = '+';
                    addIngredientButton.onclick = () => mostraIngredientiDisponibili(`${object.pizzaId}_${index}`, selectedProducts);
                    selectedProducts.appendChild(addIngredientButton);
                }

                container.appendChild(selectedProducts);

                totalPrice += (pizza.prezzo * object.quantita) - ((rimuoviCounter - aggiungiCounter)/nonRemovedCount);
                last++;
			  
                if (last === nonRemovedCount) {

                    let total = document.getElementById('total');
                    total.textContent='';
                    total.textContent = 'Total: €' + totalPrice.toFixed(2);
                    
                    localStorage.setItem('totalPrice', totalPrice.toFixed(2));
                }
            });
    });

	console.log("Valore globale di rimuoviCounter:", rimuoviCounter);
    console.log("Valore globale di aggiungiCounter:", aggiungiCounter);
    localStorage.setItem('aggiungiCounter', aggiungiCounter);
    localStorage.setItem('rimuoviCounter', rimuoviCounter);
    
    let enterButton = document.getElementById('invia');
    if (hasNonRemovedPizza) {
        enterButton.style.display = 'block';
    } else {
        enterButton.style.display = 'none';
        rimuoviCounter = 0;
        aggiungiCounter = 0;
        localStorage.setItem('rimuoviCounter', rimuoviCounter);
        localStorage.setItem('aggiungiCounter', aggiungiCounter);
    }
}

function aggiornaIngredienti(selectedProducts, pizzaId) {
    let ingredientiList = document.createElement('ul');
    ingredientiMatrice[pizzaId].forEach(ingrediente => {
        let ingredienteItem = document.createElement('li');
        ingredienteItem.textContent = ingrediente.nome;

        let removeButton = document.createElement('button');
        removeButton.classList.add('remIng');
        removeButton.textContent = '-';
        removeButton.onclick = () => rimuoviIngrediente(pizzaId, ingrediente.idp);
        ingredienteItem.appendChild(removeButton);

        ingredientiList.appendChild(ingredienteItem);
    });
    selectedProducts.appendChild(ingredientiList);
}

function mostraIngredientiDisponibili(pizzaId, selectedProducts) {
     if (selectedProducts.querySelector('.ingredienti-container')) {
        return
    }
    
    fetch('api/proj/ingredienti')
        .then(response => response.json())
        .then(ingredienti => {
            let ingredientiContainer = document.createElement('div');
            ingredientiContainer.classList.add('ingredienti-container');

            ingredienti.forEach(ingrediente => {
                let ingredienteDiv = document.createElement('div');
                ingredienteDiv.textContent = ingrediente.nome;

                let addButton = document.createElement('button');
                addButton.classList.add('ingredient-btn');
                addButton.textContent = '+';
                addButton.onclick = () => aggiungiIngrediente(pizzaId, ingrediente.idp, ingrediente.nome);
                ingredienteDiv.appendChild(addButton);

                ingredientiContainer.appendChild(ingredienteDiv);
            });

            selectedProducts.appendChild(ingredientiContainer);
            selectedProducts.style.height = '1500px'; 

            let hideButton = document.createElement('button');
            hideButton.classList.add('hide-button');
            hideButton.textContent = 'x';
            
            hideButton.onclick = () => nascondiIngredienti(selectedProducts, ingredientiContainer, hideButton);
            selectedProducts.appendChild(hideButton);
        });
}

function aggiungiIngrediente(pizzaId, ingredienteId, ingredienteNome) {
    let pizza = carrello.find((item, index) => `${item.pizzaId}_${index}` === pizzaId);
    if (pizza) {
        if (!ingredientiMatrice[pizzaId].some(ingrediente => ingrediente.idp === ingredienteId)) {
            ingredientiMatrice[pizzaId].push({ idp: ingredienteId, nome: ingredienteNome });
            localStorage.setItem('ingredientiMatrice', JSON.stringify(ingredientiMatrice));
            alert('Ingrediente aggiunto!');
            aggiungiCounter += 2;
            console.log('aggiungiCounter:', aggiungiCounter); 
            visualizzaCarrello();
        } else {
            alert('Ingrediente già presente!');
        }
    }
}

function rimuoviIngrediente(pizzaId, ingredienteId) {
    let pizza = carrello.find((item, index) => `${item.pizzaId}_${index}` === pizzaId);
    if (pizza) {
        ingredientiMatrice[pizzaId] = ingredientiMatrice[pizzaId].filter(ingrediente => ingrediente.idp !== ingredienteId); 
        localStorage.setItem('carrello', JSON.stringify(carrello));
        localStorage.setItem('ingredientiMatrice', JSON.stringify(ingredientiMatrice));
        alert('Ingrediente rimosso!');
        rimuoviCounter += 2;
        console.log('rimuoviCounter:', rimuoviCounter);
        document.getElementById('total').innerHTML = '';
        visualizzaCarrello();
    }
}

function nascondiIngredienti(pizzaDiv, ingredientiContainer, hideButton) {
    pizzaDiv.removeChild(ingredientiContainer);
    pizzaDiv.removeChild(hideButton);
    pizzaDiv.style.height = ''; 
}

document.getElementById('invia').addEventListener('click', () => {
    let pizzeOrdineRequest = carrello.map((item, index) => {
        return {
            pizzaId: item.pizzaId,
            quantita: item.quantita,
            ingredienti: ingredientiMatrice[`${item.pizzaId}_${index}`] ? ingredientiMatrice[`${item.pizzaId}_${index}`].map(ingrediente => ingrediente.nome) : []
        };
    });
    
    let container = document.getElementById('products-container');
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    let loadingText = document.createElement('p');
    loadingText.id = 'loading-text';
    loadingText.textContent = 'Caricamento invio ordine...';
    container.appendChild(loadingText);

    fetch('api/ordini', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(pizzeOrdineRequest)
    })
    .then(response => response.json())
    .then(success => {
        alert('Ordine inviato con successo!');
        carrello = [];
        ingredientiMatrice = {};
        localStorage.setItem('carrello', JSON.stringify(carrello));
        localStorage.setItem('ingredientiMatrice', JSON.stringify(ingredientiMatrice));
        document.getElementById('invia').style.display = 'none';
        document.getElementById('total').innerHTML = '';
        visualizzaCarrello();
    })
    .catch(error => console.error('Errore durante la creazione dell\'ordine:', error))
    .finally(() => {
        document.getElementById('loading-text').remove();
    });
});


visualizzaCarrello();