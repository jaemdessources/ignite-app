//Base URL
// const key = "8b66d1a71d414b34a0bbcbd09a531dbf";
const base_url = "https://api.rawg.io/api/";

//Getting the date
const getCurrentMonth = () => {
  const month = new Date().getMonth() + 1;
  if (month < 10) {
    return `0${month}`;
  } else {
    return month;
  }
};
//Getting the date
const getCurrentDay = () => {
  const day = new Date().getDate();
  if (day < 10) {
    return `0${day}`;
  } else {
    return day;
  }
};

//Current day/month/year
const currentYear = new Date().getFullYear();
const currentMonth = getCurrentMonth();
const currentDay = getCurrentDay();
const currentDate = `${currentYear}-${currentMonth}-${currentDay}`;
const lastYear = `${currentYear - 1}-${currentMonth}-${currentDay}`;
const nextYear = `${currentYear + 1}-${currentMonth}-${currentDay}`;

//Games Urls
const popular_games = `games?key=${process.env.REACT_APP_RAWG_API_KEY}&dates=${lastYear},${currentDate}&ordering=-rating&page_size=10`;
const upcoming_games = `games?key=${process.env.REACT_APP_RAWG_API_KEY}&dates=${currentDate},${nextYear}&ordering=-added&page_size=10`;
const new_games = `games?key=${process.env.REACT_APP_RAWG_API_KEY}&dates=${lastYear},${currentDate}&ordering=-released&page_size=10`;

//popular games
export const popularGamesUrl = () => `${base_url}${popular_games}`;
//upcoming games
export const upcomingGamesUrl = () => `${base_url}${upcoming_games}`;
//newGames
export const newGamesUrl = () => `${base_url}${new_games}`;
//games details
export const gameDetailsUrl = (game_id) =>
  `${base_url}games/${game_id}?key=${process.env.REACT_APP_RAWG_API_KEY}`;
//game screenshots
export const gameScreenshotsUrl = (game_id) =>
  `${base_url}games/${game_id}/screenshots?key=${process.env.REACT_APP_RAWG_API_KEY}`;
//searched game
export const searchedGameUrl = (game_name) =>
  `${base_url}games?search=${game_name}&page_size=9&key=${process.env.REACT_APP_RAWG_API_KEY}`;
