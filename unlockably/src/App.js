import './App.css';
import React, { useRef, useEffect } from "react";
import logo from './Unlockably_Logo.png';
import cluesFile from './clues.json';
import { AiOutlineInfoCircle, AiOutlineInstagram, AiOutlineClose } from 'react-icons/ai';
import { ImStatsBars } from 'react-icons/im';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  maxWidth: "90%",
  bgcolor: '#f5f5f5',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const remainingTriesStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  maxWidth: "90%",
  bgcolor: '#000',
  color: '#fff',
  opacity: .75,
  p: 4,
}

const wrongAnswerStyle = {
  height: "25px",
  width: "20px",
  backgroundColor: '#C0392B',
  color: '#C0392B',
  p: 4,
  margin: '2px',
}

const correctAnswerStyle = {
  height: "25px",
  width: "20px",
  backgroundColor: '#58D68D',
  color: '#58D68D',
  p: 4,
  margin: '2px',
}

function App() {
  const [rerender, setRerender] = React.useState(false);
  const [openS, setStatsOpen] = React.useState(false);
  const [openI, setInfoOpen] = React.useState(false);
  const [openRT, setRTOpen] = React.useState(false);
  const [openWinner, setWinnerOpen] = React.useState(false);
  const [openLoser, setLoserOpen] = React.useState(false);
  const openStats = () => setStatsOpen(true);
  const closeStats = () => setStatsOpen(false);
  const openInfo = () => setInfoOpen(true);
  const closeInfo = () => setInfoOpen(false);
  const openRemainingTries = () => setRTOpen(true);
  const closeRemainingTries = () => setRTOpen(false);
  const openWinnerModal = () => setWinnerOpen(true);
  const closeWinnerModal = () => setWinnerOpen(false);
  const openLoserModal = () => setLoserOpen(true);
  const closeLoserModal = () => setLoserOpen(false);

  var fullTriesRemaining = "3";
  var today = new Date().toLocaleDateString()
  var lastDatePlayed = localStorage.getItem("last_played");
  if (localStorage.getItem("tries_remaining") === null)
  {
    localStorage.setItem("tries_remaining", fullTriesRemaining);
  }
  if (lastDatePlayed !== today)
  {
    localStorage.setItem("tries_remaining", fullTriesRemaining);
  }

  var jsonresults = JSON.parse(JSON.stringify(cluesFile));
  var current_date = new Date();
  var epoch_date = new Date(new Date().getTime() / 1000);
  var currentClueIndex = Math.floor((Math.abs(current_date - epoch_date) / 1000) / 86400) % jsonresults.length;
  var clues = jsonresults[currentClueIndex];

  const input1ref = useRef(null);
  const input2ref = useRef(null);
  const input3ref = useRef(null);
  const input4ref = useRef(null);
  const useranswer1ref = useRef(null);
  const useranswer2ref = useRef(null);
  const useranswer3ref = useRef(null);
  const useranswer4ref = useRef(null);
  const userinputdivref = useRef(null);
  const useranswersdivref = useRef(null);

  useEffect(() => {
    if (localStorage.getItem("tries_remaining") < 1)
    {
      useranswersdivref.current.style.display='block';
      userinputdivref.current.style.display='none';
      useranswer1ref.current.value=localStorage.getItem("user_answer_1");
      useranswer2ref.current.value=localStorage.getItem("user_answer_2");
      useranswer3ref.current.value=localStorage.getItem("user_answer_3");
      useranswer4ref.current.value=localStorage.getItem("user_answer_4");
      setRerender(rerender);
    }
  }, [rerender]);

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

  function displayAnswers(){
    useranswersdivref.current.style.display='block';
    userinputdivref.current.style.display='none';
    useranswer1ref.current.value=localStorage.getItem("user_answer_1");
    useranswer2ref.current.value=localStorage.getItem("user_answer_2");
    useranswer3ref.current.value=localStorage.getItem("user_answer_3");
    useranswer4ref.current.value=localStorage.getItem("user_answer_4");
  }

  function clearAnswers(){
    input1ref.current.value="";
    input2ref.current.value="";
    input3ref.current.value="";
    input4ref.current.value="";
    input1ref.current.focus();
  }

  function checkAnswer(){
    localStorage.setItem("last_played", today);
    localStorage.setItem("user_answer_1", input1ref.current.value);
    localStorage.setItem("user_answer_2", input2ref.current.value);
    localStorage.setItem("user_answer_3", input3ref.current.value);
    localStorage.setItem("user_answer_4", input4ref.current.value);

    if (input1ref.current.value === clues.v1 && input2ref.current.value === clues.v2 && input3ref.current.value === clues.v3 && input4ref.current.value === clues.v4){
      displayAnswers();
      
      localStorage.setItem("tries_remaining", "0");
      localStorage.setItem("last_result", "win");
      
      var wins = localStorage.getItem("game_wins");
      if (wins == null){
        wins = 0
      }
      wins = +wins + 1
      localStorage.setItem("game_wins", (wins));

      openWinnerModal();
    }
    else{
      if (localStorage.getItem("tries_remaining") > 1)
      {
        clearAnswers();
        openRemainingTries();
        var triesRemaining = +localStorage.getItem("tries_remaining") - 1;
        localStorage.setItem("tries_remaining", triesRemaining);
      }
      else{
        displayAnswers();

        var losses = localStorage.getItem("game_losses");
        if (losses == null){
          losses = 0
        }
        losses = +losses + 1
        localStorage.setItem("game_losses", (losses));
        localStorage.setItem("tries_remaining", "0");

        openLoserModal();
      }
    }
  }

  function getWins(){
    var wins = localStorage.getItem("game_wins");
    if (wins == null){
      wins = 0;
    }
    return wins;
  }

  function getLosses(){
    var losses = localStorage.getItem("game_losses");
    if (losses == null){
      losses = 0;
    }
    return losses;
  }

  function getWinRatio(){
    var wins = localStorage.getItem("game_wins");
    if (wins == null){
      wins = 0;
    }
    var losses = localStorage.getItem("game_losses");
    if (losses == null){
      losses = 0;
    }
    var w_percent = 100 * +wins / (+wins + +losses);
    if (wins === 0)
    {
      w_percent = 0;
    }
    return Math.floor(w_percent);
  }

  function getTriesRemaining(){
    return localStorage.getItem("tries_remaining");
  }

  function getR1Style(){
    if(localStorage.getItem("user_answer_1") === clues.v1)
    {
      return correctAnswerStyle;
    }
    else
    {
      return wrongAnswerStyle;
    }
  }

  function getR2Style(){
    if(localStorage.getItem("user_answer_2") === clues.v2)
    {
      return correctAnswerStyle;
    }
    else
    {
      return wrongAnswerStyle;
    }
  }

  function getR3Style(){
    if(localStorage.getItem("user_answer_3") === clues.v3)
    {
      return correctAnswerStyle;
    }
    else
    {
      return wrongAnswerStyle;
    }
  }
  
  function getR4Style(){
    if(localStorage.getItem("user_answer_4") === clues.v4)
    {
      return correctAnswerStyle;
    }
    else
    {
      return wrongAnswerStyle;
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <div style={{'textAlign':'center'}}>
          <img src={logo} style={{'maxWidth': '300px', 'height': '100%', 'width': '100%', 'objectFit': 'contain'}} alt="Logo"/>
        </div>

        <div className="boxr sb2">{clues.c1}</div>
        <div className="boxl sb1">{clues.c2}</div>
        <div className="boxr sb2">{clues.c3}</div>
        <div className="boxl sb1">{clues.c4}</div>

        <div className="container" style={{'textAlign':'center'}}>

          <form id="iosInput" ref={userinputdivref} autoComplete="off" style={{'display':'block'}}>
            <br/>
                <input autoComplete="false" name="hidden" type="text" style={{'display':'none'}}/>
                <input type="password" ref={input1ref} id="input1" name="input1" maxLength="1" pattern="[0-9]" inputMode="numeric" onKeyUp={() =>{moveOnMax(1)}}/>
                <input type="password" ref={input2ref} id="input2" name="input2" maxLength="1" pattern="[0-9]" inputMode="numeric" onKeyUp={() =>{moveOnMax(2)}}/>
                <input type="password" ref={input3ref} id="input3" name="input3" maxLength="1" pattern="[0-9]" inputMode="numeric" onKeyUp={() =>{moveOnMax(3)}}/>
                <input type="password" ref={input4ref} id="input4" name="input4" maxLength="1" pattern="[0-9]" inputMode="numeric" onKeyUp={() =>{checkAnswer()}}/>
          </form>

          <div className="results" ref={useranswersdivref} style={{'display':'none'}}>
            <h4>The correct answer is {clues.v1}-{clues.v2}-{clues.v3}-{clues.v4}</h4>
            <form id="iosResult" autoComplete="off">
                  <input autoComplete="false" name="hidden" type="text" style={{'display':'none'}}/>
                  <input type="text" ref={useranswer1ref} id="userAnswer1" name="userAnswer1" maxLength="1" readOnly value="0"/>
                  <input type="text" ref={useranswer2ref} id="userAnswer2" name="userAnswer2" maxLength="1" readOnly value="0"/>
                  <input type="text" ref={useranswer3ref} id="userAnswer3" name="userAnswer3" maxLength="1" readOnly value="0"/>
                  <input type="text" ref={useranswer4ref} id="userAnswer4" name="userAnswer4" maxLength="1" readOnly value="0"/>
            </form>
          </div>
        <br/>
        </div>

      </header>

      <footer style={{'display':'flex', 'justifyContent':'space-between', 'maxWidth':'98%'}}>
        <div className="version">
          <p style={{'marginLeft':'10px'}}>Version 2.0</p>
        </div>
        <div className="buttons" style={{'bottom':'10px'}}>
          <AiOutlineInfoCircle size="2em" onClick={openInfo}/>
          <ImStatsBars size="2em" style={{'marginLeft':'10px'}} onClick={openStats}/>
        </div>
      </footer>

      <Modal
        open={openS}
        onClose={closeStats}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2" style={{'textAlign':'center'}}>
            <AiOutlineClose size="1.5em" style={{"top":"5", "right":"5", "position":"fixed"}} onClick={() => closeStats()}/>
            <h3>Your Stats</h3>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }} style={{'fontSize':'1em'}}>
            <p>Wins: {getWins()}</p>
            <p>Losses: {getLosses()}</p>
            <p>Win %: {getWinRatio()}</p>
          </Typography>
        </Box>
      </Modal>

      <Modal
        open={openI}
        onClose={closeInfo}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2" style={{'textAlign':'center'}}>
            <AiOutlineClose size="1.5em" style={{"top":"5", "right":"5", "position":"fixed"}} onClick={() => closeInfo()}/>
            <h3>Unlockably</h3>
            <h4>The daily trivia game</h4>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }} style={{'fontSize':'1em'}}>
            <p>You're locked out of your phone and can't remember the pin.</p>
            <p>Answer the questions to guess the 4 digit combination and win today's challenge</p>
          </Typography>
          <AiOutlineInstagram size="1.5em" style={{"bottom":"5", "right":"5", "position":"fixed"}} onClick={() => window.open("https://www.instagram.com/unlockablygame/", "_blank")}/>
        </Box>
      </Modal>

      <Modal
        open={openRT}
        onClose={closeRemainingTries}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={remainingTriesStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2" style={{'textAlign':'center'}}>
            <AiOutlineClose size="1.5em" style={{"top":"5", "right":"5", "position":"fixed"}} onClick={() => closeRemainingTries()}/>
            <h2>Incorrect</h2>
            <h3>{getTriesRemaining()} tries remaining</h3>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }} style={{'fontSize':'1em'}}>
            <form id="trResult" autoComplete="off" style={{'display':'block', 'textAlign':'center'}}>
                  <input autoComplete="false" name="hidden" type="text" style={{'display':'none'}}/>
                  <input type="password" id="r1" name="r1" maxLength="1" readOnly style={getR1Style()}/>
                  <input type="password" id="r2" name="r2" maxLength="1" readOnly style={getR2Style()}/>
                  <input type="password" id="r3" name="r3" maxLength="1" readOnly style={getR3Style()}/>
                  <input type="password" id="r4" name="r4" maxLength="1" readOnly style={getR4Style()}/>
            </form>
          </Typography>
        </Box>
      </Modal>

      <Modal
        open={openWinner}
        onClose={closeWinnerModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2" style={{'textAlign':'center'}}>
            <AiOutlineClose size="1.5em" style={{"top":"5", "right":"5", "position":"fixed"}} onClick={() => closeWinnerModal()}/>
            <h2>You Win!</h2>
            <h3>Come back tomorrow for a new challenge</h3>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }} style={{'fontSize':'1em'}}>
            <p>Wins: {getWins()}</p>
            <p>Losses: {getLosses()}</p>
            <p>Win %: {getWinRatio()}</p>
          </Typography>
        </Box>
      </Modal>

      <Modal
        open={openLoser}
        onClose={closeLoserModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2" style={{'textAlign':'center'}}>
            <AiOutlineClose size="1.5em" style={{"top":"5", "right":"5", "position":"fixed"}} onClick={() => closeLoserModal()}/>
            <h2>You Lose!</h2>
            <h3>Come back tomorrow for a new challenge</h3>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }} style={{'fontSize':'1em'}}>
            <p>Wins: {getWins()}</p>
            <p>Losses: {getLosses()}</p>
            <p>Win %: {getWinRatio()}</p>
          </Typography>
        </Box>
      </Modal>

    </div>
  );
}

export default App;
