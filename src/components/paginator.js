import pagination from '../templates/pagination.hbs';
import { refs } from './refs';

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
    active: item === currentPage + 1,
    latest: false,
  }));

export const buildPagination = page => {
  const range = getPagingRange(page.number, { total: page.totalPages });
  const items = buildPaginationItemsFromRange(range, page.number);
  items.push({
    value: page.totalPages,
    active: page.number === page.totalPages,
    first: false,
    latest: true,
  });

  if (items[0].value !== 1) {
    items.unshift({
      value: 1,
      active: false,
      latest: false,
      first: true,
    });
  }

  refs.pagination.innerHTML = pagination({
    paginationItemClass,
    page,
    items,
  });
};
