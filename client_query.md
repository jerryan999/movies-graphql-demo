
## get Movies
```
    query GetMovies($filter: MovieFilter, $paging: DataPage, $sorting: DataSort) {
        movies(filter: $filter, paging: $paging, sorting: $sorting) {
            id
            title
        }
    }

```

```
    {
        "filter": {"genre":"DRAMA","yearBetween":{"start": 1990, "end":2000}}, 
        "paging": {"first": 100},
        "sorting": {"sort": "ASC", "sortBy": "created_at"}
    }
```
## get a movie
```
    query GetMovie($id:ID!) {
    movie(id:$id){
        id
        title,
    	  year
    	  rating
    		url
    }
}
```

```
{
    "id":"629ecd67a4f3e791b42113db"   
}
```



## createMovie
```
    mutation CreateMovie($input: MovieInput){
    createMovie(input:$input) {
        id
        title
        url
        year
        genre
        rating
        created_at
    }
    }
```

```
{
  "input":{
    "title":"The Shawshank Redemption",
    "year":1994,
    "genre": "DRAMA",
    "rating": 9.2 
  }
}

{
  "input":{
    "title":"Pinocchio",
    "year":2022,
    "genre": "DRAMA",
    "rating": 9.0 
  }
}

{
  "input":{
    "title":"We Can Be Heroes ",
    "year":2020,
    "genre": "DRAMA",
    "rating": 4.7 
  }
}

{
    "input":{
        "title":"The Sandlot Kids ",
        "year":1993,
        "genre": "DRAMA",
        "rating": 7.8 
    }    
}

{
    "input":{
        "title":"The Lion King  ",
        "year": 2019,
        "genre": "DRAMA",
        "rating": 6.8 
    }    
}

```

## UpdateMovie
```
   mutation UpdateMovie($id:ID! $input: MovieInput){
  updateMovie(id:$id input:$input) {
    id
    title
    url
    year
    genre
    rating
    created_at
  }
}
```

```
{
    "id":"629ecddda4f3e791b42113dd",
    "input":{
        "title":"The Lion King",
        "year": 2019,
        "genre": "DRAMA",
        "rating": 7.7 
    }    
}
```

## DeleteMovie 
```
mutation DeleteMovie($id:ID!){
  deleteMovie(id:$id)
}
```

```
{
    "id":"629ecd70a4f3e791b42113dc"   
}
```

## totalMovie
```
query TotalMovies {
  totalMovies
}
```