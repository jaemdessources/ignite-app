import React from "react";
import { Link } from "react-router-dom";
//styling and animations
import styled from "styled-components";
import { motion } from "framer-motion";
import { popup } from "../animations";
//Redux
import { useDispatch } from "react-redux";
import loadDetail from "../actions/detailAction";
//util
import { smallImage } from "../util";

const Game = ({ id, name, released, image, setClickedGame }) => {
  id = id.toString();
  //Load details
  const dispatch = useDispatch();
  const loadDetailHandler = () => {
    document.body.style.overflow = "hidden";
    setClickedGame(name);
    dispatch(loadDetail(id));
  };
  return (
    <StyledGame
      variants={popup}
      initial="hidden"
      animate="show"
      layoutId={id}
      onClick={loadDetailHandler}
    >
      <Link to={`/game/${id}`}>
        <motion.h3 layoutId={`title ${id}`}>{name}</motion.h3>
        <p>{released}</p>
        <motion.img layoutId={`image ${id}`} src={smallImage(image, 640)} alt={name} />
      </Link>
    </StyledGame>
  );
};
const StyledGame = styled(motion.div)`
  min-height: 30vh;
  box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.2);
  text-align: center;
  border-radius: 1rem;
  cursor: pointer;
  overflow: hidden;
  img {
    width: 100%;
    height: 40vh;
    object-fit: cover;
  }
`;
export default Game;
