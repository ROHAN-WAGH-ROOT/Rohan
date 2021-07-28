import axios from 'axios';

const URL = 'https://user-83160-default-rtdb.firebaseio.com/';

const makeApiUrl = {
	users: URL + 'User',
	
};

export const getService = (entity, params = '') => {
	return axios.get(makeApiUrl[entity] + params);
};

export const postService = (entity, payload) => {
	return axios.post(makeApiUrl[entity], { ...payload });
};

export const deleteService = (entity, params = '') => {
	return axios.delete(makeApiUrl[entity] + '/' + params);
};

export const patchService = (entity, params = '', payload) => {
	return axios.patch(makeApiUrl[entity] + '/' + params, payload);
};
