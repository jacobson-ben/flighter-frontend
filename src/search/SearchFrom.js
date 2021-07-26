import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Alert from "../common/Alert";
import from "airport-autocomplete-js"

function SearchForm() {
  const now = new Date
  const [formData, setFormData] = useState({
    tripType: "roundtrip",
    origin: "",
    destination: "",
    adult: 1,
    children: 0,
    class: "economy",
    departDate: now.toDateString(),
    returnDate: "",
  });

   /** Handle form submit:
   *
   * Calls login func prop and, if successful, redirect to /flights.
   */

    async function handleSubmit(evt) {
      evt.preventDefault();
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
                  <option value="roundTrip">Round Trip</option>
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
                  <input
                      name="origin"
                      className="form-control"
                      value={formData.origin}
                      onChange={handleChange}
                      required
                  />
                  <label>Destination</label>
                  <input
                      name="destination"
                      className="form-control"
                      value={formData.destination}
                      onChange={handleChange}
                      required
                  />
                  <label>Depart Date</label>
                  <input
                      type="date"
                      name="departDate"
                      className="form-control"
                      value={formData.departDate}
                      onChange={handleChange}
                      required
                  />
                   <label>Return Date</label>
                  <input
                      type="date"
                      name="returnDate"
                      className="form-control"
                      value={formData.returnDate}
                      onChange={handleChange}
                      required
                  />
                  
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