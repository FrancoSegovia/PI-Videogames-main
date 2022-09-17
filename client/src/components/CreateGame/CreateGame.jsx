import React from "react";
import { Link, useHistory } from "react-router-dom";
import style from "../style/CreateGame.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGenres, postGame, fetchGames } from "../../store/actions";

function CreateGame() {
  let dispatch = useDispatch();
  let history = useHistory();
  let genres = useSelector((state) => state.genres);
  let games = useSelector((state) => state.filteredGames);
  let platforms = [];

  games.forEach((game) => {
    game.platforms.forEach((platform) => {
      if (!platforms.includes(platform)) {
        platforms = [...platforms, platform];
      }
    });
  });

  const [newGame, setNewGame] = useState({
    name: "",
    description: "",
    release_date: "",
    rating: 0,
    platforms: [],
    genres: [],
  });

  useEffect(() => {
    dispatch(getGenres());
    dispatch(fetchGames());
  }, []);

  function onGenreCheckboxClick(e) {
    // if (newGame.genres.length )
    let flag = e.target.checked;

    // const isOnArray = newGame.genres.map(e => e.name.includes(e.target.value));

    // if (isOnArray.length && flag) {
    //   e.target.checked = false;
    // } else {
    //   flag = false;
    // }

    if (/*newGame.genres.length < 3 && */ flag) {
      setNewGame({
        ...newGame,
        genres: [...newGame.genres, { name: e.target.value }],
      });
    } else {
      setNewGame({
        ...newGame,
        genres: newGame.genres.filter((genre) => genre.name !== e.target.value),
      });
    }
  }

  function onPlatformCheckboxClick(e) {
    let flag = e.target.checked;

    if (flag) {
      setNewGame({
        ...newGame,
        platforms: [...newGame.platforms, e.target.value],
      });
    } else {
      setNewGame({
        ...newGame,
        platforms: newGame.platforms.filter(
          (platform) => platform !== e.target.value
        ),
      });
    }
  }

  function onInputChange(e) {
    e.preventDefault();

    // const regex =  new RegExp("^[A-Z\\s]", "i");

    // if (e.target.name === "name") {
    //   if (!regex.test(e.target.value)) {
    //     alert("Ingrese solo letras.");
    //     e.target.value = "";
    //   }
    // }

    if (e.target.name === "rating") {
      if (e.target.value < 0) {
        alert("El número debe ser mayor a 0.");
        e.target.value = 0;
      }
      if (e.target.value > 5) {
        alert("El número debe ser menor a 5.");
        e.target.value = 5;
      }
    }

    setNewGame({
      ...newGame,
      [e.target.name]: e.target.value,
    });
  }

  function onSubmit(e) {
    e.preventDefault();

    if (newGame.name.trim() === "") {
      alert("El nombre del juego es obligatorio.");
      return;
    }
    if (newGame.description.trim() === "") {
      alert("La descripción es obligatoria.");
      return;
    }
    if (parseInt(newGame.release_date.slice(0, -4)) < 1972) {
      alert("La fecha de lanzamiento debe ser mayor a 1972 (se toma de referencia la invención del PONG).");
      return;
    }
    if (newGame.release_date.length > 10) {
      alert("La fecha de lanzamiento debe respetar el formato DD/MM/AAAA.");
      return;
    }
    if (!newGame.platforms.length) {
      alert("Se debe ingresar al menos una plataforma.");
      return;
    }

    dispatch(postGame(newGame));
    alert("El videojuego fue creado con exito.");

    setNewGame({
      name: "",
      description: "",
      release_date: "",
      rating: 0,
      platforms: [],
      genres: [],
    });

    history.push("/home");
  }

  return (
    <>
      {" "}
      {platforms.length ? (
        <div className={style.mainContainer}>
          <div className={style.formContainer}>
            <h1 className={style.mainTitle}>CREAR NUEVO JUEGO</h1>

            <form onSubmit={onSubmit} className={style.form}>

              <label htmlFor="" className={style.labels}>
                Nombre:
              </label>
              <input
                placeholder="Super astronautas 3000"
                onChange={onInputChange}
                className={style.text}
                type="text"
                name="name"
              />

              <label htmlFor="" className={style.labels}>
                Descripción:
              </label>
              <textarea
                placeholder="Juego de aventura donde..."
                onChange={onInputChange}
                name="description"
                id=""
                cols="30"
                rows="5"
                className={style.textArea}
              ></textarea>

              <label htmlFor="" className={style.labels}>
                Fecha de lanzamiento:
              </label>
              <input
                onChange={onInputChange}
                className={style.text}
                type="date"
                name="release_date"
              />

              <label htmlFor="" className={style.labels}>
                Rating: (0-5)
              </label>
              <input
                onChange={onInputChange}
                className={style.textRating}
                type="number"
                name="rating"
                step="0.1"
              />

              <label htmlFor="" className={style.labels}>
                Plataformas:
              </label>
              <div className={style.genresContainer}>
                {platforms?.map((platform) => {
                  return (
                    <label className={style.genreLabels}>
                      {platform}
                      <input
                        onClick={onPlatformCheckboxClick}
                        type="checkbox"
                        value={platform}
                      />
                    </label>
                  );
                })}
              </div>

              <label htmlFor="" className={style.labels}>
                Géneros:
              </label>
              <div className={style.genresContainer}>
                {genres?.map((genre) => {
                  return (
                    <label className={style.genreLabels}>
                      {genre.name}
                      <input
                        /*disabled={newGame.genres.length < 3 ? false : true}*/ 
                        onClick={onGenreCheckboxClick}
                        type="checkbox"
                        value={genre.name}
                      />
                    </label>
                  );
                })}
              </div>

              <input
                className={style.submitButton}
                type="submit"
                name=""
                value="CREAR JUEGO"
              />
            </form>
          </div>

          <Link to="/home" className={style.backButton}>
            REGRESAR
          </Link>
        </div>
      ) : (
        <div className={style.loaderContainer}>
          <div className={style.loader}></div>
        </div>
      )}
    </>
  );
}

export default CreateGame;
