(function getJWT () {
  var XHR = new XMLHttpRequest();
  var origin = document.getElementById('origin');
  var path = origin.textContent;
  

  XHR.open('GET', path, true);

  // XHR.setRequestHeader('X-Request-Mode', 'token-delivery');
  // XHR.setRequestHeader('X-Access-Token', localStorage.getItem('secret_sauce') || '');
  XHR.setRequestHeader('X-Origin', origin.textContent);
  XHR.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('secret_sauce') || ''}`);

  XHR.onreadystatechange = function () {
    if (XHR.status >= 400) {
      console.log('There was an error');
    }

    if (XHR.readyState === 4) {
      console.log(XHR.responseText);
      document.write(XHR.responseText);
    }
  };

  XHR.send(null);
})();