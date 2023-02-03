import axios from "axios";

export const serverUrl = 'https://eagleeye-back-end.onrender.com';
export const baseUrl = 'https://bayut.p.rapidapi.com';
export const carBaseUrl = 'booking-com.p.rapidapi.com';

export const fetchApi = async (url) => {
  const { data } = await axios.get((url), {
    headers: {
        'X-RapidAPI-Host': 'bayut.p.rapidapi.com',
        'X-RapidAPI-Key': '3bed496a49mshc772c975e0132e3p15fd27jsn86749bcd2c35'
    },
  });
    
  return data;
}

/* export const carFetchApi = async (url) => {
  const { data } = await axios.get((url), {
    headers: {
        'X-RapidAPI-Host': 'booking-com.p.rapidapi.com',
        'X-RapidAPI-Key': 'a8c31c6278msha5be81b01cf38edp17b795jsn9821bb2152db'
    },
  });
    
  return data;
} */

export const carFetchApi = async (url) => {
  let data = null;
  await fetch(url, {
      method: 'GET',
      headers: {
          'X-RapidAPI-Host': 'booking-com.p.rapidapi.com',
          'X-RapidAPI-Key': 'a8c31c6278msha5be81b01cf38edp17b795jsn9821bb2152db'
      },
  }).then(response => response.json())
.then(response => {
    console.log("topCars?.search_results", response)
    data = response
  })
.catch(err => console.error(err));
    
  return data;
}