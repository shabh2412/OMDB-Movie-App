const url = 'https://www.omdbapi.com/?apikey=bd868dbd';
const na = 'N/A';

async function fetchId(imdbID) {
    const query = `${url}&i=${imdbID}`;
    try {
        let response = await fetch (query);
        let rating = await response.json();
        // console.log(`${imdbID} : ${rating.imdbRating}`);
        if(rating.imdbRating !== na) {
            return rating.imdbRating;
        }
        // return rating.imdbRating;
        // console.log(rating.imdbRating);
    } catch (err) {
        console.log(err);
    }
}

function displayResult(data) {
    let movieSearchResult = document.getElementById('movieSearchResult');
    movieSearchResult.innerHTML = null;
    if(data.length === 1 && data[0].Poster == na) {
        movieNotFound();
        return;
    }
    data.forEach(function (el) {
        // movieSearchResult.append(createCard(el));
        // console.log(el);
        fetchId(el.imdbID).then(function(res) {
            // console.log(res);
            if(el.Poster!==na) {
                let col = document.createElement('div');
                // col.classList = 'col-lg-2 col-md-6 col-sm-12';
                
                el.rating = res;
                // col.append(createCard(el));
                // movieSearchResult.append(col);
                movieSearchResult.append(createCard(el));
            }
        }).catch (function (err) {
            console.log(err);
            movieNotFound();
        })
    })
    // createCard (data);
}

function createCard(data) {
    console.log(data);
    let card = document.createElement('div');
    card.classList = 'card bg-warning p-0 border-warning col-lg-4 col-sm-4';
    card.style.width = '18rem';
    let movieImage = document.createElement('img');
    movieImage.classList = 'card-img-top';
    movieImage.src = data.Poster;

    let cardBody = document.createElement('div');
    cardBody.classList = 'card-body';
    if(+data.rating >= 8.5) {
        let recommended = document.createElement('div');
        recommended.classList = 'position-absolute recommended border bg-primary text-white p-1';
        recommended.innerText = 'Recommended';
        card.append(recommended);
    }

    let title = document.createElement('h5');
    // title.classList = ''
    title.innerText = data.Title;
    let p = document.createElement('p');
    p.classList = 'card-text';
    let year = document.createElement('small');
    year.classList = 'text-muted';
    year.innerText = data.Year;

    let ratings = document.createElement('p');
    ratings.classList = 'fw-semibold';
    if(data.rating !== undefined) {
        ratings.innerText = `IMDb Rating : ${data.rating}/10 `;
    }
    else {
        ratings.innerText = `IMDb Rating : Not Available `;
    }
    // console.log(rating);

    p.append(year);

    cardBody.append(title,p,ratings);
    card.append(movieImage,cardBody);
    return card;
}

// let sample = {
//     "Title": "Avengers: Age of Ultron",
//     "Year": "2015",
//     "Rated": "PG-13",
//     "Released": "01 May 2015",
//     "Runtime": "141 min",
//     "Genre": "Action, Adventure, Sci-Fi",
//     "Director": "Joss Whedon",
//     "Writer": "Joss Whedon, Stan Lee, Jack Kirby",
//     "Actors": "Robert Downey Jr., Chris Evans, Mark Ruffalo",
//     "Plot": "When Tony Stark and Bruce Banner try to jump-start a dormant peacekeeping program called Ultron, things go horribly wrong and it's up to Earth's mightiest heroes to stop the villainous Ultron from enacting his terrible plan.",
//     "Language": "English, Korean",
//     "Country": "United States",
//     "Awards": "8 wins & 51 nominations",
//     "Poster": "https://m.media-amazon.com/images/M/MV5BMTM4OGJmNWMtOTM4Ni00NTE3LTg3MDItZmQxYjc4N2JhNmUxXkEyXkFqcGdeQXVyNTgzMDMzMTg@._V1_SX300.jpg",
//     "Ratings": [
//         {
//             "Source": "Internet Movie Database",
//             "Value": "7.3/10"
//         },
//         {
//             "Source": "Rotten Tomatoes",
//             "Value": "76%"
//         },
//         {
//             "Source": "Metacritic",
//             "Value": "66/100"
//         }
//     ],
//     "Metascore": "66",
//     "imdbRating": "7.3",
//     "imdbVotes": "833,105",
//     "imdbID": "tt2395427",
//     "Type": "movie",
//     "DVD": "02 Oct 2015",
//     "BoxOffice": "$459,005,868",
//     "Production": "N/A",
//     "Website": "N/A",
//     "Response": "True"
// }

