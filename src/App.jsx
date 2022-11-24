import { BrowserRouter, NavLink, Routes, Route } from "react-router-dom";
// import HomePage from "./pages/home.page.jsx";
// import FilmsPage from "./pages/films.page.jsx";
// import SingleFilmPage from "./pages/singlefilm.page.jsx";
import { HomePage, FilmsPage, SingleFilmPage } from "./pages/index.js";

export default function App(props) {
  return (
    <BrowserRouter>
      <nav>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/films">Films</NavLink>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="films" element={<FilmsPage />}></Route>
        <Route path="films/film/:id" element={<SingleFilmPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
