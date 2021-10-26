import React from "react";
import axios from "axios";
import Movies from "./Movie";
import "./App.css";

class App extends React.Component {
  state = {
    isLoading: true,
    movies: [],
  };

  getMovie = async () => {
    const {
      data: {
        data: { movies },
      },
    } = await axios.get(
      "https://yts-proxy.now.sh/list_movies.json?sort_by=rating"
    );
    this.setState({ movies, isLoading: false });
  };
  componentDidMount() {
    this.getMovie();
  }
  render() {
    const { isLoading, movies } = this.state;
    return (
      <section className="container">
        {isLoading ? (
          <div className="loader">
            <span className="loader__text">Loading...</span>
          </div>
        ) : (
          <div className="movies">
            {movies.map((data) => (
              <Movies
                key={data.id}
                id={data.id}
                year={data.year}
                title={data.title}
                summary={data.summary}
                poster={data.medium_cover_image}
                genres={data.genres}
              />
            ))}
          </div>
        )}
        ;
      </section>
    );
  }
}

export default App;
