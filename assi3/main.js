let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total")
let count = document.getElementById("count");
let category = document.getElementById("category");
let create = document.getElementById("create");
let mood = 'create';
let tmp = ''
//get total
function getTotal() {
  if (price.value != '') {
    let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
    total.innerHTML = result;
  }
  else {
    total.innerHTML = '';
  }

}

//save
let products;
if (localStorage.product != null) {
  products = JSON.parse(localStorage.product);
} else {
  products = [];
}
//create
create.onclick = function () {
  let newPro = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase()
  }
  //clean data 
  if (title.value != '' && price.value != '' && category.value != '' && newPro.count < 100) {
    //count
    if (mood === 'create') {
      if (newPro.count > 1) {
        for (let i = 0; i < newPro.count; i++) {
          products.push(newPro);
        }
      } else {
        products.push(newPro);
      }
    } else {
      products[tmp] = newPro;
      mood = 'create';
      create.innerHTML = 'Create';
      count.style.display = 'block';

    }
    clearData();

  } localStorage.setItem('product', JSON.stringify(products));

  showdata()
}

//clear
function clearData() {

  title.value = '';
  price.value = '';
  taxes.value = '';
  ads.value = '';
  discount.value = '';
  total.innerHTML = '';
  count.value = '';
  category.value = '';

}
//read
function showdata() {
  let table = ''
  for (let i = 0; i < products.length; i++) {
    table += `
  <tr>
  <td>${i + 1}</td>
  <td>${products[i].title}</td>
  <td>${products[i].price}</td>
  <td>${products[i].taxes}</td>
  <td>${products[i].ads}</td>
  <td>${products[i].discount}</td>
  <td>${products[i].total}</td>
  <td>${products[i].category}</td>
  <td><button class="btn btn-warning" onclick="updateData(${i})">Update</button></td>
  <td><button class="btn btn-danger" onclick="deleteData(${i})">Delete</button></td>
  </tr>
  `;
  }

  document.getElementById("tbody").innerHTML = table;
  let btnD = document.getElementById("deleteAll");
  if (products.length > 0) {
    btnD.innerHTML = `<button onclick="deleteAll(${products.length})" class="btn btn-info">DeleteALL</button>`;
  } else {
    btnD.innerHTML = '';
  }
}
showdata();

//delete
function deleteData(i) {

  products.splice(i, 1);
  localStorage.product = JSON.stringify(products);
  showdata()
}
//delete all
function deleteAll() {
  localStorage.clear();
  products.splice(0);
  showdata();

}
//update
function updateData(i) {
  title.value = products[i].title;
  price.value = products[i].price;
  taxes.value = products[i].taxes;
  ads.value = products[i].ads;
  discount.value = products[i].discount;
  total.innerHTML = products[i].total;
  count.style.display = 'none';
  category.value = products[i].category;
  create.innerHTML = 'Update';
  mood = 'update';
  tmp = i;
  scroll({
    top: 0,
    behavior: 'smooth'
  })
}
// search
let searchMood = 'title';

function getSearchchMood(id) {
  let search = document.getElementById("search");
  if (id == 'searchtitle') {
    searchMood = 'title';

  } else {
    searchMood = 'category';

  }
  search.placeholder = 'Search by ' + searchMood;
  search.focus();
  search.value = '';
  showdata();

}
function searchData(value) {

  let table = '';
  for (let i = 0; i < products.length; i++) {

    if (searchMood == 'title') {



      if (products[i].title.includes(value.toLowerCase())) {
        table += `
<tr>
<td>${i + 1}</td>
  <td>${products[i].title}</td>
  <td>${products[i].price}</td>
  <td>${products[i].taxes}</td>
  <td>${products[i].ads}</td>
  <td>${products[i].discount}</td>
  <td>${products[i].total}</td>
  <td>${products[i].category}</td>
  <td><button class="btn btn-warning" onclick="updateData(${i})">Update</button></td>
  <td><button class="btn btn-danger" onclick="deleteData(${i})">Delete</button></td>
  </tr>`;
      }


    }



    if (products[i].category.includes(value.toLowerCase())) {
      table += `
<tr>
<td>${i + 1}</td>
  <td>${products[i].title}</td>
  <td>${products[i].price}</td>
  <td>${products[i].taxes}</td>
  <td>${products[i].ads}</td>
  <td>${products[i].discount}</td>
  <td>${products[i].total}</td>
  <td>${products[i].category}</td>
  <td><button class="btn btn-warning" onclick="updateData(${i})">Update</button></td>
  <td><button class="btn btn-danger" onclick="deleteData(${i})">Delete</button></td>
  </tr>`;
    }
  }


  document.getElementById("tbody").innerHTML = table;
}


