import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-bb4ba.firebaseio.com/'
});

export default instance;