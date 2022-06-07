import { ObjectId } from 'mongodb'

const Mutation = {
    createMovie: async (parent, args, { db })  => {
        const newMovie = {
            ...args.input,
            created_at: new Date()
        }
        const insertedResult  = await db.collection('movies').insertOne(newMovie)
        newMovie.id = insertedResult.insetedId
        return newMovie
    },

    updateMovie: async (parent, args, { db }) => {
        const { id, input } = args
        const updateResult = await db.collection('movies').findOneAndUpdate({ _id: ObjectId(id) }, { $set: input }, { returnOriginal: false })
        if (updateResult.value) {
            return updateResult.value
        } else{
            throw new Error('Movie not found')
        }

    },

    deleteMovie: async(parent, args, { db }) => {
        const deleteResult = await db.collection('movies').findOneAndDelete({ _id: ObjectId(args.id) })
        if (deleteResult.value) {
            return true
        } else{
            return false
        }
    }
}

export default Mutation