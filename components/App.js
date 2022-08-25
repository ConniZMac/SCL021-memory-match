import pixar from "../data/pixar/pixar.js";
//console.log(pixar);
const imageback = pixar.ball[0].image; //la imagen de la pelota, la que se ve al comienzo del juego
let selectedCards = []; // arreglo vacio, es la mano donde vn las cartas
let CantidadFinal = 0; // si llega el contador a cero

let validarFinJuego = () => {
  CantidadFinal++; // se va sumando la carta
  if (CantidadFinal === 10) {
    document.getElementById("you-win").style.display = "block"; // Funcion que reconoce los pares para la victoria.
  }
};

const popup = document.querySelector("#popup");
const instrucciones = document.querySelector(".instrucciones");
const cerrar = document.querySelector(".boton2");
//funciones para crear el popUp

instrucciones.addEventListener("click", () => {
  popup.show(); // evento click pop up
});
cerrar.addEventListener("click", () => {
  popup.close();
}); //popup con las instrucciones cerrar

let botonJuego = document.querySelector(".boton2"); //creamos la variables y buscamos el botón del html
botonJuego.addEventListener("click", () => {
  let audioUp = document.createElement("audio");
  audioUp.setAttribute("src", "./audio/sonido.mp3");
  audioUp.play(); // boton de audio para ir a juagar
});
const App = () => {
  const container = document.createElement("div"); //container es lo que se muestra en html
  container.className = "container"; //creamos la clase para modificarlo en CSS
  const arrCards = generadorImagenes(pixar.items); //arrCards contiene las imagenes,llamar data
  //arrCards.className = "arrcards";*
  for (let i = 0; i < arrCards.length; i++) {
    /*recorremos el arrCards que contiene la imagenes, y 
  llama las imagenes al container para que se vean en el html */
    container.appendChild(arrCards[i]);
  }
  return container;
};
const generadorImagenes = (data) => {
  //data.sort(() => Math.random() - 0.5); //se crea la funcion que mezcla las cartas
  const arrCards = []; //*
  let contadorDeIntentos = 2;
  let intentos = document.querySelector(".intentos");
  intentos.textContent = "intentos:" + contadorDeIntentos;
  //console.log (intentos)

  data.forEach((item) => {
    //Que recorra carta por carta
    const carta = document.createElement("div");
    carta.className = "cartas";
    const front = document.createElement("div");
    front.className = "front";
    const imgFront = document.createElement("img");
    imgFront.className = "frontimg";
    imgFront.setAttribute("src", imageback);
    imgFront.addEventListener("click", function () {
      selectedCards.push(imgFront);
      //console.log(selectedCards);<
      if (contadorDeIntentos > 0) {
        imgFront.setAttribute("src", item.image);// se "bloquee la imagen y aparezca solo imagen de la pelota"
        if (selectedCards.length === 2) {
          //que tome dos cartas para luego hacer  "if"
          if (selectedCards[0].src === selectedCards[1].src) {
            //comparamos ambos
            //console.log("match");
            selectedCards = [];
            validarFinJuego(); //Oh, ANdres
          } else {
            contadorDeIntentos--;
            intentos.textContent = "intentos:" + contadorDeIntentos;
            //console.log (contadorDeIntentos)
            if (contadorDeIntentos === 0) {
              document.getElementById("you-lose").style.display = "block";
            }
            setTimeout(() => {
              selectedCards[0].setAttribute("src", imageback);
              selectedCards[1].setAttribute("src", imageback);
              selectedCards = [];
            }, 1000);
            //que se devuelva a la imagen de la pelota
          }
        }
      } else {
        selectedCards[0].setAttribute("src", imageback);

        selectedCards = [];
      }
    });
    front.appendChild(imgFront); //*revisar

    const back = document.createElement("div");

    carta.appendChild(front);
    carta.appendChild(back);

    arrCards.push(carta);
  });

  return arrCards;
};
export default App;
