import { useState } from "react";

function SearchBar({ onSearch }) {
  // text = what the user has typed so far
  const [text, setText] = useState("");

  function handleSubmit(event) {
    event.preventDefault(); // stops the page from reloading
    const city = text.trim();
    if (city === "") {
      return;
    }
    onSearch(city); // send the city name up to App
    setText("");
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search city, e.g. Pune"
        value={text}
        onChange={(event) => setText(event.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;