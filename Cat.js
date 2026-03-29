const catlist = document.getElementById("catlist");
let categoryler = [];

function catTezele() {
  fetch("https://69b94968e69653ffe6a73340.mockapi.io/mehemmed/category")
    .then((res) => res.json())
    .then((data) => {
      categoryler = data;
      data.forEach((element) => {
        catlist.innerHTML += `
            <li class="px-5 py-2.5 rounded-full border-4 border-gray-200 bg-white text-sm font-medium text-gray-600 cursor-pointer hover:border-gray-400 hover:bg-gray-50 transition-all capitalize"
                onclick="kateqoriyaSecin('${element.name.replace(/'/g, "\\'")}')">
                ${element.name}
            </li>
            `;
      });
    });
}
catTezele()

function kateqoriyaSecin(name){
    const result=(name==='all')?mehsullar:mehsullar.filter(p=>p.category===name);
    mehsullarTezele(result);
}