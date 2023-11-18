import { useState } from 'react';
import Select from 'react-select';
import { useMutation, useQuery } from '@apollo/client';
import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries';

const AuthorForm = () => {
    const [name, setName] = useState('');
    const [born, setBorn] = useState('');

    const [ editAuthor ] = useMutation(EDIT_AUTHOR, {
        refetchQueries: [{ query: ALL_AUTHORS }],
    });

    const submitAuthor = async (event) => {
        event.preventDefault();

        const bornAsInt = parseInt(born, 10);

        editAuthor({ variables: { name, born: bornAsInt } });

        setName('');
        setBorn('');
    };

    const { data } = useQuery(ALL_AUTHORS);

    const authorOptions = data.allAuthors.map((author) => ({
        value: author.name,
        label: author.name,
    }));

    return (
        <div>
            <h3>Set birthyear</h3>

            <form onSubmit={submitAuthor}>
                <div>
                    Name:
                    <Select
                        value={{ label: name, value: name }}
                        onChange={(selectedOption) => setName(selectedOption.value)}
                        options={authorOptions}
                    />
                </div>
                <div>
                    Born:
                    <input value={born} onChange={({ target }) => setBorn(target.value)} />
                </div>
                <div>
                    <button type='submit'>Update</button>
                </div>
            </form>
        </div>
    )
}

export default AuthorForm