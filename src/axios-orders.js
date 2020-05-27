import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://react-burger-278415.firebaseio.com/'
})

export default instance