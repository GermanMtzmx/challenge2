'use strict';
const modal = document.getElementById('modalDescription');
const modalClose = document.getElementsByClassName("close")[0];
const images = document.getElementsByTagName('img');
const container = document.getElementById('cont_gal');


// set initial data
(function setInitialData(){
	let initialExist = window.localStorage.getItem('data');
	
	if(initialExist){
		console.log("localStorage exists");
		window.myData = JSON.parse(initialExist);

	} else {
		console.log("set localStorage");
		let initData = {
			user: "Mark sukaritas",
			title: "Mis paisajes",
			img: 'img/profile.jpg',
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

	document.getObjectById = function (id){
		for(let i of window.myData.gallery){
			if(i.id  == id){
				
				return i;
			}
		}
	};

	window.saveLocalStorage = function saveLocalStorage(){
		window.localStorage.setItem('data',JSON.stringify(window.myData));
	};

})(window,document);

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

	function addLikes(){

		let current = this.getAttribute('data-id');
		let object = document.getObjectById(current);
		object.likes += 1;
		document.getElementById('counter-'+current).innerHTML = 'likes: '+ object.likes;
		document.getElementById('totalCounterL').innerHTML = 'likes: '+ object.likes;

		window.saveLocalStorage();

	}

	function addComments(e){
		
		if(e.keyCode == 13 && this.value != ''){

			let current = this.getAttribute('data-id');
			let object = document.getObjectById(current);
			let val = this.value;
			let commentContainer = document.getElementsByClassName('comments')[0];
			let commentBox = document.createElement('div');
			let imageComenter = document.createElement('img');
			let nameCommenter = document.createElement('strong');
			let textComment = document.createElement('p');
			object.comments.push(val);

			commentBox.classList.add('comment');
			imageComenter.src = 'img/steve.jpg';
			imageComenter.classList.add('imgC');
			nameCommenter.innerHTML = "Steve chambitas";
			textComment.innerHTML = val;

			object.comments.length > 4 ? commentContainer.style.overflowY = 'scroll' : console.log('none');
			
			commentBox.append(imageComenter);
			commentBox.append(nameCommenter);
			commentBox.append(textComment);

			commentContainer.append(commentBox);

			window.saveLocalStorage();
			this.value = '';
		}

		
	}

	function openModal(){
		let obj = document.getObjectById(this.id);
		let modal = document.getElementById('modalDescription');
		let currentElement = document.getElementById(this.id);
		let modalImg = document.getElementById("img01");
		let desc = document.getElementById('imagDescription');
		let nlikes = document.getElementById('totalCounterL');
		let visor = document.getElementById('likeVisor');
		let commentInput = document.getElementById('commentBox');
		let nameProfile = document.getElementById('textProfile');

		nameProfile.innerHTML = window.myData.user;
		commentInput.setAttribute('data-id',obj.id);
		modal.classList.add('modal-show');
		modalImg.src = currentElement.src;
		modalImg.alt = currentElement.alt;
		desc.innerHTML = obj.description;
		visor.setAttribute('data-id',obj.id);
		nlikes.innerHTML = obj.likes + " likes";
		const commentContainer = document.getElementsByClassName('comments')[0];
	
		//draw existents comments
		obj.comments.length > 4 ? commentContainer.style.overflowY = 'scroll' : console.log('none');
		for(let item of obj.comments){

			let commentBox = document.createElement('div');
			let imageComenter = document.createElement('img');
			let nameCommenter = document.createElement('strong');
			let textComment = document.createElement('p');

			commentBox.classList.add('comment');
			imageComenter.src = 'img/steve.jpg';
			imageComenter.classList.add('imgC');
			nameCommenter.innerHTML = "Steve chambitas";
			textComment.innerHTML = item;

			commentBox.append(imageComenter);
			commentBox.append(nameCommenter);
			commentBox.append(textComment);

			commentContainer.append(commentBox);
		}
	}

	function closeModal(){
		modal.classList.remove('modal-show');
		const commentContainer = document.getElementsByClassName('comments')[0];
		//clean modal comment container
		while (commentContainer.firstChild) {
		    commentContainer.removeChild(commentContainer.firstChild);
		}	
		document.getElementById('inputComments').classList.remove('makevisible');
	}

	return {
		render:render,
		openModal:openModal,
		closeModal:closeModal,
		addLikes:addLikes,
		addComments:addComments,
	};
}

//call render and do stuff
const init = new ModalTools();
init.render(container);
modalClose.addEventListener('click',init.closeModal);

//set icon events
const likeIcons = document.getElementsByClassName('likeIcon');
const likevisor = document.getElementById('likeVisor');
const commentInt = document.getElementById('commentBox');

likevisor.addEventListener('click',init.addLikes);
commentInt.addEventListener('keypress',init.addComments);

for (let l of likeIcons){
	l.addEventListener('click',init.addLikes);
}

document.getElementById('toggleComment').addEventListener('click',function(){
	document.getElementById('inputComments').classList.add('makevisible');
});

