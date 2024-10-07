/*function setOrdineAsDone(idp) {
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

printOrdinations()*/

/*function setOrdineAsDone(idp) {
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
            
            let title = document.createElement('h2');
            title.textContent = 'Ordine: ' + order.cod;
            ordineDiv.appendChild(title);
            
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

                order.ingredientiPersonalizzati.forEach(ing => {
                    let ingredientiP = document.createElement('p');
                    ingredientiP.textContent = `Ingredienti: ${ing.ingredienti} (Quantità: ${ing.quantita})`;
                    ordineDiv.appendChild(ingredientiP);
                });
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

printOrdinations();

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
            
            let title = document.createElement('h2');
            title.textContent = 'Ordine: ' + order.cod;
            ordineDiv.appendChild(title);
            
            let date = document.createElement('p');
            date.textContent = 'Data: ' + order.data;
            ordineDiv.appendChild(date);

            order.ordiniPizze.forEach((pizzaOrder, index) => {
                let nomePizza = document.createElement('h2');
                nomePizza.textContent = pizzaOrder.pizza.nome;
                ordineDiv.appendChild(nomePizza);

                let quantita = document.createElement('p');
                quantita.textContent = 'Quantità: ' + pizzaOrder.quantita;
                ordineDiv.appendChild(quantita);

                // Trova gli ingredienti personalizzati per questa pizza
                let ing = order.ingredientiPersonalizzati[index];
                if (ing) {
                    let ingredientiP = document.createElement('p');
                    ingredientiP.textContent = `Ingredienti: ${ing.ingredienti} (Quantità: ${ing.quantita})`;
                    ordineDiv.appendChild(ingredientiP);
                }
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

printOrdinations();*/

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
            
            let title = document.createElement('h2');
            title.textContent = 'Ordine: ' + order.cod;
            ordineDiv.appendChild(title);
            
            let date = document.createElement('p');
            date.textContent = 'Data: ' + order.data;
            ordineDiv.appendChild(date);

            // Gestione delle pizze con lo stesso nome ma quantità diverse
            let pizzeGestite = new Set();
            let ingCounter = 0; 
            order.ordiniPizze.forEach(pizzaOrder => {
                if (pizzeGestite.has(pizzaOrder.pizza.nome)) {
                    return;
                }
                pizzeGestite.add(pizzaOrder.pizza.nome);
				
				let nomePizza = document.createElement('h2');
				nomePizza.classList.add('ing');
                nomePizza.textContent = pizzaOrder.pizza.nome;
                ordineDiv.appendChild(nomePizza);


                order.ingredientiPersonalizzati.forEach(ing => {
                    let ingredientiP = document.createElement('p');
                    ingredientiP.classList.add('ing');
                    ingredientiP.textContent = `Ingredienti: ${ing.ingredienti} (Quantità: ${ing.quantita})`;
                    ingredientiP.style.top = `${ingCounter * 80}px`;
                    ordineDiv.appendChild(ingredientiP);
                    ingCounter++;
                });
            });

            // Gestione delle pizze con nomi diversi
            let pizzeNomiDiversi = new Set();
            order.ordiniPizze.forEach((pizzaOrder, index) => {
                if (!pizzeNomiDiversi.has(pizzaOrder.pizza.nome)) {
                    pizzeNomiDiversi.add(pizzaOrder.pizza.nome);

                    let nomePizza = document.createElement('h2');
                    nomePizza.classList.add('engo');
                    nomePizza.textContent = pizzaOrder.pizza.nome;
                    ordineDiv.appendChild(nomePizza);


                    // Trova gli ingredienti personalizzati per questa pizza
                    let ing = order.ingredientiPersonalizzati[index];
                    if (ing) {
                        let ingredientiP = document.createElement('p');
                        ingredientiP.classList.add('engo');
                        ingredientiP.textContent = `Ingredienti: ${ing.ingredienti} (Quantità: ${ing.quantita})`;
                        ordineDiv.appendChild(ingredientiP);
                    }
                }
            });

            // Rimuovi gli elementi con classe 'ing' per le pizze con nomi diversi
            let engoElements = ordineDiv.querySelectorAll('.engo');
            engoElements.forEach(engoElement => {
                let ingElements = ordineDiv.querySelectorAll('.ing');
                ingElements.forEach(ingElement => {
                    if (engoElement.textContent === ingElement.textContent) {
                        ingElement.remove();
                    }
                });
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

printOrdinations();
