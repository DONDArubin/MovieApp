import genreToString from './genreToString.js';

const getValuesForm = () => {
    const isCheckboxOrRadio = type => ['checkbox', 'radio'].includes(type);

    const { form } = document.forms;

    const values = {};

    function retrieve(event) {
        event.preventDefault();

        const{ elements } = form;
        
        for (let i = 0; i < elements.length; i++) {
            const formElement = elements[i];
            const { name } = formElement;
   
            if (name) {
               const { value, type, checked } = formElement;
               values[name] = isCheckboxOrRadio(type) ? checked : value;
            }
        }

        //console.log(values);

        let movieID = 0;
        if (localStorage.getItem('name')) {
            movieID = localStorage.getItem('name');
        }

        movieID++;

        localStorage.setItem(`${movieID}`, JSON.stringify(values));
        localStorage.setItem('name', movieID);

        document.forms.addmovie__form.reset();
        window.location.href = 'index.html';
    }

    form.addEventListener('submit', retrieve);
}

// Значения из формы
getValuesForm();


// // Строка для жанров
// function genreToString(values) {
//     let genre = '';
//     if (values.cartoon == true) genre += 'Cartoon ';
//     if (values.comedy == true) genre += 'Comedy ';
//     if (values.detective == true) genre += 'Detective ';
//     if (values.drama == true) genre += 'Drama ';
//     if (values.history == true) genre += 'History ';
//     if (values.horror == true) genre += 'Horror ';
//     if (values.thriller == true) genre += 'Thriller ';
//     genre.trim();
//     return genre;
// }

// Создание карточки товара
const createCard = () => {
    const movieBlock = document.querySelector('.movies');

    let movieId = localStorage.getItem('name');
    
    if(movieId){
        for (let i = 1; i <= Number(movieId); i++) {
            if (Object.keys(localStorage).find(elem => elem == i) >= 0) {
                let elem = JSON.parse(localStorage.getItem(`${i}`));
                let genre = genreToString(elem);
                movieBlock.insertAdjacentHTML('beforeend', `
                    <div class="card" data-id="${i}">
                        <div class="card__poster">
                            <img src="${JSON.parse(localStorage.getItem(`${i}`)).poster}" class="movie__poster">
                        </div>
                        <div class="Movie__info">
                            <h3 class="movie__title">${JSON.parse(localStorage.getItem(`${i}`)).title}</h3>
                            <p class="moovie__info">Genre: ${genre}</p> 
                            <p class="moovie__info">Country: ${JSON.parse(localStorage.getItem(`${i}`)).country}</p>
                            <p class="moovie__info">${JSON.parse(localStorage.getItem(`${i}`)).raiting}</p>
                            <p class="moovie__info">Release Date: ${JSON.parse(localStorage.getItem(`${i}`)).releaseDate}</p>   
                        </div>
                        <button class="del__movie__btn">Delete</button>
                        <button class="review__movie__btn"><a class="link__review" href="#review__window">Reviews</a></button>
                    </div>
                `);
            }
        }
    }
}

createCard();



// Удаление фильма
const deleteFilm = () => {
    let movies = document.getElementsByClassName('card');
    for (const movie of movies) {
        const delBtn = movie.querySelector('.del__movie__btn');

        delBtn.addEventListener('click', () => {
            movie.style.display = 'none';
            let id = movie.dataset.id;
            localStorage.removeItem(id);
        })
    }
}

deleteFilm();





// Отзывы
const review = () => {
    const movieCards = document.querySelectorAll('.card');

    let id = 0;

    for (const movie of movieCards) {
        const reviewBtn = movie.querySelector('.review__movie__btn');

        reviewBtn.addEventListener('click', () => {
            id = movie.dataset.id;
            // console.log('click' + id);
            addReview(id);
            createReview(id);
        })
    }

    // const movieCards = document.querySelectorAll('.card');

    // let id = 0;

    // movieCards.forEach(movie => {
    //     movie.addEventListener('click', (event) => {
    //         id = movie.dataset.id; 
    //         addReview(id);
    //         createReview(id);
    //    })
    // })
 
}

review();




const addReview = (id) => {
    const reviewForm = document.getElementById('review__form');
    const review = reviewForm.querySelector('input');
    let text = [];
 
    function retrieve(event) {
        event.preventDefault();

        if (localStorage.getItem(`review ${id}`)) {
            text = JSON.parse(localStorage.getItem(`review ${id}`));
        }

        if (review.value) {
            text.push(review.value);
            localStorage.setItem(`review ${id}`, JSON.stringify(text));
        }

        text = [];
        event.target.reset();
        location.reload();
        window.location.href = 'index.html';
    }

    reviewForm.addEventListener('submit', retrieve);
}

const createReview = (id) => {
    const reviews = document.querySelector('.reviews');
    reviews.innerHTML = '';
        if (localStorage.getItem(`review ${id}`)) {
            for (let i = 0; i < JSON.parse(localStorage.getItem(`review ${id}`)).length; i++) {
                reviews.insertAdjacentHTML('beforeend', `
                    <div class="review__text">${JSON.parse(localStorage.getItem(`review ${id}`))[i]}</div>
                `)
            }
        }
}