import React ,{useState}from 'react';

const api = {
  base : "https://api.openweathermap.org/data/2.5/",
  key : "43949758291d74d6bb3b61c0c12b3e98",
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = (e) => {
    if(e.key === "Enter"){
      fetch(`${api.base}weather?q=${query}&appid=${api.key}`)
      .then(res => res.json())
      .then(result => {
        // console.log(result);
        setWeather(result)
        setQuery('');
      })
    }
  }

  const dateBuilder = (d) =>{
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  }

  let changeBackground = () => {
    let temperature = (weather.main.temp - 273.15).toFixed(2);
    if(temperature > 30.00) {
      return "app warmer";
    }
    else if(temperature > 20.00) {
      return "app warm";
    }
    else{
      return "app";
    }
  }

  return (
    <div className={(weather.main) ? (changeBackground()) : ("app") }>
      <main>
        <div className="searchBox">
          <input 
            type="text"
            className="searchBar"
            placeholder="Search..."

            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>

        {weather.main ? (
          <div>
            <div className="locationBox">
              <div className="location">{weather.name} {weather.sys.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>

            <div className="weatherBox">
              <div className="tempBox">
                <div className="temp">
                  {(weather.main.temp - 273.15).toFixed(2)}°C
                </div>
              </div>
              <div className="weather">{weather.weather[0].description}</div>
            </div> 
          </div>
        ) : ('')
        }
      </main>
    </div>
  );
}

export default App;

           
