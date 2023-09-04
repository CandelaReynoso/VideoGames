import React  from "react";
import { useState,useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getGameGenre, getGames, gamesFilteredByGenres, gamesFilteredByCreation, orderGame} from '../../redux/actions';
import Paginate from '../Paginate/Paginate';
import NavBar from '../Navbar/NavBar'
import AllGameCards from '../AllGameCards/AllGameCards';
import Filters from "../Filter/Filter";
import './home.css';

const Home = () => {
  // invoca funcicion dispatch de redux para despachar acciones a traves del estado glboal.
  const dispatch = useDispatch();
  // uso el hook useSelector de Redux para obtener el estado global games y genres
  const allGames = useSelector((state) => state.games);
  const allGenres = useSelector((state) => state.genres);
  
  const [currentPage, setCurrentPage] = useState(1);
  
  const [gamesPage] = useState(6);
  
  const indexOfLastGame = currentPage * gamesPage;

  const indexOfFirstGame = indexOfLastGame - gamesPage;

  const currentGame = allGames.slice(indexOfFirstGame, indexOfLastGame); 

  const [Loader, setLoader] = useState(true);
   


  const paginate = (pageNumber) => {
    console.log("Changing page to:", pageNumber);
    setCurrentPage(pageNumber);
};
const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
      dispatch(getGameGenre());

  }, [dispatch]);

  useEffect(() => {
      if(!allGames.length) {
          dispatch(getGames()).then(() => setLoader(false));
      }
  }, [dispatch, allGames]);



  useEffect(() => {
      window.scrollTo(0, 0);
  }, [currentPage])



  const handleFilteredGenres = (e) => {
      dispatch(gamesFilteredByGenres(e.target.value));
      setCurrentPage(1);
  };

  const handleFilteredCreates = (e) => {
      dispatch(gamesFilteredByCreation(e.target.value));
  }

  const handleOrder = (e) => {
      e.preventDefault();
      if(e.target.value === ''){
          dispatch(getGames());
      } else {
          dispatch(orderGame(e.target.value))
          setCurrentPage(1)
      }
  }

  const reset = (e) => {
      e.preventDefault()
      dispatch(getGames())
      setCurrentPage(1)
  }
  
    return (
    <div className="fondo">
        <NavBar/>

       <Filters
            handleOrder={handleOrder}
            handleFilteredCreates={handleFilteredCreates}
            handleFilteredGenres={handleFilteredGenres}
            allGenres={allGenres}
            reset={reset}
        /> 
        <Paginate
            gamesPage={gamesPage}
            allGames={allGames.length}
            paginate={paginate}
            currentPage={currentPage} 
            handlePageChange={handlePageChange} 
        />

        {Loader ? <p>Loading...</p> : (
            <AllGameCards
                currentGame={currentGame}
                allGames={allGames}
            />
        )}
    </div>
);

}

export default Home;