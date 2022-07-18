import React, { useEffect, useState } from "react";
import GameDetail from "../components/GameDetail";
import { useLocation } from "react-router-dom";
//redux
import { useDispatch, useSelector } from "react-redux";
import { loadGames } from "../actions/gamesAction";
//components
import Game from "../components/Game";
//styling and animations
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { fadeIn } from "../animations";

const Home = () => {
  //current location
  const { pathname } = useLocation();
  let pathId = pathname.split("/")[2];
  //Fetch Games
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadGames());
  }, [dispatch]);
  const { popular, upcoming, newGames, searched } = useSelector((state) => state.games);
  const [clickedGame, setClickedGame] = useState("");

  return (
    <GameList variants={fadeIn} initial="hidden" animate="show">
      <AnimatePresence>
        {pathId && <GameDetail clickedGame={clickedGame} pathId={pathId} />}
      </AnimatePresence>

      {searched.length ? (
        <>
          <h2>Searched</h2>
          <Games>
            {searched.map((game) => (
              <Game
                name={game.name}
                released={game.released}
                id={game.id}
                image={game.background_image}
                setClickedGame={setClickedGame}
                key={game.id}
              />
            ))}
          </Games>
        </>
      ) : (
        ""
      )}

      <h2>Upcoming Games</h2>
      <Games>
        {upcoming &&
          upcoming.map((game) => (
            <Game
              name={game.name}
              released={game.released}
              id={game.id}
              image={game.background_image}
              setClickedGame={setClickedGame}
              key={game.id}
            />
          ))}
      </Games>
      <h2>Popular Games</h2>
      <Games>
        {popular &&
          popular.map((game) => (
            <Game
              name={game.name}
              released={game.released}
              id={game.id}
              image={game.background_image}
              setClickedGame={setClickedGame}
              key={game.id}
            />
          ))}
      </Games>
      <h2>New Games</h2>
      <Games>
        {newGames &&
          newGames.map((game) => (
            <Game
              name={game.name}
              released={game.released}
              id={game.id}
              image={game.background_image}
              setClickedGame={setClickedGame}
              key={game.id}
            />
          ))}
      </Games>
    </GameList>
  );
};

const GameList = styled(motion.div)`
  padding: 0rem 5rem;
  h2 {
    padding: 5rem 0rem;
  }
`;

const Games = styled(motion.div)`
  min-height: 80vh;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  grid-column-gap: 3rem;
  grid-row-gap: 5rem;
`;
export default Home;
