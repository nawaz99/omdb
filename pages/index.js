import React from "react";
import Movie from "./components/movie";

const Index = () => {
  const [state, setState] = React.useState({ title: "", year: "" });
  const [movies, setMovies] = React.useState([]);

  const { title, year } = state;
  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const fetchfunc = async () => {
    await fetch(
      `http://www.omdbapi.com/?type=series&y=${year}&s=${title}&apikey=4098853d`,
    )
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("movies", JSON.stringify(data.Search));
        setMovies(data.Search);
      });
  };

  React.useEffect(() => {
    fetchfunc();
  }, [title, year]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchfunc();
  };

  const handleNext = () => {
    setMovies(movies.slice(8, movies.length));
  };

  return (
    <>
      <div
        style={{
          background: "black",
          color: "white",
          height: "10vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          border: "2px solid black",
        }}>
        <h1>Movie Search</h1>
      </div>
      <div>
        <form
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <input
            style={{ border: "2px solid blue", width: "30%", height: "40px",margin:"20px" }}
            placeholder='Search By Title'
            type='search'
            name={"title"}
            value={title}
            onChange={handleChange}
            autoComplete={"off"}
          />
          <input
            style={{ border: "2px solid blue", width: "30%", height: "40px",margin:"20px" }}
            placeholder='Search By Year'
            type='search'
            name={"year"}
            value={year}
            onChange={handleChange}
            autoComplete={"off"}
          />
        </form>
        <div style={{textAlign:"center"}}>
          <button type='button' onClick={handleSubmit} style={{padding:"10px",width:"10%",border:"none",outline:"none",borderRadius:"20px",background:"blue",color:"white"}}>
            Search
          </button>
        </div>
        <Movie
          movies={movies}
          handleNext={handleNext}
          handlePrev={handleSubmit}
        />
      </div>
    </>
  );
};

export default Index;
