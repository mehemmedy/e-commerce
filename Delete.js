const Deletelist=document.getElementById("Deletelist")

function renderDelete(){fetch("https://69b94968e69653ffe6a73340.mockapi.io/mehemmed/mehemmed")
  .then((res) => res.json())
  .then((data) => {
   Deletelist.innerHTML= data.map(p=>`
<tr class="hover:bg-gray-50 transition-colors duration-150">
    <td class="px-5 py-4">
        <div class="flex items-center gap-3">
            <img src="${p.image}"
                class="w-12 h-12 object-contain rounded-lg border border-gray-100 bg-gray-50 p-1" />
            <span class="text-sm font-medium text-slate-900 max-w-[220px] truncate">
                ${p.title}
            </span>
        </div>
    </td>
    <td class="px-5 py-4">
        <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100 capitalize">
           ${p.category}
        </span>
    </td>
    <td class="px-5 py-4">
        <span class="text-sm font-semibold text-slate-900">$${p.price}</span>
    </td>
    <td class="px-5 py-4">
        <div class="flex items-center gap-1.5">
            <div class="flex items-center gap-0.5">
                <svg class="w-3.5 h-3.5 fill-amber-400" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
                <span class="text-xs font-semibold text-slate-700">${p.rating?.rate ?? '-'}</span>
            </div>
            <span class="text-xs text-gray-400">(${p.rating?.count ?? 0})</span>
        </div>
    </td>
    <td class="px-5 py-4">
        <div class="flex items-center gap-2">
            <button onclick="DeleteProduct(${p.id})" class="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 rounded-full transition-all duration-150 cursor-pointer">
                <svg class="w-3 h-3 fill-none stroke-red-500 stroke-2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="3 6 5 6 21 6"/>
                    <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/>
                    <path d="M10 11v6m4-6v6"/>
                    <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/>
                </svg>
                Sil
            </button>
        </div>
    </td>
</tr>
    `
   ).join('')
  });}
renderDelete()

function DeleteProduct(id){
    fetch(`https://69b94968e69653ffe6a73340.mockapi.io/mehemmed/mehemmed/${id}`,{
        method:"DELETE"
    })
    .then(res=>res.json())
    .then(data=>{
        renderDelete()
    })
    
}