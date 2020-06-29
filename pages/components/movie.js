import React from "react";
import Link from "next/link";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "80%",
    margin: "auto",
    display: "grid",
    gridTemplateColumns: "repeat(4,1fr)",
  },
  root: {
    margin: "10px",
    color: "white",
    border:"1px solid blue"
  },
  media: {
    height: "50px",
    paddingTop: "56.25%", // 16:9
  },
  btns: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },
  text: {
    textDecoration: "none",
    color: "white",
  },
}));
const Movie = ({ movies, handleNext, handlePrev }) => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.container}>
        {!movies ? (
          <h2>Search Movies....</h2>
        ) : (
          movies.slice(0, 8).map(({ Title, Poster, Year, imdbID }) => {
            return (
              <Card className={classes.root} key={Poster}>
                <CardMedia
                  className={classes.media}
                  image={Poster}
                  title={Title}
                />
                <CardContent>
                  <Typography variant='body2' color='textPrimary' component='p'>
                    Title:{Title}
                    <br />
                    Year:{Year}
                  </Typography>
                </CardContent>
                <Button
                  variant='contained'
                  type='button'
                  color='primary'
                  className={classes.root}>
                  <Link href={{ pathname: "/fullplot", query: { id: imdbID } }}>
                    <a className={classes.text}>Movie Details</a>
                  </Link>
                </Button>
              </Card>
            );
          })
        )}
      </div>

      {movies && (
        <div className={classes.btns}>
          <Button
            variant='contained'
            type='button'
            color='default'
            onClick={handlePrev}>
            prev
          </Button>{" "}
          <Button
            variant='contained'
            type='button'
            color='default'
            onClick={handleNext}>
            Next
          </Button>
        </div>
      )}
    </>
  );
};
export default Movie;
