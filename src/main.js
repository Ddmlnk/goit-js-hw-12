import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery, PER_PAGE } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions';

const form = document.querySelector('.form');
const galleryEl = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

let query = '';
let page = 1;
let totalHits = 0;

form.addEventListener('submit', onFormSubmit);
loadMoreBtn.addEventListener('click', onLoadMoreClick);

async function onFormSubmit(event) {
  event.preventDefault();

  const value = form.elements['search-text'].value.trim();

  if (!value) {
    iziToast.warning({
      message: 'Please enter a search query',
      position: 'topRight',
    });
    return;
  }

  query = value;
  page = 1;
  totalHits = 0;

  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(query, page);

    if (data.hits.length === 0) {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      return;
    }

    totalHits = data.totalHits;
    createGallery(data.hits);
    updateLoadMoreState();
  } catch {
    iziToast.error({
      message: 'Something went wrong. Please try again later.',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
}

async function onLoadMoreClick() {
  hideLoadMoreButton();
  showLoader();
  page += 1;

  try {
    const data = await getImagesByQuery(query, page);

    createGallery(data.hits);
    scrollPage();
    updateLoadMoreState();
  } catch {
    page -= 1;
    showLoadMoreButton();
    iziToast.error({
      message: 'Something went wrong. Please try again later.',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
}

function updateLoadMoreState() {
  const totalPages = Math.ceil(totalHits / PER_PAGE);

  if (page >= totalPages) {
    hideLoadMoreButton();
    iziToast.info({
      message: "We're sorry, but you've reached the end of search results.",
      position: 'topRight',
    });
  } else {
    showLoadMoreButton();
  }
}

function scrollPage() {
  const card = galleryEl.querySelector('.gallery-item');

  if (!card) return;

  const { height } = card.getBoundingClientRect();

  window.scrollBy({
    top: height * 2,
    behavior: 'smooth',
  });
}
