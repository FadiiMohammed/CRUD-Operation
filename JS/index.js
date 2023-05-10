var productName = document.getElementById("ProductName");
var ProductPrice = document.getElementById("ProductPrice");
var productModel = document.getElementById("ProductModel");
var productDesc = document.getElementById("ProductDesc");
var productList = [];
var addBtn = document.getElementById("addProductBtn");
var updateBtn = document.getElementById("updateProductBtn");

if (localStorage.getItem("ProductList") == null) {
  productList = [];
} else {
  productList = JSON.parse(localStorage.getItem("ProductList"));
  displayProduct(productList);
}

function addProduct() {
  if (
    validateProductName() &&
    validateProductPrice() &&
    validateProductModel() &&
    validateProductDesc() == true
  ) {
    var product = {
      name: productName.value,
      price: ProductPrice.value,
      model: productModel.value,
      desc: productDesc.value,
    };
    clearForm();
    productList.push(product);
    displayProduct(productList);
    localStorage.setItem("ProductList", JSON.stringify(productList));
  }
}

function displayProduct(list) {
  var container = ``;
  for (let i = 0; i < list.length; i++) {
    container += `  <td>${i + 1}</td>
                 <td>${list[i].name}</td>
                 <td>${list[i].price}</td>
                 <td>${list[i].model}</td>
                 <td>${list[i].desc}</td>
                 <td><button onclick = "updateButton(${i})" class="btn btn-warning btn-sm">Update</button></td>
                 <td><button onclick = "deleteProduct(${i})" class="btn btn-danger btn-sm">Delete</button></td>
               </tr>`;
  }
  document.getElementById("tBody").innerHTML = container;
}

function clearForm() {
  productName.value = "";
  ProductPrice.value = "";
  productModel.value = "";
  productDesc.value = "";
}

function deleteProduct(productIndex) {
  productList.splice(productIndex, 1);
  localStorage.setItem("ProductList", JSON.stringify(productList));
  displayProduct(productList);
}

function validateProductName() {
  var regex = /^[A-Z][a-z]{3,8}$/;
  if (regex.test(productName.value) == true) {
    productName.style.border = "none";
    document.getElementById("invalidInput").classList.add("d-none");
    return true;
  } else {
    productName.style.border = "2px solid red";
    document.getElementById("invalidInput").classList.remove("d-none");
    return false;
  }
}
function validateProductPrice() {
  var regex = /^([1-9][0-9]{3}|10000)$/;
  if (regex.test(ProductPrice.value) == true) {
    ProductPrice.style.border = "none";
    document.getElementById("invalidPrice").classList.add("d-none");
    return true;
  } else {
    ProductPrice.style.border = "2px solid red";
    document.getElementById("invalidPrice").classList.remove("d-none");
    return false;
  }
}

function validateProductModel() {
  var regex = /^([Tt][Vv]|[Mm]obile)$/;
  if (regex.test(productModel.value) == true) {
    productModel.style.border = "none";
    document.getElementById("invalidModel").classList.add("d-none");
    return true;
  } else {
    productModel.style.border = "2px solid red";
    document.getElementById("invalidModel").classList.remove("d-none");
    return false;
  }
}

function validateProductDesc() {
  var regex = /^.{20,}$/;
  if (regex.test(productDesc.value) == true) {
    productDesc.style.border = "none";
    document.getElementById("invalidDesc").classList.add("d-none");
    return true;
  } else {
    productDesc.style.border = "2px solid red";
    document.getElementById("invalidDesc").classList.remove("d-none");
    return false;
  }
}
function searchProductName(term) {
  var foundedProduct = [];
  for (var i = 0; i < productList.length; i++) {
    if (productList[i].name.toLowerCase().includes(term.toLowerCase())) {
      foundedProduct.push(productList[i]);
    }
  }
  displayProduct(foundedProduct);
}

function updateButton(index) {
  addBtn.classList.add("d-none");
  updateBtn.classList.replace("d-none", "d-block");
  productName.value = productList[index].name;
  ProductPrice.value = productList[index].price;
  productModel.value = productList[index].model;
  productDesc.value = productList[index].desc;
}
function updateProduct() {
  addBtn.classList.remove("d-none");
  updateBtn.classList.replace("d-block", "d-none");
  for (let i = 0; i < productList.length; i++) {
    if (productList[i].name === productName.value) {
      productList[i] = {
        name: productName.value,
        price: ProductPrice.value,
        model: productModel.value,
        desc: productDesc.value,
      };
      clearForm();
      localStorage.setItem("ProductList", JSON.stringify(productList));
      displayProduct(productList);
    }
  }
}
