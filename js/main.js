//container 
const container = document.getElementById('cont_gal');
// set initial data
(function setInitialData(obj){
	let initialExist = window.localStorage.getItem('data');
	
	if(initialExist){
		console.log("localStorage exists");
		console.log(initialExist)
		window.myData = JSON.parse(initialExist);

	} else {
		console.log("set localStorage");
		initData = {
			user: "Usuario de prueba juanito",
			title: "Mis paisajes",
			gallery:[
				
				{	
					id:"img1",
					name:"Paisaje uno",
					src:'img/img1.jpg',
					description:"Imagen de paisaje uno",
					comments: [],


				},

				{
					id:"img2",
					name:"Paisaje dos",
					src:'img/img2.jpg',
					description:"Imagen de paisaje dos",
					comments:[],
				},

				{	id:"img3",
					name:"Paisaje tres",
					src:'img/img3.jpg',
					description:"Imagen de paisaje tres",
					comments:[]
				},

				{	id:"img4",
					name:"Paisaje cuatro",
					src:'img/img4.jpg',
					description:"Imagen de paisaje cuatro",
					comments:[]
				},
				
				{	id:"img5",
					name:"Paisaje cinco",
					src:'img/img5.jpg',
					description:"Imagen de paisaje cinco",
					comments:[]
				},
				{	id:"img6",
					name:"Paisaje seis",
					src:'img/img6.jpg',
					description:"Imagen de paisaje seis",
					comments:[]
				},

				{	id:"img7",
					name:"Paisaje siete",
					src:'img/img7.jpg',
					description:"Imagen de paisaje siete",
					comments:[]
				},

				{	id:"img8",
					name:"Paisaje ocho",
					src:'img/img8.jpg',
					description:"Imagen de paisaje ocho",
					comments:[]
				}																			
			],
		};
		window.localStorage.setItem('data',JSON.stringify(initData));
		window.myData = JSON.parse(window.localStorage.getItem('data'));
	}

})(window);

// tools utility
function ModalTools(){

	function render(el){
		const data = window.myData;

		for(let i in data.gallery){
			let currentImage = data.gallery[i];
			let container = document.createElement('div');
			container.classList.add('photo');
			let image = document.createElement('img');
			image.classList.add('imageSize');
			image.src = currentImage.src;
			image.alt = currentImage.name;
			image.id = currentImage.id;
			let description = document.createElement('p');
			description.innerHTML = currentImage.name;

			container.append(image);
			container.append(description);
			el.append(container);
	
		}
	}

	function openModal(el_id){
		
		let currentElement = document.getElementById(el_id);
		console.log("element is : ",currentElement)
	}

	function closeModal(){
		console.log("modal closed")
	}

	return {
		render:render,
		openModal:openModal,
		closeModal:closeModal
	}
}


//call render and do stuff
init = new ModalTools();
init.render(container);

