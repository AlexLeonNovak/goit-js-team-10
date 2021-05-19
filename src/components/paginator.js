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
  /** Fix for free plan */
  if (page.totalPages > 20) {
    page.totalPages = 20;
  }
  const range = getPagingRange(page.number, { total: page.totalPages });
  const items = buildPaginationItemsFromRange(range, page.number);

  if (items[items.length - 1].value !== page.totalPages) {
    items.push({
      value: page.totalPages,
      active: page.number === page.totalPages,
      first: false,
      latest: page.totalPages - items[items.length - 1].value >= 2,
    });
  }

  if (items[0].value !== 1) {
    items.unshift({
      value: 1,
      active: false,
      latest: false,
      first: items[0].value !== 2,
    });
  }

  refs.pagination.innerHTML = pagination({
    paginationItemClass,
    page,
    items,
  });
};
