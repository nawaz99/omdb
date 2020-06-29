import React,{useState} from "react";
import Link from "next/link";

const fullplot = (props) => {
  const [plot, fullplot] = useState({});
  const id = props.id;

  const fetchfunc = async () => {
    await fetch(
      `http://www.omdbapi.com/?type=series&i=${id}&plot=full&apikey=4098853d`,
    )
      .then((res) => res.json())
      .then((data) => {
        fullplot(data);
      });
  };

  React.useEffect(() => {
    fetchfunc();
  }, [id]);
  return (
    <div>
      <Link href='/'>
        <a>Home</a>
      </Link>
      {plot.Title ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
          }}>
          <div>
            <h1>{plot.Title}</h1>
            <h2>{plot.Year}</h2>
            <img
              src={plot.Poster}
              alt='fullplot'
              style={{ borderRadius: "20px" }}
            />
          </div>
          <ul
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              justifyContent: "space-around",
              listStyle: "none",
              fontSize: "1rem",
              fontWeight: "Bold",
            }}>
            <li>Actors:{plot.Actors}</li>
            <li>Country:{plot.Country}</li>
            <li>Genre:{plot.Genre}</li>
            <li>Language:{plot.Language}</li>
            <li>Released:{plot.Released}</li>
            <li>Runtime:{plot.Runtime}</li>
            <li>
              <p>Writer:{plot.Writer}</p>
            </li>
            <li>Year:{plot.Year}</li>
            <li>ImdbRating:{plot.ImdbRating}</li>
          </ul>
        </div>
      ) : (
        <h1>Loading....</h1>
      )}
    </div>
  );
};

fullplot.getInitialProps = async (props) => {
  return { id: props.query.id };
};

export default fullplot;
