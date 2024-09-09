fetch('api/ordini')
    .then(response => response.json())
    .then(data => {
        let container = document.getElementById('ordini');
        data.forEach(ordine => {
            let ordineDiv = document.createElement('div');
            ordineDiv.classList.add('ordine');

            let title = document.createElement('h2');
            title.textContent = 'Ordine: ' + ordine.cod;
            ordineDiv.appendChild(title);

            let date = document.createElement('p');
            date.textContent = 'Data: ' + ordine.data;
            ordineDiv.appendChild(date);

            let status = document.createElement('p');
            status.textContent = 'Stato:' + ordine.statoOrdine;
            ordineDiv.appendChild(status);

            container.appendChild(ordineDiv);
        });
    });