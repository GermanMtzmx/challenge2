var modal = document.getElementById('modalDescription');

var span = document.getElementsByClassName("close")[0];

span.onclick = function() {
    modal.style.display = "none";
}

var images = document.getElementsByTagName('img');


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
			image.addEventListener('click',openModal);

			let name = document.createElement('p');
			name.innerHTML = currentImage.name;
			let description = document.createElement('p');
			description.innerHTML = currentImage.description
			description.classList.add('photoDescription')

			container.append(image);
			container.append(name);
			container.append(description)
			el.append(container);

		}
	}

	function openModal(){
		let idelement = this.id;

		let modal = document.getElementById('modalDescription');
		let currentElement = document.getElementById(this.id);
		let modalImg = document.getElementById("img01");
		modal.style.display = "block";
		modalImg.src = currentElement.src;
		modalImg.alt = currentElement.alt;

		//agregar un nuevo comments GERARDO
		//resetear coments
		var contenedorcomments = document.getElementById("comments");
		if ( contenedorcomments.hasChildNodes() )
		{
			while ( contenedorcomments.childNodes.length >= 1 )
			{
				contenedorcomments.removeChild(contenedorcomments.firstChild);
			}
		}

		//agregar el textarea
		let inputcomment = document.createElement('textarea');
		inputcomment.classList.add('textcomm');
		contenedorcomments.append(inputcomment);


		let newcomm = document.getElementsByTagName('textarea');
		newcomm[0].addEventListener('keypress',addComment);

		var indexphoto;
		for (var i=0;i < window.myData.gallery.length; i++) {
				if (window.myData.gallery[i].id === idelement) {
					indexphoto = i;
					}
				}
		console.log(indexphoto);

		viewcomments(window.myData.gallery[indexphoto].comments);


		function viewcomments(objphoto) {
		  if (objphoto.length > 0) {
		    for(let i in objphoto){
		      console.log(objphoto[i].comentario);

		      let cont_comm = document.getElementById('comments');
		      let currentcomm = objphoto[i];
		      let userpost = document.createElement('div');
		      userpost.classList.add('userpost');
		      let imguser = document.createElement('div');
		      imguser.classList.add('imguser');
		      let imgcom = document.createElement('img');
		      imgcom.classList.add('photocomm');
		      imgcom.src = currentcomm.pathphoto;
		      imgcom.alt = currentcomm.usuario;
		      let usercomment = document.createElement('div');
		      usercomment.innerHTML = currentcomm.comentario;
		      usercomment.classList.add('usercomment');

		      imguser.append(imgcom);
		      userpost.append(imguser)
		      userpost.append(usercomment);
		      cont_comm.append(userpost);
		    }
		  }
		}

		function addComment(e){
			if (e.keyCode === 13) {
				e.preventDefault();
				// agregar comment a la lista de comments
				let comentnew = {"usuario":"Mark","pathphoto":"img/mark.jpeg","comentario":newcomm[0].value};
				paintcomment(window.myData.gallery[indexphoto].comments, comentnew);
				newcomm[0].value = "";
			} else {
				return false;
			}

		}

		//mostrar comments agregados
		function paintcomment(objphoto, com_new) {
			let cont_comm = document.getElementById('comments');
			let userpost = document.createElement('div');
			userpost.classList.add('userpost');
			let imguser = document.createElement('div');
			imguser.classList.add('imguser');
			let imgcom = document.createElement('img');
			imgcom.classList.add('photocomm');
			imgcom.src = com_new.pathphoto;
			imgcom.alt = com_new.usuario;
			let usercomment = document.createElement('div');
			usercomment.innerHTML = com_new.comentario;
			usercomment.classList.add('usercomment');

			cont_comm.append(userpost);
			userpost.append(imguser)
			userpost.append(usercomment);
			imguser.append(imgcom);
			window.myData.gallery[indexphoto].comments.push(com_new);
		}

	}

	function closeModal(){
		console.log("modal closed");
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
