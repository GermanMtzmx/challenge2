'use strict';
const modal = document.getElementById('modalDescription');
const modalClose = document.getElementsByClassName("close")[0];
const images = document.getElementsByTagName('img');
const container = document.getElementById('cont_gal');


// set initial data
(function setInitialData(obj){
	let initialExist = window.localStorage.getItem('data');
	
	if(initialExist){
		console.log("localStorage exists");
		window.myData = JSON.parse(initialExist);

	} else {
		console.log("set localStorage");
		let initData = {
			user: "Usuario de prueba juanito",
			title: "Mis paisajes",
			gallery:[
				
				{	
					id:"img1",
					name:"Paisaje uno",
					src:'img/img1.jpg',
					description:"Imagen de paisaje uno",
					comments: [],
					likes:0,


				},

				{
					id:"img2",
					name:"Paisaje dos",
					src:'img/img2.jpg',
					description:"Imagen de paisaje dos",
					comments:[],
					likes:0,

				},

				{	id:"img3",
					name:"Paisaje tres",
					src:'img/img3.jpg',
					description:"Imagen de paisaje tres",
					comments:[],
					likes:0,

				},

				{	id:"img4",
					name:"Paisaje cuatro",
					src:'img/img4.jpg',
					description:"Imagen de paisaje cuatro",
					comments:[],
					likes:0,


				},
				
				{	id:"img5",
					name:"Paisaje cinco",
					src:'img/img5.jpg',
					description:"Imagen de paisaje cinco",
					comments:[],
					likes:0,

				},
				{	id:"img6",
					name:"Paisaje seis",
					src:'img/img6.jpg',
					description:"Imagen de paisaje seis",
					comments:[],
					likes:0,

				},

				{	id:"img7",
					name:"Paisaje siete",
					src:'img/img7.jpg',
					description:"Imagen de paisaje siete",
					comments:[],
					likes:0,

				},

				{	id:"img8",
					name:"Paisaje ocho",
					src:'img/img8.jpg',
					description:"Imagen de paisaje ocho",
					comments:[],
					likes:0,

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
			image.addEventListener('click',openModal);

			let name = document.createElement('p');
			name.innerHTML = currentImage.name;
			let description = document.createElement('p');
			description.innerHTML = currentImage.description
			description.classList.add('photoDescription');

			let likeContainer = document.createElement('div');
			likeContainer.classList.add('iconContainer');
			let likeIcon = document.createElement('i');
			likeIcon.classList.add('fa','fa-thumbs-o-up','likeIcon');
			likeIcon.setAttribute('data-id',currentImage.id);
			let likeCounter = document.createElement('span');
			likeCounter.classList.add('counter');
			likeCounter.id = "counter-"+currentImage.id;
			likeCounter.innerHTML = 'likes:' + currentImage.likes;

			// let dislikeIcon = document.createElement('i');
			// dislikeIcon.classList.add('fa','fa-thumbs-o-down','dislikeIcon');
			// dislikeIcon.setAttribute('data-id',currentImage.id);

			// likeContainer.append(likeIcon);
			likeContainer.append(likeIcon);
			likeContainer.append(likeCounter);

			container.append(image);
			container.append(name);
			container.append(description);
			container.append(likeContainer);
			el.append(container);
		}
	}

	function getObjectById(id){
		for(let i of window.myData.gallery){
			if(i.id  == id){
				
				return i;
			}
		}
	}

	function saveLocalStorage(){
		window.localStorage.setItem('data',JSON.stringify(window.myData));
	}

	function addLikes(){

		let current = this.getAttribute('data-id');
		console.log(current);
		let object = getObjectById(current);
		object.likes += 1;
		document.getElementById('counter-'+current).innerHTML = 'likes: '+ object.likes;
		document.getElementById('totalCounterL').innerHTML = 'likes: '+ object.likes;

		saveLocalStorage();

	}

	function openModal(){
		let obj = getObjectById(this.id);
		let modal = document.getElementById('modalDescription');
		let currentElement = document.getElementById(this.id);
		let modalImg = document.getElementById("img01");
		let desc = document.getElementById('imagDescription');
		let nlikes = document.getElementById('totalCounterL');
		let visor = document.getElementById('likeVisor');
		modal.classList.add('modal-show');
		modalImg.src = currentElement.src;
		modalImg.alt = currentElement.alt;
		desc.innerHTML = obj.description;
		visor.setAttribute('data-id',obj.id);
		nlikes.innerHTML = obj.likes + " likes"; 
	}

	function closeModal(){
		modal.classList.remove('modal-show');
		
	}

	return {
		render:render,
		openModal:openModal,
		closeModal:closeModal,
		getObjectById:getObjectById,
		addLikes:addLikes,
	};
}

//call render and do stuff
const init = new ModalTools();
init.render(container);
modalClose.addEventListener('click',init.closeModal);

//set icon events
const likeIcons = document.getElementsByClassName('likeIcon');
const likevisor = document.getElementById('likeVisor');
console.log(likevisor);
likevisor.addEventListener('click',init.addLikes);

for (let l of likeIcons){
	l.addEventListener('click',init.addLikes);
}


