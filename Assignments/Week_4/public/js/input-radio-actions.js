(function () {
  const inputs = [ ...document.querySelectorAll('input[name=sub-id]') ];
  const subInfo = [ ...document.getElementsByClassName('sub-info') ][0];
  const subInfoHeader = [ ...document.getElementsByClassName('sub-info-header') ][0];
  let subId;

  for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener('change', function (e) {
      subId = inputs[i].value;
      subInfoHeader.textContent = `${subInfoHeader.textContent} blah`;
      subInfo.classList.remove('d-none');
    });
  }
})()