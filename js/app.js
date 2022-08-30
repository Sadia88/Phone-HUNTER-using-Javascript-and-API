const loadPhone=async(search,dataLimit)=>{
    const url=`https://openapi.programming-hero.com/api/phones?search=${search}`
    const res=await fetch(url)
    const data= await res.json();
    displayPhone(data.data,dataLimit)
}

const displayPhone=(phones,dataLimit)=>{

    const phoneContainerId=document.getElementById('phone-container')
    phoneContainerId.textContent=''
const Nofoundmassage=document.getElementById('No-found-massage')
   
const veiwallbtn=document.getElementById('veiw-all-btn')
if(dataLimit && phones.length>10){

     phones=phones.slice(0,10) //display only 10 phone
     veiwallbtn.classList.remove('d-none')

}
else {
    veiwallbtn.classList.add('d-none')

}

if(phones.length===0){

    Nofoundmassage.classList.remove('d-none') 
}
else
{
    Nofoundmassage.classList.add('d-none')   
}

    console.log(phones)

   
   phones.forEach(phone=> {
    const phoneDiv=document.createElement('div')
    phoneDiv.classList.add('col')
    phoneDiv.innerHTML=`
    <div class="card p-4">
    <img src="${phone.image}" class="card-img-top  h-50" alt="...">
    <div class="card-body">
      <h5 class="card-title">${phone.phone_name}</h5>
      <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
      <button  onclick="showDetails('${phone.slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Show details</button>
    </div>
  </div>
    
    `
    phoneContainerId.appendChild(phoneDiv)

    
   });
   Loder(false)

}

const Process=(dataLimit)=>{
    Loder(true)
    const exampleFormControlInput1=document.getElementById('exampleFormControlInput1')
    const inputText=exampleFormControlInput1.value
    // exampleFormControlInput1.value=''
    loadPhone(inputText, dataLimit)
}

document.getElementById('search-btn').addEventListener('click',function(){
    Process(10)
 
})

const node = document.getElementById("exampleFormControlInput1").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        Process(10)
    }
});

const Loder=isLoading=>{
    const loadSpinner=document.getElementById('load-spinner')
    if(isLoading){
        loadSpinner.classList.remove('d-none')
    }
    else{
        loadSpinner.classList.add('d-none') 
    }
}

document.getElementById('btn-view-all').addEventListener('click',function(){
Process()

})

const showDetails=async id=>{
    const url=`https://openapi.programming-hero.com/api/phone/${id}`
    const res=await fetch(url)
    const data=await res.json();
    showPhobeDetails(data.data)
}

const showPhobeDetails=phone=>{
    console.log(phone)
    const exampleModalLabel=document.getElementById('exampleModalLabel')
    exampleModalLabel.innerText=phone.name
    const releasedate=document.getElementById('release-date')
    releasedate.innerHTML=`
    <h6> Release Date : ${phone.releaseDate ? phone.releaseDate : " No release date available"} </h6>
    <p>Others : ${phone.others ? phone.others.Bluetooth : "No bluethoot available"}
    
    `

}