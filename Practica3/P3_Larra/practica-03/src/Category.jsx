import Movie from './Movie';

export default function Category({ title, movies }) {
  return (
    <div className="category-section">
      <h2>{title}</h2>
      <div className="movies-row">
        {/* Usamos map() para transformar cada dato en un componente Movie */}
        {movies.map((movie, index) => (
          <Movie 
            key={index} 
            title={movie.title} 
            director={movie.director} 
            year={movie.year} 
          />
        ))}
      </div>
    </div>
  );
}