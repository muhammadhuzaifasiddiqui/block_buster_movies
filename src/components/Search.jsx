import React from "react";

const person = {
    name: "Oscar",
    age: 36,
    location: "New York"
}

const Search = ({searchTerm, setSearchTerm}) => {
    // searchTerm = 'I AM BATMAN NOT!';
  return (
    <div className="search">
        <div>
            <img src='search.svg' alt='search' />

            <input 
                type="text" 
                placeholder="Search through thousands of movies" 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
            />
        </div>
    </div>
  );
};

export default Search;