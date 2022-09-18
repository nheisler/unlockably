import './App.css';
import React, { useRef } from "react";import logo from './Unlockably_Logo.png';
import cluesFile from './clues.json';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { ImStatsBars } from 'react-icons/im';

function App() {
  var jsonresults = JSON.parse(JSON.stringify(cluesFile));
  var current_date = new Date();
  var epoch_date = new Date(new Date().getTime() / 1000);
  var currentClueIndex = Math.floor((Math.abs(current_date - epoch_date) / 1000) / 86400) % jsonresults.length;
  var clues = jsonresults[currentClueIndex];

  const input1ref = useRef(null);
  const input2ref = useRef(null);
  const input3ref = useRef(null);
  const input4ref = useRef(null);

  function moveOnMax (inputIndex) {
    if (inputIndex === 1)
    {
      if (input1ref.current.value.length === 1)
      {
        input2ref.current.focus();
      }
    }
    else if (inputIndex === 2)
    {
      if (input2ref.current.value.length === 1)
      {
        input3ref.current.focus();
      }
    }
    else if (inputIndex === 3)
    {
      if (input3ref.current.value.length === 1)
      {
        input4ref.current.focus();
      }
    }
  }

  function checkAnswer(){
    if (input1ref.current.value === clues.v1 && input2ref.current.value === clues.v2 && input3ref.current.value === clues.v3 && input4ref.current.value === clues.v4){
      console.log("correct")
    }
    else{
      console.log("wrong")
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <div style={{'text-align':'center'}}>
          <img src={logo} style={{'max-width': '300px', 'height': '100%', 'width': '100%', 'object-fit': 'contain'}} alt="Logo"/>
        </div>

        <div className="boxr sb2">{clues.c1}</div>
        <div className="boxl sb1">{clues.c2}</div>
        <div className="boxr sb2">{clues.c3}</div>
        <div className="boxl sb1">{clues.c4}</div>

        <div class="container" style={{'text-align':'center'}}>

          <form id="iosInput" autocomplete="off" style={{'display':'block'}}>
            <br/>
                <input autocomplete="false" name="hidden" type="text" style={{'display':'none'}}/>
                <input type="password" ref={input1ref} id="input1" name="input1" maxlength="1" pattern="[0-9]" inputmode="numeric" onKeyUp={() =>{moveOnMax(1)}}/>
                <input type="password" ref={input2ref} id="input2" name="input2" maxlength="1" pattern="[0-9]" inputmode="numeric" onKeyUp={() =>{moveOnMax(2)}}/>
                <input type="password" ref={input3ref} id="input3" name="input3" maxlength="1" pattern="[0-9]" inputmode="numeric" onKeyUp={() =>{moveOnMax(3)}}/>
                <input type="password" ref={input4ref} id="input4" name="input4" maxlength="1" pattern="[0-9]" inputmode="numeric" onKeyUp={() =>{checkAnswer()}}/>
          </form>

          <div class="results" style={{'display':'none'}}>
            <h4>The correct answer is 1-2-3-4</h4>
            <form id="iosResult" autocomplete="off">
                  <input autocomplete="false" name="hidden" type="text" style={{'display':'none'}}/>
                  <input type="text" id="userAnswer1" name="userAnswer1" maxlength="1" readonly value="0"/>
                  <input type="text" id="userAnswer2" name="userAnswer2" maxlength="1" readonly value="0"/>
                  <input type="text" id="userAnswer3" name="userAnswer3" maxlength="1" readonly value="0"/>
                  <input type="text" id="userAnswer4" name="userAnswer4" maxlength="1" readonly value="0"/>
            </form>
          </div>
        <br/>
        </div>

      </header>

      <footer style={{'display':'flex', 'justifyContent':'space-between', 'maxWidth':'98%'}}>
        <div className="version">
          <p style={{'margin-left':'10px'}}>Version 2.0</p>
        </div>
        <div className="buttons" style={{'bottom':'10px'}}>
          <AiOutlineInfoCircle size="2em" onClick={() =>{console.log("opened modal")}}/>
          <ImStatsBars size="2em" style={{'margin-left':'10px'}}/>
        </div>
      </footer>

    </div>
  );
}

export default App;
