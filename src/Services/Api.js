import axios from "axios"

const Api = () => {
  return (axios.create({
      baseURL: "https://api.monobank.ua/personal",
      mode: 'no-cors',
      crossDomain: true,
      headers: {
        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
        "accept-language": "en-US,en;q=0.9,ru;q=0.8",
        "Content-Type": 'text/plain',
      }
  }))
}


export default {
  // make req with params
    getPersonalInfo({XToken}) {
      console.log(XToken);
      return Api().get(`client-info`, {headers: {'X-Token':XToken}})
    },
    getPersonalHistory({from,to, XToken}) {
      return Api().get(`statement/0/${from}${to ? `/${to}` : ''}`,
        {headers: {'X-Token': XToken}})
    }
}

