// import fetch from 'node-fetch'
const result=[]
function addData(results){
    let table = document.getElementById("myTable");
    results.map(result=>{
        let row = table.insertRow(-1);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        cell1.innerHTML = result['AirportName'];
        cell2.innerHTML = result['isValueMatch'];  
      })
//     results.map(result=>{
//       table.innerHTML+=` <tr>
//       <td>${result['AirportName']}</td>
//       <td>${result['isValueMatch']}</td>
//   </tr>`
//     })
  }

async function load(){
   const data=await fetch("https://think.cs.vt.edu/corgis/datasets/json/airlines/airlines.json")
   const val= await data.json();
   return val
}
function calculate(data){
    data.map(element => {
        let sum=0
        for (const key in element.Statistics.Flights){
            // console.log(key)
            if(key!="Total")
            sum+=element.Statistics.Flights[key]
        }
        if(sum==element.Statistics.Flights.Total){
            result.push({AirportName:element.Airport.Name,isValueMatch:true})
        }else{
            result.push({AirportName:element.Airport.Name,isValueMatch:false})
        }
    });
    addData(result)
}

document.getElementById("btn").addEventListener("click",()=>{
    console.log("h")
    load().then(val=>{
        console.log(val)
        calculate(val)
    }).catch(err=>console.log(err))
    
})