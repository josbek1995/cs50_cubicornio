/* AQUI SE HACE MODIFICACIONES CUANDO LA PAGINA RECIEN HA CARGADO */
//1- onload trigger the javascript code when page starts to run
window.onload = function() {
    /*AQUI SELECCIONAMOS LA ALTURA DE LA IMG COMO VARIABLE*/
    let img = document.getElementById('imagen');
    //here we select the int value of images height
    let h_img = img.offsetHeight;

    /*AQUI SE CAMBIA EL ANCHO DEL DIV DE LA CAPA DERECHA */
     //here we define the div height value of cap_derecha div
     document.getElementById('capa_derecha').style.height = h_img + 'px'; 
/*------------------------------------------------------------------------------------------- */

    /*AQUI SE CAMBIA EL FONTSIZE DE LAS LETRA DINAMICAMENTE CON EL TAMAÑO DE LA IMAGEN */
    //BOTON1
    txt = document.getElementById("btn1");
    //here we obtain the font-size property
    style = window.getComputedStyle(txt, null).getPropertyValue('font-size');
    //with parseFloat the str returned value is now int
    currentSize = parseFloat(style);
    txt.style.fontSize = (h_img/15) + 'px';
    //BOTON2
    txt = document.getElementById("btn2");
    style = window.getComputedStyle(txt, null).getPropertyValue('font-size');
    currentSize = parseFloat(style);
    txt.style.fontSize = (h_img/15) + 'px';
/*------------------------------------------------------------------------------------------- */    
    /*AQUI CAMBIAMOS LOS TITULOS H1 EN TODAS LAS CLASES */
    let group = document.getElementsByClassName("h1_text"); //this return a collection of elements
    
    style2 = window.getComputedStyle(group[0], null).getPropertyValue('font-size');
    currentSize = parseFloat(style2);
    for (var i = 0; i < group.length; i++) 
    {
      var element = group[i];
      element.style.fontSize = (h_img/17) + 'px';
    }
/*------------------------------------------------------------------------------------------- */
    /*AQUI CAMBIAMOS LA ALTURA DE LAS DIV DE LOS TEXTOS */
    // PARA ALINEAR AL MEDIO DE UN DIV ES NECESARIO USAR display PARA CONVERTIRLO A CELDA
    let img2 = document.getElementById('handy');
    let h_img2 = img2.offsetHeight;

    document.getElementById('handy_der').style.height = h_img2 + 'px';

    let img3 = document.getElementById('budget');
    let h_img3 = img3.offsetHeight;

    document.getElementById('budget_izq').style.height = h_img3 + 'px';

  };

/**++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */

/* AQUI SE HACE MODIFICACIONES CUANDO LA PAGINA CAMBIA SU TAMAÑO */
// 2- resize activate the javascript code everytime we modify the viewport size
window.addEventListener('resize', function(event){
    let img = document.getElementById('imagen');
    let h_img = img.offsetHeight;

    /*AQUI SE CAMBIA EL ANCHO DEL DIV DE LA CAPA DERECHA */
    document.getElementById('capa_derecha').style.height = h_img + 'px';
/*------------------------------------------------------------------------------------------- */
    /*AQUI SE CAMBIA EL FONTSIZE DE LAS LETRA DINAMICAMENTE CON EL TAMAÑO DE LA IMAGEN */
    //BOTON1
    txt = document.getElementById("btn1");
    style = window.getComputedStyle(txt, null).getPropertyValue('font-size');
    currentSize = parseFloat(style);
    txt.style.fontSize = (h_img/15) + 'px';
    //BOTON2
    txt = document.getElementById("btn2");
    style = window.getComputedStyle(txt, null).getPropertyValue('font-size');
    currentSize = parseFloat(style);
    txt.style.fontSize = (h_img/15) + 'px';
/*------------------------------------------------------------------------------------------- */

    /*AQUI CAMBIAMOS LOS TITULOS H1 EN TODAS LAS CLASES */
    let group = document.getElementsByClassName("h1_text"); //this return a collection of elements
        
        style2 = window.getComputedStyle(group[0], null).getPropertyValue('font-size');
        currentSize = parseFloat(style2);
        for (var i = 0; i < group.length; i++) 
        {
          var element = group[i];
          element.style.fontSize = (h_img/17) + 'px';
        }
/*------------------------------------------------------------------------------------------- */     

    /*AQUI CAMBIAMOS LA ALTURA DE LAS DIV DE LOS TEXTOS */
    // PARA ALINEAR AL MEDIO DE UN DIV ES NECESARIO USAR display PARA CONVERTIRLO A CELDA
    let img2 = document.getElementById('handy');
    let h_img2 = img2.offsetHeight;

    document.getElementById('handy_der').style.height = h_img2 + 'px';

    let img3 = document.getElementById('budget');
    let h_img3 = img3.offsetHeight;

    document.getElementById('budget_izq').style.height = h_img3 + 'px';

});

