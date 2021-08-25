import PropTypes from 'prop-types';

const Audio = ({ id, song }) => (
  <audio id={id} >
    <source src={`/${song}.mp3`} />
    <source src={`/${song}.ogg`} />
  </audio>
);

Audio.propTypes = {
  id: PropTypes.string.isRequired,
  song: PropTypes.string.isRequired,
};

export default Audio;
