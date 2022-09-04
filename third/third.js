

 function addData(winners){
    let table = document.getElementById("myTable");
    
    winners.map(winner=>{
        table.innerHTML+=`<tr>
            <td>${winner}</td>
            <td>Chemistry</td>
            </tr>`
    })
  }
 async function load(){
    const data=await fetch("https://api.nobelprize.org/v1/prize.json")
    const val= await data.json();
    console.log (val.prizes[0].laureates)
    return val
}

function findNobel(start,end,data){
    const result=[]
    data.prizes.forEach(d => {
        const year=Number(d.year)
        if(year>=start & year<=end & d.category==="chemistry"){
            for(const winner of d.laureates){
                result.push(winner.firstname)
            }

        }
        
    });
    addData(result)
    // console.log(result.length) 
}
document.getElementById("btn").addEventListener("click",()=>{
    load().then(val=>{
        findNobel(2000,2019,val)
    }).catch(error=>console.log(error))
})
