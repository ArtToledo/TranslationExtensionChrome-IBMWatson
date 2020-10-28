const urlAccessIBM = '{URL-API}/v3/translate?version=2018-05-01'; // Url de acesso do serviço da IBM, a mesma deve ficar da seguinte forma: {URL-API}/v3/translate?version=2018-05-01
const urlProxyCors = 'https://cors-anywhere.herokuapp.com/'; // Limitada a 200 acessos a cada 60 minutos, porém você pode criar a sua seguindo os passos do sideshowbarker no link https://stackoverflow.com/questions/43262121/trying-to-use-fetch-and-pass-in-mode-no-cors
const queryURL = urlProxyCors + urlAccessIBM;

async function translate(textToBeTranslated) {
  const resultTextArea = document.getElementById('translatedText');

  let data = {
    text: textToBeTranslated,
    model_id: 'en-pt' // De inglês para português, mais informações -> https://cloud.ibm.com/docs/language-translator?topic=language-translator-customizing
  };

  $.ajax({
    url: queryURL,
    method: 'POST',
    dataType: 'json',
    headers: {
      'x-requested-with': 'xhr',
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa('apikey' + ':' + '<API-KEY>')
    },
    data: JSON.stringify(data),
  }).success(function(response) {
    resultTextArea.innerHTML = response.translations[0].translation;
  }).fail(function(jqXHR, textStatus) {
    resultTextArea.innerHTML = 'Erro na hora de traduzir, tente novamente!';
  });
}

document.addEventListener('DOMContentLoaded', function() {
  const translateButton = document.getElementById('buttonTranslate');
  const textEnglish = document.getElementById('textEnglish');

  translateButton.addEventListener('click', function() {
    translate(textEnglish.value);
  }, false);
}, false);
