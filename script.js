(() => {
  /* Data */
  let a = '';
  let b = '';
  let sign = '';
  let finish = false;
  let isSignPrinted = '';


  /* Elements UI */
  const ac = document.querySelector('[data-action="clear"]');
  const backspace = document.querySelector('[data-action="backspace"]');
  const keysList = document.querySelector(".keys");
  const input = document.querySelector(".input");
  const output = document.querySelector(".output");


  /* Events */
  // check if the button is pressed
  ac.addEventListener('click', clearAll);
  backspace.addEventListener('click', deleteOneSymbol);
  keysList.addEventListener('click', calculate);


  /* Functions */
  function clearAll() {
    a = '';
    b = '';
    sign = '';
    finish = false;
    input.textContent = '';
    output.textContent = 0;
  }

  function clearParams() {
    a = '';
    b = '';
    sign = '';
  }

  function deleteOneSymbol() {
    if (a.length > 0) {
      let text = a;
      text = text.slice(0, -1);
      input.textContent = text;
      return a = text;
    }
    else if (a.length > 0 && b.length > 0) {
      let currentInputs = input.textContent;
      let text = b;
      let newCurrentInputs = currentInputs.replace(text, '');
      text = text.slice(0, -1);
      input.textContent = `${newCurrentInputs}${text}`;
      console.log("error!!");
      return b = text;
    }
  }

  function calculate(e) {
    // if pressed not a button
    if (!e.target.classList.contains("key")) {
      alert("No need press this element now. Please press the button!");
      return;
    };

    let isNumber = e.target.classList.contains("number");
    let isOperator = e.target.classList.contains("operator");
    let isAction = e.target.classList.contains("action");

    // write number values
    if (isNumber) {
      // write to a value
      if (b === '' && sign === '') {
        a += e.target.dataset.key;
        console.log(a, b, sign);
        input.textContent = `${a}`;
      }
      else if (a !== '' && b !== '' && finish) {
        b = e.target.dataset.key;
        finish = false;
        console.log(a, b, sign);
        input.textContent = `${b}`;
      }
      else {
        // wtite to b value
        b += e.target.dataset.key;
        console.log(a, b, sign);
        input.textContent = `${a}${sign}${b}`;
      }
    }

    // block multi task
    isSignPrinted = input.textContent.match(/[-,+,x,\/]/gm);
    console.log(isSignPrinted);
    if( a !== '' && b !== '' && sign !== '' && isSignPrinted !== null && e.target.dataset.operator !== '=') return;

    // write operator
    if (isOperator && e.target.dataset.operator !== '=') {
      sign = e.target.dataset.operator;
      console.log(a, b, sign);
      input.textContent += `${sign}`;
    }

    if (isAction && e.target.dataset.action !== 'clear' && e.target.dataset.action !== 'sqrt' && e.target.dataset.action !== 'backspace' ) {
      sign = e.target.dataset.action;
      console.log(a, b, sign);
      input.textContent += `${sign}`;
    }

    if (isAction && e.target.dataset.action === 'sqrt') {
      sign = e.target.textContent;
      console.log(a, b, sign);
      input.textContent += `${sign}`;
    }

    let result = '';

    if (e.target.dataset.operator === '=') { 
      if (b === '') b = a;
      switch (sign) {
        case "+":
          result = (+a) + (+b);
          break;
        case "-":
          result = (+a) - (+b);
          break;
        case "x":
          result = (+a) * (+b);
          break;
        case "/":
          if (b === '0') {
            output.textContent = 'Error';
            a = '';
            b = '';
            sign = '';
            return;
          }
          result = (+a) / (+b);
          break;
        case "exp":
          result = Math.pow((+a), (+b));
          break;
        case "√":
          if (a === '') a = b;
          result = Math.sqrt((+a));
          clearParams();
          break;
      }
      finish = true;
      printIt(result);
    }
  }

  function printIt(val) {
    const value = val.toString();
    console.log(value.length);
    if (value.length > 10) {
      val = val.toFixed(9);
    }
    output.textContent = val;
    input.textContent = '';
    console.log(val);
  }

})();