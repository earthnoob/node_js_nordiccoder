(function setJWT () {
  /* const query = window.location.search.substring(1);
  
  const [finding] = query
    .split('&')
    .map(vars => vars.split('='))
    .filter((vars, index) => vars[0] === variable);
  
  // console.log(finding[1]);

  localStorage.setItem('jwt_token', finding[1]); */

  var token = document.getElementById('token');
  var origin = document.getElementById('origin');
  var currentToken = localStorage.getItem('secret_sauce');

  if (!currentToken|| currentToken !== token.textContent) {
    localStorage.setItem('secret_sauce', token.textContent);
    console.log('set-jwt-token.js: Token set!');
  }
})()