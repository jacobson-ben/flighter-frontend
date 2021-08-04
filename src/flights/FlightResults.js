import FlightCard from './FlightCard';

function FlightResults({flights}) {
  /*
        {
        flights.length > 1 &&
        flights.map(flight => <FlightCard flightData={flight}/>)
  } */

  return (
    <div>
      {
        flights.length > 0 &&
        flights.map(flight => <FlightCard flightData={flight}/>)
      }
    </div>
  )
}

export default FlightResults;