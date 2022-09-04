let url = 'https://api.github.com/search/repositories?q='


function addData(obj){
  let table = document.getElementById("myTable");
  table.innerHTML+=` <tr>
  <td>${obj.name}</td>
  <td>${obj.full_name}Full Name</td>
  <td>${obj.private}Is Private</td>
  <td>Owner-Login: ${obj.owner.name}, 
                       Owner-Name: ${obj.owner.name}, 
                     Owner-Following: ${obj.owner.followingCount}, 
                     Owner-Followers: ${obj.owner.followersCount}</td>
  <td>${obj.licenseName}License Name</td>
  <td>${obj.score}Score</td>
  <td>${obj.numberOfBranch}Number of Branches</td>
</tr>`


}



async function helper(url, target = null) {
    
    let response = await fetch(url)
    let data = await response.json()
    if (target) {
        return data[target]
    } else {
        return data.length
    }
}

async function searchData(url,name) {
    
    let response = await fetch(url)
    let data = await response.json()
    data = data.items[0]
    const n=name
    if(name in data)
    n=data.name
    let obj = {
        "name": n,
        "full_name": data.full_name,
        "private": data.private,
        "owner": {
            "login": data.owner.login,
            "name": await helper(data.owner.url, "name"),
            "followersCount": await helper(data.owner.url, "followers"),
            "followingCount": await helper(data.owner.url, "following")
        },
        "licenseName": data.license.name,
        "score": data.score,
        "numberOfBranch": await helper(data.url + "/branches")
    }
    
    addData(obj)
}


document.getElementById('aa-btn').addEventListener("click",()=>{
    const name=document.getElementById('userinput').value
    url+=name
    searchData(url,name)
})