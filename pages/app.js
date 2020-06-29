import React from "react";
import Movie from "./components/movie";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  root1: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const App = () => {
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

  const classes = useStyles();
  return (
    <>
      <div className={classes.root1}>
        <AppBar position='static'>
          <Toolbar>
            <IconButton
              edge='start'
              className={classes.menuButton}
              color='inherit'
              aria-label='menu'>
              <MenuIcon />
            </IconButton>
            <Typography variant='h6' className={classes.title}>
              Movie Series Search
            </Typography>
            <Button color='inherit'>Login</Button>
          </Toolbar>
        </AppBar>
      </div>
      <div style={{ textAlign: "center" }}>
        <form className={classes.root} noValidate autoComplete='off'>
          <TextField
            id='standard-basic'
            label='Search By Title'
            variant='standard'
            type='search'
            name={"title"}
            value={title}
            onChange={handleChange}
          />
          <TextField
            id='standard-basic'
            label='Search By Year'
            variant='standard'
            type='search'
            name={"year"}
            value={year}
            onChange={handleChange}
          />
        </form>
        <div className={classes.root}>
          <Button
            variant='contained'
            type='button'
            color='primary'
            onClick={handleSubmit}>
            Search
          </Button>
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

export default App;