async function makeASearchRequest(name) {
    let searchTerm = document.getElementById('searchTerm');
    searchTerm.innerText = `you searched for: ${name}`;
    if(name == '') {
        alert('Please enter a valid name');
        return;
    }
    const query = `${url}&s=${name}`;
    // let query = `https://google.com&t=${name}`;
    try {
        let response = await fetch(query);
        // console.log(response.)
        let data = await response.json();
        // let str = '';
        if(data.Response === 'False') {
            movieNotFound();
        }
        // else if (data.Poster === na || data.Ratings.length === 0){
        //     movieNotFound();
        // }
        else {
            console.log(data);
            displayResult(data.Search);
        }
        // console.log(data.Response==='False');
    }
    catch (err) {
        console.log(err);
    }
    // fetch(query).then(function (res) {
    //     // console.log(res);
    //     return res.json();
    // })
    // .then (function (data) {
    //     console.log(data);
    // })
    // .catch(function (err) {
    //     console.log(err);
    // })
}

function movieNotFound() {
    let movieSearchResult = document.getElementById('movieSearchResult');
    movieSearchResult.innerHTML = null;
    movieSearchResult.append(ErrorCard());
}

function ErrorCard () {
    let card = document.createElement('div');
    card.classList = 'card mx-auto bg-warning';
    card.style.width = '18rem';
    let img = document.createElement('img');
    img.classList = 'card-img-top';
    img.src = 'https://www.maxpixel.net/static/photo/1x/Funny-Pug-Pet-Dog-Canine-Animal-Cute-Sad-Puppy-5222518.png';
    let cardBody = document.createElement('div');
    cardBody.classList = 'card-body';
    let h5 = document.createElement('h5');
    h5.classList = 'text-center mx-auto';
    h5.innerText = 'Sorry :/ Movie Not Found!';
    cardBody.append(h5);
    card.append(img,cardBody);
    return card;
}


let normalSearchBtn = document.getElementById('normalSearchBtn');
normalSearchBtn.addEventListener('click', function() {
    normalSearchFunction(this);
});

function normalSearchFunction(btn) {
    // let btn = this;
    let normalSearch = document.querySelector('#normalSearch');
    let name = normalSearch.value;
    if(btn) {
        setTimeout(function(){
            btn.blur();
        },100);
        normalSearch.value = '';
    }
    // this.blur();
    makeASearchRequest(name);
}

let navSearchBtn = document.getElementById('navSearchBtn');
navSearchBtn.addEventListener('click', function(event) {
    navSearchFunction(this,event)
});

function navSearchFunction (btn,event) {
    if (event) {
        event.preventDefault();
    }
    let navSearch = document.querySelector('#navSearch');
    let name = navSearch.value;
    if(btn) {
        setTimeout(function(){
            btn.blur();
        },100);
        navSearch.value = '';
    }
    // let btn = this;
    makeASearchRequest(name);
}

