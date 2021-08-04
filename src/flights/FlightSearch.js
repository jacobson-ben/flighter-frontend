import FlightResults from './FlightResults'
import SearchForm from './SearchForm'

function FlightSearch({flights, setFlights}) {
  return (
    <div> 
      <SearchForm setFlights={setFlights} />
      <FlightResults flights={flights} />
    </div>
  )
}

export default FlightSearch;