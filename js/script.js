/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ]
    };
    
    
    const promoAdv = document.querySelectorAll('.promo__adv img'),
          promoGenre = document.querySelector('.promo__genre'),
          promoBg = document.querySelector('.promo__bg'),
          promoInteractiveList = document.querySelector('.promo__interactive-list'),
          promoInteractiveItem = document.querySelectorAll('.promo__interactive-item'),
          addForm = document.querySelector('form.add'),
          addingInput = addForm.querySelector('.adding__input'),
        //   btnPromoInteractiveTitle = document.querySelector('div button'),
          checkboxPromo = document.querySelector('[type="checkbox"]');
    
    
    addForm.addEventListener('submit', (event) => {
        event.preventDefault();

        let newFilm = addingInput.value;
        const favorite = checkboxPromo.checked;
        if (newFilm) {
            if (newFilm.length > 21) {
                newFilm = `${newFilm.substring(0, 22)}...`;
            };

            if (favorite) {
                console.log("Добавляем любимый фильм");
            };

            movieDB.movies.push(newFilm);
            sortArr(movieDB.movies);
            createMovieList(movieDB.movies, promoInteractiveList);
        };
        
        event.target.reset();
        
    });

    const deleteAdv = (arr) => {
        arr.forEach(item => {
            item.remove();
        });
    };

    const makeChanges = () => {
        promoGenre.textContent = 'ДРАМА';
        promoBg.style.background = 'url("img/bg.jpg")';
    };

    makeChanges();

    const sortArr = (arr) => {
        arr.sort();        
    };

    sortArr(movieDB.movies);

    // promoInteractiveList.innerHTML = '';
    // movieDB.movies.forEach((item, i) => {
    //     promoInteractiveList.insertAdjacentHTML('beforeend', `<li class="promo__interactive-item">${i + 1}. ${item}<div class="delete"></div></li>`);
    // });
    function createMovieList(films, parent) {
        parent.innerHTML = '';
        sortArr(films);
        films.forEach((item, i) => {
            parent.insertAdjacentHTML('beforeend', `<li class="promo__interactive-item">${i + 1}. ${item}<div class="delete"></div></li>`);
        });

        document.querySelectorAll('.delete').forEach((btn, i) => {
            btn.addEventListener('click', () => {
                btn.parentElement.remove();
                movieDB.movies.splice(i, 1);

                createMovieList(films, parent);
            });
        });

    };

    deleteAdv(promoAdv);
    makeChanges();
    createMovieList(movieDB.movies, promoInteractiveList);
    // btnPromoInteractiveTitle.addEventListener('click', (e) => {
    //     e.preventDefault();
    //     movieDB.movies.push(addingInput.value.toUpperCase());
    //     promoInteractiveList.innerHTML = '';
    //     movieDB.movies.sort();
    //     movieDB.movies.forEach((item, i) => {
    //         if (item.length < 21) {
    //             promoInteractiveList.insertAdjacentHTML('beforeend', `<li class="promo__interactive-item">${i + 1}. ${item}<div class="delete"></div></li>`);
    //         } else {
    //             promoInteractiveList.insertAdjacentHTML('beforeend', `<li class="promo__interactive-item">${i + 1}. ${item.slice(0, 21)}...<div class="delete"></div></li>`);
    //         }
    //     });
    //     if (checkboxPromo.checked) {
    //         console.log('Добавляем любимый фильм');
    //     }
    //     const deleteInt = document.querySelectorAll('.delete');
    //     deleteInt.forEach((item, i) => {
    //         item.addEventListener('click', (e) => {
    //             e.target.parentNode.remove();
    //             movieDB.movies.splice(i, 1);
    //             promoInteractiveList.innerHTML = '';
    //             movieDB.movies.sort();
    //             movieDB.movies.forEach((item, i) => {
    //                 promoInteractiveList.insertAdjacentHTML('beforeend', `<li class="promo__interactive-item">${i + 1}. ${item}<div class="delete"></div></li>`);
    //             });
    //         });
    //     });
    // });
});