import FlightCard from './FlightCard';

function FlightResults({flights}) {

  return (
    <div>
      {
        flights.length > 0 &&
        flights.map(flight => <FlightCard flightData={flight} key={flight.id}/>)
      }
    </div>
  )
}

export default FlightResults;