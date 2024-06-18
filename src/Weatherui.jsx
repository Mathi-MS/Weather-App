import {useState} from 'react'
import axios from 'axios'
const Weatherui = () =>{
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
          name:"Smoke",
          src:"../Assests/New/haze.png"
        },
        {
          name:"Haze",
          src:"../Assests/New/haze.png"
        },
        {
          name:"Dust",
          src:"../Assests/New/haze.png"
        },
        {
          name:"Fog",
          src:"../Assests/New/haze.png"
        },
        {
          name:"Sand",
          src:"../Assests/New/haze.png"
        },
        {
          name:"Ash",
          src:"../Assests/New/haze.png"
        },
        {
          name:"Squall",
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
        {
          name:"Tornado",
          src:"../Assests/New/thunder.png"
        },
      ]

      const [inputval, setinputval] = useState('')
      const [weather, setweather] = useState('Weather')
      const [temperature, settemperature] = useState(0)
      const [description, setdescription] = useState('Desc')
      const [city,setcity] =useState('City')
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
          setweather('Weather')
          setdescription('Desc');
          settemperature('0');
          setcity('City')
          setcountry('')
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
            <div className="w-[100%] h-screen bg-black relative overflow-hidden">
                {/* overlay  */}
                <div className="w-[500px] h-[500px] absolute  bg-[#c45623] blur-[100px] rounded-[200px]"></div>
                <div className="w-[500px] h-[500px] absolute right-0 bottom-0  bg-[#c45623] blur-[100px] rounded-[200px]"></div>
                <div className="lg:w-[60%] w-[90%] sm:w-[80%] h-max py-[40px] px-[30px]  bg-white m-auto absolute top-0 right-0 bottom-0 left-0 rounded-[10px] backdrop-blur-[100px] bg-[#ffffff1e] border-[1px] border-[#ffffff81] " style={{backgroundColor:"#ffffff1e" }}>
                    {/* Search bar  */}
                    <div className="relative w-[100%] sm:w-[80%] lg:w-[50%] m-auto block">
                        <input type="text" onChange={handlechange} value={inputval}  placeholder="Enter City" className="outline-none py-[10px] px-[15px] rounded-[20px] border-0 w-[100%] font-[Poppins] text-[14px]"/>
                        <div  onClick={report} className="absolute bg-black w-[15%] h-[100%] right-0  top-0 flex justify-center items-center z-10 cursor-pointer rounded-r-full">
                            <i className="fa-solid fa-magnifying-glass text-white"></i>
                        </div>
                    </div>
                    {/* ---  */}
                    <h2 className="text-[20px] text-white text-center font-[poppins] font-[400] mt-[30px] mb-[15px]">{city}{country}</h2>
                    {/* --  */}
                    <div className="flex flex-col-reverse lg:flex-row">
                        <div className="lg:w-[30%] w-[100%] text-center">
                            {
                                torf?<img src={img} alt="Weatherimage" className="w-[150px] mx-auto"/>:<img src="../Assests/New/cloudy.png" alt="Weatherimage" className="w-[150px] mx-auto"/>
                            }
                            <h2 className="text-white font-[Poppins] text-[30px] font-[700]">{weather}</h2>
                            <h2 className="text-white font-[Poppins] text-[16px] font-[400]">{description}</h2>
                        </div>
                        <div className="w-[100%] flex justify-center items-center">
                            <h1 className="lg:text-[120px] text-[70px] font-[Poppins] text-white leading-none font-[700]">{temperature+"°C"}</h1>
                        </div>
                    </div>
                    {/* ---  */}
                    <div className='flex justify-center flex-col lg:flex-row lg:justify-end mt-5 lg:gap-10'>
                        <h3 className="text-white text-[20px] text-center lg:text-end font-[Poppins] font-[500px]">{datee} {month} {year}</h3>
                        <h3 className="text-white text-[20px] text-center lg:text-end font-[Poppins] font-[500px]">{newhourss}:{min}:{getSeconds} {amorpm}</h3>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Weatherui