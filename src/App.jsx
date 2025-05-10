import { useState ,useEffect} from 'react'
import './App.css'

function App() {

  // let [weather, setWeather] = useState({})
  let [city, setCity] = useState('');
  let [weatherDetails, setWeatherDetails]=useState();

  let getData = (event)=>{
    console.log(city)
    fetch(`https://api.weatherapi.com/v1/current.json?key=79f7a637758c41f396d150217250405&q=${city}`)
    .then((res)=>res.json())
    .then((finalRes)=>{
      console.log(finalRes);
      if(finalRes.code==1006 || finalRes.error ){
        setWeatherDetails(undefined)
      }
      else{
        setWeatherDetails(finalRes);
      }
    })
    .catch(error => {
      console.error("API Error:", error);
      setWeatherDetails(undefined);
    })
    
    event.preventDefault();
    setCity('')
  }

  return (
    <>
      <div className='screenDiv m-auto mt-20 border-2 p-6 border-gray-400 rounded-3xl w-[40%] h-[60%] shadow-lg'>
      <h1 className='text-center text-5xl font-extrabold my-7'>Weather App</h1>

      <div className='bundle m-auto grid w-[75%]'>
          <form onSubmit={getData} className='flex m-auto mt-8 gap-2 w-[100%]'>
            <input
            className='bg-gray-200 p-2 pl-7 w-[85%] rounded-2xl border-2 text-black' 
            type="text" 
            placeholder='Enter City Name' 
            value = {city}
            onChange={(e)=>setCity(e.target.value)}/>
            <button type='submit' className='w-[25%] bg-amber-500 p-2 rounded-2xl'>Submit</button>
          </form>

          <div className='mainDiv text-gray-100 text-center m-auto mt-5 rounded-3xl p-5 w-[100%]'>

          {(weatherDetails!==undefined)
          ?
          <>
          <div className='justify-center'>
          <p className='text-3xl font-bold'>{weatherDetails.location.name}</p>
          <div className='flex justify-center'>
            <img src={`https:${weatherDetails.current.condition.icon}`}alt="weather icon" width="100px" />
          </div>
          <p className='text-2xl'>{weatherDetails.current.condition.text}</p>
          <p className='text-2xl'>Temperature : {weatherDetails.current.temp_c}℃ </p>
          <p></p>
         </div>
         </>
         :
         "No city data found"}

          </div>

      </div>
      </div>
    </>
  )
}

export default App
