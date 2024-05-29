var productNameInput = document.getElementById("prodactName");
var productPriceInput = document.getElementById("prodactPrice");
var pruductCategoryInput = document.getElementById("prodactCategory");
var productDescriptionInput = document.getElementById("productDescription");
var peoductImageInput = document.getElementById("prodacImage");
var searchproInput = document.getElementById("searchInput");
var addBtn = document.getElementById("addProduct");
var updateBtn = document.getElementById("updateProduct");
var productionContainer;

if (localStorage.getItem("productList") == null) {
  productionContainer = [];
} else {
  productionContainer = JSON.parse(localStorage.getItem("productList"));
  displayBroduct(productionContainer);
}

function addProduct() {
  var product = {
    productName: productNameInput.value,
    price: productPriceInput.value,
    category: pruductCategoryInput.value,
    description: productDescriptionInput.value,
    image: `imgs/${peoductImageInput.files[0]?.name}`,
  };
  productionContainer.push(product);
  displayBroduct(productionContainer);
  clearForm();
  localStorage.setItem("productList", JSON.stringify(productionContainer));
}

function clearForm() {
  productNameInput.value = null;
  productPriceInput.value = null;
  pruductCategoryInput.value = null;
  productDescriptionInput.value = null;
  peoductImageInput.value = null;
}

function displayBroduct(arr) {
  var box = ``;
  for (var i = 0; i < arr.length; i++) {
    box += `<div class="col-md-2 py-4">
             <div class="products shadow-lg p-3 mb-5 bg-body-tertiary rounded">
                 <img src="${arr[i].image}" class="w-100" alt="samsung">
                 <h2 class="h3">${arr[i].productName}</h2>
                 <p>${arr[i].category}</p>
                 <h3 class="h5"><span class="fw-bolder">price </span>${arr[i].price}</h3>
                 <h3 class="h5"><span class="fw-bolder">${arr[i].description}</span>mobile</h3>
                 <button onclick='deletProduct(${i})' class="btn btn-outline-danger btn-sm w-100 my-2">Delete <i class="fa fa-trash-alt"></i></button>
                 <button onclick='setFormForUpdate(${i})' class="btn btn-outline-warning btn-sm w-100 my-2">update <i class="fa fa-pen"></i></button>
             </div>
         </div>`;
  }
  document.getElementById("rowData").innerHTML = box;
}

function deletProduct(index) {
  productionContainer.splice(index, 1);
  displayBroduct(productionContainer);
  localStorage.setItem("productList", JSON.stringify(productionContainer));
}

function searchProduct() {
  var term = searchproInput.value;
  termproduct = [];
  for (i = 0; i < productionContainer.length; i++) {
    if (
      productionContainer[i].productName
        .toLowerCase()
        .includes(term.toLowerCase())
    ) {
      termproduct.push(productionContainer[i]);
    }
    displayBroduct(termproduct);
  }
}
var updatedIndex;
function setFormForUpdate(i) {
  updatedIndex = i;
  addBtn.classList.add("d-none");
  updateBtn.classList.remove("d-none");
  productNameInput.value = productionContainer[i].productName;
  productPriceInput.value = productionContainer[i].price;
  pruductCategoryInput.value = productionContainer[i].category;
  productDescriptionInput.value = productionContainer[i].description;
}


function updateProduct() {
  addBtn.classList.remove("d-none");
  updateBtn.classList.add("d-none");
  productionContainer[updatedIndex].productName = productNameInput.value;
  productionContainer[updatedIndex].price = productPriceInput.value;
  productionContainer[updatedIndex].category = pruductCategoryInput.value;
  productionContainer[updatedIndex].description = productDescriptionInput.value;
  displayBroduct(productionContainer);
  localStorage.setItem("productList", JSON.stringify(productionContainer));
  clearForm();
}

function validateProductName(element) {
  var regex = {
    prodactName: /^[A-Z][a-z]{2,8}$/,
    prodactPrice: /^[0-9][0-9]/,
    prodactCategory: /^(mobile|laptob|tv)/,
    productDescription: /^.{6}$/,
  };
  if (regex[element.id].test(element.value) == true) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    element.nextElementSibling.classList.replace("d-block", "d-none");
    return true;
  }
  else
  {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    element.nextElementSibling.classList.replace("d-none", "d-block");
    return false;
  }
}
