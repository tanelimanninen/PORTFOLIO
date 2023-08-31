const Person = ({ person, deletePerson }) => {
    return (
      <div>
        <p>
          {person.name} {person.number} --
          <button className='button2' onClick={() => deletePerson(person.id)}>Delete</button>
        </p>
      </div>
    )
}

export default Person