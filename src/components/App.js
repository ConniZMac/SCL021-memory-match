import pixar from "../data/pixar/pixar.js";
const imageback= pixar.ball[0].image;
console.log(imageback)
let botonJuego = document.querySelector(".instrucciones")
botonJuego.addEventListener("click", () => {
    let audioUp = document.createElement("audio")
    audioUp.setAttribute("src","sonido.mp3")
    audioUp.play();
})
//console.log(pixar);
let nombre = window.prompt("Ingresa tu nombre");

alert("Bienvenida, " + nombre + " a jugar Memory-Match Pixar!");

const App = () => {
  
  const container = document.createElement("div");//creamos el container de las imagenes
  container.className = "container";// cremos la clase container, para modificarlo en css
  const arrCards = generadorImagenes(pixar.items);
  arrCards.className = "arrcards";// Contiene las imagenes
  for (let i = 0; i < arrCards.length; i++) {
    container.appendChild(arrCards[i]); //recorremos la data(Array)llama las imagenes al container
  }

  return container;
};

const generadorImagenes = (data) => {
  data.sort(() => Math.random() - 0.5);// Se crea la función que mezcla las cartas.

  const arrCards = [];
  data.forEach((item) => { //llama cada item de la Data.
    const carta = document.createElement("div");
    carta.className = "cartas"; //creamos la variable carta ...creemos que es para darle funcionaladid a la carta , darla vuelta etc...

    const front = document.createElement("div");
    front.className = "front";
    const imgFront = document.createElement("img");
    imgFront.className = "frontimg";
    imgFront.setAttribute("src", imageback);
    imgFront.addEventListener("click",function(event){event.target.setAttribute("src",item.image)})

    front.appendChild(imgFront);

    const back = document.createElement("img");
    back.className="backimg";
    
    carta.classList = "carta";
    front.classList = "front";
    back.classList = "back";

    carta.appendChild(front);
    carta.appendChild(back);

    arrCards.push(carta);
  });

  return arrCards;
};

export default App;
