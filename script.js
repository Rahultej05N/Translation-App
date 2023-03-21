const apiKey = "a7b7fdc582msh79e15af93c4958ep195a80jsn4bae57fe7554";
const apiUrl = "https://google-translate1.p.rapidapi.com/language/translate/v2";

const form = document.getElementById("translation-form");
const sourceText = document.getElementById("source-text");
const targetLanguage = document.getElementById("target-language");
const translatedText = document.getElementById("translated-text");




form.addEventListener("submit", (event) => {
  const encodedParams = new URLSearchParams();
  event.preventDefault();
  console.log(sourceText.value);
  encodedParams.append("q", sourceText.value);
  encodedParams.append("target", targetLanguage.value);
  encodedParams.append("source", "en");

  const options = {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "Accept-Encoding": "application/gzip",
      "X-RapidAPI-Key": apiKey,
      "X-RapidAPI-Host": "google-translate1.p.rapidapi.com",
    },
    body: encodedParams,
  };

  translateText(options)
    .then((translation) => {
      translatedText.innerText = translation;
    })
    .catch((error) => {
      console.error(error);
      translatedText.innerText ="Error translating text.";
    });
});

async function translateText(options) {
  const response = await fetch(apiUrl,options);

  const json = await response.json();
  const translatedText = json.data.translations[0].translatedText;
  return translatedText;
}
