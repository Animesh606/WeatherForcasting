const getinfo = async () => {
    const cityVal = city.value;
    if(cityVal == '') {
        message.innerText = "Enter a city name before search";
        box.style.display = 'none';
    }
    else {
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=ed933036b1742e5819eb041550a0d671`;
            const data = await fetch(url);
            const objdata = await data.json();
            spanLocation.innerText = `${objdata.name}, ${objdata.sys.country}`;
            temp.innerHTML = `${objdata.main.temp}&deg;C`;
            rangetemp.innerHTML = `Min ${objdata.main.temp_min}&deg;C | Max ${objdata.main.temp_max}&deg;C`;
            box.style.display = 'block';
            message.innerText = '';
            const weather = objdata.weather[0].main;
            if(weather == 'Clouds') {
                weathericon.innerHTML = `<i class="fa-solid fa-cloud fa-beat" style="color : black"></i>`;
            }
            else if(weather == 'Rain') {
                weathericon.innerHTML = `<i class="fa-solid fa-cloud-showers-heavy fa-beat" style="color : black"></i>`;
            }
            else if(weather == 'Haze' || weather == 'Mist') {
                weathericon.innerHTML = `<i class="fa-solid fa-smog fa-beat" style="color : white"></i>`;
            }
            else if(weather == 'Thunderstorm') {
                weathericon.innerHTML = `<i class="fa-solid fa-cloud-bolt fa-beat" style="color : black"></i>`;
            }
            else {
                weathericon.innerHTML = `<i class='fa-solid fa-sun fa-beat'></i>`;
            }

        } catch (error) {
            message.innerText = "Enter valid city name";
            box.style.display = 'none';
        }
    }
}
const getcurrenttime = () => {
    let now = new Date();
    const weekday = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
    const months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
    let day = weekday[now.getDay()];
    let month = months[now.getMonth()];
    let date = now.getDate();
    let hour = now.getHours();
    let minute = now.getMinutes();
    let period = "AM";
    if(hour > 11) {
        period = "PM";
        if(hour > 12)
            hour -= 12;
    }
    if(hour < 10)
        hour = "0" + hour;
    if(minute < 10)
        minute = "0" + minute;
    let time = `${day} | ${month} ${date} | ${hour}:${minute}${period}`;
    return time;
}
date.innerHTML = getcurrenttime();
submit.addEventListener('click', getinfo);