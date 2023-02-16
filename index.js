const operaciones = document.querySelector(".operaciones");
const resultados = document.querySelector(".resultados");
const teclas = document.querySelectorAll(".teclas");
let esperandoNumeroParaRaiz = false;

teclas.forEach((tecla) => {
  tecla.addEventListener("click", (event) => {
    const teclaPresionada = event.target.innerText;
    switch (teclaPresionada) {
      case "AC":
        operaciones.value = "";
        resultados.value = "";
        esperandoNumeroParaRaiz = false;
        break;
      case "√":
        esperandoNumeroParaRaiz = true;
        break;
      case "𝜋":
        operaciones.value += "math.pi";
        esperandoNumeroParaRaiz = false;
        break;
      case "=":
        try {
          const expresion = operaciones.value;
          console.log(expresion);
          // Usamos math.evaluate en lugar de eval para evaluar la expresión matemática
          resultados.value = math.evaluate(expresion);
        } catch (e) {
          resultados.value = "Error";
        }
        esperandoNumeroParaRaiz = false;
        break;
      case "⌫":
        operaciones.value = operaciones.value.slice(0, -1);
        esperandoNumeroParaRaiz = false;
        break;
      default:
        if (esperandoNumeroParaRaiz) {
          operaciones.value += `sqrt(${teclaPresionada})`;
          esperandoNumeroParaRaiz = false;
        } else {
          operaciones.value += teclaPresionada;
        }
    }
  });
});
