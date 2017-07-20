//container 
const container = document.getElementById('gallery');
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
					id:"#img1",
					name:"Paisaje uno",
					src:'img/img1.jpg',
					description:"Imagen de paisaje uno",
					comments: [],


				},

				{
					id:"#img2",
					name:"Paisaje dos",
					src:'img/img2.jpg',
					description:"Imagen de paisaje dos",
					comments:[],
				},

				{	id:"#img3",
					name:"Paisaje tres",
					src:'img/img3.jpg',
					description:"Imagen de paisaje tres",
					comments:[]
				}
			],
		}
		window.localStorage.setItem('data',JSON.stringify(initData));
		window.myData = JSON.parse(window.localStorage.getItem('data'))
	}

})(window);

// tools utility
function ModalTools(){

	function render(el){
		const data = window.myData

		for(let i in data.gallery){
			let currentImage = data.gallery[i];
			img = document.createElement('img');
			img.src = currentImage.src;
			el.appendChild(img);
			
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
init.render();

