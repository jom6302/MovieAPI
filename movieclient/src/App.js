import './App.css';
import api from './api/axiosConfig';
import { useState, useEffect } from 'react';
import Layout from './component/layout';
import { Routes, Route } from 'react-router-dom';
import Home from './component/home/Home';
import Header from './component/header/Header';
import Trailer from './component/trailer/Trailer';
import Reviews from './component/reviews/Reviews';
import NotFound from './component/notFound/NotFound';
 
function App() {

  const [movies, setMovies] = useState();

  const [movie, setMovie] = useState();

  const [reviews, setReviews] = useState();

  const getMovies = async () => {
    try {
      const res = await api.get("/api/v1/movies")

      console.log(res.data);

      setMovies(res.data);


    }catch(err){
      console.log(err);
    }
  }


  const getMovieData = async (movieId) => {
    try 
    {
      const response = await api.get(`/api/v1/movies/${movieId}`);

      const singleMoive = response.data;

      setMovie(singleMoive);

      setReviews(singleMoive.reviews);

    } 
    catch (error) 
    {
      console.error(error);
    }
  }


  // Run once after initial rendering
  useEffect(() => {
    getMovies();
  },[]);


  return (
    <div className="App">
      <Header></Header>
      <Routes>
        <Route path="/" element={ <Layout/> }>
          <Route path="/" element={ <Home movies={movies} /> }></Route>
          <Route path="/Trailer/:ytTrailerId" element={<Trailer/>}></Route>
          <Route path ="/Reviews/:movieId" element={<Reviews getMovieData={getMovieData} movie={movie} reviews={reviews} setReviews={setReviews}/>}></Route>
          <Route path="*" element = {<NotFound />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
