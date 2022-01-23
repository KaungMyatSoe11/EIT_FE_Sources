const select = document.querySelectorAll(".select-value");
const fromValue = document.getElementById("from-value");
const toValue = document.getElementById("to-value");
const changeSelect = document.querySelector(".convert-icon");
console.log(changeSelect);

changeSelect.onclick = () => {
  const tem = select[0].value;
  select[0].value = select[1].value;
  select[1].value = tem;
  console.log(tem);
};

const load = () => {
  const from = fromValue.getAttribute("placeholder");
  const to = toValue.getAttribute("placeholder");
  fetch(
    `https://currency-converter5.p.rapidapi.com/currency/convert?format=json&from=${select[0].value}&to=${select[1].value}&amount=${from}`,
    {
      method: "GET",
      headers: {
        "x-rapidapi-host": "currency-converter5.p.rapidapi.com",
        "x-rapidapi-key": "ebd0a625c5msh4ace21b8bc7f9cbp1e8213jsn64543325a181",
      },
    }
  )
    .then((response) => response.json())
    .then((res) => {
      const value = Object.values(res.rates);
      const convertValue = value[0].rate_for_amount;
      toValue.placeholder = convertValue;
    })
    .catch((err) => {
      console.error(err);
    });
};

load();

const display = (data) => {
  const entries = Object.entries(data.currencies);
  entries.map((item) => {
    select[0].innerHTML += `<option value="${item[0]}">${item[0]}</option>`;
    select[1].innerHTML += `<option value="${item[0]}">${item[0]}</option>`;
  });
};

fetch("https://currency-converter5.p.rapidapi.com/currency/list", {
  method: "GET",
  headers: {
    "x-rapidapi-host": "currency-converter5.p.rapidapi.com",
    "x-rapidapi-key": "ebd0a625c5msh4ace21b8bc7f9cbp1e8213jsn64543325a181",
  },
})
  .then((data) => data.json())
  .then((data) => {
    display(data);
  })
  .catch((err) => {
    console.error(err);
  });

const currencyConvert = (valueEl, from, to, changeEl) => {
  let convertValue;

  const fromValue = from.value;
  const toValue = to.value;
  const amount = valueEl.value;
  fetch(
    `https://currency-converter5.p.rapidapi.com/currency/convert?format=json&from=${fromValue}&to=${toValue}&amount=${amount}`,
    {
      method: "GET",
      headers: {
        "x-rapidapi-host": "currency-converter5.p.rapidapi.com",
        "x-rapidapi-key": "ebd0a625c5msh4ace21b8bc7f9cbp1e8213jsn64543325a181",
      },
    }
  )
    .then((response) => response.json())
    .then((res) => {
      const value = Object.values(res.rates);
      convertValue = value[0].rate_for_amount;
      changeEl.value = convertValue;
    })
    .catch((err) => {
      console.error(err);
    });
};

toValue.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    currencyConvert(toValue, select[1], select[0], fromValue);
  }
});

fromValue.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    currencyConvert(fromValue, select[0], select[1], toValue);
  }
});
