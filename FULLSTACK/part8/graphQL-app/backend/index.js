const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { GraphQLError } = require('graphql')

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')
//const { argsToArgsConfig } = require('graphql/type/definition')
require('dotenv').config()
const jwt = require('jsonwebtoken')


const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })


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
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  
  type Token {
    value: String!
  }

  type Query {
    authorCount: Int!
    bookCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book!
    addAuthor(
      name: String!
      born: Int
      bookCount: Int
    ): Author
    editAuthor(
      name: String!
      born: Int!
    ): Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
`

const resolvers = {
  //RESOLVER 1
  Author: {
    bookCount: async (parent) => {
      const bookCount = await Book.countDocuments({ author: parent._id })

      return bookCount;
    },
  },
  //RESOLVER 2
  Query: {
    //QUERY 1
    authorCount: async () => Author.collection.countDocuments(),
    //QUERY 2
    bookCount: async () => Book.collection.countDocuments(),
    //QUERY 3
    allBooks: async (root, args) => {
      const { author, genre } = args;
      let query = {};

      //PARAMETER IS AUTHOR
      if (author) {
        const authorObj = await Author.findOne({ name: author });

        if (authorObj) {
          query.author = authorObj._id;
        } else {
          return [];
        }
      }

      //PARAMETER IS GENRE
      if (genre) {
        query.genres = genre;
      }

      //NO PARAMETERS
      if (!author && !genre) {
        const allBooks = await Book.find({}).populate('author');
      
        return allBooks;
      }

      const filteredBooks = await Book.find(query).populate('author');
      return filteredBooks;
    },
    //QUERY 4
    allAuthors: async () => {
      return Author.find({})
    },
    //QUERY 5
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  //RESOLVER 3
  Mutation: {
    //MUTATION 1
    addBook: async (root, args, context) => {
      let author = await Author.findOne({ name: args.author });
      const currentUser = context.currentUser

      //NO USER LOGGED IN
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        })
      }

      //IF AUTHOR NAME IS NEW
      if (!author) {
        author = new Author({ name: args.author });
        await author.save();
      }

      const book = new Book({
        title: args.title,
        published: args.published,
        author: author._id,
        genres: args.genres
      });

      //BOOK TITLE LENGTH IS TOO SHORT
      if (book.title.length < 5) {
        throw new GraphQLError('Validation error: Title is less than 5 characters', {
          extensions: {
            code: 'GRAPHQL_VALIDATION_FAILED',
          }
        })
      }

      const existingBook = await Book.findOne({ title: args.title });

      //BOOK TITLE ALREADY EXISTS
      if (existingBook) {
        throw new GraphQLError('Validation error: Book with the same title already exists', {
          extensions: {
            code: 'GRAPHQL_VALIDATION_FAILED',
          }
        });
      }

      try {
        await book.save();
      } catch (error) {
        throw new Error(`Failed to add book: ${error.message}`);
      }

      return book;
    },
    //MUTATION 2
    addAuthor: async (root, args) => {
      const author = new Author({ ...args })

      //AUTHOR NAME LENGTH IS TOO SHORT
      if (author.name.length < 4) {
        throw new GraphQLError('Validation error: Name is less than 4 characters', {
          extensions: {
            code: 'GRAPHQL_VALIDATION_FAILED',
          }
        })
      }

      const existingAuthor = await Author.findOne({ name: args.name });
  
      //AUTHOR NAME ALREADY EXISTS
      if (existingAuthor) {
        throw new GraphQLError('Validation error: Author with the same name already exists', {
          extensions: {
            code: 'GRAPHQL_VALIDATION_FAILED',
          }
        });
      }

      return author.save()
    },
    //MUTATION 3
    editAuthor: async (root, args, context) => {
      const author = await Author.findOne({ name: args.name })
      const currentUser = context.currentUser

      //NO USER LOGGED IN
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        })
      }

      //IF NAME DOESN'T EXIST IN THE AUTHORS
      if (!author) {
        return null
      }

      author.born = args.born
      return author.save()
    },
    //MUTATION 4
    createUser: async (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })
  
      return user.save()
        .catch(error => {
          throw new GraphQLError('Creating the user failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.name,
              error
            }
          })
        })
    },
    //MUTATION 5
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if ( !user || args.password !== 'secret' ) {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })        
      }
  
      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.startsWith('Bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), process.env.JWT_SECRET
      )
      const currentUser = await User
        .findById(decodedToken.id)
      return { currentUser }
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})