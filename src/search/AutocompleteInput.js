import React, { useState, useCallback, useEffect } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from 'axios'
import { getAmadeusData } from "../api/FlightsApi";
import { debounce } from "lodash"

function AutocompleteInput(props) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [search, setSearch] = useState('')
  const [keyword, setKeyword] = useState('')
  const [loading, setLoading] = useState(false)

  // Configure options format for proper displaying on the UI
  const names = options.filter(i => i.subType === 'AIRPORT').map(i => ({ name: i.address.cityName, airportName: i.name, iata: i.iataCode }));

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
            props.setSearch((p) => ({ ...p, keyword: value.name, page: 0 }))
            setSearch(value.name)
            return;
          }
          setSearch("")
          props.setSearch((p) => ({ ...p, keyword: "a", page: 0 }))

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
  )
}

export default AutocompleteInput;