import Person from './Person'

const List = ({ filteredPersons, deletePerson }) => {
    return (
        <div>
            {filteredPersons.map(person =>
            <Person key={person.name} person={person} deletePerson={deletePerson} />
            )}
      </div>
    )
}

export default List