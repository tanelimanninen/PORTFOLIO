const Input = ({ value, handleChange }) => {
    return (
        <div>
            Countries: <input value={value} onChange={handleChange} />
        </div>
    )
}

export default Input