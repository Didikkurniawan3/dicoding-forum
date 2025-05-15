export const putAccessToken = (token) =>
  localStorage.setItem('accessToken', token);
export const getAccessToken = () => localStorage.getItem('accessToken');

export const fetchWithAuth = (url, options = {}) => {
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });
};

export const handleResponse = async (response) => {
  const json = await response.json();
  if (json.status !== 'success') throw new Error(json.message);
  return json.data;
};
