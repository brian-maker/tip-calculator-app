const bill =  document.getElementById("inp-bill");
const tipBtns = document.querySelectorAll('.tip');
const tipCustom = document.getElementById("inp-tip");
const people = document.getElementById("inp-people");
const error = document.querySelector(".error-msg");
const results = document.querySelectorAll(".value")

bill.addEventListener("input",setBillValue);
tipBtns.forEach(btn=>{
    btn.addEventListener("click",handleClick)
});
tipCustom.addEventListener("input",setTipCustomValue);
people.addEventListener("input",setPeopleValue)

var billValue =0.0;
var tipValue = 0.15;
var peopleValue = 1;

function validateFloat(s){
    var rgx = /^[0-9]*\.?[0-9]*$/;
    return s.match(rgx)
}

function validateInt(s){
    var rgx = /^[0-9]*$/;
    return s.match(rgx);
}

function setBillValue(){
    if(bill.value.includes(',')){
        bill.value.replace(",",".")
    }

    if(!validateFloat(bill.value)){
        bill.value = bill.value.substring(0, bill.value.length-1);
    }
  billValue = parseFloat(bill.value);

  calculateTip()
}

function handleClick(event){
    tipBtns.forEach(btn=>{
        //clear active state
        btn.classList.remove("btn-active")

        //set active state
        if(event.target.innerHTML == btn.innerHTML){
            btn.classList.add("btn-active");
            tipValue = parseFloat(btn.innerHTML)/100;
        }
    });

    //clear custom tip
    tipCustom.value ="";

    calculateTip()

    //console.log(tipValue)
}

function setTipCustomValue(){
    if(!validateInt(tipCustom.value)){
        tipCustom.value = tipCustom.value.substring(0, tipCustom.value.length-1);
    }

    tipValue = parseFloat(tipCustom.value/100)
    tipBtns.forEach(btn=>{
        btn.classList.remove("btn-active");
    });

    if(tipCustom.value !== ''){
        calculateTip()
    }

}

function setPeopleValue(){
    //can't input non numeric characters
    if(!validateInt(people.value)){
        people.value = people.value.substring(0, people.value.length-1);
    }

    peopleValue = parseFloat(people.value)
    if(peopleValue <=0){
        error.classList.add("show-error-msg");
        setTimeout(function(){
            error.classList.remove("show-error-msg")
        },3000);
    }

    calculateTip();

    //console.log(peopleValue)
}

function calculateTip(){
    if(peopleValue >= 1){
        let tipAmount = billValue * tipValue/peopleValue;
        let total = billValue * (tipValue + 1)/peopleValue;

        results[0].innerHTML = '$' + tipAmount.toFixed(2);
        results[1].innerHTML = '$' + total.toFixed(2);
    }
}

function reset(){
    bill.value ="0.0";
    setBillValue();

    tipBtns[2].click();

    people.value ="1";
    setPeopleValue();
}