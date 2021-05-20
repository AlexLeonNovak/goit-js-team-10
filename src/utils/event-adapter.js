export const eventAdapter = event => ({
  id: event.id,
  image: {
    small: event.images.find(img => {
      return img.height === 360 && img.width === 640;
    }).url,
    big: event.images.find(img => {
      return img.height === 639 && img.width === 1136;
    }).url,
  },
  name: event.name,
  date: event.dates.start.dateTime,
  place: event._embedded.venues[0].name,
  city: event._embedded.venues[0].city.name,
  country: event._embedded.venues[0].country.name,
  prices: event.priceRanges,
});
