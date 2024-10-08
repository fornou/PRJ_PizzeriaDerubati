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
