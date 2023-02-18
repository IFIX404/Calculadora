const operaciones = document.querySelector(".operaciones");
const resultados = document.querySelector(".resultados");
const teclas = document.querySelectorAll(".teclas");
let operador = '';

teclas.forEach((tecla) => {
  tecla.addEventListener("click", (event) => {
    const teclaPresionada = event.target.innerText;
    switch (teclaPresionada) {
      case "AC":
        operaciones.value = "";
        resultados.value = "";
        break;
      case "√":
        operador = '√';
        resultados.value = '';
        operaciones.value += "√";
        break;
      case "𝜋":
        operaciones.value += "π";
        break;
      case "=":
        try {
          const expresion = operaciones.value.replace(/π/, "(3.1415927)");
          console.log(expresion);
          resultados.value = math.evaluate(expresion);
        } catch (e) {
          resultados.value = "Error";
        }
        break;
      case "⌫":
        operaciones.value = operaciones.value.slice(0, -1);
        break;
      default:
        if (operador === '√') {
          operaciones.value += teclaPresionada;
          resultados.value = math.evaluate(`sqrt(${teclaPresionada})`);
          operador = '';
        } else {
          operaciones.value += teclaPresionada;
        }
    }
  });
});