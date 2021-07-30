import React, { useState, useCallback, useEffect } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from 'axios'
import AmadeusApi from "../api/AmadeusApi";
import { debounce } from "lodash"

function AutocompleteInput(props) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(false);

  // Configure options format for proper displaying on the UI
  const names = options.filter(i => i.subType === 'AIRPORT').map(i => ({ name: i.address.cityName, airportName: i.name, iata: i.iataCode }));

  // Debounce func prevents extra unwanted keystrokes, when user triggers input events 
  const debounceLoadData = useCallback(debounce(setKeyword, 1000), []);
  
  useEffect(() => {
    debounceLoadData(searchTerm);
  }, [searchTerm]);

  //on update to keyword query api for airportData
  React.useEffect(() => {
    async function getAirports(){
      setLoading(true)
      const { out, source } = await AmadeusApi.getAirportData({ ...props.formData, page: 0, keyword })

      try {
        if(out) {
          setOptions(out.data.data)
        }
        setLoading(false);
      } catch(err) {
        axios.isCancel(err);
        setOptions([]);
        setLoading(false)
      }
  
      return () => {
        source.cancel()
      };
    }
    getAirports();
  }, [keyword]);

  // Desctructuring our props - bools
  const { city, airport } = props.formData

  const label = city && airport ? "City and Airports" : city ? "City" : airport ? "Airports" : ""

  return (
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
          if (value && value.name) {
            props.setFormData((p) => ({ ...p, [props.label]: value.iata, page: 0 }))
            setSearchTerm(value.iata)
            return;
          }
          setSearchTerm("")
          props.setFormData((p) => ({ ...p, [props.label]: "a", page: 0 }))

        }}
        getOptionLabel={option => {
          return `${option.name} ${option.airportName} ${option.iata}`;
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
                setSearchTerm(e.target.value);
              }}
              variant="outlined"
              inputProps={{
                ...params.inputProps,
                value: searchTerm
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
  )
}

export default AutocompleteInput;