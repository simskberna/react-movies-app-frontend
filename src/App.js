
import './App.css';
import axios from "axios"; 
import { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Routes, Route } from 'react-router-dom'
import { Home } from './components/home/Home';
import Header from './components/header/Header';
import Trailer from './components/trailer/Trailer';
import Reviews from './components/reviews/Reviews';

function App() { 
  const [movies, setMovies] = useState();
  const [movie, setMovie] = useState();
  const [reviews, setReviews] = useState();

  const getAllMovies = () => {
    axios.get(`${process.env.REACT_APP_BASEURL}/api/v1/movies`)
      .then((res) => {
        setMovies(res.data);
      }).catch((err) => {
        console.log(err);
      });
  }
  const getMovieData = (movieId) => {
    axios.get(`${process.env.REACT_APP_BASEURL}/api/v1/movies/${movieId}`)
      .then((res) => {
        setMovie(res.data);
        setReviews(res.data.reviewIds);
      }).catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    getAllMovies(); 
  }, []);
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route path="/" element={<Home movies={movies} />}></Route>
          <Route path="/Trailer/:ytTrailerId" element={<Trailer />}></Route>
          <Route path="/Reviews/:movieId" element={<Reviews getMovieData={getMovieData} movie={movie} reviews={reviews} setReviews={setReviews}/>}></Route>
        </Route>
      </Routes>

    </div>
  );
}

export default App;
