import logo from './Unlockably_Logo.png';
import './App.css';
import React from "react";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div style={{'text-align':'center'}}>
          <img src={logo} style={{'max-width': '300px', 'height': '100%', 'width': '100%', 'object-fit': 'contain'}} alt="Logo"/>
        </div>

        <div class="boxr sb2">1) First clue</div>
        <div class="boxl sb1">2) Second clue</div>
        <div class="boxr sb2">3) Third clue</div>
        <div class="boxl sb1">4) Fourth clue</div>

        <div class="container" style={{'text-align':'center'}}>
          <br/>

          <form id="ios" autocomplete="off">
                <input autocomplete="false" name="hidden" type="text" style={{'display':'none'}}/>
                <input type="password" id="answer1" name="answer1" maxlength="1" pattern="[0-9]" inputmode="numeric"/>
                <input type="password" id="answer2" name="answer2" maxlength="1" pattern="[0-9]" inputmode="numeric"/>
                <input type="password" id="answer3" name="answer3" maxlength="1" pattern="[0-9]" inputmode="numeric"/>
                <input type="password" id="answer4" name="answer4" maxlength="1" pattern="[0-9]" inputmode="numeric"/>
          </form>
        <br/>
        </div>

      </header>
    </div>
  );
}

export default App;
