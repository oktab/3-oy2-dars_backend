let apiUrl = "https://jsonplaceholder.typicode.com/users";
let row = document.querySelector('#row');
let search = document.querySelector('#searchInput');
let body = document.querySelector('body');
let darkBtn = document.querySelector('#dark');

function darkMode() {
    body.style.backgroundColor = "black";
    body.style.color = "white";
    darkBtn.style.backgroundColor = "white"
    darkBtn.style.color = "black"
    localStorage.setItem("oq", "black");
}

function lightMode() {
    body.style.backgroundColor = "white";  // Fix: Set background color to white for light mode
    body.style.color = "black";
    localStorage.setItem("oq", "white");
}

let saveColor = localStorage.getItem("oq");

if (saveColor === "black") {
    darkMode();
} else {
    lightMode();
}

let usersData = [];

async function fetchData() {
    try {
        let response = await fetch(apiUrl);
        let data = await response.json();
        usersData = data;
        renderData(data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

function renderData(filterData = usersData) {
    row.innerHTML = '';
    filterData.forEach((item) => {
        let div = document.createElement('div');

        div.innerHTML = `
            <div class="bg-green-500 w-[350px] h-[300px] text-center items-center p-4">
                <h1 class="text-white font-bold text-2xl pt-4">${item.name}</h1>
                <h1 class="text-white font-bold text-2xl pt-2">${item.email}</h1>
                <h1 class="text-white font-bold text-2xl pt-2">${item.phone}</h1>
                <h1 class="text-white font-bold text-2xl pt-2">${item.bs}</h1>
            </div>
        `;
        row.append(div);
    });
}

function searchData() {
    let inputValue = search.value.toLowerCase();
    let filterData = usersData.filter(item => item.name.toLowerCase().includes(inputValue));
    renderData(filterData);
}

search.addEventListener('input', searchData);

fetchData();
