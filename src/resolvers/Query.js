import { ObjectId } from 'mongodb'

const Query = {
    movie: async (parent, args, { db }) => {
        const result = await db.collection('movies').findOne({ _id: ObjectId(args.id) });
        if (result) {
            return result;
        } else {
            throw new Error('Movie not found');
        }
    },
    movies: async (parent, args, { db }) => {
        const { filter, paging, sorting } = args;
        const { sortBy, sort } = sorting;
        const { first, start } = paging;
        const { genre, createdBetween, yearBetween, ratingBetween } = filter;
        let query = {};
        if (genre) {
            query.genre = genre;
        }
        if (createdBetween) {
            query.created_at = {
                $gte: new Date(createdBetween.start),
                $lte: new Date(createdBetween.end)
            };
        }
        if (yearBetween) {
            query.year = {
                $gte: yearBetween.start,
                $lte: yearBetween.end
            };
        }
        if (ratingBetween) {
            query.rating = {
                $gte: ratingBetween.start,
                $lte: ratingBetween.end
            };
        }
        const result = await db.collection('movies').find(query).sort({ [sortBy]: sort }).skip(start).limit(first).toArray();
        return result;  
    },
    totalMovies: async (parent, args, { db }) => {
        const cnt = await db.collection('movies').estimatedDocumentCount()
        return cnt;
    }
}

export default Query