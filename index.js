const operaciones = document.querySelector(".operaciones");
const resultados = document.querySelector(".resultados");
const teclas = document.querySelectorAll(".teclas");
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
      console.log(expresion);
      resultados.value = math.evaluate(expresion);
    } catch (e) {
      resultados.value = "Error";
    }
  },
  "⌫": () => {
    operaciones.value = operaciones.value.slice(0, -1);
  },
  default: (teclaPresionada) => {
    if (operador === '√') {
      operaciones.value += teclaPresionada;
      resultados.value = math.evaluate(`sqrt(${teclaPresionada})`);
      operador = '';
    } else {
      operaciones.value += teclaPresionada;
    }
  }
}

teclas.forEach((tecla) => {
  tecla.addEventListener("click", (event) => {
    const teclaPresionada = event.target.innerText;
    const action = actions[teclaPresionada] || actions.default;
    action(teclaPresionada);
  });
});
