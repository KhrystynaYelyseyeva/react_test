const BASE_URL = 'https://jsonplaceholder.typicode.com/posts';

const request = async(url, option) => {
  const response = await fetch(url, option);
  const posts = await response.json();

  return posts;
};

export const getAllPosts = async() => {
  const response = await request(`${BASE_URL}`);

  return response;
};
