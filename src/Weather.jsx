import {useState} from 'react'
import axios from 'axios'
const Weather = () =>{
    const imagess = [
        {
          name:"Clouds",
          src:"../Assests/New/cloudy.png"
        },
        {
          name:"Mist",
          src:"../Assests/New/haze.png"
        },
        {
          name:"Clear",
          src:"../Assests/New/clear.png"
        },
        {
          name:"Drizzle",
          src:"../Assests/New/drizzle.png"
        },
        {
          name:"Rain",
          src:"../Assests/New/rain.png"
        },
        {
          name:"Snow",
          src:"../Assests/New/snow.png"
        },
        {
          name:"Thunderstorm",
          src:"../Assests/New/thunder.png"
        },
      ]
      
      const [inputval, setinputval] = useState('')
      const [weather, setweather] = useState('')
      const [temperature, settemperature] = useState('')
      const [description, setdescription] = useState('')
      const [city,setcity] =useState('')
      const [hours,sethours] =useState('')
      const [min,setmin] =useState('')
      const [getSeconds,setgetSeconds] =useState('')
      const [newhourss,setnewhourss] = useState('')
      const [amorpm,setamorpm] = useState('')
      const [datee,setdatee] = useState('')
      const [month,setmonth] = useState('')
      const [year,setyear] = useState('')
      const [img,setimg] = useState('')
      const [torf,settorf] = useState(false)
      const [country,setcountry] = useState('')
    
    
      
      function handlechange(event) {
        setinputval(event.target.value);
      }
      function report() {
        setinputval('')
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${inputval}&appid=466ed6f475d6c069a4df08ae9d260f12`)
        .then(function(apis){
          setcity(apis.data.name)
          setweather(apis.data.weather[0].main);
          setdescription(apis.data.weather[0].description);
          settemperature(Math.ceil(apis.data.main.temp - 273.15));
          setcountry(","+apis.data.sys.country);
          console.log(apis.data);
          imagess.forEach(function(para) {
            if(apis.data.weather[0].main === para.name){
              console.log(para.name);  
              setimg(para.src);  
            }
            else{
              // setimg("../Assests/all.png");  
            }
          })
          settorf(true)
        })
        .catch(function(){
          console.log("Wrong");
          setweather('')
          setdescription('');
          settemperature('');
          setcity('')
          settorf(false)
        })
    
      }
    
      function namee() {
        const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        const date = new Date();
        setdatee(date.getDate());
        setmin(date.getMinutes())
        setyear(date.getFullYear())
        sethours(date.getHours())
        setmonth(month[date.getMonth()])
        // console.log(date.getFullYear())
        // console.log(date.getMonth()+1)
        setgetSeconds(date.getSeconds())
        
        if(hours>12){
          setnewhourss(hours-12)
          setamorpm("PM")
        }
        else{
          setnewhourss(hours)
          setamorpm("AM")
        }
      }
    setInterval(namee,1000)    
    return(
        <>
            <div className="bg-black w-full h-screen sm:p-20 p-5">
                <div className="bg-[#AAD922] w-full sm:py-10 sm:px-14 rounded-lg p-8 flex">
                <div>
                <h1 className='text-4xl font-bold'>Weather Report</h1>
                <p className='pt-5'>I can give you a weather report about your city !</p>
                <input type="text" onChange={handlechange} placeholder='Enter City' value={inputval} className='outline-none p-2 sm:w-80 my-5 rounded-lg'/>
                <button className='block p-2 bg-black text-white rounded-md mb-3' onClick={report}>Get Report</button>
                <p><span  className='text-[20px] font-semibold'>City: </span><span className='text-[20px] capitalize '>{city}{country}</span></p>
                <p><span  className='text-[20px] font-semibold'>Weather: </span> <span className='text-[20px] capitalize '>{weather}</span></p>
                <p><span  className='text-[20px] font-semibold'>Temperature: </span> <span className='text-[20px] capitalize '>{temperature+"°C"}</span></p>
                <p><span  className='text-[20px] font-semibold'>Description: </span> <span className='text-[20px] capitalize '>{description}</span></p>
                <p><span  className='text-[20px] font-semibold'>Local Time: </span> <span className='text-[20px] capitalize '>{newhourss}:{min}:{getSeconds} {amorpm}</span></p>
                <p><span  className='text-[20px] font-semibold'>Date:</span> <span className='text-[20px] capitalize '>{datee} {month} {year}</span></p>
                </div>
                <div>
                {
                torf?<img src={img} alt="fqe" />:""
                }
                </div>
                </div>
            </div>
        </>
    )
}

export default Weather