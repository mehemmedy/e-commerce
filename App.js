let cardcontainer = document.getElementById("cardcontainer");
let sebetic = document.getElementById("sebetic");
let sebetcount1 = document.getElementById("sebetcount1");

const Base_Api="https://69b94968e69653ffe6a73340.mockapi.io/mehemmed/mehemmed"
let sebet = [];
let mehsullar = [];
const sebeticmehsullar = document.getElementById("sebeticmehsullar");
const total = document.getElementById("total");
// function mehsullarTezele(){
// cardcontainer.innerHTML =''
fetch("https://69b94968e69653ffe6a73340.mockapi.io/mehemmed/mehemmed")
  .then((res) => res.json())
  .then((data) => {
    mehsullar = data;
    mehsullarTezele(mehsullar);
  });

function mehsullarTezele(x) {
  cardcontainer.innerHTML = x
    .map((item) => {
      const slug = slugCreate(item.title);

      return `
      <div  id="${item.id}"
        class="w-full max-w-sm bg-white border border-gray-200 rounded-xl shadow-sm mx-auto mt-4 overflow-hidden flex flex-col">

        <div class="h-48 w-full p-4 bg-white flex items-center justify-center border-b border-gray-100">
          <img src="${item.image}" 
               class="max-w-full max-h-full object-contain" 
               alt="${item.title}" />
        </div>

        <div class="p-4 flex flex-col flex-grow">
          <div class="flex justify-between items-start gap-2 mb-1">
            <h3 class="text-slate-900 text-lg font-semibold leading-tight line-clamp-2">
              ${item.title}
            </h3>
            <span class="text-lg font-semibold text-slate-900">
              $${item.price}
            </span>
          </div>

          <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
            ${item.category}
          </p>

          <p class="text-sm text-gray-600 mb-5 line-clamp-2 flex-grow">
            ${item.description}
          </p>

          <div class="flex gap-3 mt-5">

  <a href="DetailPage.htm?s=${slug}"
     class="flex-1 flex items-center justify-center gap-2 
            py-2.5 rounded-xl text-sm font-medium
            border border-gray-200 text-gray-700
            hover:bg-gray-50 hover:border-gray-300
            transition-all duration-200">

    <i class="fa-regular fa-eye text-base"></i>
    <span>Daha Etrafli</span>
  </a>

  <button onclick="addbasket(${item.id})"
    class="flex-1 flex items-center justify-center gap-2 
           py-2.5 rounded-xl text-sm font-semibold
           text-white bg-blue-600 
           hover:bg-blue-700 
           shadow-sm hover:shadow-md
           active:scale-95 active:shadow-sm
           transition-all duration-200">

    <i class="fa-solid fa-cart-shopping text-base"></i>
    <span>Səbətə at</span>
  </button>

</div>
        </div>
      </div>
      `;
    })
    .join("");
}


function sebetRender() {
  sebetic.classList.toggle("hidden");
}

function sebetTezele() {
  if (sebet.length === 0) {
    sebeticmehsullar.innerHTML = "";
    sebetRender();
  } else {
    sebeticmehsullar.innerHTML = sebet
      .map(
        (item) => `
<div class="grid sm:grid-cols-3 items-start gap-4 border-b py-4 px-4">
    <div class="sm:col-span-2 flex items-start gap-4">
        <div class="w-28 h-28 shrink-0 bg-gray-100 p-2 rounded-md">
            <img src="${item.image}" class="w-full h-full object-contain" />
        </div>
        <div class="flex flex-col">
            <h3 class="text-[15px] font-semibold text-slate-900">${item.title}</h3>
            <p class="text-xs text-slate-500 mt-2">$${item.price}</p>
            <button onclick="removeBasket(${item.id})" type="button"
                class="mt-4 font-medium text-red-600 text-xs cursor-pointer flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z"/>
                    <path d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z"/>
                </svg>
                Sil
            </button>
        </div>
    </div>
    <div class="sm:ml-auto flex items-center gap-3 sm:mt-6">
        <button onclick="deyisCount(${item.id},-1)"
            class="px-2 py-1 border border-gray-300 rounded text-sm">−</button>
        <span class="text-sm font-medium">${item.count}</span>
        <button onclick="deyisCount(${item.id},1)"
            class="px-2 py-1 border border-gray-300 rounded text-sm">+</button>
    </div>
</div>
    `,
      )
      .join("");
  }
  sebetcount();
  price();
}

function addbasket(id) {
  const prdct = mehsullar.find((p) => p.id == id);
  const x = sebet.find((p) => p.id == prdct.id);
  if (x) {
    x.count++;
  } else {
    prdct.count = 1;
    sebet.push(prdct);
  }
  sebetTezele();
}

function deyisCount(id, delta) {
  const item = sebet.find((p) => p.id == id);
  if (!item) return;
  item.count += delta;
  if (item.count <= 0) {
    removeBasket(id);
  } else {
    sebetTezele();
  }
}

function removeBasket(id) {
  sebet = sebet.filter((p) => p.id != id);
  sebetTezele();
}

function sebetcount() {
  sebetcount1.innerHTML = sebet.length;
}
function price() {
  let totalPay = 0;
  sebet.map((item) => (totalPay += item.price * item.count));
  total.innerHTML = totalPay.toFixed(2) + "$";
}

function getAdd() {
  window.location.href = "Add.htm";
}
function getDelete() {
  window.location.href = "Delete.htm";
}


function slugCreate(title) {
    return title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '') // Xüsusi simvolları silir
        .replace(/[\s_-]+/g, '-') // Boşluqları tire ilə əvəz edir
        .replace(/^-+|-+$/g, ''); // Başda və sonda tireni silir

   
}