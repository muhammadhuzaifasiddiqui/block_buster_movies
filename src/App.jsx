import React, { useEffect, useState } from "react";
import Search from "./components/Search.jsx";
import Spinner from "./components/Spinner.jsx";
import MovieCard from "./components/MovieCard.jsx";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // const query = 'batman';

  const fetchMovies = async (query = '') => {
    setIsLoading(true);
    setErrorMessage('');
     
    try {
      const endpoint = query 
      ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
      : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }

      const data = await response.json();
      if (data.Response === 'False') {
        setErrorMessage(data.Error || 'Failed to fetch movies');
        setMovieList([]);
        return;
      }
      // alert(response);
      setMovieList(data.results || []);
    } catch (error) {
      console.error(`Error fetching movies: ${error}`);
      setErrorMessage("Failed to fetch movies. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(searchTerm);
  }, [searchTerm]);

  return (
    <main>
      <div className="pattern" />
 
      <div className="wrapper">
        <header className="header">
          <img src="./hero.png" alt="Hero banner" />
          <h1>
            Find <span className="text-gradient">Movies</span>
            You'll Enjoy without the Hassle
          </h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>
        <section className="all-movies">
          <h2 className="mt-[40px]">All Movies</h2>

          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul>
              {movieList.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          )}

        </section>
        <h1 className="text-white">{searchTerm}</h1>
      </div>
    </main>
  );
};

export default App;

// import { useEffect, useState } from "react";

// const hasLiked = true;

// const Card = ({ title }) => {
//   const [count, setCount] = useState(0);
//   const [hasLiked, setHasLiked] = useState(5);

//   useEffect(() => {
//     console.log(`${title} has been liked: ${hasLiked}`);
//   }, [hasLiked, title]);

//   useEffect(() => {
//     console.log('CARD RENDERED');
//     // console.log(`${title} count is: ${count}`);
//   }, []);

//   return (
//     // <div className="card" onClick={() => setCount((prevState) => prevState + 1)}>
//     <div className="card" onClick={() => setCount(count + 1)}>
//       <h2>{title} <br /> {count || null}</h2>

//       <button onClick={() => setHasLiked(!hasLiked)}>
//         {hasLiked ? '**' : '##'}
//         {/* Like */}
//       </button>
//     </div>
//   );
// };

// const App = () => {
//   return (
//     <div className="card-container">
//       <Card title="Start Wars" rating={5} isCool={true} hasLiked={hasLiked} />
//       <Card title="Avatar" />
//       <Card title="The Lion King" />
//     </div>
//   );
// };

// export default App;
