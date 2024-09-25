let shoppingCart = JSON.parse(localStorage.getItem('carrello')) || [];
let matrixIngredients = JSON.parse(localStorage.getItem('ingredientiMatrice')) || {}; 

function visualizzaCarrello() {
/*function view() {

    let container = document.getElementById('carrello');
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    carrello.forEach(item => {
        fetch(`api/pizze/${item.pizzaId}`)
    
    let totalPrice = 0;
    let last = 0;
    
    shoppingCart.forEach(object => {
        fetch(`api/proj/pizze/codice/${object.pizzaId}`)
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
				
				if (!matrixIngredients[object.pizzaId]) {
                    fetch(`api/pizze/codice/${object.pizzaId}`)
                        .then(response => response.json())
                        .then(pizzaIngredients => {
                            matrixIngredients[object.pizzaId] = pizzaIngredients.ingredienti;
                            localStorage.setItem('ingredientiMatrice', JSON.stringify(matrixIngredients));
                            aggiornaIngredienti(pizzaDiv, object.pizzaId);
                        });
                } else {
                    aggiornaIngredienti(pizzaDiv, object.pizzaId);
                }

				if (object.pizzaId <= 77) {
   					 let addIngredientButton = document.createElement('button');
   					 addIngredientButton.textContent = 'Aggiungi Ingrediente';
   					 addIngredientButton.onclick = () => mostraIngredientiDisponibili(object.pizzaId, pizzaDiv);
   					 pizzaDiv.appendChild(addIngredientButton);
				}
				
                // let description = document.createElement('p');
                // description.textContent = pizza.descrizione;
                // pizzaDiv.appendChild(description);

                container.appendChild(pizzaDiv);
                
                totalPrice += pizza.prezzo * object.quantita;
                last++;
                
                if(last === shoppingCart.length) {
                	let totalPriceDiv = document.createElement('div');
                	totalPriceDiv.classList.add('totale');

                	let totalPriceLabel = document.createElement('h3');
                	totalPriceLabel.textContent = 'Total: €' + totalPrice.toFixed(2);
                	totalPriceDiv.appendChild(totalPriceLabel);

                	container.appendChild(totalPriceDiv);
                }
       });
   });
}*/

function view() {
    let container = document.getElementById('carrello');
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    
    let totalPrice = 0;
    let last = 0;
    
    shoppingCart.forEach((object, index) => {
        fetch(`api/proj/pizze/codice/${object.pizzaId}`)
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
				
				if (!matrixIngredients[`${object.pizzaId}_${index}`]) {
                    fetch(`api/pizze/codice/${object.pizzaId}`)
                        .then(response => response.json())
                        .then(pizzaIngredients => {
                            matrixIngredients[`${object.pizzaId}_${index}`] = pizzaIngredients.ingredienti;
                            localStorage.setItem('ingredientiMatrice', JSON.stringify(matrixIngredients));
                            aggiornaIngredienti(pizzaDiv, `${object.pizzaId}_${index}`);
                        });
                } else {
                    aggiornaIngredienti(pizzaDiv, `${object.pizzaId}_${index}`);
                }

				if (object.pizzaId <= 77) {
   					 let addIngredientButton = document.createElement('button');
   					 addIngredientButton.textContent = 'Aggiungi Ingrediente';
   					 addIngredientButton.onclick = () => mostraIngredientiDisponibili(`${object.pizzaId}_${index}`, pizzaDiv);
   					 pizzaDiv.appendChild(addIngredientButton);
				}
				
                container.appendChild(pizzaDiv);
                
                totalPrice += pizza.prezzo * object.quantita;
                last++;
                
                if(last === shoppingCart.length) {
                	let totalPriceDiv = document.createElement('div');
                	totalPriceDiv.classList.add('totale');

                	let totalPriceLabel = document.createElement('h3');
                	totalPriceLabel.textContent = 'Total: €' + totalPrice.toFixed(2);
                	totalPriceDiv.appendChild(totalPriceLabel);

                	container.appendChild(totalPriceDiv);
                }
       });
   });
}

function aggiornaIngredienti(pizzaDiv, pizzaId) {
    let ingredientiList = document.createElement('ul');
    matrixIngredients[pizzaId].forEach(ingrediente => {
        let ingredienteItem = document.createElement('li');
        ingredienteItem.textContent = ingrediente.nome;

        let removeButton = document.createElement('button');
        removeButton.textContent = 'Rimuovi';
        removeButton.onclick = () => rimuoviIngrediente(pizzaId, ingrediente.idp);
        ingredienteItem.appendChild(removeButton);

        ingredientiList.appendChild(ingredienteItem);
    });
    pizzaDiv.appendChild(ingredientiList);
}

function mostraIngredientiDisponibili(pizzaId, pizzaDiv) {
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

            pizzaDiv.appendChild(ingredientiContainer);
            pizzaDiv.style.height = '1500px'; 

            let hideButton = document.createElement('button');
            hideButton.textContent = 'Nascondi Ingredienti';
            hideButton.onclick = () => nascondiIngredienti(pizzaDiv, ingredientiContainer, hideButton);
            pizzaDiv.appendChild(hideButton);
        });
}

function nascondiIngredienti(pizzaDiv, ingredientiContainer, hideButton) {
    pizzaDiv.removeChild(ingredientiContainer);
    pizzaDiv.removeChild(hideButton);
    pizzaDiv.style.height = ''; 
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
    let pizza = shoppingCart.find((item, index) => `${item.pizzaId}_${index}` === pizzaId);
    if (pizza) {
        if (!matrixIngredients[pizzaId]) {
            matrixIngredients[pizzaId] = [];
        }
        if (!matrixIngredients[pizzaId].some(ingrediente => ingrediente.idp === ingredienteId)) {
            matrixIngredients[pizzaId].push({ idp: ingredienteId, nome: ingredienteNome });
            localStorage.setItem('ingredientiMatrice', JSON.stringify(matrixIngredients));
            alert('Ingrediente aggiunto!');
            view();
        } else {
            alert('Ingrediente già presente!');
        }
    }
}

function rimuoviIngrediente(pizzaId, ingredienteId) {
    let pizza = shoppingCart.find(item => item.pizzaId === pizzaId);
    if (pizza) {
        matrixIngredients[pizzaId] = matrixIngredients[pizzaId].filter(ingrediente => ingrediente.idp !== ingredienteId); 
        localStorage.setItem('carrello', JSON.stringify(shoppingCart));
        localStorage.setItem('ingredientiMatrice', JSON.stringify(matrixIngredients));
        alert('Ingrediente rimosso!');
        view();
    }
}

document.getElementById('invia').addEventListener('click', () => {
    fetch('api/ordini', {
        method: 'POST',
        headers: {
         	'Content-Type': 'application/json'
        },
        body: JSON.stringify(shoppingCart)
    })
    	.then(response => response.json())
    	.then(success => {			
        	alert('Ordine inviato con successo!');
        	shoppingCart = [];
        	matrixIngredients = {};
        	localStorage.setItem('carrello', JSON.stringify(shoppingCart));
        	localStorage.setItem('ingredientiMatrice', JSON.stringify(matrixIngredients));
        	view();
    	});
});

view();