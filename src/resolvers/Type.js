import { GraphQLScalarType } from 'graphql'


const Type = {
    Movie: {
        id: (parent) => parent.id || parent._id,
        url: (parent) => `http://localhost:4000/movies/${parent.id|| parent._id}`
    }
}

export default Type