function convertNumberToWords(number) {
  return new Promise((resolve, reject) => {
    if (!Number.isInteger(number)) {
      reject("Erro: O valor fornecido não é um número inteiro.");
      return;
    }

    const xhr = new XMLHttpRequest();
    const url = "https://www.dataaccess.com/webservicesserver/NumberConversion.wso";
    
   
    const soapRequest = `
      <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
        <soap:Body>
          <NumberToWords xmlns="http://www.dataaccess.com/webservicesserver/">
            <ubiNum>${number}</ubiNum>
          </NumberToWords>
        </soap:Body>
      </soap:Envelope>`;

    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
    xhr.setRequestHeader("SOAPAction", "http://www.dataaccess.com/webservicesserver/NumberToWords");

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          try {
            const xmlDoc = xhr.responseXML;
            const resultNode = xmlDoc.getElementsByTagName("NumberToWordsResult")[0];
            if (resultNode) {
              resolve(resultNode.textContent.trim());
            } else {
              reject("Erro: Resposta do servidor não contém o resultado esperado.");
            }
          } catch (e) {
            reject("Erro ao processar a resposta XML: " + e.message);
          }
        } else {
          reject(`Erro HTTP ${xhr.status}: ${xhr.statusText}`);
        }
      }
    };

    xhr.onerror = function () {
      reject("Erro na requisição SOAP.");
    };

    xhr.send(soapRequest);
  });
}
