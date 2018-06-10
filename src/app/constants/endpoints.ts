
const API_URL = `http://localhost:8080/api`;

export const API = {
    getAllCities: `${API_URL}/city/all`,

    getTop10Cities: `${API_URL}/city/top10`,

    // /city/user/{id}
    getUserCities: `${API_URL}/city/user/`,

    // POST: /user - add user
    // POST: /user/{{userId}}/city/{{cityCode}} - add a city to user's account
    // DELETE: /user/{{userId}}/city/{{cityCode}} - delete a city from user's account
    user: `${API_URL}/user`,
};