/**++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */

// Codigo para generar efecto de escritura

class TypeWriter {
    constructor(txtElement, words, wait = 2000) {
      this.txtElement = txtElement;
      this.words = words;
      this.txt = '';
      this.wordIndex = 0;
      this.wait = parseInt(wait, 10);
      this.type();
      this.isDeleting = false;
    }

// Type Method
    type() {
        // Current index of word
      const current = this.wordIndex % this.words.length;
      // Get full text of current word
      const fullTxt = this.words[current];
        

        // Check if deleting
      if(this.isDeleting) {
        // Remove char
        this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
        // Add char
        this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        // Insert txt into elements
        this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

        //Initial Typespeed
        let typeSpeed = 100;

        if(this.isDeleting) {
            typeSpeed /= 3;
        }

        //Checking is value is complete
        if(!this.isDeleting && this.txt === fullTxt) {
            //Make pause at end
            typeSpeed = this.wait;
            //Set delete to true
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            //Move to the next word
            this.wordIndex++;
            //pause before start typing
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Init On DOM Load
document.addEventListener('DOMContentLoaded', init1);

// Init App
function init1() {
  const txtElement = document.getElementById("phrase1");
  const words = JSON.parse(txtElement.getAttribute('data-words'));
  const wait = txtElement.getAttribute('data-wait');
  // Init TypeWriter
  new TypeWriter(txtElement, words, wait);
}

// Init On DOM Load
document.addEventListener('DOMContentLoaded', init2);

// Init App
function init2() {
  const txtElement = document.getElementById("phrase2");
  const words = JSON.parse(txtElement.getAttribute('data-words'));
  const wait = txtElement.getAttribute('data-wait');
  // Init TypeWriter
  new TypeWriter(txtElement, words, wait);
}
// Init On DOM Load
document.addEventListener('DOMContentLoaded', init3);

// Init App
function init3() {
  const txtElement = document.getElementById("phrase3");
  const words = JSON.parse(txtElement.getAttribute('data-words'));
  const wait = txtElement.getAttribute('data-wait');
  // Init TypeWriter
  new TypeWriter(txtElement, words, wait);
}
// Init On DOM Load
document.addEventListener('DOMContentLoaded', init4);

// Init App
function init4() {
  const txtElement = document.getElementById("phrase4");
  const words = JSON.parse(txtElement.getAttribute('data-words'));
  const wait = txtElement.getAttribute('data-wait');
  // Init TypeWriter
  new TypeWriter(txtElement, words, wait);
}

/*
// Define variables required to init TypeWritter
var y = "";
var functions = []

for(var i = 1; i < document.getElementsByClassName("txt-type").length + 1; i++){
    y = String("phrase" + i);
    functions[i] = function() {
        const txtElement = document.getElementById(y);
        const words = JSON.parse(txtElement.getAttribute('data-words'));
        const wait = txtElement.getAttribute('data-wait');
        // Init TypeWriter
        new TypeWriter(txtElement, words, wait);
    }
    
}

for(var i = 1; i < document.getElementsByClassName("txt-type").length + 1; i++){
    // Init on DOM Load
    document.addEventListener('DOMContentLoaded', functions[i]); 
}
*/