import React from 'react';
import Button from './components/Button';
import Display from './components/Display';

function App() {
  
  const [displayNumber, setDisplayNumber] = React.useState("0"); // This state saves the number to be shown on the display.
  const [formula, setFormula] = React.useState(""); // This state dinamically saves the formula to be calculated.
  const [newNumber, setNewNumber] = React.useState(true); // This state controls whether an input must be treated as a new number or not.
  const [enablePoint, setEnablePoint] = React.useState(true); // This state enable the posibility of write a decimal point.
  const [negativeNumber, setNegativeNumber] = React.useState(false); // This state enable the posibility of manage negative numbers.
  const [resultNumber, setResultNumber] = React.useState(false); // This state controls the behavior of display number after pressing equals button.
  
  const pulseDigit = (event) => {
    if (displayNumber === "0" || newNumber || resultNumber) {
      setDisplayNumber(event.target.textContent);
      setNewNumber(false);
    }
    else {
      setDisplayNumber(displayNumber + event.target.textContent);
    }
    setResultNumber(false);
  }
  
  const pulsePoint = () => {
    if (enablePoint) {
      setEnablePoint(false);
      setResultNumber(false);
      if (newNumber) {
        setDisplayNumber("0.");
        setNewNumber(false);
      }
      else {
        setDisplayNumber(displayNumber + ".");
      }
    }
  }

  const writeFormula = (operator) => {
    // The next block manages the annulment of a negative number operator.
    if (negativeNumber && operator !== "-"){
      setNegativeNumber(false);
      switch(operator) {
        case "+":
          setFormula(formula.slice(0, -2) + "+");
          break;
        case "X":
          setFormula(formula.slice(0, -2) + "*");
          break;
        case "÷":
          setFormula(formula.slice(0, -2) + "/");
          break;
      }
    }
    // The next block manages the event of 2 or more operators entered consecutively. The operation performed should be the last operator entered (excluding the negative (-) sign).
    else if (newNumber && isNaN(formula[-1]) && operator !== "-" && !resultNumber){
      setNegativeNumber(false);
      switch(operator) {
        case "+":
          setFormula(formula.slice(0, -1) + "+");
          break;
        case "X":
          setFormula(formula.slice(0, -1) + "*");
          break;
        case "÷":
          setFormula(formula.slice(0, -1) + "/");
          break;
      }
    }
    // The next block manages the activation of a negative number.
    else if (newNumber && (isNaN(formula[-1]) || formula === "") && operator === "-" && !resultNumber) {
      setDisplayNumber("-")
      //setNewNumber(false);  // This line causes some unknown issue.
      setFormula(formula + "-");
      setNegativeNumber(true);
    }
    // The next block manages the general behavior.
    else {
      setNegativeNumber(false);
      switch(operator) {
        case "+":
          setFormula(formula + displayNumber + "+");
          break;
        case "-":
          setFormula(formula + displayNumber + "-");
          break;
        case "X":
          setFormula(formula + displayNumber + "*");
          break;
        case "÷":
          setFormula(formula + displayNumber + "/");
          break;
      }
    }
  }
  
  const pulseOperator = (event) => {
    setNewNumber(true);
    setEnablePoint(true);
    writeFormula(event.target.textContent);
  }
  
  const getResult = () => {
    setEnablePoint(true);
    let result = eval(formula + displayNumber);
    setDisplayNumber(result.toString());
    setResultNumber(true);
    setNewNumber(true);
    setFormula("");
  }
  
  const getPercent = () => {
    setNegativeNumber(false);
    setNewNumber(true);
    setEnablePoint(true);
    let result = eval(formula + displayNumber + "/100");
    setDisplayNumber(result.toString());
    setResultNumber(true);
    setFormula("");
  }
  
  const clearAll = () => {
    setNegativeNumber(false)
    setNewNumber(true);
    setEnablePoint(true);
    setDisplayNumber("0");
    setFormula("");
  }
  
  const deleteLastDigit = () => {
    if (displayNumber.length === 1) {
      setDisplayNumber("0");
    }
    else {
      setDisplayNumber(displayNumber.slice(0, -1));
    }
  }
  
  return(
      <div id="device">
        <div>
          <h1>CALCO</h1>
        </div>
        <div>
          <Display displayNumber={displayNumber} />
        </div>
        <div class="w3-container" id="buttonSet">
          <div class="w3-row row-margin">
            <Button bootClass="w3-col s3" btnClass="cl" btnId="clear" btnContent="C" btnFunction={clearAll} />
            <Button bootClass="w3-col s3" btnClass="op" btnId="back" btnContent="🔙" btnFunction={deleteLastDigit} />
            <Button bootClass="w3-col s3" btnClass="op" btnId="percent" btnContent="%" btnFunction={getPercent} />
            <Button bootClass="w3-col s3" btnClass="op" btnId="divide" btnContent="÷" btnFunction={pulseOperator} />
          </div>
          <div class="w3-row row-margin">
            <Button bootClass="w3-col s3" btnId="seven" btnContent="7" btnFunction={pulseDigit} />
            <Button bootClass="w3-col s3" btnId="eight" btnContent="8" btnFunction={pulseDigit} />
            <Button bootClass="w3-col s3" btnId="nine" btnContent="9" btnFunction={pulseDigit} />
            <Button bootClass="w3-col s3" btnClass="op" btnId="multiply" btnContent="X" btnFunction={pulseOperator} />
          </div>
          <div class="w3-row row-margin">
            <Button bootClass="w3-col s3" btnId="four" btnContent="4" btnFunction={pulseDigit} />
            <Button bootClass="w3-col s3" btnId="five" btnContent="5" btnFunction={pulseDigit} />
            <Button bootClass="w3-col s3" btnId="six" btnContent="6" btnFunction={pulseDigit} />
            <Button bootClass="w3-col s3" btnClass="op" btnId="subtract" btnContent="-" btnFunction={pulseOperator} />
          </div>
          <div class="w3-row row-margin">
            <Button bootClass="w3-col s3" btnId="one" btnContent="1" btnFunction={pulseDigit} />
            <Button bootClass="w3-col s3" btnId="two" btnContent="2" btnFunction={pulseDigit} />
            <Button bootClass="w3-col s3" btnId="three" btnContent="3" btnFunction={pulseDigit} />
            <Button bootClass="w3-col s3" btnClass="op" btnId="add" btnContent="+" btnFunction={pulseOperator} />
          </div>
          <div class="w3-row row-margin">
            <Button bootClass="w3-col s3" btnId="zero" btnContent="0" btnFunction={pulseDigit} />
            <Button bootClass="w3-col s3" btnId="decimal" btnContent="." btnFunction={pulsePoint} />
            <Button bootClass="w3-col s6" btnClass="eq" btnId="equals" btnContent="=" btnFunction={getResult} />
          </div>
        </div>
      </div>
    );
}

export default App;
