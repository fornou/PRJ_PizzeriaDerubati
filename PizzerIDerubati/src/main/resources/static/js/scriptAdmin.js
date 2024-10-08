/*fetch('api/ordini')
    .then(response => response.json())
    .then(data => {

        let container = document.getElementById('products-container');

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
    .catch(error => console.error('Error fetching or processing data:', error));*/
    
fetch('api/ordini')
    .then(response => response.json())
    .then(data => {

        let container = document.getElementById('products-container');

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
                nomePizza.classList.add('pizza');
                nomePizza.textContent = pizzaOrder.pizza.nome;
                ordineDiv.appendChild(nomePizza);
            });

            container.appendChild(ordineDiv);
        });
    })
    .catch(error => console.error('Error fetching or processing data:', error));
