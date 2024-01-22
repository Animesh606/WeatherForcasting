
const getinfo = async () => {
    const cityVal = city.value;
    if(cityVal == '') {
        Swal.fire({
            title: 'Please Enter City Name',
            text: 'Enter a city name before search',
            icon: 'error',
            toast:'true',
            showConfirmButton:false,
            timer:4000,
            timerProgressBar:true,
            position:"bottom-end",
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
              }
          });
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
            // {console.log(objdata.main.humidity)}
            humidityRange.innerHTML = `Humidity: ${objdata.main.humidity}% | Air Pressure: ${objdata.main.pressure}mb`;
            box.style.display = 'block';
            message.innerText = '';
            const weather = objdata.weather[0].main;
            let videoBtn = document.querySelector('video');
            {console.log(weather)}
            if(weather == 'Clouds') {
                weathericon.innerHTML = `<i class="fa-solid fa-cloud fa-beat" style="color : black"></i>`;
                videoBtn.setAttribute('src' , 'Cloudy.mp4');
            }
            else if(weather == 'Rain') {
                weathericon.innerHTML = `<i class="fa-solid fa-cloud-showers-heavy fa-beat" style="color : black"></i>`;
                videoBtn.setAttribute('src' , 'rain.mp4');
                spanLocation.style.color = "white";
                temp.style.color = "white";
                date.style.color = "white";
                rangetemp.style.color = "white";
            }
            else if(weather == 'Haze' || weather == 'Mist') {
                weathericon.innerHTML = `<i class="fa-solid fa-smog fa-beat" style="color : white"></i>`;
                videoBtn.setAttribute('src' , 'Haze.mp4');
                spanLocation.style.color = "white";
                temp.style.color = "white";
                date.style.color = "white";
                rangetemp.style.color = "white";
            }
            else if(weather == 'Thunderstorm') {
                weathericon.innerHTML = `<i class="fa-solid fa-cloud-bolt fa-beat" style="color : black"></i>`;
                videoBtn.setAttribute('src' , 'Thunderstorm.mp4');
                spanLocation.style.color = "white";
                temp.style.color = "white";
                date.style.color = "white";
                rangetemp.style.color = "white";
            }
            else {
                weathericon.innerHTML = `<i class='fa-solid fa-sun fa-beat'></i>`;
                videoBtn.setAttribute('src' , 'Sunny.mp4');
                spanLocation.style.color = "black";
                temp.style.color = "black";
                date.style.color = "black";
                rangetemp.style.color = "black";
            }

        } catch (error) {
            Swal.fire({
                title: 'Wrong City Name',
                text: 'Enter valid city name',
                icon: 'error',
                toast:'true',
                showConfirmButton:false,
                timer:4000,
                timerProgressBar:true,
                position:"bottom-end",
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                  }
              });
            box.style.display = 'none';
            message.style.color = "white";
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