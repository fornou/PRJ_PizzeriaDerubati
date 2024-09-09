const url = '/api/pizze'


	fetch(url).then(res => res.json())
		.then(pizze =>{
			
			for(let i=0; i<pizze.length; i++){
				
				console.log(pizze[i].nome);
			}
			
	

  	})
	

	
	
