import axios from "axios";
const CancelToken = axios.CancelToken;

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";


class AmadeusApi {
  // GET airportData for autcompletion of user search
  static async getAirportData(params) {
    // Destructuring params
    const { keyword = "", page = 0, city = true, airport = true } = params;
    
    // Checking for proper subType
    const subTypeCheck = city && airport ? "CITY,AIRPORT" : city ? "CITY" : airport ? "AIRPORT" : ""
    
    // Amadeus API require at least 1 character, so with this we can be sure that we can make this request
    const searchQuery = keyword ? keyword : "a";
    
    // prop containing data used to avoid api overload
    const source = CancelToken.source();
  
    // GET request with all params we need
    const out = await axios.get(
      `${BASE_URL}/flights/api/airports/?keyword=${searchQuery}&page=${page}&subType=${subTypeCheck}`,
      {
        cancelToken: source.token
      }
    )
    
    return { out, source };
  };

  // GET flight offers
  static async getFlightOffers(searchFormData) {
    console.log('method activated')
    const out = await axios.post(`${BASE_URL}/flights/api/flight-offers/`, searchFormData)
  }

  // const flightOffers = axios.get(`${BASE_URL}/`)

}

export default AmadeusApi;
