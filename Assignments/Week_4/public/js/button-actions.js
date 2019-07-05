(function () {
  const addXBtn = document.getElementById('add-x-btn');
  const addXCard = document.getElementById('add-x-card');
  const submitXBtn = document.getElementById('submit-x-btn');
  const addXForm = document.getElementById('add-x-form');

  addXBtn.addEventListener('click', function(e) {
    e.preventDefault();
    if (addXCard.classList.contains('d-none')) {
      addXCard.classList.remove('d-none');
    } else {
      addXCard.classList.add('d-none');
    }
  });

  submitXBtn.addEventListener('click', function (e) {
    e.preventDefault();
    addXForm.submit();
    // console.log('FORM SUBMITTED');
  });
  
  /* Could names be any shittier??? */
  const xInfoFormGroupAddBtn = document.getElementById('x-form-group-add-btn');
  const xFormGroup = document.getElementById('x-form-group');
  const xInfo = document.getElementById('x-info');
  const xInput = [ ...document.getElementsByClassName('x-input') ];

  xInfo.removeChild(xInput[0]);

  xInfoFormGroupAddBtn.addEventListener('click', function (e) {
    e.preventDefault();

    const copy = xInput[0].cloneNode(true);
    copy.classList.remove('d-none');

    xInfo.appendChild(copy);
  });
})()