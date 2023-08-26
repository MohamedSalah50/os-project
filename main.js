let title=document.getElementById("title");
let price=document.getElementById("price");
let taxes=document.getElementById("taxes");
let ads=document.getElementById("ads");
let discount=document.getElementById("discount");
let total=document.getElementById("total");
let count=document.getElementById("count");
let category=document.getElementById("category");
let create=document.getElementById("submit");
let tmb;
let mood="create";
//get-total
function gettotal()
{
    if(price.value!=""){
        let result=(+price.value+ +taxes.value+ +ads.value)- +discount.value;
    total.innerHTML=result;
    total.style.background="green";
    }else{
        total.innerHTML="";
        total.style.background="red";
    }
}
//create product
let databro;
if(localStorage!="")
{
    databro=JSON.parse(localStorage.product);
}else{
    databro=[];
}
create.onclick=function()
{
    let newdatapro={
        title:title.value,
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value,
    };
    //count
    if(mood==="create")
    {
        if(newdatapro.count>1)
        {
            for(let i=0;i<newdatapro.count;i++)
            {
                databro.push(newdatapro);
            };
        }else{
            databro.push(newdatapro);
        };
    }else{
        databro[tmb]=newdatapro;
        mood="craete";
        create.innerHTML="craete";
        count.style.display="block";
    }
   
    //savelocalstorage
    localStorage.setItem("product",JSON.stringify(databro));
    cleardata();
    read_data();
}
//claer-inputs
function cleardata()
{
    title.value="";
    price.value="";
    taxes.value="";
    ads.value="";
    discount.value="";
    total.innerHTML="";
    count.value="";
    category.value="";
};
//read-data
function read_data()
{
    let table="";
    for(let i = 0; i<databro.length;i++)
    {
        table+=`
        <tr>
        <td>${i}</td>
        <td>${databro[i].title}</td>
        <td>${databro[i].price}</td>
        <td>${databro[i].taxes}</td>
        <td>${databro[i].ads}</td>
        <td>${databro[i].discount}</td>
        <td>${databro[i].total}</td>
        <td>${databro[i].category}</td>
        <td><button onclick="update_data(${i})" id="ubdate">update</button></td>
        <td><button onclick=" delete_data(${i})" id="delete">delete</delete></td>
    </tr>
        `
        document.getElementById("tbody").innerHTML=table;
        let btndeleteall = document.getElementById("deleteall")
        if(databro.length>0)
        {
            btndeleteall.innerHTML=`
            <button onclick="delete_all()"> delete all(${databro.length})</button>
            `
        }else{
            btndeleteall.innerHTML="";
        }
    };
};
read_data();
//delete
function delete_data(i)
{
    databro.splice(i,1);
    localStorage.product=JSON.stringify(databro);
    read_data();
};
//deleteall
function delete_all()
{
    databro=[];
    localStorage.product=JSON.stringify(databro);
    read_data();
};
//update
function update_data(i)
{
    title.value=databro[i].title;
    price.value=databro[i].price;
    taxes.value=databro[i].taxes;
    ads.value=databro[i].ads;
    discount.value=databro[i].discount;
    gettotal();
    count.style.display="none";
    category.value=databro[i].category;
    mood="update";
    create.innerHTML="update";
    tmb=i;
    scroll({
        top:0,
        bahavior:"smooth"
    })
};