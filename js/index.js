var km = 0;
var mount = true;
var currencyArr = ["platinum", "gold", "silver"];

function createLabel(name, parentEl) {
  let label = document.createElement('div');
  label.innerHTML = name[0].toUpperCase() + name.substring(1);
  label.classList.add("label");
  parentEl.appendChild(label);
}

function createInput(inputName, parentEl, type) {
  // inputHolder
  let inputHolder = document.createElement('div');
  inputHolder.classList.add("inputHolder");

  switch (type) {
    case "field":
      // label
      createLabel(inputName, inputHolder);

      // field
      let field = document.createElement('INPUT');
      field.defaultValue = window[inputName];
      field.type = "number";
      field.classList.add("field");
      field.id = inputName;
      field.onblur = () => {
        if (field.value == '') field.value = 0;
      }
      inputHolder.appendChild(field);
      break;
    case "button":
      // btn
      let btn = document.createElement('button');
      btn.innerText = inputName;
      btn.classList.add("btn");
      btn.onclick = () => {
        mount = document.getElementById("mount").checked;
        km = parseInt(document.getElementById("km").value);

        results.innerHTML = formatResults(getSilverFare());
      }
      inputHolder.appendChild(btn);
      break;
    case "cb":
      // label
      createLabel(inputName, inputHolder, "cb");

      // cb
      let cb = document.createElement('INPUT');
      cb.type = "checkbox";
      cb.checked = true;
      cb.classList.add("cb");
      cb.id = inputName;
      inputHolder.appendChild(cb);
      break;
  }
  
  parentEl.appendChild(inputHolder);
}

function getSilverFare() {
  let totalSilver = Math.round(km/1.60934);

  if (mount) totalSilver *= 2;

  return totalSilver;
}

function formatResults(totalSilver) {
  function splitNumIntoArray(amount) {
    return String(Math.abs(amount)).split(/(\d*(?=\d{2}))?(\d?(?=\d{1}))?(\d?$)?/).filter(Boolean).map((num)=>{
      return Math.sign(amount)*Number(num);
    });
  }

  function getResultStr(silverArr) {
    let str = "";

    silverArr.forEach((digit, i) => {
      if (digit != 0) {
        let curIndex = currencyArr.length - silverArr.length + i;
        if (str.slice(-1) == "p") str += " , ";
        str += "<span>"+digit+"</span>"+currencyArr[curIndex][0]+"p";
      }
    });

    return str;
  }

  return  "<div class=\"result\">"+
            "<span class=\"label\">Fare costs</span>"+
            "<span class=\"amount\">"+getResultStr(splitNumIntoArray(totalSilver))+"</span>"+
          "</div>";
}

/* -- major containers ------------------------------------------------ */

// outer
let outer = document.createElement('div');
outer.classList.add("outer");

// inner
let inner = document.createElement('div');
inner.classList.add("inner");

// inputsHolder
let inputsHolder = document.createElement('div');
inputsHolder.classList.add("inputsHolder");
createInput("km", inputsHolder, "field");

// cbHolder
let cbHolder = document.createElement('div');
cbHolder.classList.add("cbHolder");
createInput("mount", cbHolder, "cb");
inputsHolder.appendChild(cbHolder);

// btnHolder
let btnHolder = document.createElement('div');
btnHolder.classList.add("btnHolder");
createInput("Calculate Fare", btnHolder, "button");
inputsHolder.appendChild(btnHolder);

// results
let results = document.createElement('div');
results.innerHTML = "";
results.classList.add("results");
inputsHolder.appendChild(results);

inner.appendChild(inputsHolder);

/* -- finishing ------------------------------------------------------- */

// close outer
outer.appendChild(inner);
document.body.appendChild(outer);