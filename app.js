// Collecting Search Btn Queries 
document.getElementById('btn-search').addEventListener('click',function(){
    
    const userField=document.getElementById('userSearchField');
    const userFieldValue=userField.value;
    userField.value='';
    // Clear the previous Looded data 
        const displayUserSearch=document.getElementById('displayUserSearch');
        displayUserSearch.innerHTML=``;
    
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
       
       }
    else
    {
        noSerchFound.classList.add('d-none'); 
    }
    // Foreach Loop
    allPhoneDatas.forEach(allPhoneData => {
        console.log(allPhoneData);
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
                <div><button id="btn-details" class="btn btn-primary px-4  m-3 w-50 fs-5">Details</button></div>
              </div>

    
        `;
        allMobileParent.appendChild(allMobileChild);
        
        
    });
    
}
