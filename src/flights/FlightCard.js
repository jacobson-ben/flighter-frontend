import './FlightCard'

function FlightCard({flightData}) {
  console.log(flightData);
  const departDate = new Date(flightData.itineraries[0].segments[0].departure.at);
  const departTime = departDate.toLocaleTimeString().replace(':00 ', '')

  const arrivalDate = new Date(flightData.itineraries[0].segments[flightData.itineraries[0].segments.length - 1].arrival.at);
  const arrivalTime = arrivalDate.toLocaleTimeString().replace(':00 ', '')
  
  return (
    <div className="card"> FlightCard 
    <div className="card-body">
      <h6 className="card-title">{departTime} - {arrivalTime}</h6>
    </div>
    </div>
  )
}

export default FlightCard;