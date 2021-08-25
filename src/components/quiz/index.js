import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Audio from './Audio';
import Item from './Item';
import './quiz.scss';

const Quiz = ({
  started,
  startQuiz,
  secondCount,
  song,
  btnDisable,
  userAnswer,
  submitAnswer,
  nextSong,
  songs,
  quizEnd,
  endQuiz,
}) => {
  const btnClassName = started ? 'started' : 'page__quiz__accueil';
  const quizClassName = started ? 'quiz' : 'unstart';
  const itemsClassName = quizEnd ? 'quiz__options__end' : 'quiz__options';
  console.log(quizEnd);

  return (
    <div className="page__quiz">
      <div className={btnClassName}>
      <div className="regles">
      <p><span className="regles__title">Règles du jeu :</span><br /><br />Ecouter la Musique diffusée et trouver l'interprète parmis les 4 propositions.</p>
      </div>
      <div onClick={startQuiz} className="page__quiz__start">DEMARRER</div>
      </div>
      <div className={quizClassName}>
        <div className="quiz__anim">
          <img className="quiz__anim__gif" src="/piagif.gif" alt="bean" />
          <div className="quiz__anim__counter">{secondCount}</div>
        </div>
        {
          songs.map(
            (oneSong) => (
              <Audio key={oneSong.id} id={oneSong.id} song={oneSong.song} />
            ),
          )
        }
        <div className={itemsClassName}>
          {
            song.options.map(
              (option) => (
                <Item
                  key={option}
                  option={option}
                  submitAnswer={submitAnswer}
                  userAnswer={userAnswer}
                />
              ),
            )
          }
        </div>
        {
          quizEnd ? (
            <Link to="/end">
              <button
                type="button"
                onClick={() => {
                  endQuiz();
                }}
                disabled={btnDisable}
                className="btnSubmit"
              >RESULTAT ICI
              </button>
            </Link>
          )
            : (
              <button
                type="button"
                onClick={() => {
                  nextSong();
                }}
                disabled={btnDisable}
                className="btnSubmit"
              >VALIDER
              </button>
            )

          }
      </div>
    </div>
  );
};

Quiz.propTypes = {
  started: PropTypes.bool.isRequired,
  startQuiz: PropTypes.func.isRequired,
  secondCount: PropTypes.number.isRequired,
  song: PropTypes.shape({
    id: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
  }).isRequired,
  songs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      song: PropTypes.string.isRequired,
    }),
  ).isRequired,
  btnDisable: PropTypes.bool.isRequired,
  nextSong: PropTypes.func.isRequired,
  quizEnd: PropTypes.bool.isRequired,
  endQuiz: PropTypes.func.isRequired,
};

export default Quiz;
