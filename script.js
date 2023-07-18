const searchButton = document.querySelector("#searchButton");
const countryInput = document.querySelector("#countryInput");
const resultDiv = document.querySelector("#result");

searchButton.addEventListener("click", () => {
  const countryName = countryInput.value;

  if (countryName) {
    showLoader();
    fetchCountryData(countryName)
      .then((data) => displayCountryData(data))
      .catch((error) => console.error(error))
      .finally(hideLoader);
  }
});

function fetchCountryData(countryName) {
  const url = `https://restcountries.com/v3.1/name/${encodeURIComponent(
    countryName
  )}`;
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Country not found...");
      }
      return response.json();
    })
    .then((data) => data[0])
    .catch((error) => {
      resultDiv.textContent = `Error: ${error.message}`;
      throw error;
    });
}

function displayCountryData(data) {
  const { name, capital, region, flags } = data;
  resultDiv.innerHTML = `
    <h2>${name.common}</h2>
    <p>Capital: ${capital}</p>
    <p>Continent: ${region}</p>
    <img src="${flags.svg}" alt="Flag" width="150" height="120">
  `;
}

function showLoader() {
  const loader = document.createElement("div");
  loader.id = "loader";
  loader.textContent = "Loading...";
  resultDiv.innerHTML = "";
  resultDiv.appendChild(loader);
}

function hideLoader() {
  const loader = document.getElementById("loader");
  if (loader) {
    loader.remove();
  }
}

countryInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    searchButton.click();
  }
});
