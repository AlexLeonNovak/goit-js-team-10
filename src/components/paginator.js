import pagination from '../templates/pagination.hbs';
import { refs } from './refs';
import { loadEvents } from './country-choose';

const paginationItemClass = 'pagination-item';

const getPagingRange = (current, { min = 1, total = 20, length = 5 } = {}) => {
  if (length > total) length = total;

  let start = current - Math.floor(length / 2);
  start = Math.max(start, min);
  start = Math.min(start, min + total - length);

  return Array.from({ length: length }, (el, i) => start + i);
};

const buildPaginationItemsFromRange = (range, currentPage) =>
  range.map(item => ({
    value: item,
    active: item === currentPage,
    latest: false,
  }));

export const buildPagination = page => {
  const range = getPagingRange(page.number, { total: page.totalPages });
  const items = buildPaginationItemsFromRange(range, page.number);
  items.push({
    value: page.totalPages,
    active: page.number === page.totalPages,
    latest: true,
  });

  refs.pagination.innerHTML = pagination({
    paginationItemClass,
    page,
    items,
  });
  const paginationItems = refs.pagination.querySelectorAll(
    `.${paginationItemClass}`,
  );
  registerEventListeners(paginationItems);
};

const registerEventListeners = elements => {
  elements.forEach(element => {
    element.addEventListener('click', handlePaginationClick);
  });
};

const handlePaginationClick = event => loadEvents(event.target.innerText);
