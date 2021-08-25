import './endQuiz.scss';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const EndQuiz = ({ score, maxQuestions, restartQuiz, scoreStatus }) => (
  <div className="endContainer">
  <div className="endContainer__img">
  <img className="endContainer__img__gif" src={scoreStatus} />
  </div>
    <div className="endContainer__score">Score : {score}/{maxQuestions}</div>
    <Link to="/">
      <div onClick={restartQuiz} className="endContainer__restart">Cliques ici pour Recommencer</div>
    </Link>
  </div>
);

EndQuiz.propTypes = {
  score: PropTypes.number.isRequired,
  maxQuestions: PropTypes.number.isRequired,
  restartQuiz: PropTypes.func.isRequired,
  scoreStatus: PropTypes.string.isRequired,
};

export default EndQuiz;
