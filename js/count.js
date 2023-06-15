const getElement = (e) => document.querySelector(e);
const setProperty = (n, e) => getElement(":root").style.setProperty(n, e);

// loader
function loader(_success) {
    // assign variable
    var obj = getElement(".preloader"),
        inner = getElement(".preloader_inner"),
        bodyBg = getElement(".body-bg");
    // % number
    var w = 0,
        // set intervale
        t = setInterval(function () {
            // set % number
            w = w + 1;
            inner.textContent = w + "%";
            // add body bg class name
            bodyBg.classList.add("hidden");

            if (w === 100) {
                // remove class name
                obj.classList.remove("show");
                bodyBg.classList.remove("hidden");
                clearInterval(t);
                w = 0;
                if (_success) {
                    return _success();
                }
            }
        }, 20);
}

// funtion call
window.addEventListener("load", () => {
    loader();
});

// Countdown
// variable assign
const second = 1000,
    minute = second * 60,
    hour = minute * 60,
    day = hour * 24,
    week = day * 7,
    month = day * 30,
    year = day * 365;

// query selector all
const li = document.querySelectorAll("ul li");

// time set
let countDown = new Date("February 08, 2023 00:00:00").getTime();

setInterval(function () {
    // let date = new Date();
    let now = new Date().getTime();
    let distance = now - countDown;
    if (distance > 0) {
        let y = Math.floor(distance / year);
        let m = Math.floor((distance % year) / month);
        let w = Math.floor((distance % month) / week);
        let d = Math.floor((distance % week) / day);
        let h = Math.floor((distance % day) / hour);
        let min = Math.floor((distance % hour) / minute);
        let s = Math.floor((distance % minute) / second);
        let textday = Math.ceil(distance / day);

        getElement("#years").innerHTML = y < 10 ? `0${y}` : y;
        getElement("#months").innerHTML = m < 10 ? `0${m}` : m;
        getElement("#weeks").innerHTML = w < 10 ? `0${w}` : w;
        getElement("#days").innerHTML = d < 10 ? `0${d}` : d;
        getElement("#hours").innerHTML = h < 10 ? `0${h}` : h;
        getElement("#minutes").innerHTML = min < 10 ? `0${min}` : min;
        getElement("#seconds").innerHTML = s < 10 ? `0${s}` : s;
        getElement("#textDay").innerHTML = textday;
    }
}, second);

// day and night mood
// variable assign
let mood;
let themeSwitch = getElement("#toggle-checkbox");

const moodChanger = (mood) => {
    const logoImg = getElement(".logo img");
    if (mood === "night") {
        logoImg.setAttribute("src", "./img/logo_white.png");
        getElement(".body-bg").style.backgroundImage = `url(
      "https://i.ibb.co/pKRM69s/night.jpg"
    )`;
        setProperty("--overlay", "#00000052");
        setProperty("--countBg", "#24272adb");
        setProperty("--countBorder", " #1b1b1b87");
        setProperty("--year", "#E10937");
        setProperty("--month", "#6633CC");
        setProperty("--week", "#ACAF1E");
        setProperty("--day", "#E18A07");
        setProperty("--hours", "#3A67F5");
        setProperty("--min", "#3D72A4");
        setProperty("--sec", "#CCCCCC");
        setProperty("--color", "white");
        setProperty("--bg", "black");
    } else {
        setProperty("--overlay", "#ffffff3b");
        setProperty("--countBg", "#f5f5f5e6");
        setProperty("--countBorder", " #1b1b1b87");
        setProperty("--year", "#FF3366");
        setProperty("--month", "#CC33FF");
        setProperty("--week", "#00CC00");
        setProperty("--day", "#FFCC33");
        setProperty("--hours", "#3399FF");
        setProperty("--min", "#3366CC");
        setProperty("--sec", "#333333");
        setProperty("--color", "black");
        setProperty("--bg", "white");
        logoImg.setAttribute("src", "./img/logo_black.png");
        getElement(".body-bg").style.backgroundImage = `url(
      "https://i.ibb.co/nLGyD8w/day.jpg"
    )`;
        getElement(".body-bg").style.backgroundPosition = "0% 43%";
    }
};

// local storage data save and get
const setMood = (mood) => {
    const moodData = localStorage.getItem("count-down-mood");
    if (!moodData) {
        localStorage.setItem("count-down-mood", "day");
        return "day";
    } else {
        if (mood) {
            localStorage.setItem("count-down-mood", mood);
            return mood;
        } else return moodData;
    }
};
// funtion call
moodChanger(setMood());
mood = setMood();

mood === "night" ? (themeSwitch.checked = true) : (themeSwitch.checked = false);
// event listener
themeSwitch.addEventListener("click", () => {
    if (themeSwitch.checked) {
        setMood("night");
        moodChanger("night");
    } else {
        setMood("day");
        moodChanger("day");
    }
});
