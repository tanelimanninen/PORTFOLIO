import './App.css';
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Modal from 'react-modal';
import YouTube from 'react-youtube';

Modal.setAppElement('#root');

function App() {
  return (
    <div className="App">
      <MovieList/>
    </div>
  );
}

function MovieList() {

  const [movies, setMovies] = useState([]) 
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [selectedVideo, setSelectedVideo] = useState("")

  useEffect(() => {
    axios
      .get('https://api.themoviedb.org/3/movie/now_playing?api_key=3739bfdd54facab3ad341842e91e6a81&append_to_response=videos')
      .then(response => {
        setMovies(response.data.results)
      })
  }, [])

  const handleVideoClick = (videoId) => {
    setSelectedVideo(videoId);
    setModalIsOpen(true);
  }

  if (movies.length === 0) {
    return(
      <div style={{flex: 1, padding: 20}}>
        <p>Loading, please wait...</p>
      </div>
    )
  } else {
      const movieItems = movies.map((movie,index) =>
        <MovieListItem key={index} movie={movie} handleVideoClick={handleVideoClick}/>
      );
        
    return(
      <div style={{flex: 1, padding: 20}}>
        {movieItems}

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          style={{
            overlay: {
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            },
            content: {
              top: '50%',
              left: '50%',
              right: 'auto',
              bottom: 'auto',
              marginRight: '-50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: '#fff',
              borderRadius: '5px',
              boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
              padding: '20px',
            },
          }}
        >
          <YouTube videoId={selectedVideo} opts={{ playerVars: { autoplay: 1 } }} />
        </Modal>

      </div>
    )
  }
}

function MovieListItem(props) {

  const [movie, setMovie] = useState([])

  useEffect(() => {
    axios
      .get('https://api.themoviedb.org/3/movie/'+props.movie.id+'?api_key=3739bfdd54facab3ad341842e91e6a81&append_to_response=videos')
      .then(response => {
        setMovie(response.data)
      })
  }, [props.movie.id])

    
  let IMAGEPATH = 'http://image.tmdb.org/t/p/w500'
  let imageurl = IMAGEPATH + props.movie.poster_path;

  // get genres
  var genres = "";  
  if (movie !== undefined && movie.genres !== undefined) {
    for (var i = 0; i < movie.genres.length; i++) {
      genres += movie.genres[i].name + ", ";
    }
  }

  // get first youtube video
  var video = "";
  if (movie !== undefined && movie.videos !== undefined && movie.videos.results !== undefined && movie.videos.results.length > 0) {
  video = <span style={{color:'blue', cursor:'pointer'}} onClick={() => props.handleVideoClick(movie.videos.results[0].key)}>{movie.videos.results[0].name}</span>
  }

  return(
    <div className="Movie">
      <img alt='movieposter' src={imageurl}/>
      <span className="VideosText">Video: {video}</span>
      <p className="MovieTitle">{props.movie.original_title} : {props.movie.release_date}</p>
      <span className="GenresText">Genres: {genres}</span><br/>
      <p className="MovieText">{props.movie.overview}</p>
    </div>
  )
}

export default App;
