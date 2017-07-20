(function setInitialData(obj){
	let initialExist = window.localStorage.getItem('data');
	
	if(initialExist){
		console.log("localStorage exists");
		window.myData = initialExist
		

	} else {
		console.log("set localStorage");
		initData = {
			user: "Usuario de prueba juanito",
			title: "Mis paisajes",
			galery:[
				
				{
					name:"Paisaje uno",
					src:'/img/img1.jpg',
					description:"Imagen de paisaje uno",

				},

				{
					name:"Paisaje dos",
					src:'/img/img2.jpg',
					description:"Imagen de paisaje dos",
				},

				{
					name:"Paisaje tres",
					src:'/img/img3.jpg',
					description:"Imagen de paisaje tres",
				}
			],
		}
		window.localStorage.setItem('data',JSON.stringify(initData));
		window.myData = JSON.parse(window.localStorage.getItem('data'))
	}

})(window);

const data = window.myData;



