var btn = document.getElementById('btn');
var searchSku = document.getElementById('skuInput');
var nameInput = document.getElementById('nameInput');
var typeInput = document.getElementById('typeInput');
var tagsInput = document.getElementById('tagsInput');
var salesInput = document.getElementById('salesInput');
var returnValueInput = document.getElementById('returnValueInput');
var returnRateInput = document.getElementById('returnRateInput');

var productsInfo = document.getElementById('products-info');
var searchResult = document.getElementById('searchResult');

var ourRequest = new XMLHttpRequest();
ourRequest.open('GET',
  'https://yjm3zctbgh.execute-api.us-east-1.amazonaws.com/productionV1/products'
);
var data, num;


btn.addEventListener("click", getInfo);
searchSku.addEventListener('search', searchSkuFunc);
nameInput.addEventListener('search', searchName);
typeInput.addEventListener('search', searchType);
tagsInput.addEventListener('search', searchTags);
returnValueInput.addEventListener('search', searchReturnValue);
returnRateInput.addEventListener('search', searchReturnRate);

// load data and show all the products info
function getInfo() {
  ourRequest.onload = function() {
    var jasonFile = JSON.parse(ourRequest.responseText);
    if (jasonFile.statusCode == 200) {
      data = jasonFile.products;
      num = data.length;

      renderHTML(data, productsInfo);
    } else {
      console.log(
        'Something wrong, might need to check your internet connection');
    }
  };
  ourRequest.send();
}

function searchSkuFunc() {
  var skunum = skuInput.value;
  var total = [];
  for (i = 0; i < num; i++) {
    if (skunum == data[i].sku) {
      total.push(data[i]);
    }
  }

  if (skunum !== "" && total.length > 0)
    renderHTML(total, searchResult);
    productsInfo.style.visibility = "hidden";
}

function searchType() {
  var type = typeInput.value;
  var total = [];
  for (i = 0; i < num; i++) {
    if (type == data[i].type) {
      total.push(data[i]);
    }
  }
  if (type !== "" && total.length > 0)
    renderHTML(total, searchResult);
    productsInfo.style.visibility = "hidden";
}


function searchName() {
  var thname = nameInput.value;
  var total = [];
  for (i = 0; i < num; i++) {
    if (thname == data[i].name) {
      total.push(data[i]);
    }
  }
  if (thname !== "" && total.length > 0)
    renderHTML(total, searchResult);
    productsInfo.style.visibility = "hidden";
}

function searchTags() {
  var tags = tagsInput.value;
  var total = [];
  for (i = 0; i < num; i++) {
    for (ii = 0; ii < data[i].tags.length; ii++) {
      if (tags == data[i].tags[ii]) {

        total.push(data[i]);
      }
    }
  }
  if (tags !== "" && total.length > 0)
    renderHTML(total, searchResult);
    productsInfo.style.visibility = "hidden";
}

function searchSales() {
  var sales = salesInput.value;
  var total = [];
  for (i = 0; i < num; i++) {
    if (sales <= data[i].totalSalesValueUSD) {
      total.push(data[i]);
    }
  }
  if (sales !== "" && total.length > 0)
    renderHTML(total, searchResult);
    productsInfo.style.visibility = "hidden";
}

function searchReturnValue() {
  var returnValue = returnValueInput.value;
  var total = [];
  for (i = 0; i < num; i++) {
    if (returnValue <= data[i].totalReturnValueUSD) {
      total.push(data[i]);
    }
  }

  if (returnValue !== "" && total.length > 0)
    renderHTML(total, searchResult);
    productsInfo.style.visibility = "hidden";
};

function searchReturnRate() {
  var returnRate = returnRateInput.value;
  var total = [];
  for (i = 0; i < num; i++) {
    if (returnRate <= data[i].returnRate) {
      total.push(data[i]);
    }
  }

  if (returnRate !== "" && total.length > 0)
    renderHTML(total, searchResult);
    productsInfo.style.visibility = "hidden";
}

// format output
function renderHTML(datainfo, elementId) {
  var htmlString = "";
  htmlString += " <div> "
  for (i = 0; i < datainfo.length; i++) {
    htmlString += "<p>" + "Sku: " + datainfo[i].sku + "<br />"
                + " Name: " + datainfo[i].name + "<br />"
                + "Type: " + datainfo[i].type + "<br />"
                + "Tags: ";
    for (ii = 0; ii < datainfo[i].tags.length; ii++) {
      if (ii == 0) {
        htmlString += datainfo[i].tags[ii];
      } else {
        htmlString += " , " + data[i].tags[ii];
      }
    }

    htmlString += "<br /> Total Sales:  " + datainfo[i].totalSalesValueUSD +
      " $ <br />" + "Total Return Value: " + datainfo[i].totalReturnValueUSD +
      " $ <br />" + "Return Rate: " + datainfo[i].returnRate;

    htmlString += "</p>"
  }
  htmlString += "</div>"
  elementId.insertAdjacentHTML('beforeend', htmlString)

}