let sample = {
    "Search": [
        {
            "Title": "The Avengers",
            "Year": "2012",
            "imdbID": "tt0848228",
            "Type": "movie",
            "Poster": "https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
            "rating": "8.0"
        },
        {
            "Title": "Avengers: Endgame",
            "Year": "2019",
            "imdbID": "tt4154796",
            "Type": "movie",
            "Poster": "https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_SX300.jpg",
            "rating": "8.4"
        },
        {
            "Title": "Avengers: Infinity War",
            "Year": "2018",
            "imdbID": "tt4154756",
            "Type": "movie",
            "Poster": "https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_SX300.jpg",
            "rating": "8.4"
        },
        {
            "Title": "Avengers: Age of Ultron",
            "Year": "2015",
            "imdbID": "tt2395427",
            "Type": "movie",
            "Poster": "https://m.media-amazon.com/images/M/MV5BMTM4OGJmNWMtOTM4Ni00NTE3LTg3MDItZmQxYjc4N2JhNmUxXkEyXkFqcGdeQXVyNTgzMDMzMTg@._V1_SX300.jpg",
            "rating": "7.3"
        },
        {
            "Title": "The Avengers",
            "Year": "1998",
            "imdbID": "tt0118661",
            "Type": "movie",
            "Poster": "https://m.media-amazon.com/images/M/MV5BYWE1NTdjOWQtYTQ2Ny00Nzc5LWExYzMtNmRlOThmOTE2N2I4XkEyXkFqcGdeQXVyNjUwNzk3NDc@._V1_SX300.jpg",
            "rating": "3.8"
        },
        {
            "Title": "The Avengers: Earth's Mightiest Heroes",
            "Year": "2010–2012",
            "imdbID": "tt1626038",
            "Type": "series",
            "Poster": "https://m.media-amazon.com/images/M/MV5BYzA4ZjVhYzctZmI0NC00ZmIxLWFmYTgtOGIxMDYxODhmMGQ2XkEyXkFqcGdeQXVyNjExODE1MDc@._V1_SX300.jpg",
            "rating": "8.3"
        },
        {
            "Title": "Ultimate Avengers: The Movie",
            "Year": "2006",
            "imdbID": "tt0491703",
            "Type": "movie",
            "Poster": "https://m.media-amazon.com/images/M/MV5BMTYyMjk0NTMwMl5BMl5BanBnXkFtZTgwNzY0NjAwNzE@._V1_SX300.jpg",
            "rating": "6.7"
        },
        {
            "Title": "Ultimate Avengers II",
            "Year": "2006",
            "imdbID": "tt0803093",
            "Type": "movie",
            "Poster": "https://m.media-amazon.com/images/M/MV5BZjI3MTI5ZTYtZmNmNy00OGZmLTlhNWMtNjZiYmYzNDhlOGRkL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg",
            "rating": "6.6"
        },
        {
            "Title": "The Avengers",
            "Year": "1961–1969",
            "imdbID": "tt0054518",
            "Type": "series",
            "Poster": "https://m.media-amazon.com/images/M/MV5BZWQwZTdjMDUtNTY1YS00MDI0LWFkNjYtZDA4MDdmZjdlMDRlXkEyXkFqcGdeQXVyNjUwNzk3NDc@._V1_SX300.jpg",
            "rating": "8.3"
        },
        {
            "Title": "Avengers Assemble",
            "Year": "2012–2019",
            "imdbID": "tt2455546",
            "Type": "series",
            "Poster": "https://m.media-amazon.com/images/M/MV5BMTY0NTUyMDQwOV5BMl5BanBnXkFtZTgwNjAwMTA0MDE@._V1_SX300.jpg",
            "rating": "6.9"
        }
    ],
    "totalResults": "137",
    "Response": "True"
};

let id;
function debounceSearchFunction(func, delay) {
    // console.log(event.target.value);
    if(event.target.value === '') {
        let searchTerm = document.getElementById('searchTerm');
        searchTerm.innerText = name;
        let movieSearchResult = document.getElementById('movieSearchResult');
        movieSearchResult.innerHTML = null;
        return;
    }
    if(id) {
        clearTimeout(id);
    }
    id = setTimeout(function(){
        func();
    },delay);
}
// displayResult(sample.Search);