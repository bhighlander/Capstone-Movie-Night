import { searchCredentials } from '../utils/client';

const { searchUrl } = searchCredentials;

const apiSearch = (searchQuery) => new Promise((resolve, reject) => {
  fetch(`${searchUrl}/${searchQuery}&include_adult=false&language=en-US&page=1`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MWMyYTkwZDdjOWEzOGE2NGVhOGI3ZTQwZGU0MGJlNSIsInN1YiI6IjY0NTk4YTIyZmUwNzdhNWNhZWQ5MzIwNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UfUpWq-Y_d25LY08jjejscma-sO07sxrfVFViK_fY3g',
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});
export default apiSearch;
