const box = document.querySelectorAll('.box')

console.log(box)
box.forEach((id)=>{
    id.addEventListener('mousedown',()=>{
        console.log(id)
        id.innerHTML = "<p>x<p/>"
    })
})
