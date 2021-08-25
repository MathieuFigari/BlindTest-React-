// == Import
import { ToastContainer, toast } from 'react-toastify';
import { Route  } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './styles.scss';
import BlindData from '../../data/blindTest';

// == Composant
import Header from '../header';
import Quiz from '../quiz';
import React from 'react';
import EndQuiz from '../endQuiz';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      song: BlindData[0],
      songs: BlindData,
      index: 1,
      maxQuestions: BlindData.length,
      userAnswer: '',
      btnDisable: true,
      started: false,
      sound: 1,
      secondCount: 30,
      quizEnd: false,
      score: 0,
    };
    this.timer = null;
    this.endSound = new Audio("/badsong.mp3" && "badsong.ogg");
    this.scoreStatus = "/bad.gif"
  }

startQuiz = () => {
  this.endSound = new Audio("/badsong.mp3" && "badsong.ogg");
  this.scoreStatus = "/bad.gif"
  const { started, sound } = this.state;
  this.setState({ started: !started, timer : window.setInterval(this.startCounter.bind(this), 1000), score: 0});
  const getSong = document.getElementById(sound);
  getSong.play();
}

startCounter = () => {
  const { secondCount } = this.state;
  if (secondCount > 0) {
    this.setState({ secondCount: secondCount - 1 });
  }
}

submitAnswer = (selectedAnswer) => {
  this.setState({
    userAnswer: selectedAnswer,
    btnDisable: false,
  });
}

nextSong = () => {
  const {
    index,
    maxQuestions,
    sound,
    score,
    userAnswer,
    song,
  } = this.state;
  if (userAnswer === song.author) {
    this.setState({ score: score + 1 });
    toast.success('Bravo !!!', {
      position: "bottom-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      bodyClassName: "toastify-color"
  });
  } else {
    toast.error('Du tout !!!!', {
      position: "bottom-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      bodyClassName: "toastify-color"
  });
  }
  const thisSound = document.getElementById(`${sound}`);
  if (index === maxQuestions) {
    this.setState({ quizEnd: true });
    thisSound.pause();
  }
  else {
    thisSound.pause();
    thisSound.currentTime = 0;
    this.setState({
      index: index + 1,
      song: BlindData[index],
      sound: sound + 1,
      secondCount: 30,
      btnDisable: true,
    });
    this.playNextSong();
  }
}

playNextSong = () => {
  const { sound } = this.state;
  const newSound = document.getElementById(`${sound + 1}`);
  newSound.play();
  console.log(newSound);
}

endQuiz = () => {
  window.clearInterval(this.state.timer);
  this.setState({ timer: null, secondCount: 30, quizEnd: false });
  const { score } = this.state;
  this.setState({ started: false, index: 1, sound: 1, song: BlindData[0] }); 
  if (score > 6) {
    this.endSound = new Audio("/goodsong.mp3" && "goodsong.ogg");
    this.scoreStatus = "/good.gif"
    this.endSound.play();
  } else if (score >= 4 && score <= 6) {
    this.endSound = new Audio("/middlesong.mp3" && "middlesong.ogg");
    this.scoreStatus = "/middle.gif"
    this.endSound.play();
  }
  else {
    this.endSound.play();
  }
}

restartQuiz = () => {
  this.setState({ score: 0, quizEnd: false });
  this.endSound.pause();
}

render() {
  const {
    started,
    score,
    sound,
    secondCount,
    song,
    userAnswer,
    btnDisable,
    songs,
    quizEnd,
    maxQuestions,
  } = this.state;

  console.log();
  return (
    <div className="app">
      <Header />
      <Route path="/" exact>
        <Quiz
          started={started}
          startQuiz={this.startQuiz}
          sound={sound}
          secondCount={secondCount}
          song={song}
          userAnswer={userAnswer}
          btnDisable={btnDisable}
          submitAnswer={this.submitAnswer}
          nextSong={this.nextSong}
          playNextSong={this.playNextSong}
          songs={songs}
          notify={this.notify}
          quizEnd={quizEnd}
          endQuiz={this.endQuiz}
        />
      </Route>
      <Route path="/end" exact>
        <EndQuiz
          score={score}
          maxQuestions={maxQuestions}
          restartQuiz={this.restartQuiz}
          scoreStatus={this.scoreStatus}
        />
      </Route>

      <ToastContainer />
    </div>
  );
}
}

// == Export
export default App;
