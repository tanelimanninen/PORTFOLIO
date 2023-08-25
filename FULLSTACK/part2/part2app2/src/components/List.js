import Person from './Person'

const List = ({filteredPersons}) => {
    return (
        <div>
            {filteredPersons.map(person =>
            <Person key={person.name} person={person} />
            )}
      </div>
    )
}

export default List