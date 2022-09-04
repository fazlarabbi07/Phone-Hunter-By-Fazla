    // Collecting Search Btn Queries 
document.getElementById('btn-search').addEventListener('click',function(){
    const userField=document.getElementById('userSearchField');
    const userFieldValue=userField.value;
    
    // Calling loadAllMobileData (fetch)function 
    loadAllMobileData(userFieldValue);

})
const loadAllMobileData=(userFieldValue)=>{
    
    const userQuery=userFieldValue;
    const searchUrl=`https://openapi.programming-hero.com/api/phones?search=${userQuery}`;
    fetch(searchUrl)
    .then(response=>response.json())
    // Calling All Phone Data Display to show ALl phone data 
    .then(phoneAllData=>displayAllPhoneData(phoneAllData.data))
}
const displayAllPhoneData=(allPhoneDatas)=>{

    allPhoneDatas.forEach(allPhoneData => {
        console.log(allPhoneData);
        const allMobileParent=document.getElementById('displayUserSearch');
        const allMobileChild=document.createElement('div');
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