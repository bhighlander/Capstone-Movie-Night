import { searchCredentials } from '../utils/client';

const { searchUrl } = searchCredentials;
const { apiReadToken } = searchCredentials;

const apiSearch = (searchQuery) => new Promise((resolve, reject) => {
  fetch(`${searchUrl}/${searchQuery}&include_adult=false&language=en-US&page=1`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${apiReadToken}`,
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});
export default apiSearch;
