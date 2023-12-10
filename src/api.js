import axios from 'axios';


export const getHello = () => {
    return axios.get('https://api.dictionaryapi.dev/api/v2/entries/en/hello');
}

export const getWord = (word) => {
    return axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
}