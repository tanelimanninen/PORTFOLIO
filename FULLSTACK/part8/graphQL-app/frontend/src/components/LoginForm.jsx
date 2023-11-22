import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'

const LoginForm = ({ setToken }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [ login, result ] = useMutation(LOGIN, {
        onError: (error) => {
          return <div>{error.graphQLErrors[0].message}</div>
        }
    })

    useEffect(() => {
        if ( result.data ) {
          const token = result.data.login.value
          setToken(token)
          console.log(token)
          localStorage.setItem('graphql-app-user-token', token)
        }
      }, [result.data])

      const submitUser = async (event) => {
        event.preventDefault()
    
        login({ variables: { username, password } })
      }

    return (
        <div>
            <form onSubmit={submitUser}>
                <div>
                <input
                    placeholder='Username'
                    value={username}
                    onChange={({ target }) => setUsername(target.value)}
                />
                </div>
                <div>
                <input
                    placeholder='Password'
                    type='password'
                    value={password}
                    onChange={({ target }) => setPassword(target.value)}
                />
                </div>
                <button type='submit'>Login</button>
            </form>
        </div>
    )
}

export default LoginForm