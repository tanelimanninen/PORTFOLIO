const GenreButtons = ({ genres, onGenreSelected, onShowAll }) => {
    return (
      <div>
        {genres.map((genre, index) => (
          <button key={index} onClick={() => onGenreSelected(genre)}>
            {genre}
          </button>
        ))}
        <button onClick={onShowAll}>Show All</button>
      </div>
    );
  };

export default GenreButtons