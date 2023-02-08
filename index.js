const operaciones = document.querySelector(".operaciones");
const resultados = document.querySelector(".resultados");
const teclas = document.querySelectorAll(".teclas");

teclas.forEach((tecla) => {
  tecla.addEventListener("click", (event) => {
    const teclaPresionada = event.target.innerText;
    switch (teclaPresionada) {
      case "AC":
        operaciones.value = "";
        resultados.value = "";
        break;
      case "=":
        try {
          resultados.value = eval(operaciones.value);
        } catch (e) {
          resultados.value = "Error";
        }
        break;
      case "⌫":
        operaciones.value = operaciones.value.slice(0, -1);
        break;
      default:
        operaciones.value += teclaPresionada;
    }
  });
});
