var productNameInp =document.getElementById("productName");
var productPriceInp =document.getElementById("productPrice");
var productCompanyInp =document.getElementById("productCompany");
var productDescInp =document.getElementById("productDesc");


var searchInp =document.getElementById("search");
var searchRow =document.getElementById("searchRow");


var currentIndex=0;


var addBtn=document.getElementById("addBtn");


var productContainer; //array just decliration

if(localStorage.getItem("productContainer")== null){
	
	productContainer=[];
	
}
else{
	
	productContainer=JSON.parse(localStorage.getItem("productContainer"));//json.parse hy7wel el string l array tani 3shn n7ot elly mawgod f el storage f el array 3shn nkml 3lehom
	displayData();
}



addBtn.onclick=function()
{
	if(addBtn.innerHTML=="Add Product"){
	validation();	
	//addProduct();
	displayData();
	
	}
	else{
		updateProduct();
		displayData();
	}
}
function validation(){
	if(productNameInp.value=="" & productPriceInp.value=="" & productCompanyInp.value==""){
		$(".invalidName").css('display', 'inline-block');
		$(".invalidPrice").css('display', 'inline-block');
		$(".invalidCompany").css('display', 'inline-block');
	}
	else if(productNameInp.value==null || productNameInp.value==""){
		$(".invalidName").css('display', 'inline-block');
	}
	else if(productPriceInp.value <= 3 || isNaN(productPriceInp.value) || productPriceInp.value==null || productPriceInp.value==""){
		$(".invalidName").css('display', 'none');
		$(".invalidPrice").css('display', 'inline-block');
	}
	else if(productCompanyInp.value==null || productCompanyInp.value==""){
		console.log("ffffffffff");
		$(".invalidName").css('display', 'none');
		$(".invalidPrice").css('display', 'none');
		$(".invalidCompany").css('display', 'inline-block');
	}
	else{
		$(".invalidName").css('display', 'none');
		$(".invalidPrice").css('display', 'none');
		$(".invalidCompany").css('display', 'none');
		addProduct();
	}
}

function addProduct(){
	
	var product={
			name:productNameInp.value,
			price:productPriceInp.value,
	        company:productCompanyInp.value,
	        desc:productDescInp.value
	}
	
	productContainer.push(product);//h3ml add ll object f el array w el push bt3ml add mn el 25er bs msh hyfr2 3shn heya fadya
localStorage.setItem("productContainer",JSON.stringify(productContainer));// json da object by7wel el array of objects l string 3shn al storage msh bt2ra 3'er string.
console.log(product);
clearForm();
	
}

function displayData(){
	
	var cols="";
	for(var i=0;i<productContainer.length;i++){
		cols+=`<div class="col-md-3 main ">
		        <div class="product">
		          <p class="text-danger productName">`+productContainer[i].name+`</p>
		          <p class="text-primary productPrice">`+productContainer[i].price+`</p>
		          <p class="productCompany">`+productContainer[i].company+`<p>
		          <p class="text-muted productDesc">`+productContainer[i].desc+`</p>
		          <div class="buttons">
		          <button class="btn btn-danger" onclick="deleteProduct(`+i+`)">Delete</button>
		          <button class="btn btn-info" onclick="setForm(`+i+`)">Update</button></div></div></div>`
	}
	
	
	document.getElementById("rowData").innerHTML=cols;
	
	
}

function clearForm(){
	/*productNameInp.value="";
	productPriceInp.value="";
	productCompanyInp.value="";
	productDescInp.value="";*/ 
	//feh way 27san mn de 3shn law 3andna inputs keter msh hnktbhom kolhom
	
	var inputs=document.getElementsByClassName("form-control");
	
	for(var i=0; i<inputs.length;i++){
		inputs[i].value="";
	}
}

function deleteProduct(id){
	
	productContainer.splice(id,1);
	
	localStorage.setItem("productContainer",JSON.stringify(productContainer));//7tetha hena 3shn b3d ma 2shel al array el gdeda tt7t f el storage.
	
	displayData();
}

function setForm(i){
	productNameInp.value=productContainer[i].name;
	productPriceInp.value=productContainer[i].price;
	console.log("Price"+productContainer[i].price+"productPriceInp"+productPriceInp.value);
	productCompanyInp.value=productContainer[i].company;
	productDescInp.value=productContainer[i].desc;
	
	addBtn.innerHTML="update product";
	currentIndex=i;
}

function updateProduct(){
	
	productContainer[currentIndex].name=productNameInp.value
	productContainer[currentIndex].price=productPriceInp.value;
	productContainer[currentIndex].company=productCompanyInp.value;
	productContainer[currentIndex].desc=productDescInp.value;
	clearForm();
	addBtn.innerHTML="Add Product";
	localStorage.setItem("productContainer",JSON.stringify(productContainer));// json da object by7wel el array of objects l string 3shn al storage msh bt2ra 3'er string.
	
}


searchInp.onkeyup=function(){
	console.log("searchInp.value"+searchInp.value+"hhh");
	if(searchInp.value != null && searchInp.value != "" && searchInp.value != undefined){
	searchProducts(searchInp.value);
	}
	else{
		$(".search").css('display', 'none');
	}
}

function searchProducts(term){
	
	var searchCols="";
	
	for(var i=0;i<productContainer.length;i++){
		
		if(productContainer[i].name.includes(term)){// law 3yza 23ml search bel kelma kolha h3ml : (productContainer[i].name==term)
			
			searchCols+=`<div class="col-md-4 search">
		         <div class="product">
		          <p class="text-danger productName">`+productContainer[i].name+`</p>
		          <p class="text-primary productPrice">`+productContainer[i].price+`</p>
		          <p class="productCompany">`+productContainer[i].company+`<p>
		          <p class="text-muted productDesc">`+productContainer[i].desc+`</p>
		          <div class="buttons">
		          <button class="btn btn-danger" onclick="deleteProduct(`+i+`)">Delete</button>
		          <button class="btn btn-info" onclick="setForm(`+i+`)">Update</button></div></div></div>`;
		}
		
	}
	
	searchRow.innerHTML=searchCols;
	
}











