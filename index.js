myLeads =[]

const ulEl = document.getElementById('ul-el')
const inputEl = document.getElementById('input-el')
const inputBtn = document.getElementById('input-btn')
const saveBtn = document.getElementById('save-tab')
const deleteBtn = document.getElementById('delete-btn')

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

saveBtn.addEventListener("click", function() {
    //grab link from chrome
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {

        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    })
    //end of grab link from chrome
  
})

function render(leads) {
let listItem = ""

for(i = 0; i < leads.length; i++) {
    // listItem +=  "<li><a target= '_blank' href='" + myLeads[i] + "'>" + myLeads[i]  +"</a></li>" 

    listItem += 
    `<li>
        <a target= '_blank' href= '${leads[i]}'>
             ${leads[i]}
        </a>
     
    </li>`
    
  // const = document.createElement('li')
    // li.textContent = myLeads[i]
    // ulEl.append(li)  
}
ulEl.innerHTML = listItem

}

deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    myLeads = []
    render(myLeads)
    

})


inputBtn.addEventListener("click", function() {
    let newValue = inputEl.value
    myLeads.push(newValue)
    //console.log(myLeads)

    render(myLeads)

    inputEl.value = ""
    
     localStorage.setItem("myLeads", JSON.stringify(myLeads))
    //  console.log(localStorage.getItem("myLeads"))
    // console.log(myLeads)  
    
})




