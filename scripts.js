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

const detailsUVI = document.querySelector('.details #uvIndex')
const detailsCloudCover = document.querySelector('.details #cloudCover')
const detailsPressure = document.querySelector('.details #pressure')
const detailsHumidity = document.querySelector('.details #humidity')
const detailsDewPoint = document.querySelector('.details #dewPoint')
const detailsVisibility = document.querySelector('.details #visibility')
const detailsSunrise = document.querySelector('.details #sunrise')
const detailsSunset = document.querySelector('.details #sunset')

const day0Icon = document.querySelector('.day0 .conditionIcon')
const day1Icon = document.querySelector('.day1 .conditionIcon')
const day2Icon = document.querySelector('.day2 .conditionIcon')
const day3Icon = document.querySelector('.day3 .conditionIcon')
const day4Icon = document.querySelector('.day4 .conditionIcon')
const day5Icon = document.querySelector('.day5 .conditionIcon')
const day6Icon = document.querySelector('.day6 .conditionIcon')

const errorSearch = document.querySelector('.error-message')
errorSearch.remove()

const requestLoc = async () => {
	const locationAPI= `http://api.ipstack.com/49.149.136.163?access_key=3bfeaa9994ce414ef8f37bcedc18e36d`
    const response = await fetch(locationAPI);
    const data = await response.json();
	
	const locDOM = document.querySelector('.currLoc')
	locDOM.innerText= `${data.city}, ${data.country_code}`
	//console.log(data)
}

const requestDaily = async (cityName) => {
	
	//Daily Weather
	const locationAPI= `https://api.opencagedata.com/geocode/v1/json?q=${cityName}&key=87c74156d84a40e99d1c8fa0daa817f1`
    const response = await fetch(locationAPI);
    const data = await response.json();
	//console.log(data)
	const baseURL = `https://api.openweathermap.org/data/2.5/onecall?`
	const query = `lat=${data.results[0].geometry.lat}&lon=${data.results[0].geometry.lng}&exclude=alerts&units=metric&appid=88b4a5259f7b4415354f59acf657c75c`
	
    const weatherresponse = await fetch(baseURL + query);
    const weatherdata = await weatherresponse.json();
	//console.log(weatherdata)
	postDailyWeather(weatherdata)
}

