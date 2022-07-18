import React from "react";
//styling and animation
import styled from "styled-components";
import { motion } from "framer-motion";
//redux
import { useSelector } from "react-redux";
//routing
import { useNavigate } from "react-router-dom";
//util
import { smallImage } from "../util";
//images
import playstation from "../img/playstation.svg";
import xbox from "../img/xbox.svg";
import apple from "../img/apple.svg";
import nintendo from "../img/nintendo.svg";
import gamepad from "../img/gamepad.svg";
import steam from "../img/steam.svg";
import starEmpty from "../img/star-empty.png";
import starfull from "../img/star-full.png";

const GameDetail = ({ pathId, clickedGame }) => {
  const navigate = useNavigate();
  const exitDetailHandler = (e) => {
    if (e.target.classList.contains("shaddow")) {
      document.body.style.overflow = "auto";
      navigate("/");
    }
  };
  //get stars
  const getStars = () => {
    const stars = [];
    const rating = Math.floor(game.rating);
    for (let i = 0; i < 5; i++) {
      if (i < rating) stars.push(<img alt="star" key={i} src={starfull} />);
      else stars.push(<img alt="star" key={i} src={starEmpty} />);
    }
    return stars;
  };
  //GET PLATFORM IMAGES
  const getPlatform = (platform) => {
    if (/^PlayStation/.test(platform)) return playstation;
    else if ("Xbox One" == platform) return xbox;
    else if ("PC" == platform) return steam;
    else if ("Nintendo Switch" == platform) return nintendo;
    else if ("iOS" == platform) return apple;
    else return gamepad;
  };
  //Data
  const { screen, game, isLoading } = useSelector((state) => state.detail);

  return (
    <>
      {!isLoading ? (
        <CardShadow className="shaddow" onClick={exitDetailHandler}>
          <Detail layoutId={pathId}>
            <Stats>
              <div className="rating">
                <motion.h3>{game.name}</motion.h3>
                <p>Rating: {game.rating} </p>
                {getStars()}
              </div>
              <Info>
                <h3>Platforms</h3>
                <Platforms>
                  {game.platforms.map((data) => (
                    <img
                      alt={data.platform.name}
                      key={data.platform.id}
                      src={getPlatform(data.platform.name)}
                    ></img>
                  ))}
                </Platforms>
              </Info>
            </Stats>
            <Media>
              <motion.img src={smallImage(game.background_image, 1280)} alt="Game " />
            </Media>
            <Description>
              <p>{game.description_raw}</p>
            </Description>
            <div className="gallery">
              {screen.results.map((screen) => (
                <img src={smallImage(screen.image, 1280)} alt="Game " key={screen.id} />
              ))}
            </div>
          </Detail>
        </CardShadow>
      ) : (
        <CardShadow className="shaddow" onClick={exitDetailHandler}>
          <Detail className="empty" layoutId={pathId}>
            <div className="rating">
              <motion.h3 layoutId={`title ${pathId}`}>{clickedGame}</motion.h3>
            </div>
          </Detail>
        </CardShadow>
      )}
    </>
  );
};
const CardShadow = styled(motion.div)`
  width: 100%;
  min-height: 100vh;
  overflow-y: scroll;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 5;

  &::-webkit-scrollbar {
    width: 0.5rem;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #ff7676;
  }

  &::-webkit-scrollbar-track {
    background: white;
  }
`;

const Detail = styled(motion.div)`
  width: 80%;
  border-radius: 1rem;
  padding: 2rem 5rem;
  background: white;
  position: absolute;
  left: 10%;
  color: black;
  z-index: 10;
  &.empty {
    min-height: 100vh;
  }
  img {
    width: 100%;
  }
`;

const Stats = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  img {
    width: 2rem;
    height: 2rem;
    display: inline;
  }
`;
const Info = styled(motion.div)`
  text-align: center;
`;
const Platforms = styled(motion.div)`
  display: flex;
  justify-content: space-evenly;
  img {
    margin-left: 3rem;
  }
`;

const Media = styled(motion.div)`
  margin-top: 5rem;
  img {
    width: 100%;
    height: 60vh;
    object-fit: cover;
    object-position: top;
  }
`;

const Description = styled(motion.div)`
  margin: 5rem 0rem;
`;

export default GameDetail;
