const containerDOM = document.querySelector('.container');

const searchForm = document.querySelector('.get-location');
const cityValue = document.querySelector('.get-location input')

const currTemp = document.querySelector('.weather .temperature')
const currLoc = document.querySelector('.weather .location')
const currCon = document.querySelector('.weather .condition')
const currIcon = document.querySelector('.weather .fas')
const condSugg = document.querySelector('.conditionSugg')

const detailsTempHL = document.querySelector('.details #tempHL')
const detailsFeelsLike = document.querySelector('.details #feelsLike')
const detailsChance = document.querySelector('.details #chance')
const detailsWindSpeed = document.querySelector('.details #windSpeed')


const day0Icon = document.querySelector('.day0 .conditionIcon')
const day1Icon = document.querySelector('.day1 .conditionIcon')
const day2Icon = document.querySelector('.day2 .conditionIcon')
const day3Icon = document.querySelector('.day3 .conditionIcon')
const day4Icon = document.querySelector('.day4 .conditionIcon')
const day5Icon = document.querySelector('.day5 .conditionIcon')
const day6Icon = document.querySelector('.day6 .conditionIcon')

const requestLoc = async () => {
	const locationAPI= `http://api.ipstack.com/49.149.136.163?access_key=3bfeaa9994ce414ef8f37bcedc18e36d`
    const response = await fetch(locationAPI);
    const data = await response.json();
	
	const locDOM = document.querySelector('.currLoc')
	locDOM.textContent= `${data.city}, ${data.country_code}`
	//console.log(data)
}

const requestDaily = async (cityName) => {
	
	//Daily Weather
	const locationAPI= `https://api.opencagedata.com/geocode/v1/json?q=${cityName}&key=87c74156d84a40e99d1c8fa0daa817f1`
    const response = await fetch(locationAPI);
    const data = await response.json();
	//console.log(data)
	const baseURL = `https://api.openweathermap.org/data/2.5/onecall?`
	const query = `lat=${data.results[0].geometry.lat}&lon=${data.results[0].geometry.lng}&exclude=current,alerts&units=metric&appid=88b4a5259f7b4415354f59acf657c75c`
	
    const weatherresponse = await fetch(baseURL + query);
    const weatherdata = await weatherresponse.json();
	console.log(weatherdata)
	postDailyWeather(weatherdata)
}

const requestCurrent = async (cityName) => {
	//Current Weather
    const baseURL = 'http://api.openweathermap.org/data/2.5/weather'
    const query = `?q=${cityName}&units=metric&appid=88b4a5259f7b4415354f59acf657c75c`;
	
    const response = await fetch(baseURL + query);
    const data = await response.json();
	console.log(data)
	requestDaily(cityName)
    return data;
}

var d = new Date();
var weekday = new Array(7);
weekday[0] = "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";


const toCelcius = (kelvin) => {
    celcius = Math.round(kelvin - 273.15);
    return celcius;
}

const conditionSugg = {
	'clearsky' : 'A happy day to start a day. Weather say, go outside and have fun.',
	'fewclouds' : 'Be safe few clouds can suddenly change the weather. Dont forget your umbrella when you go outside!',
	'scatteredclouds' : 'None',
	'brokenclouds' : 'None',
	'showerrain' : 'None',
	'rain' : 'Bring your umbrella and raincoat.',
	'thunderstorm' : 'When thunder roars, go indoors.',
	'snow' : 'Wear your Beanie, and Sweaters. Don\'t go outside If unnecessary.',
	'mist' : 'Too cold outside, bring some winter suit!'
}

const postCurrWeather=(data)=>{
	//Current Weather
	currTemp.textContent = `${Math.floor(data.main.temp)}°C`
	currLoc.textContent = `${data.name}, ${data.sys.country}`
	currCon.textContent = `${data.weather[0].description}`
	currIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
	//condSugg.textContent = getConSugg(data.weather[0].icon)
	
	//Current Weather DetailsChance
	detailsTempHL.textContent = `↑${Math.floor(data.main.temp_max)}°   ↓${Math.floor(data.main.temp_min)}°`
	detailsFeelsLike.textContent = `${Math.floor(data.main.feels_like)}°`
	//detailsChance
	detailsWindSpeed.textContent = `${Math.floor(data.wind.speed*3.6)} km/h`
	
}

const postDailyWeather=(data)=>{
	//details Chance
	detailsChance.textContent = `${data.hourly[0].pop*100}%`
	
	//Day 0
	day0Icon.src = `http://openweathermap.org/img/wn/${data.daily[0].weather[0].icon}@2x.png`
	day1Icon.src = `http://openweathermap.org/img/wn/${data.daily[1].weather[0].icon}@2x.png`
	day2Icon.src = `http://openweathermap.org/img/wn/${data.daily[2].weather[0].icon}@2x.png`
	day3Icon.src = `http://openweathermap.org/img/wn/${data.daily[3].weather[0].icon}@2x.png`
	day4Icon.src = `http://openweathermap.org/img/wn/${data.daily[4].weather[0].icon}@2x.png`
	day5Icon.src = `http://openweathermap.org/img/wn/${data.daily[5].weather[0].icon}@2x.png`
	day6Icon.src = `http://openweathermap.org/img/wn/${data.daily[6].weather[0].icon}@2x.png`
	
	for(i = 0; i < 7; i++){
		document.querySelector(`.day${i} .date`).textContent = `${weekday[d.getDay()+i]} ${d.getDate()+i}`
		document.querySelector(`.day${i} .chance`).textContent = `${Math.floor(data.daily[i].pop*100)}%`
		document.querySelector(`.day${i} .tempHL`).textContent = `↑${Math.floor(data.daily[i].temp.max)}° ↓${Math.floor(data.daily[i].temp.min)}°`
	}
}






searchForm.addEventListener('submit', e => {
    e.preventDefault();
    const citySearched = cityValue.value.trim();
    searchForm.reset();

    requestCurrent(citySearched)
        .then((data) => {
            postCurrWeather(data);
        })
        .catch((error) => { console.log(error) })
})
	
async function init(){
	await requestLoc()
	const pos = await currLoc.textContent
	requestCurrent(pos)
        .then((data) => {
            postCurrWeather(data);
        })
        .catch((error) => { console.log(error) })
}

init()