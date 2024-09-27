let carrello = JSON.parse(localStorage.getItem('carrello')) || [];
let ingredientiMatrice = JSON.parse(localStorage.getItem('ingredientiMatrice')) || {};

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

/*function visualizzaCarrello() {

    let container = document.getElementById('products-container');
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    
    let totalPrice = 0;
    let last = 0;
    
    carrello.forEach(object => {
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
                removeButton.onclick = () => rimuoviDalCarrello(pizza.idp, object.quantita);
                selectedProducts.appendChild(removeButton);
                
                if (!ingredientiMatrice[object.pizzaId]) {
                    fetch(`api/pizze/codice/${object.pizzaId}`)
                        .then(response => response.json())
                        .then(pizzaConIngredienti => {
                            ingredientiMatrice[object.pizzaId] = pizzaConIngredienti.ingredienti;
                            localStorage.setItem('ingredientiMatrice', JSON.stringify(ingredientiMatrice));
                            aggiornaIngredienti(selectedProducts, object.pizzaId);
                        });
                } else {
                    aggiornaIngredienti(selectedProducts, object.pizzaId);
                }

				if (object.pizzaId <= 77) {
                	let addIngredientButton = document.createElement('button');
                	addIngredientButton.textContent = 'Aggiungi Ingrediente';
                	addIngredientButton.onclick = () => mostraIngredientiDisponibili(object.pizzaId, selectedProducts);
                	selectedProducts.appendChild(addIngredientButton);
                }
				
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
}*/

function visualizzaCarrello() {
    let container = document.getElementById('products-container');
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    
    let totalPrice = 0;
    let last = 0;
    
    carrello.forEach((object, index) => {
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
                removeButton.onclick = () => rimuoviDalCarrello(pizza.idp, object.quantita);
                selectedProducts.appendChild(removeButton);
				
				if (!ingredientiMatrice[`${object.pizzaId}_${index}`]) {
                    fetch(`api/pizze/codice/${object.pizzaId}`)
                        .then(response => response.json())
                        .then(pizzaConIngredienti => {
                            ingredientiMatrice[`${object.pizzaId}_${index}`] = pizzaConIngredienti.ingredienti;
                            localStorage.setItem('ingredientiMatrice', JSON.stringify(ingredientiMatrice));
                            aggiornaIngredienti(selectedProducts, `${object.pizzaId}_${index}`);
                        });
                } else {
                    aggiornaIngredienti(selectedProducts, `${object.pizzaId}_${index}`);
                }

				if (object.pizzaId <= 77) {
   					 let addIngredientButton = document.createElement('button');
   					 addIngredientButton.textContent = 'Aggiungi Ingrediente';
   					 addIngredientButton.onclick = () => mostraIngredientiDisponibili(`${object.pizzaId}_${index}`, selectedProducts);
   					 selectedProducts.appendChild(addIngredientButton);
				}
				
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

function aggiornaIngredienti(selectedProducts, pizzaId) {
    let ingredientiList = document.createElement('ul');
    ingredientiMatrice[pizzaId].forEach(ingrediente => {
        let ingredienteItem = document.createElement('li');
        ingredienteItem.textContent = ingrediente.nome;

        let removeButton = document.createElement('button');
        removeButton.textContent = 'Rimuovi';
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
                addButton.textContent = 'Aggiungi';
                addButton.onclick = () => aggiungiIngrediente(pizzaId, ingrediente.idp, ingrediente.nome);
                ingredienteDiv.appendChild(addButton);

                ingredientiContainer.appendChild(ingredienteDiv);
            });

            selectedProducts.appendChild(ingredientiContainer);
            selectedProducts.style.height = '1500px'; 

            let hideButton = document.createElement('button');
            hideButton.textContent = 'Nascondi Ingredienti';
            hideButton.onclick = () => nascondiIngredienti(selectedProducts, ingredientiContainer, hideButton);
            selectedProducts.appendChild(hideButton);
        });
}

/*function aggiungiIngrediente(pizzaId, ingredienteId, ingredienteNome) {
    let pizza = carrello.find(item => item.pizzaId === pizzaId);
    if (pizza) {
        if (!ingredientiMatrice[pizzaId].some(ingrediente => ingrediente.idp === ingredienteId)) {
            ingredientiMatrice[pizzaId].push({ idp: ingredienteId, nome: ingredienteNome });
            localStorage.setItem('carrello', JSON.stringify(carrello));
            localStorage.setItem('ingredientiMatrice', JSON.stringify(ingredientiMatrice));
            alert('Ingrediente aggiunto!');
            visualizzaCarrello();
        } else {
            alert('Ingrediente già presente!');
        }
    }
}*/

function aggiungiIngrediente(pizzaId, ingredienteId, ingredienteNome) {
    let pizza = carrello.find((item, index) => `${item.pizzaId}_${index}` === pizzaId);
    if (pizza) {
        if (!ingredientiMatrice[pizzaId].some(ingrediente => ingrediente.idp === ingredienteId)) {
            ingredientiMatrice[pizzaId].push({ idp: ingredienteId, nome: ingredienteNome });
            localStorage.setItem('ingredientiMatrice', JSON.stringify(ingredientiMatrice));
            alert('Ingrediente aggiunto!');
            visualizzaCarrello();
        } else {
            alert('Ingrediente già presente!');
        }
    }
}

/*function rimuoviIngrediente(pizzaId, ingredienteId) {
    let pizza = carrello.find(item => item.pizzaId === pizzaId);
    if (pizza) {
        ingredientiMatrice[pizzaId] = ingredientiMatrice[pizzaId].filter(ingrediente => ingrediente.idp !== ingredienteId); 
        localStorage.setItem('carrello', JSON.stringify(carrello));
        localStorage.setItem('ingredientiMatrice', JSON.stringify(ingredientiMatrice));
        alert('Ingrediente rimosso!');
        visualizzaCarrello();
    }
}*/

function rimuoviIngrediente(pizzaId, ingredienteId) {
    let pizza = carrello.find((item, index) => `${item.pizzaId}_${index}` === pizzaId);
    if (pizza) {
        ingredientiMatrice[pizzaId] = ingredientiMatrice[pizzaId].filter(ingrediente => ingrediente.idp !== ingredienteId); 
        localStorage.setItem('carrello', JSON.stringify(carrello));
        localStorage.setItem('ingredientiMatrice', JSON.stringify(ingredientiMatrice));
        alert('Ingrediente rimosso!');
        visualizzaCarrello();
    }
}

function nascondiIngredienti(pizzaDiv, ingredientiContainer, hideButton) {
    pizzaDiv.removeChild(ingredientiContainer);
    pizzaDiv.removeChild(hideButton);
    pizzaDiv.style.height = ''; 
}

/*document.getElementById('invia').addEventListener('click', () => {
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
        ingredientiMatrice = {};
        localStorage.setItem('carrello', JSON.stringify(carrello));
        localStorage.setItem('ingredientiMatrice', JSON.stringify(ingredientiMatrice));
        document.getElementById('invia').style.display = 'none';
        visualizzaCarrello();
    });
});*/

document.getElementById('invia').addEventListener('click', () => {
    let pizzeOrdineRequest = carrello.map((item, index) => {
        return {
            pizzaId: item.pizzaId,
            quantita: item.quantita,
            ingredienti: ingredientiMatrice[`${item.pizzaId}_${index}`] ? ingredientiMatrice[`${item.pizzaId}_${index}`].map(ingrediente => ingrediente.nome) : []
        };
    });

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
        visualizzaCarrello();
    })
    .catch(error => console.error('Errore durante la creazione dell\'ordine:', error));
});

visualizzaCarrello();