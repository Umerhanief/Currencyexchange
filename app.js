const Base_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024-03-06/v1/currencies/eur.json";

const  dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromcurr = document.querySelector(".from select");
const tocurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

//dropdwon
for(let select of dropdowns){
    for (currcode in countryList){
      let newOption =  document.createElement("option");
      newOption.innerText = currcode;
      newOption.value = currcode;

      if(select.name === "from" && currcode === "USD") {
        newOption.selected = "selected";
      }else if (select.name === "to" && currcode === "INR") {
        newOption.selected = "selected";
      }


      select.append(newOption);

    }
    //flag
    select.addEventListener("change", (evt)=>{
        updateflag(evt.target);
    });

}


//update flag change

const updateflag = (element) =>{
   let currcode = element.value;
   let countrycode = countryList[currcode];
   let newsrc =`https://flagsapi.com/${countrycode}/flat/64.png`;
   let img = element.parentElement.querySelector("img");
   img.src = newsrc;


};






btn.addEventListener("click", async (evt) =>{
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amountvalue = amount.value;


    if(amountvalue === ""  || amountvalue < 1){
        amountvalue=1;
        amount.value = "1";

    }
    
    //console.log(fromcurr.value,tocurr.value);
    const URL = `${Base_URL}/${fromcurr.value.toLowerCase()}/${tocurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[tocurr.value.toLowerCase()];
   
    let finalamount = amountvalue * rate;
    msg.innerText = `${amountvalue} ${fromcurr.value} = ${finalamount} ${tocurr.value}`
    


});