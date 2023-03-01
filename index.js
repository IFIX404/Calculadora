// Selecciona los elementos del DOM con las clases "operaciones", "resultados" y todos los elementos con la clase "teclas"
const operaciones = document.querySelector(".operaciones");
const resultados = document.querySelector(".resultados");
const teclas = document.querySelectorAll(".teclas");

// Este objeto asigna un identificador a cada tecla que se va a utilizar en la calculadora
const teclasBotones = {
  "Enter": "equals",
  "Backspace": "backspace",
  "Escape": "clear",
  "!": "exclamation",
  "p": "pi",
  "^": "power",
  "(": "left-paren",
  ")": "right-paren",
  "%": "percent",
  "/": "divide",
  "*": "multiply",
  "-": "subtract",
  "+": "add",
  ".": "decimal",
  "0": "zero",
  "1": "one",
  "2": "two",
  "3": "three",
  "4": "four",
  "5": "five",
  "6": "six",
  "7": "seven",
  "8": "eight",
  "9": "nine"
};

// Variable que almacena la última tecla presionada
let ultimaTeclaPresionada = '';
// Variable que almacena el último operador utilizado
let operador = '';

// Este objeto define las funciones que se ejecutarán cuando se presione cada tecla
const actions = {
  // Función para borrar todo el contenido de la calculadora
  AC: () => {
    operaciones.value = "";
    resultados.value = "";
  },
  // Función para calcular el factorial de un número
  "!": () => {
    const num = parseInt(operaciones.value);
    if (!isNaN(num)) {
      const result = factorial(num);
      resultados.value = result;
      operaciones.value = `${num}!`;
    }
  },
  // Función para agregar el símbolo de pi a la operación
  "𝜋": () => {
    operaciones.value += "π";
  },
  // Función para evaluar la operación
  "=": () => {
    try {
      // Reemplaza el símbolo de pi por su valor numérico en la expresión
      const expresion = operaciones.value.replace(/π/, "(3.1415927)");
      // Evalúa la expresión matemática utilizando la biblioteca math.js
      resultados.value = math.evaluate(expresion);
    } catch (e) {
      resultados.value = "Error";
    }
  },
  // Función para borrar el último carácter de la operación
  "⌫": () => {
    operaciones.value = operaciones.value.slice(0, -1);
  },

  // La función "default" maneja el evento de presionar una tecla en la calculadora.
  default: (teclaPresionada) => {
    // Si se presiona un dígito o "π", o si aún no se ha agregado ninguna operación y se presiona "-", "√" o "(",
    // entonces se agrega la tecla presionada a la cadena de operaciones.
    if (/[\dπ]/.test(teclaPresionada) || (!operaciones.value && /[-√(]/.test(teclaPresionada))) {
      operaciones.value += teclaPresionada;
    }
    // Si se presiona un operador aritmético ("+", "-", "*", "/", "%", "^") y el último carácter de la cadena de operaciones es un dígito o "π",
    // entonces se agrega la tecla presionada a la cadena de operaciones y se almacena como el operador actual.
    else if (/[\+\-\*\/%\^]/.test(teclaPresionada) && /[\dπ)]/.test(operaciones.value.slice(-1))) {
      operaciones.value += teclaPresionada;
      operador = teclaPresionada;
    }
    // Si se presiona ".", se agrega a la cadena de operaciones.
    else if (teclaPresionada === '.' && !/\./.test(operaciones.value.slice(-1))) {
      operaciones.value += teclaPresionada;
    }    
    // Si se presiona "(", se agrega a la cadena de operaciones.
    else if (teclaPresionada === '(') {
      operaciones.value += teclaPresionada;
    }
    // Si se presiona ")", se agrega a la cadena de operaciones solo si el número de paréntesis abiertos es mayor que el número de paréntesis cerrados.
    else if (teclaPresionada === ')') {
      if (operaciones.value.split('(').length > operaciones.value.split(')').length) {
        operaciones.value += teclaPresionada;
      }
    }
  }
}  

teclas.forEach((tecla) => {
  tecla.addEventListener("click", (event) => {
    const teclaPresionada = event.target.innerText;
    const action = actions[teclaPresionada] || actions.default;
    action(teclaPresionada);
    tecla.blur();
  });
});

function factorial(n) {
  if (n < 0) {
    return "Error";
  } else if (n === 0) {
    return 1;
  } else {
    return n * factorial(n - 1);
  }
}

function clickBoton(id) {
  const boton = document.getElementById(id);
  boton.click();
}

document.addEventListener('keydown', function(event) {
  const tecla = event.key;
  if (teclasBotones.hasOwnProperty(tecla)) {
    const idBoton = teclasBotones[tecla];
    clickBoton(idBoton);
  }
});