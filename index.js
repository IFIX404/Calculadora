const operaciones = document.querySelector(".operaciones");
const resultados = document.querySelector(".resultados");
const teclas = document.querySelectorAll(".teclas");
const teclasBotones = {
  "Enter": "equals",
  "Backspace": "backspace",
  "Escape": "clear",
  "s": "sqrt",
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

let ultimaTeclaPresionada = '';
let operador = '';

const actions = {
  AC: () => {
    operaciones.value = "";
    resultados.value = "";
  },
  "√": () => {
    operador = '√';
    resultados.value = '';
    operaciones.value += "√";
  },
  "𝜋": () => {
    operaciones.value += "π";
  },
  "=": () => {
    try {
      const expresion = operaciones.value.replace(/π/, "(3.1415927)");
      resultados.value = math.evaluate(expresion);
    } catch (e) {
      resultados.value = "Error";
    }
  },
  "⌫": () => {
    operaciones.value = operaciones.value.slice(0, -1);
  },
  default: (teclaPresionada) => {
    if (/[\dπ]/.test(teclaPresionada) || (!operaciones.value && /[-√]/.test(teclaPresionada))) {
      operaciones.value += teclaPresionada;
      if (operador === '√') {
        resultados.value = math.evaluate(`sqrt(${teclaPresionada})`);
        operador = '';
      }
    } else if (/[\+\-\*\/%\^]/.test(teclaPresionada) && /[\dπ]/.test(operaciones.value.slice(-1))) {
      operaciones.value += teclaPresionada;
      operador = teclaPresionada;
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