const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v1: uuid } = require('uuid')

let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  { 
    name: 'Joshua Kerievsky',
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  { 
    name: 'Sandi Metz',
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },  
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]


const typeDefs = `
  type Author {
    name: String!
    born: Int
    id: ID!
    bookCount: Int!
  }

  type Book {
    title: String!
    published: Int!
    author: String!
    genres: [String!]!
    id: ID!
  }

  type Query {
    authorCount: Int!
    bookCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    addAuthor(
      name: String!
      born: Int
      bookCount: Int!
    ): Author
    editAuthor(
      name: String!
      born: Int!
    ): Author
  }
`

const resolvers = {
  Author: {
    bookCount: (parent) => {
      return books.filter(book => book.author === parent.name).length;
    },
  },
  Query: {
    authorCount: () => authors.length,
    bookCount: () => books.length,
    allBooks: (root, args) => {
      const { author, genre } = args;
      //IF BOTH PARAMETERS
      if (author && genre) {
        const filteredBooks = books.filter(book => book.author === author);

        return filteredBooks.filter(book => book.genres.includes(genre));
      }
      //IF PARAMETER IS AUTHOR
      if (author) {
        return books.filter(book => book.author === author);
      }
      //IF PARAMETER IS GENRE
      if (genre) {
        return books.filter(book => book.genres.includes(genre));
      }
      //IF NO PARAMETERS
      return books;
    },
    allAuthors: () => authors,
  },
  Mutation: {
    addBook: (root, args) => {
      const existingAuthor = authors.find((a) => a.name === args.author);

      //IF AUTHOR NAME IS ALREADY KNOWN
      if (existingAuthor) {
        args.authorId = existingAuthor.id;
      } 
      //IF AUTHOR NAME IS NEW
      else {
        const newAuthor = resolvers.Mutation.addAuthor(root, { name: args.author });
        args.authorId = newAuthor.id;
      }
      
      const book = { ...args, id: uuid() };
      books = books.concat(book);

      return book;
    },
    addAuthor: (root, args) => {
      const author = { 
        name: args.name,
        born: args.born,
        id: uuid() 
      };

      authors.push(author);
      return author;
    },
    editAuthor: (root, args) => {
      const author = authors.find(a => a.name === args.name)

      //IF NAME DOESN'T EXIST IN THE AUTHORS
      if (!author) {
        return null
      }

      const authorToUpdate = { ...author, born: args.born }
      authors = authors.map(a => a.name === args.name ? authorToUpdate : a)
      return authorToUpdate
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})