import { useState, useEffect } from 'react';
import './App.css';

function App() {

  const [query, setQuery] = useState('');
  const [news, setNews] = useState([]);
  const [page, setPage] = useState(1);


  const handleSearch = async (event) => {
    if (event) event.preventDefault();
    const apiKey = '55b7f60a-4ec8-4340-91ca-a9d90a86ac05';
    const url = `https://content.guardianapis.com/search?q=${query}&page=${page}&api-key=${apiKey}`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
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
      <h1>The Guardian News Search</h1>
      <form onSubmit={handleSearch}>
        <label>Enter a topic:
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g., sports, politics, economics"
          />
        </label>
        <button type="submit">Search</button>
      </form>
      <ul>
      {news.map((article) => (
        <li key={article.id}>
          <a href={article.webUrl} target="_blank" rel="noopener noreferrer">
            {article.webTitle}
          </a>
        </li>
      ))}
    </ul>
    {news.length > 0 && (
      <div>
        <button onClick={() => setPage(page > 1 ? page - 1 : 1)}>
          Previous Page
        </button>
        <button onClick={() => setPage(page + 1)}>
          Next Page
        </button>
      </div>
    )}
    </div>
  );
}

export default App;
