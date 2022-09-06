// UTILITY FUNCTIONS FOR OPERATION
const spinner=(status)=>{
    const spinnerMode=document.getElementById('spinner');
    if(status==true)
    {
        
        spinnerMode.classList.remove('d-none');
    }
    else
    {
        spinnerMode.classList.add('d-none'); 
    }
}

// Collecting Search Btn Queries 
document.getElementById('btn-search').addEventListener('click',function(){
    
    const userField=document.getElementById('userSearchField');
    const userFieldValue=userField.value;
    // clearing user field data after taking their value 
    userField.value=''; 
    // Clear the previous Looded data 
        const displayUserSearch=document.getElementById('displayUserSearch');
        displayUserSearch.innerHTML=``;
    spinner(true);




    // Calling loadAllMobileData (fetch)function 
    loadAllMobileData(userFieldValue);

})
const loadAllMobileData=(userFieldValue)=>{
    
    const userQuery=userFieldValue;
    const searchUrl=`https://openapi.programming-hero.com/api/phones?search=${userQuery}`;
    fetch(searchUrl)
    .then(response=>response.json())
    .then(phoneAllData=>displayAllPhoneData(phoneAllData.data))
   
       
}

const displayAllPhoneData=(allPhoneDatas)=>{
    
    
    // For Wrong User Input 
    const noSerchFound=document.getElementById('noSearchResult'); 
    if(allPhoneDatas.length==0)
       {
        noSerchFound.classList.remove('d-none');
       spinner(false);
       return 0;
       }
    else
    {
        noSerchFound.classList.add('d-none'); 
    }
    // Foreach Loop
    allPhoneDatas.forEach(allPhoneData => {
        
        const allMobileChild=document.createElement('div');  
        const allMobileParent=document.getElementById('displayUserSearch');
    
        allMobileChild.classList.add('col');
         allMobileChild.innerHTML=
        `
        <div class="card container gap-3">
                <img src="${allPhoneData.image}" class="card-img-top container " alt="...">
                <div class="card-body">
                  <h5 class="card-title">${allPhoneData.phone_name}</h5>
                  <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                </div>
                <div><button onclick="btnDetails('${allPhoneData.slug}')" class="btn btn-primary px-4  m-3 w-50 fs-5" data-bs-toggle="modal" data-bs-target="#detailsBtnModal">Details</button></div>
              </div>

    
        `;
        allMobileParent.appendChild(allMobileChild);
        spinner(false);
        
        
    });
  
}
// Each Btn Details click
const btnDetails=(slugId)=>{
    
    const specificSlug=slugId;
    fetch(`https://openapi.programming-hero.com/api/phone/${specificSlug}`)
    .then(response=>response.json())
    .then(data=>eachMobile(data.data))
   
}
const eachMobile=(doubleData)=>{
    //Phone Name
    // console.log(doubleData);
    const detailsBtnModalLabel=document.getElementById('detailsBtnModalLabel');
    detailsBtnModalLabel.innerText=doubleData.name;
    const modalBody=document.getElementById('modalBody');
    const modalChild=document.createElement('div');
    modalBody.innerHTML=``; //Crearing Previous loded data
    modalChild.innerHTML=`<img class=" container img img-fluid " src="${doubleData.image}" alt="">
    <h3>Brand Name:${doubleData.brand}</h3>
    <p> <h5>Sorage:</h5> ${doubleData.mainFeatures.storage}</p>
    <p><h6>Display Size:</h6>${doubleData.mainFeatures.displaySize}</p>
    <p><h6>Chipset:</h6>${doubleData.mainFeatures.chipSet}</p>
    <p><h6>Memory:</h6>${doubleData.mainFeatures.memory}</p>
    <p><h6>Sensors:</h6>${doubleData.mainFeatures.sensors}</p>
    <p><h6>Storage:</h6>${doubleData.mainFeatures.storage}</p>
    <p><h6>Release Date:</h6>${doubleData.releaseDate ? doubleData.releaseDate :"No date found"}</p>`;
    modalBody.appendChild(modalChild);

}
{/* <p>Storage:${doubleData.name.mainFeatures.storage}</p> */}