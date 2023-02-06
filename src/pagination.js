import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3/trending/movie/day?api_key=';
const KEY_API = '4d6a2af1b1f413d275c2f06226268228';

async function getApi() {
    const searchParams = new URLSearchParams({
        key: KEY_API,
      page: this.page,
      total_pages: this.total_pages,
    });
    const resp = await axios.get(`${BASE_URL}?${searchParams}`);
    // console.log(resp.data.results);
    return resp.data.results;
}
 
foo().then(data =>
    console.log(data));

async function Pagination() {
    // const searchParams = new URLSearchParams({
    //     key: KEY_API,
    //   page: this.page,
    //   total_pages: this.total_pages,
    // });

    // const resp = await axios.get(`${BASE_URL}?${searchParams}`);
    
    // this.resultsQty = resp.data.results;
    // this.pagesQty = Math.ceil(this.resultsQty / this.total_pages);
    
    // return resp.data.release_date;

      const prevButton = document.getElementById('button_prev');
      const nextButton = document.getElementById('button_next');
      const clickPageNumber = document.querySelectorAll('.clickPageNumber');
      
      let current_page = 1;
      let records_per_page = 6;
      
      this.init = function() {
          changePage(1);
          pageNumbers();
          selectedPage();
          clickPage();
          addEventListeners();
     }
      
    let addEventListeners = function() {
        prevButton.addEventListener('click', prevPage);
        nextButton.addEventListener('click', nextPage);   
    }
            
    let selectedPage = function() {
        let page_number = document.getElementById('page_number').getElementsByClassName('clickPageNumber'); 
        for (let i = 0; i < page_number.length; i++) {
            if (i == current_page - 1) {
              page_number[i].style.opacity = "1.0";
            } 
            else {
              page_number[i].style.opacity = "0.5";
            }
        }   
    }  
      
    let checkButtonOpacity = function() {
    current_page == 1 ? prevButton.classList.add('opacity') : prevButton.classList.remove('opacity');
    current_page == numPages() ? nextButton.classList.add('opacity') : nextButton.classList.remove('opacity');
    }

    let changePage = function(page) {
        const listingTable = document.getElementById('listingTable');

        if (page < 1) {
            page = 1;
        } 
        if (page > (numPages() -1)) {
          page = numPages();
        }
       
        listingTable.innerHTML = "";

        for(var i = (page -1) * records_per_page; i < (page * records_per_page) && i < data.length; i++) {
          listingTable.innerHTML += "<div class='objectBlock'>" + objJson[i].adName + "</div>";
        }
        checkButtonOpacity();
        selectedPage();
    }

    let prevPage = function() {
        if(current_page > 1) {
          current_page--;
          changePage(current_page);
        }
    }

    let nextPage = function() {
        if(current_page < numPages()) {
            current_page++;
            changePage(current_page);
        } 
    }

    let clickPage = function() {
        document.addEventListener('click', function(e) {
            if(e.target.nodeName == "SPAN" && e.target.classList.contains("clickPageNumber")) {
                current_page = e.target.textContent;
                changePage(current_page);
            }
        });
    }

    let pageNumbers = function() {
        let pageNumber = document.getElementById('page_number');
        pageNumber.innerHTML = "";

        for(let i = 1; i < numPages() + 1; i++) {
            pageNumber.innerHTML += "<span class='clickPageNumber'>" + i + "</span>";
        }
    }

    let numPages = function() {
      return Math.ceil(data.length / records_per_page);  
    }
}
let pagination = new Pagination();
pagination.init();

// export function createFilmCardMarkap(dataArrey) {
//   const markap = dataArrey
//     .map(
//       ({
//         title,
//         id,
//         release_date,
//         genre_ids,
//         poster_path,
//         vote_average,
//       }) => <li class="film-card" data-action="${id}">
//         <div class="film-card__img-thumb">
//           <a class="film-card__link" href="#"
//             ><img
//               class="film-card__img"
//               src="${POSTER_PATH}${poster_path}"
//               alt="movie poster"
//           /></a>
//         </div>
//         <h2 class="film-card__title">${title}</h2>
//         <div class="film-card__thumb-info">
//           <p class="film-card__genre">${transformGenres(genre_ids)}</p>
//           <p class="film-card__line">|</p>
//           <p class="film-card__year">${release_date.slice(0, 4)}</p>
          
//         </div>
//       </li>
//     )
//     .join('');
//   // return markap;                                                      //return не нужен
//   filmCardList.insertAdjacentHTML('beforeend', markap);
// }