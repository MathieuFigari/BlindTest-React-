import PropTypes from 'prop-types';

const Item = ({ option, submitAnswer, userAnswer }) => (
  <p
    className={`quiz__options__option ${userAnswer === option ? 'selected' : null}`}
    onClick={() => submitAnswer(option)}
  >
    {option}
  </p>
);

Item.propTypes = {
  option: PropTypes.string.isRequired,
  submitAnswer: PropTypes.func.isRequired,
  userAnswer: PropTypes.string.isRequired,
};

export default Item;
