const Search = ({handleSearchChange}) => {
    return (
        <div>
            Search: <input onChange={handleSearchChange} />
        </div>
    )
}

export default Search