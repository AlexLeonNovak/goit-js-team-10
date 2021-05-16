export const eventAdapter = event => ({
  id: event.id,
  image: event.images[0].url,
  name: event.name,
  date: event.dates.start.dateTime,
  place: event._embedded.venues[0].name,
  city: event._embedded.venues[0].city.name,
  country: event._embedded.venues[0].country.name,
});