const requestCurrent = async (cityName) => {
	//Current Weather
    const baseURL = 'http://api.openweathermap.org/data/2.5/weather'
    const query = `?q=${cityName}&units=metric&appid=88b4a5259f7b4415354f59acf657c75c`;
	
    const response = await fetch(baseURL + query);
    const data = await response.json();
	//console.log(data)
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

const UTC = (unix) =>{
	var date = new Date(unix * 1000);
	var hours = date.getHours();
	var minutes = "0" + date.getMinutes();
	var formattedTime = hours + ':' + minutes.substr(-2);
	return formattedTime
}
const getCondSugg = (id)=> {
	let thunderstorm = [200,201,202,210,211,212,221,230,231,232]

	let showerRain = [300,301,302,310,311,312,313,314,321,521]
	let lightRain = [500,520]
	let moderateRain = [501,511,531]
	let heavyRain = [503,522]
	let extremeRain = [504]

	let lightSnow = [600,601,611,612,613,620,621]
	let heavySnow = [602,615,616,622]

	let mist = [701]
	let smoke = [711]
	let haze = [721]
	let sandDust = [731,751,761]
	let fog = [741]
	let volcanic = [762] 
	let squall = [771]
	let tornado = [781]

	let clearSky = [800]

	let fewClouds = [801]
	let scatteredClouds = [802]
	let brokenClouds = [801,802,803]
	let overcastClouds = [804]


	if(thunderstorm.includes(id)) return 'When thunder roars, go indoors.'

	if(showerRain.includes(id)) return ' No worries, it\'s safe you can take a bath in the rain. Rain helps in cleansing your hair naturally.'
	if(lightRain.includes(id)) return ' Bring your raincoat and umbrella.'
	if(moderateRain.includes(id)) return 'Bring your raincoat and umbrella. Be careful. '
	if(heavyRain.includes(id)) return 'Stay away from power lines and electrical wires as electrocution might occur.'
	if(extremeRain.includes(id)) return 'If there is a risk of flash flooding, move to higher ground, leave your car, and find a safe place indoors.'

	if(lightSnow.includes(id)) return 'Snow has began to fall, tiny crystals are visible to see on the lamp across the street. Dont forget your winter suit and why dont you get some hot drinks? Go! Get some.'
	if(heavySnow.includes(id)) return 'The snow was coming down with heavy flakes now. How about wear some winter suits to keep you warm? Also, dont go outside if not needed just for you to be safe.'

	if(mist.includes(id)) return 'Too cold outside, bring some winter suit.'
	if(smoke.includes(id)) return 'Wear your mask, stay indoors this is the best way to battle the health effects of haze.'
	if(haze.includes(id)) return 'Wear your mask before you go outside, it may affect your respiratory.'
	if(sandDust.includes(id)) return 'Put your glasses on, sand and dust can make your eye sight poor.'
	if(fog.includes(id)) return 'Pay attention to everything around you.'
	if(volcanic.includes(id)) return 'Wear your mask, Stay indoor and close all the windows and doors.'
	if(squall.includes(id)) return 'Wear your windbreaker jacket, the wind will last a minute.'
	if(tornado.includes(id)) return 'If you want to go outside, please don\'t! Stay at home.'

	if(clearSky.includes(id)) return 'A happy day to start a day. Weather say, go outside and have fun.'
	
	//if(fewClouds.includes(id)) return ''
	//if(scatteredClouds.includes(id)) return ''
	if(brokenClouds.includes(id)) return 'No Worries, It\'s safe to go outside and hang out with your friends.'
	if(overcastClouds.includes(id)) return 'Make sure to bring your umbrella and wear your jacket this overcast days.'
	else return ' '
}


const postCurrWeather=(data)=>{
	//Current Weather
	currTemp.innerText = `${Math.floor(data.main.temp)}°C`
	currLoc.innerText = `${data.name}, ${data.sys.country}`
	currCon.innerText = `${data.weather[0].description}`
	currIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
	condSugg.innerText = getCondSugg(data.weather[0].id)
	
	//Current Weather DetailsChance
	detailsTempHL.innerText = `↑${Math.floor(data.main.temp_max)}°   ↓${Math.floor(data.main.temp_min)}°`
	detailsFeelsLike.innerText = `${Math.floor(data.main.feels_like)}°`
	//detailsChance
	detailsWindSpeed.innerText = `${Math.floor(data.wind.speed*3.6)} km/h`
	
}

const postDailyWeather=(data)=>{
	//details more
	detailsChance.innerText = `${Math.floor(data.hourly[0].pop*100)}%`
	detailsUVI.innerText = `${Math.floor(data.current.uvi)}`
	detailsCloudCover.innerText = `${data.current.clouds}%`
	detailsPressure.innerText = `${data.current.pressure} hPa`
	detailsHumidity.innerText = `${data.current.humidity}%`
	detailsDewPoint.innerText = `${Math.floor(data.current.dew_point)}°`
	detailsVisibility.innerText = `${data.current.visibility/1000} km`
	detailsSunrise.innerText = `${UTC(data.current.sunrise)}`
	detailsSunset.innerText = `${UTC(data.current.sunset)}`
	
	
	
	
	//Day 0
	day0Icon.src = `http://openweathermap.org/img/wn/${data.daily[0].weather[0].icon}@2x.png`
	day1Icon.src = `http://openweathermap.org/img/wn/${data.daily[1].weather[0].icon}@2x.png`
	day2Icon.src = `http://openweathermap.org/img/wn/${data.daily[2].weather[0].icon}@2x.png`
	day3Icon.src = `http://openweathermap.org/img/wn/${data.daily[3].weather[0].icon}@2x.png`
	day4Icon.src = `http://openweathermap.org/img/wn/${data.daily[4].weather[0].icon}@2x.png`
	day5Icon.src = `http://openweathermap.org/img/wn/${data.daily[5].weather[0].icon}@2x.png`
	day6Icon.src = `http://openweathermap.org/img/wn/${data.daily[6].weather[0].icon}@2x.png`
	
	let temp=0
	for(i = 0; i < 7; i++){
		let day = d.getDay()+i
		if(day>6){
			day=day-(day-temp)
			temp+=1
		}
		document.querySelector(`.day${i} .date`).innerText = `${weekday[day]} ${d.getDate()+i}`
		document.querySelector(`.day${i} .chance`).innerText = `${Math.floor(data.daily[i].pop*100)}%`
		document.querySelector(`.day${i} .tempHL`).innerText = `↑${Math.floor(data.daily[i].temp.max)}° ↓${Math.floor(data.daily[i].temp.min)}°`
		
		document.querySelector(`.day${i} .condition`).innerText = `${data.daily[i].weather[0].description}`
		document.querySelector(`.day${i} .drawer-container #feelsLike`).innerText = `${Math.floor(data.daily[i].feels_like.day)}°`
		document.querySelector(`.day${i} .drawer-container #windSpeed`).innerText = `${Math.floor(data.daily[i].wind_speed*3.6)} km/h`
		document.querySelector(`.day${i} .drawer-container #uvIndex`).innerText = `${Math.floor(data.daily[i].uvi)}°`
		document.querySelector(`.day${i} .drawer-container #cloudCover`).innerText = `${data.daily[i].clouds}%`
		document.querySelector(`.day${i} .drawer-container #sunrise`).innerText = `${UTC(data.daily[i].sunrise)}`
		document.querySelector(`.day${i} .drawer-container #sunset`).innerText = `${UTC(data.daily[i].sunset)}`

		containerDOM.style.display = 'block'
	}
}






searchForm.addEventListener('submit', e => {
    e.preventDefault();
    const citySearched = cityValue.value.trim();
	searchForm.reset();
	errorSearch.remove()
    requestCurrent(citySearched)
        .then((data) => {
            postCurrWeather(data);
        })
        .catch((error) => { 
			console.log(error) 
			document.querySelector('.message').append(errorSearch)
		})
})
	
async function init(){
	await requestLoc()
	const pos = await currLoc.innerText
	errorSearch.remove()

	requestCurrent(pos)
        .then((data) => {
            postCurrWeather(data);
        })
        .catch((error) => { console.log(error) })
}

const canExpand = document.querySelector('.can-expand')
canExpand.addEventListener('click',()=>{
	const drawer = document.querySelector('.drawer')
	const chevron = document.querySelector('.expand-button')
	chevron.classList.toggle('expand-button-active')
	canExpand.classList.toggle('expanded')
	if(chevron.classList.contains('expand-button-active')){
		drawer.style.maxHeight = drawer.scrollHeight+'px'
	}else{
		drawer.style.maxHeight = 0
	}
})

const dayExpand = document.querySelectorAll('.day')
dayExpand.forEach((n)=>{
	n.addEventListener('click',()=>{
		const drawer = n.nextSibling.nextSibling
		const button = n.childNodes[5]
		const icon = n.childNodes[1]
		icon.classList.toggle('expanded-icon')
		n.classList.toggle('expanded')
		drawer.classList.toggle('expanded')
		button.classList.toggle('expand-button-active')
		if(button.classList.contains('expand-button-active')){
			drawer.style.maxHeight = drawer.scrollHeight+'px'
		}else{
			drawer.style.maxHeight = 0
		}
	})
})

const dayHover = document.querySelectorAll('.day')
dayExpand.forEach((n)=>{
	n.addEventListener('mouseover',()=>{
		n.childNodes[1].style.background = '#fff'
	})
})











init()