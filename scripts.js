(function () {
  const order = [...document.getElementsByName("order")];
  const generate = document.getElementById("generate");
  const output = document.getElementById("output");
  const labels = [...document.getElementsByClassName("custom_label")];

  order.forEach((item) => {
    item.onclick = function () {
      order.forEach((radio, index) => {
        if (radio?.checked === true) {
          labels[index].style.filter = "brightness(1)";
          labels[index].style.transform = "translateY(-25px)";
        } else {
          radio.checked = false;
          labels[index].style.filter = "brightness(0.5)";
          labels[index].style.transform = "translateY(0)";
        }
      });
    };
  });
  generate.onclick = function () {
    const level = order.filter((radio) => radio?.checked === true);

    if (level.length === 0) {
      alert("Por favor, selecione um valor numérico.");
    } else {
      fetch("./server.php?level=" + level[0].value)
        .then((response) => response.json())
        .then(async (json) => {
          const textArray = json.markov.split("");
          const oldTextArray = output.value.split("");

          generate.disabled = true;

          for (let letter of oldTextArray) {
            output.value = output.value.slice(0, -1);
            await new Promise((resolve) => setTimeout(resolve, 5));
          }

          for (let letter of textArray) {
            output.value += letter;
            output.scrollTop = output.scrollHeight;
            await new Promise((resolve) => setTimeout(resolve, 50));
          }

          generate.disabled = false;
        });
    }
  };
})();
