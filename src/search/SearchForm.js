import React, { useState, useContext } from "react";
import AutocompleteInput from './AutocompleteInput'
import SearchTermContext from "../context/SearchTermContext";
import AmadeusApi from "../api/AmadeusApi"


function SearchForm(props) {
  const now = new Date();
  const [formData, setFormData] = useState({
    tripType: "roundtrip",
    origin: "",
    destination: "",
    adult: 1,
    children: 0,
    departureDate: now.toDateString(),
    returnDate: "",
    cabin: "economy"
  });
  const { search, setSearch } = useContext(SearchTermContext); 
 
   /** Handle form submit:
   *
   * Calls login func prop and, if successful, redirect to /flights.
   */

    async function handleSubmit(evt) {
      evt.preventDefault();
      console.log('SUBMITTED')
      const baseSearchApiObject = {}
      const {origin, destination, adult, children, cabin, departureDate, returnDate} = formData

      baseSearchApiObject.originLocationCode = origin; 
      baseSearchApiObject.destinationLocationCode = destination;
      baseSearchApiObject.departureDate = departureDate; 
      baseSearchApiObject.travelClass = cabin; 
      
      //todo: baseSearchApiObject.returnDate = returnDate || '' ???
      if(returnDate) baseSearchApiObject.returnDate = returnDate;
      if(adult) baseSearchApiObject.adult = adult;
      if(children) baseSearchApiObject.children = children;
      
      console.log(baseSearchApiObject)
      
      setSearch(baseSearchApiObject);
      // api query.
      AmadeusApi.getFlightOffers(baseSearchApiObject);
      // reset to initial 
    }
    
  /** Update form data field */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(l => ({ ...l, [name]: value }));
  }
    
  return (
    <div className="SearchForm">
      <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
        <h3 className="mb-3">Find a flight</h3>

        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <select
                    name="tripType"
                    className="form-control"
                    value={formData.tripType}
                    onChange={handleChange}
                    required
                >
                  <option value="roundtrip">Round Trip</option>
                  <option value="oneWay">One Way</option>
                </select>
                <label>Adults</label>
                  <input
                      type="number"
                      step="1"
                      name="adult"
                      className="form-control"
                      value={formData.adult}
                      onChange={handleChange}
                      required
                  />
                  <label>Children</label>
                  <input
                      type="number"
                      step="1"
                      name="children"
                      className="form-control"
                      value={formData.children}
                      onChange={handleChange}
                      required
                  />
                  <label>Origin</label>
                  <AutocompleteInput 
                    label="origin"
                    formData={formData} 
                    setFormData={setFormData}
                    required
                  />  
                  <label>Destination</label>
                  <AutocompleteInput 
                    label="destination"
                    formData={formData} 
                    setFormData={setFormData}
                  />  
                  <label>Depart Date</label>
                  <input
                      type="date"
                      name="departureDate"
                      className="form-control"
                      value={formData.departureDate}
                      onChange={handleChange}
                      required
                  />
                  {formData.tripType === 'roundtrip' &&
                  <label>Return Date</label>
                  }
                  {formData.tripType === 'roundtrip' &&
                  <input
                      type="date"
                      name="returnDate"
                      className="form-control"
                      value={formData.returnDate}
                      onChange={handleChange}
                  />
                }
                <label>Cabin Type</label>
                <select
                    name="cabin"
                    className="form-control"
                    value={formData.cabin}
                    onChange={handleChange}
                    required
                >
                  <option value="economy">Economy</option>
                  <option value="premium">Premium Economy</option>
                  <option value="business">Business</option>
                  <option value="first">First Class</option>
                </select>
              </div>
              <button
                  className="btn btn-primary float-right"
                  onSubmit={handleSubmit}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
     
);
}

export default SearchForm;