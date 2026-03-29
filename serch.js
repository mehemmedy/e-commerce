const searchinput = document.getElementById("searchinput");
const searchlist = document.getElementById("searchlist");
const dropdown = document.getElementById("dropdown");

searchinput.addEventListener("input", () => {
  searchinput.value === ''
    ? dropdown.classList.add('hidden')
    : dropdown.classList.remove('hidden');
  
  axtarMehsul(searchinput.value);
});

function axtarMehsul(x) {
  const keyword = x.toLowerCase();
  const axtarfilter = mehsullar.filter((item) =>
    item.title.toLowerCase().includes(keyword),
  );
  axtarfilter.length > 0
  ? searcProduct(axtarfilter)
  : searchlist.innerHTML = '<p class="text-sm text-gray-400 text-center py-6">Heç nə tapılmadı</p>';
}

function searcProduct(x) {
  searchlist.innerHTML = x.map((p) => `
        <div class="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 cursor-pointer transition-colors">
            <img src="${p.image}" class="w-11 h-11 rounded-xl object-contain bg-gray-100 p-1 flex-shrink-0" />
            <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-gray-900 truncate">${p.title}</p>
            <p class="text-xs text-gray-400 capitalize mt-0.5">${p.category}</p>
            </div>
            <span class="text-sm font-semibold text-gray-800 flex-shrink-0">$${p.price}</span>
        </div>
`,
    )
    .join("");
}
