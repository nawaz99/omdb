import React from "react";
import Link from "next/link";

const Movie = ({ movies, handleNext, handlePrev }) => {
  return (
    <>
      <div
        style={{
          width: "80%",
          margin: "auto",
          display: "grid",
          gridGap: "20px",
          gridTemplateColumns: "repeat(4,1fr)",
          alignItems: "center",
          justifyContent: "space-around",
        }}>
        {!movies ? (
          <h2>Search Movies....</h2>
        ) : (
          movies.slice(0, 8).map(({ Title, Poster, Year, imdbID }, i) => {
            return (
              <div
                key={i}
                style={{
                  border: "1px solid green",
                  width: "100%",
                  borderRadius: "20px",
                  overflow: "hidden",
                  paddingBottom: "20px",
                }}>
                <img src={Poster} alt='poster' style={{ width: "100%" }} />
                <div style={{ textAlign: "center" }}>
                  <h3>Title:{Title}</h3>
                  <h4>Year:{Year}</h4>

                  <div>
                    <Link
                      href={{ pathname: "/fullplot", query: { id: imdbID } }}>
                      <button
                        style={{
                          padding: "10px",
                          border: "none",
                          outline: "none",
                          borderRadius: "20px",
                          background: "blue",
                          color: "white",
                        }}>
                        Movie Details
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {movies && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}>
          <button
            type='button'
            style={{
              padding: "10px",
              width: "10%",
              border: "none",
              outline: "none",
              borderRadius: "20px",
              background: "green",
              color: "white",
            }}
            onClick={handlePrev}>
            prev
          </button>{" "}
          <button
            type='button'
            style={{
              padding: "10px",
              width: "10%",
              border: "none",
              outline: "none",
              borderRadius: "20px",
              background: "green",
              color: "white",
            }}
            onClick={handleNext}>
            Next
          </button>
        </div>
      )}
    </>
  );
};
export default Movie;
