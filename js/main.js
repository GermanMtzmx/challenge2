var modal = document.getElementById('modalDescription');

var span = document.getElementsByClassName("close")[0];

span.onclick = function() { 
    modal.style.display = "none";
}

var images = document.getElementsByTagName('img');
var modalImg = document.getElementById("img01");
var i;
for (i = 0; i < images.length; i++) {
   images[i].onclick = function(){
       modal.style.display = "block";
       modalImg.src = this.src;
       modalImg.alt = this.alt;
   }
}