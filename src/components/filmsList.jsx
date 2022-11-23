import { useState, useEffect } from "react";

function FilmsList(props) {

  //set up two variables, one called list, and the other called setList which is a function
  //and set list's initial value to be an empty array
  const [list, setList] = useState([]);

  function getFilms() {
    //Consuming the promise
    //1.    .then()
    //or 2. async/await
    fetch("https://ghibliapi.herokuapp.com/films")
      .then((res) => {
        return res.json();
      })
      .then((films) => {
        console.log(films);
        //Update the state
        setList(films);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  //Effectively componentDidMount
  //and it's all thanks to the dependency array []
  useEffect(()=>{
    getFilms();
  }, []);

  return (
    <ul>
      {list.map((element) => {
        return (
          <li key={element.id}>
            <p>
              {element.title} ---- {element.rt_score}%
            </p>
            <img src={element.image} alt="Movie poster" />
          </li>
        );
      })}
    </ul>
  );

}

export default FilmsList;