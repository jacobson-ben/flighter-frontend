import React, { useState, useCallback, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Alert from "../common/Alert";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from 'axios'
import { getAmadeusData } from "../api/FlightsApi";
import { debounce } from "lodash"


function SearchForm(props) {
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
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [search, setSearch] = useState('')
  const [keyword, setKeyword] = useState('')
  const [loading, setLoading] = useState(false)

  // Configure options format for proper displaying on the UI
  const names = options.map(i => ({ type: i.subType, name: i.name }));

  // Debounce func prevents extra unwanted keystrokes, when user triggers input events 
  const debounceLoadData = useCallback(debounce(setKeyword, 1000), []);
  
  useEffect(() => {
    debounceLoadData(search);
  }, [search]);

   // Same example as in *SearchRoot* component
   React.useEffect(() => {

    setLoading(true)
    const { out, source } = getAmadeusData({ ...props.search, page: 0, keyword });

    out.then(res => {
      if (!res.data.code) {
        setOptions(res.data.data);
      }
      setLoading(false)
    }).catch(err => {
      axios.isCancel(err);
      setOptions([]);
      setLoading(false)

    });

    return () => {
      source.cancel()
    };
  }, [keyword]);

  // Desctructuring our props - bools
  const { city, airport } = props.search


  const label = city && airport ? "City and Airports" : city ? "City" : airport ? "Airports" : ""
 
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
    // <div className="SearchForm">
    //   <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
    //     <h3 className="mb-3">Find a flight</h3>

    //     <div className="card">
    //       <div className="card-body">
    //         <form onSubmit={handleSubmit}>
    //           <div className="form-group">
    //             <select
    //                 name="tripType"
    //                 className="form-control"
    //                 value={formData.tripType}
    //                 onChange={handleChange}
    //                 required
    //             >
    //               <option value="roundTrip">Round Trip</option>
    //               <option value="oneWay">One Way</option>
    //             </select>
    //             <label>Adults</label>
    //               <input
    //                   type="number"
    //                   step="1"
    //                   name="adult"
    //                   className="form-control"
    //                   value={formData.adult}
    //                   onChange={handleChange}
    //                   required
    //               />
    //               <label>Children</label>
    //               <input
    //                   type="number"
    //                   step="1"
    //                   name="children"
    //                   className="form-control"
    //                   value={formData.children}
    //                   onChange={handleChange}
    //                   required
    //               />
    //             <label>Origin</label>
    //               <input
    //                   name="origin"
    //                   className="form-control"
    //                   value={formData.origin}
    //                   onChange={handleChange}
    //                   required
    //               />
    //               <label>Destination</label>
    //               <input
    //                   name="destination"
    //                   className="form-control"
    //                   value={formData.destination}
    //                   onChange={handleChange}
    //                   required
    //               />
    //               <label>Depart Date</label>
    //               <input
    //                   type="date"
    //                   name="departDate"
    //                   className="form-control"
    //                   value={formData.departDate}
    //                   onChange={handleChange}
    //                   required
    //               />
    //                <label>Return Date</label>
    //               <input
    //                   type="date"
    //                   name="returnDate"
    //                   className="form-control"
    //                   value={formData.returnDate}
    //                   onChange={handleChange}
    //                   required
    //               />
                  
    //           </div>
    //           <button
    //               className="btn btn-primary float-right"
    //               onSubmit={handleSubmit}
    //           >
    //             Submit
    //           </button>
    //         </form>
    //       </div>
    //     </div>
    //   </div>
    // </div>
     // This is Material-UI component that also has it's own props
     <>
     <Autocomplete
       id="asynchronous-demo"
       style={{ width: 300, marginBottom: "1rem" }}
       open={open}
       onOpen={() => {
         setOpen(true);
       }}
       onClose={() => {
         setOpen(false);
       }}
       getOptionSelected={(option, value) =>(
          option.name === value.name && option.type === value.type
       )}
       onChange={(e, value) => {
         console.log('VALUE', value)
         if (value && value.name) {
           props.setSearch((p) => ({ ...p, keyword: value.name, page: 0 }))
           setSearch(value.name)
           return;
         }
         setSearch("")
         props.setSearch((p) => ({ ...p, keyword: "a", page: 0 }))

       }}
       getOptionLabel={option => {
         return option.name;
       }}
       options={names}
       loading={loading}
       renderInput={params => {
         return (
           <TextField
             label={label}
             fullWidth
             onChange={e => {
               e.preventDefault();
               setSearch(e.target.value);
             }}
             variant="outlined"
             inputProps={{
               ...params.inputProps,
               value: search
             }}
             InputProps={{
               ...params.InputProps,
               endAdornment: (
                 <React.Fragment>
                   {loading ? (
                     <CircularProgress color="inherit" size={20} />
                   ) : null}
                   {params.InputProps.endAdornment}
                 </React.Fragment>
               )
             }}
           />
         );
       }}
     />
   </>
);
}

export default SearchForm;