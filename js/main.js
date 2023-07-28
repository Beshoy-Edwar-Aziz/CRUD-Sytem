var productName=document.getElementById("productName");
var productPrice=document.getElementById("productPrice");
var productImg=document.getElementById("ProductImg");
var productDesc=document.getElementById("prodDesc");
var products=[];
if(localStorage.getItem('products')!=null){
    products=JSON.parse(localStorage.getItem('products'));
    displayproducts();
}
function addProduct(){
    var product={
        name: productName.value,
        price: productPrice.value,
        description:productDesc.value,
        image: productImg.value
        
    }
    if(check(productName.value)){      
        if(checkprice(productPrice.value)){
            if(checkdesc(productDesc.value)){
                if(checkImg(productImg.value)){
                    products.push(product);
                localStorage.setItem('products',JSON.stringify(products))
                displayproducts();
                clearInputs();
                document.getElementById('nameMsg4').style.display="none"
                }else{
                    document.getElementById('nameMsg4').style.display="block"
                }
                document.getElementById('nameMsg3').style.display="none"
            }else{
                document.getElementById('nameMsg3').style.display="block"
            }
            document.getElementById('nameMsg2').style.display="none"
        }else{
            document.getElementById('nameMsg2').style.display="block"
        }
        document.getElementById('nameMsg').style.display="none"
    }else{
        document.getElementById('nameMsg').style.display="block"
    }
}

function deleteProduct(index){
    products.splice(index,1);
    localStorage.setItem('products',JSON.stringify(products));
    displayproducts();
}
function displayproducts() {
    var productsList=""
    for(var i=0;i<products.length;i++){
        productsList+= `<div class="col-md-4">
        <div class="card">
            <img src="${products[i].image}" class="img-thumbnail" alt="product">
        </div>
        <div class="card-body text-center">
            <p>Name: ${products[i].name}</p>
            <p>Price: ${products[i].price} $</p>
            <p>Description: ${products[i].description}</p>
            <button class="btn btn-outline-dark" onclick="takeInput(${i})">Update</button>
            <button class="btn btn-outline-warning" onclick="deleteProduct(${i})">Delete</button>
        </div>
    </div>`
    }
    document.getElementById("displayProducts").innerHTML=productsList;
}
function clearInputs(){
    productName.value="";
    productPrice.value="";
    productImg.value="";
    productDesc.value="";
}
function search(search){
    var productsList="";
    for(var i=0;i<products.length;i++){
        if(products[i].name.toLowerCase().includes(search.toLowerCase())){
            productsList+= `<div class="col-md-4">
            <div class="card">
                <img src="${products[i].image}" class="img-thumbnail" alt="product">
            </div>
            <div class="card-body text-center">
                <p>Name: ${products[i].name.toLowerCase().replaceAll(search,`<span>${search}</span>`)}</p>
                <p>Price: ${products[i].price} $</p>
                <p>Description: ${products[i].description}</p>
                <button class="btn btn-outline-dark" onclick="takeInput(${i})">Update</button>
                <button class="btn btn-outline-warning" onclick="deleteProduct(${i})">Delete</button>
            </div>
        </div>` 
        }
    }
    document.getElementById("displayProducts").innerHTML=productsList;
}
var globalIndex
function takeInput(index){
    globalIndex=index
    productName.value=products[index].name;
    productPrice.value=products[index].price;
    productImg.value=products[index].image;
    productDesc.value=products[index].description;
    document.getElementById('addBtn').style.display="none"
    document.getElementById('updateBtn').style.display="block"
}
function updateProduct(){
    var product={
        name: productName.value,
        price: productPrice.value,
        image: productImg.value,
        description: productDesc.value
    }
    products[globalIndex]=product
    localStorage.setItem('products',JSON.stringify(products))
    displayproducts();
    clearInputs();
    document.getElementById('addBtn').style.display="block"
    document.getElementById('updateBtn').style.display="none"
}
function check(input){
    var regex=/^[A-Z][a-zA-Z0-9]{2,}$/
    return regex.test(input);
}
function checkdesc(input){
    var regex=/^[a-zA-Z0-9]{2,}$/
    return regex.test(input);
}
function checkprice(input){
    var regex=/^[0-9]{1,}$/
    return regex.test(input);
}
function checkImg(input){
    var regex=/^images\/[a-zA-Z0-9]{1,}\.(jpg|png)$/
    return regex.test(input);
}
window.addEventListener("load",()=>{
    const loader=document.querySelector(".loader");
    loader.classList.add("loaditem");
})
window.addEventListener("transitionend",()=>{
    const loader=document.querySelector(".loader");
    loader.remove();
})