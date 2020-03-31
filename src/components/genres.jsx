import React from "react";
import PropTypes from "prop-types";

const Genre = props => {
  const { genres, currentGenre, onGenreCHange } = props;
  const classes = "list-group-item list-group-item-action";

  return (
    <div className="list-group">
      <button
        key={null}
        className={currentGenre === null ? classes + " active" : classes}
        onClick={_e => onGenreCHange(null)}
      >
        All
      </button>
      {genres.map(genre => (
        <button
          key={genre.name}
          className={
            currentGenre === genre.name ? classes + " active" : classes
          }
          onClick={_e => onGenreCHange(genre.name)}
        >
          {genre.name}
        </button>
      ))}
    </div>
  );
};

Genre.propTypes = {
  genres: PropTypes.array.isRequired,
  currentGenre: PropTypes.oneOfType([
    PropTypes.object.isRequired,
    PropTypes.string.isRequired
  ])
};

export default Genre;
