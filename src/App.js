import { useState, useEffect } from 'react';
import './App.css';

function App() {

  const [query, setQuery] = useState('');
  const [news, setNews] = useState([]);
  const [page, setPage] = useState(1);


  const handleSearch = async (event) => {
    if (event) event.preventDefault();
    const apiKey = process.env.REACT_APP_GUARDIAN_API_KEY;
    const url = `https://content.guardianapis.com/search?q=${query}&page=${page}&api-key=${apiKey}`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data.response.results)
      setNews(data.response.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (query) {
      handleSearch();
    }
  }, [page]);
  


  return (
    <div className="App">
      <div className='search-box'>
        <h1>The Guardian News Search</h1>
        <h3>Search by topic:</h3>
        <form onSubmit={handleSearch}>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g., sports, politics, economy"
            />
          <button type="submit">search</button>
        </form>
      </div>
      <div className='articles-container'>
        <ul>
        {news.map((article) => (
          <li key={article.id}>
            <a href={article.webUrl} target="_blank" rel="noopener noreferrer">
              {article.webTitle}
            </a>
          </li>
        ))}
      </ul>
      </div>
      {news.length > 0 && (
        <div className='pagination-container'>
          <button disabled={page === 1 ? true : false } onClick={() => setPage(page > 1 ? page - 1 : 1)}>
          ← previous page
          </button>
          <p>page: {page}</p>
          <button onClick={() => setPage(page + 1)}>
            next page →
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
