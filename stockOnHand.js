//Stock On Hand JavaScript FileUpload

//version number
var versionNumber = "0.05.152";

//Last Searched product  - used for the information dropdown
var lastSearchProduct;

//Prospect profile
var prospectProfileNumber;

function hideErrorBanner(){
	document.getElementById("errorMessageBanner").style.display = "none";
	}

function displayErrorMessage(message){
	document.getElementById("errorMessageBanner").style.display = "inline-block";
	document.getElementById("errorMessage").innerHTML = message;
}

//Update the settings
function updateSettings(form){
	var userSelectedTheme = form.selectTheme.value;
	if (userSelectedTheme == "Light"){
		// Check browser support
		localStorage.setItem("theme", "Light");
		swapStyleSheet("houseStyle.css");
	}
	if(userSelectedTheme == "Dark"){
		localStorage.setItem("theme", "Dark");
		swapStyleSheet("houseStyleDark.css");
	}
	if(userSelectedTheme == "DarkRed"){
		localStorage.setItem("theme", "DarkRed");
		swapStyleSheet("houseStyleDarkRed.css");
	}
	if(userSelectedTheme == "Development"){
		localStorage.setItem("theme", "Development");
		swapStyleSheet("houseStyleDevelopment.css");
	}
}
function checkStyleSheet(){
	var userSelectedTheme2 = localStorage.getItem("theme");
	console.log("User Selected Theme: " + userSelectedTheme2);
	if(userSelectedTheme2 == 'Dark'){
		//document.getElementById("styleSheet").setAttribute("href", houseStyleDark.css);  
		swapStyleSheet("houseStyleDark.css");
		
	}
	if(userSelectedTheme2 == 'DarkRed'){
		//document.getElementById("styleSheet").setAttribute("href", houseStyleDark.css);  
		swapStyleSheet("houseStyleDarkRed.css");
		
	}
	if (userSelectedTheme2 == 'Light'){
		//document.getElementById("styleSheet").setAttribute("href", houseStyleDark.css); 
		swapStyleSheet("houseStyle.css");
	}
	if (userSelectedTheme2 == 'Development'){
		//document.getElementById("styleSheet").setAttribute("href", houseStyleDark.css); 
		swapStyleSheet("houseStyleDevelopment.css");
	}
}
function swapStyleSheet(sheet) {
    document.getElementById("styleSheet").setAttribute("href", sheet);  
}

//Shows the search box
function showSearch(){
	hideSledgerSearch();
	document.getElementById("searchForm").style.display = "inline-block";
	}
//Hides the search box
function hideSearch(){
	
	document.getElementById("searchForm").style.display = "none";
}
//Shows the search box
function showSledgerSearch(){
	hideSearch();
	document.getElementById("mySearchForm").style.display = "inline-block";
	}
//Hides the search box
function hideSledgerSearch(){
	document.getElementById("mySearchForm").style.display = "none";
}
//Displays the version number as a alert
function getInformationMenu(){
	//alert("Build Version " + versionNumber);
	var currentInformationMenuState = document.getElementById("informationDropDown").style.display;
	if (currentInformationMenuState == "inline-block"){
		document.getElementById("informationDropDown").style.display = "none"; 
	}else{
		document.getElementById("informationVersion").innerHTML = "<b>Build: " + versionNumber + "</b>";
		document.getElementById("informationLastSearch").innerHTML = "<b>Last Search: " + lastSearchProduct + "</b>";
		document.getElementById("informationDropDown").style.display = "inline-block";  
	}
}

//Gets the sledger form information
function getSledgerInfo(form){
	var userSelectedSledger = form.sledgerInput.value;
	var pat = form.patInputBox.value;
	//Unleashed
	var apiKey = form.apiInputBox.value;
	var apiId = form.apiIdInputBox.value;
	
	//Search version
	var userSelectedSearch = form.sledgerSearchVersion.value;
	
	//Selected Opco
	var userSelectedOpco = form.selectSledgerOpco.value;

	
	//Console logs for what the user inputted
	console.log("Selected Search Version: " + userSelectedSearch);
	console.log("Entered Unleashed API ID: " + apiId);
	console.log("Entered Unleashed API Key: " + apiKey);
	console.log("Entered Prospect Opco: " + userSelectedOpco);
	console.log("Entered PAT: " + pat);

	//Alert for the product being search for
	alert ("Searching For: " + userSelectedSledger);
	
	//Search version logic
	if (userSelectedSearch == 'Prospect'){
		//Call the Prospect function
		getProspectSledger(pat,userSelectedSledger,userSelectedOpco);
		}
	if(userSelectedSearch == 'Unleashed'){
		//Calls the Unleashed function
		getUnleashedSledger(userSelectedSledger,apiId,apiKey,1);
		}
	if(userSelectedSearch == 'Prospect & Unleashed'){
		//Calls the Unleashed Function
		getUnleashedSledger(userSelectedSledger,apiId,apiKey,1);
		//Call the Prospect function
		getProspectSledger(pat,userSelectedSledger,userSelectedOpco);
	}
}

//Gets prospect sledgers
function getProspectSledger(pat,userSelectedSledger,userSelectedOpco){
	var request = new XMLHttpRequest()
	
	//The prospect end point to get the product for
	var psEndPoint = "('" + userSelectedOpco + "','" + userSelectedSledger + "')";
	
	console.log("Prospect End Point Search: " + psEndPoint);
	
	request.open('GET', "https://api-v1.prospect365.com/SalesLedgers" + psEndPoint, true);
	request.setRequestHeader('Authorization', 'Bearer ' + pat);
	request.onload = function() {
	  // Begin accessing JSON data here
	  var data = JSON.parse(this.response)

	  if (request.status >= 200 && request.status < 400) {
		console.log("Connection To Prospect Is Successful");
		//alert(data.value.scheduleid);
		//alert("- Reload The Data -");
		}
	console.log(data);
	console.log("ProspectSoft Array Data Lenght: " + data.value.length);
	//Checks the array length. If it is 0 do nothing
	if (data.value.length <= 0){
		//Outputs that there was not PS data found to the user and sets all of the text under the PS section to null
		console.log("No Prospect Data Found");
		document.getElementById("psProductItemId").innerHTML = "No Data Was Found For: " + userSelectedSledger;
		document.getElementById("psWarehouseCode").innerHTML = "";
		document.getElementById("psDecimalPhysicalStock").innerHTML = "";
		document.getElementById("psDecimalFreeStock").innerHTML = "";
		document.getElementById("psDecimalSalesOrders").innerHTML = "";
		document.getElementById("psTotalAvailableDecimal").innerHTML = "";
		document.getElementById("psOpCo").innerHTML = "";
		document.getElementById("psSledgerId").innerHTML = "";
		document.getElementById("psSledgerName").innerHTML = "";
		document.getElementById("psAddressLine1").innerHTML = "";
		document.getElementById("psAddressLine2").innerHTML = "";
		document.getElementById("psAddressLine3").innerHTML = "";
		document.getElementById("psAddressLine4").innerHTML = "";
		document.getElementById("psPostcode").innerHTML = "";
		document.getElementById("psTelephone").innerHTML = "";
		document.getElementById("psEmail").innerHTML = "";
		document.getElementById("psOnstop").innerHTML = "";
		document.getElementById("psBalance").innerHTML = "";
		document.getElementById("psCreditLimit").innerHTML = "";
		document.getElementById("psClosed").innerHTML = "";
		return;
		}else{
			psSledgerPopulate();
			return;
		}
		
		function psSledgerPopulate(){
			document.getElementById("psProductItemId").innerHTML = "";
			document.getElementById("psWarehouseCode").innerHTML = "";
			document.getElementById("psDecimalPhysicalStock").innerHTML = "";
			document.getElementById("psDecimalFreeStock").innerHTML = "";
			document.getElementById("psDecimalSalesOrders").innerHTML = "";
			document.getElementById("psTotalAvailableDecimal").innerHTML = "";
			
			
			document.getElementById("psOpCo").innerHTML = "OPCO: " + data.value[0].OperatingCompanyCode;
			document.getElementById("psSledgerId").innerHTML = "Sales Ledger ID: " + data.value[0].SalesLedgerId;
			document.getElementById("psSledgerName").innerHTML = "Sales Ledger Name: " + data.value[0].Name;
			document.getElementById("psAddressLine1").innerHTML = "Address Line 1: " + data.value[0].AddressLine1;
			document.getElementById("psAddressLine2").innerHTML = "Address Line 2: " + data.value[0].AddressLine2;
			document.getElementById("psAddressLine3").innerHTML = "Address Line 3: " + data.value[0].AddressLine3;
			document.getElementById("psAddressLine4").innerHTML = "Address Line 4: " + data.value[0].AddressLine4;
			document.getElementById("psPostcode").innerHTML = "Postcode: " + data.value[0].Postcode;
			document.getElementById("psTelephone").innerHTML = "Telephone: " + data.value[0].Telephone;
			document.getElementById("psEmail").innerHTML = "Email: " + data.value[0].Email;
			document.getElementById("psOnstop").innerHTML = "Onstop: " + data.value[0].OnStop;
			document.getElementById("psBalance").innerHTML = "Balance: " + data.value[0].Balance;
			document.getElementById("psCreditLimit").innerHTML = "Credit Limit: " + data.value.CreditLimit;
			document.getElementById("psClosed").innerHTML = "Closed: " + data.value.Closed;
			
		}
	}
	request.send()
}


//Gets the PAT's from the search field
function getSledgerPat(form){
	var pat = form.patInputBox.value;
	console.log("Entered PAT Token: " + pat);
	var opcoarray = getPSOpco(pat,"Sledger");
	
}

//Gets unleashed sledgers
function getUnleashedSledger(userSelectedSledger,apiId,apiKey,page){
	console.log("Searching Unleashed For Ledger Data: " + userSelectedSledger);
	// Initialize variables and get values from the field
	var xhr;
	
	// build the url based on the different parameters
	var urlParam = "pageSize=1000";
	//var urlParam = "";
	
	var pageNumber = page;
	console.log(pageNumber);
		
	// Final url is built
	var url = "https://api.unleashedsoftware.com/" + "Customers/" + page +"?" + urlParam;

	//CryptoJS is being used in javascript to generate the hash security keys
	// We need to pass the url parameters as well as the key to return a SHA256
	var hash = CryptoJS.HmacSHA256(urlParam, apiKey);
	// That hash generated has to be set into base64
	var hash64 = CryptoJS.enc.Base64.stringify(hash);
	
	//Outputs the hash to the console.
	//console.log(hash64);

	// Simple ajax function with all the parameters
	xhr =
		$.ajax({
			url: url,
			//dataType: json,
			//method: GET,
			headers: {
				'Accept': 'application/json',
				'api-auth-id': apiId,
				'api-auth-signature': hash64,
				'Content-Type': 'application/json'
			}
		}).done(function(data) {
			// The request has been successful.
			console.log("Successful Retrieved The Unleashed Data");
			console.log(data);
			//outputProductDetails(data);
			searchUnleashedSledgerData(data,userSelectedSledger,pageNumber,apiId,apiKey);
			
			
			//OLD
			//console.log(data.Items[0].ProductCode)
			//console.log(JSON.stringify(tmpHTML, false, 2));
		}).fail(function(data, status, er) {
			// The request has NOT been successful.
			console.log("error: " + data + " status: " + status + " er:" + er);
			//console.log(JSON.stringify(data.responseJSON, false, 2));
		});
	
}

//Search the sledger data
function searchUnleashedSledgerData(data,userSelectedSledger,page,apiId,apiKey){
	var dataLength = data.Items.length - 1;
	var i;
	var x;
	console.log("Array Length: " + dataLength);
	console.log("Number Of Pages: " + data.Pagination.NumberOfPages);
	//for (x=1; x<=data.Pagination.NumberOfPages;x++){
	for (i=0; i <= dataLength; i++){
		var currentSledger = data.Items[i].CustomerCode;
		alert(currentSledger)
		alert(data.Items[i].CustomerCode)
		if (currentSledger == userSelectedSledger){
			outputUnleashedSledgerDetails(data,i)
			//If a product is found this returns from the function
			return;
		}
	}
	if(page < data.Pagination.NumberOfPages){
		page++;
		console.log(page);
		getUnleashedSledger(userSelectedSledger,apiId,apiKey,page);
		}else{
			console.log("No Unleashed Data Found");
			//Outputs a message to the user inform them that not data was found
			document.getElementById("productCode").innerHTML = "No Data Was Found for: " + userSelectedSledger;
			document.getElementById("productDescription").innerHTML = "";
			document.getElementById("guid").innerHTML = "";
			document.getElementById("warehouse").innerHTML = "";
			document.getElementById("qtyOnHand").innerHTML = "";
			document.getElementById("availableQty").innerHTML = "";
			document.getElementById("allocatedQty").innerHTML = "";
			document.getElementById("unleashedCustomerCode").innerHTML = "";
			document.getElementById("unleashedCustomerName").innerHTML = "";
			document.getElementById("unleashedCustomerType").innerHTML = "";
			document.getElementById("unleashedSledgerGuid").innerHTML = "";
			document.getElementById("unleashedAddressName").innerHTML = "";
			document.getElementById("unleashedAddressType").innerHTML = "";
			document.getElementById("unleashedStreetAddress").innerHTML = "";
			document.getElementById("unleashedStreetAddress2").innerHTML = "";
			document.getElementById("unleashedPostalCode").innerHTML = "";
			document.getElementById("unleashedRegion").innerHTML = "";
			document.getElementById("unleashedCity").innerHTML = "";
			document.getElementById("unleashedCountry").innerHTML = "";
			document.getElementById("unleashedContactFirstName").innerHTML = "";
			document.getElementById("unleashedContactSurname").innerHTML = "";
			}
	
	
	
}

function outputUnleashedSledgerDetails(data,i){
		//Unleashed product details
		//Dont need now so it all gets set to empty string
		document.getElementById("productCode").innerHTML = "";
		document.getElementById("productDescription").innerHTML = "";
		document.getElementById("guid").innerHTML = "";
		document.getElementById("warehouse").innerHTML = "";
		document.getElementById("qtyOnHand").innerHTML = "";
		document.getElementById("availableQty").innerHTML = "";
		document.getElementById("allocatedQty").innerHTML = "";
		//Unleashed Sledger details
		document.getElementById("unleashedCustomerCode").innerHTML = "Customer Code: " + data.Items[i].CustomerCode;
		document.getElementById("unleashedCustomerName").innerHTML = "Customer Name: " + data.Items[i].CustomerName;
		document.getElementById("unleashedCustomerType").innerHTML = "Customer Type: " + data.Items[i].CustomerType;
		document.getElementById("unleashedSledgerGuid").innerHTML = "GUID: " + data.Items[i].Guid;
		document.getElementById("unleashedAddressName").innerHTML = "Address Name: " + data.Items[i].Addresses[0].AddressName;
		document.getElementById("unleashedAddressType").innerHTML = "Address Type: " + data.Items[i].Addresses.AddressType;
		document.getElementById("unleashedStreetAddress").innerHTML = "Street Address: " + data.Items[i].Addresses[0].StreetAddress;
		document.getElementById("unleashedStreetAddress2").innerHTML = "Street Address 2: " + data.Items[i].Addresses[0].StreetAddress2;
		document.getElementById("unleashedPostalCode").innerHTML = "Post Code: " + data.Items[i].Addresses[0].PostalCode;
		document.getElementById("unleashedRegion").innerHTML = "Region: " + data.Items[i].Addresses[0].Region;
		document.getElementById("unleashedCity").innerHTML = "City: " + data.Items[i].Addresses[0].City;
		document.getElementById("unleashedCountry").innerHTML = "Country: " + data.Items[i].Addresses[0].Country;
		document.getElementById("unleashedContactFirstName").innerHTML = "Contact First Name: " + data.Items[i].ContactFirstName;
		document.getElementById("unleashedContactSurname").innerHTML = "Contact Last Name: " + data.Items[i].ContactLastName;
}


//Gets the form information
function getProductCode (form) {
	var userProductCode = form.inputbox.value;
	var pat = form.patInputBox.value;
	//Unleashed
	var apiKey = form.apiInputBox.value;
	var apiId = form.apiIdInputBox.value;
	//Warehouse and opco
	var userSelectedWarehouse = form.selectNumber.value;
	var userSelectedOpco = form.selectOpco.value;
	
	var userSelectedSearch = form.searchVersion.value;
	//Dear Inventory
	var dearAccountId = form.dearAccountInputBox.value;
	var dearApiKey = form.dearAPIInputBox.value;
	
	//Console logs for what the user inputted
	console.log("Selected Search Version: " + userSelectedSearch);
	console.log("Selected Opco: " + userSelectedOpco);
	console.log("Selected Warehouse: " + userSelectedWarehouse);
	console.log("Entered Unleashed API ID: " + apiId);
	console.log("Entered Unleashed API Key: " + apiKey);;
	console.log("Entered PAT: " + pat);
	console.log("Entered DearInventory Account ID: " + dearAccountId);
	console.log("Entered DearInventory API Key: " + dearApiKey);
	
	//Alert for the product being search for
	alert ("Searching For: " + userProductCode);
	
	//Sets the last searched product
	lastSearchProduct = userProductCode;
	
	//Search version logic
	if (userSelectedSearch == 'Prospect'){
		//Call the Prospect function
		getPSData(userProductCode,pat,userSelectedWarehouse,userSelectedOpco);
		}
	if(userSelectedSearch == 'Unleashed'){
		//Calls the Unleashed function
		getResponse(userProductCode,apiId,apiKey,1);
		}
	if(userSelectedSearch == 'Prospect & Unleashed'){
		//Calls the Unleashed Function
		getResponse(userProductCode,apiId,apiKey,1);
		//Call the Prospect function
		getPSData(userProductCode,pat,userSelectedWarehouse,userSelectedOpco);
	}
	//If the user selects Dear Inventory
	if(userSelectedSearch == 'DearInventory'){
		//Calls the dear inventory function
		dearInventoryStockSearch(userProductCode,dearAccountId,dearApiKey,1);
	}
	//If the users selects DearInventory and Prospect
	if(userSelectedSearch == 'Prospect & DearInventory'){
		//Calls the dear inventory function
		dearInventoryStockSearch(userProductCode,dearAccountId,dearApiKey,1);
		//Calls the Prospect function
		getPSData(userProductCode,pat,userSelectedWarehouse,userSelectedOpco);
	}		
}

//Gets the PAT's from the search field
function getPat(form){
	var patDropDown = form.patInputBox.value;
	console.log("Entered PAT Token: " + patDropDown);
	var warehousesArray = getPSWarehouses(patDropDown);
	var opcoarray = getPSOpco(patDropDown,"Stock");
	
}
	

	
//Gets PS Warehouses
function getPSWarehouses(pat){
	var request = new XMLHttpRequest()		
	request.open('GET', "https://api-v1.prospect365.com/Warehouses/", true);
	request.setRequestHeader('Authorization', 'Bearer ' + pat);
	request.send();
	request.onload = function() {
	  

	  if (request.status >= 200 && request.status < 400) {
		console.log("Connection To ProspectSoft Is Successful");
		// Begin accessing JSON data here
		var data = JSON.parse(this.response)
		//For loop which creates an array of the warehouses
		var i;
		//Declares a new array
		var warehousesArray = new Array(data.value.length);
		for(i=0;i<data.value.length;i++){
			//Inserts into the warehousesArry the warehouse code
			warehousesArray[i] = data.value[i].Code;
		}	
		console.log(warehousesArray);
		setWarehouseDropdown(warehousesArray);
		return (warehousesArray);
		}else{
			console.log("Error " + request.status + ": Failed To Get Prospect Warehouses. Check The Prospect PAT Token");
			displayErrorMessage("Error " +request.status+ ": Failed To Get Prospect Warehouses");
			}
	}
		
	}

//Adds warehouses to the dropdown menu
function setWarehouseDropdown(warehousesArray){
	var x = document.getElementById("selectNumber");
	var i;
	for(i = 0; i < warehousesArray.length; i++){
		var option = document.createElement("option");
		option.text = warehousesArray[i];
		x.add(option);
		}
	}
	
	
//Adds OPCO's to the dropdown menus
function setOpcoDropdown(opcoArray,elementId){
	var x = document.getElementById(elementId);
	var i;
	for(i = 0; i < opcoArray.length; i++){
		var option = document.createElement("option");
		option.text = opcoArray[i];
		x.add(option);
		}
	}
//Gets PS opcos
function getPSOpco(pat,searchVersion){
	var request = new XMLHttpRequest()		
	request.open('GET', "https://api-v1.prospect365.com/Homecurrencies/", true);
	request.setRequestHeader('Authorization', 'Bearer ' + pat);
	request.send();
	request.onload = function() {
	  if (request.status >= 200 && request.status < 400) {
		console.log("Connection To ProspectSoft Is Successful");
		 // Begin accessing JSON data here
		var data = JSON.parse(this.response);
		//For loop which creates an array of the warehouses
		var i;
		//Declares a new array
		var opcoArray = new Array(data.value.length);
		for(i=0;i<data.value.length;i++){
			//Inserts into the opcosArry the warehouse code
			opcoArray[i] = data.value[i].OperatingCompanyCode;
		}	
		console.log(opcoArray);
		if (searchVersion == "Stock"){
			setOpcoDropdown(opcoArray,"selectOpco");
		}
		if (searchVersion == "Sledger"){
			setOpcoDropdown(opcoArray,"selectSledgerOpco");
		}
		return (opcoArray);
		}else{
			console.log("Error " + request.status + ": Failed To Get Prospect opco's. Check The Prospect PAT Token");
			displayErrorMessage("Error " +request.status+ ": Failed To Get Prospect opco's");
			}
	}
		
}

	
//Unleashed request
//window.onload = getResponse();
function getResponse(userProductCode,apiId,apiKey,page) {
	console.log("Searching For Stock Data About Product: " + userProductCode);
	// Initialize variables and get values from the field
	var xhr;
	
	// build the url based on the different parameters
	var urlParam = "ProductCode="+userProductCode+"&pageSize=1000";
	//var urlParam = "";
	
	var pageNumber = page;
	console.log(pageNumber);
		
	// Final url is built
	var url = "https://api.unleashedsoftware.com/" + "StockOnHand/" + page +"?" + urlParam;

	//CryptoJS is being used in javascript to generate the hash security keys
	// We need to pass the url parameters as well as the key to return a SHA256
	var hash = CryptoJS.HmacSHA256(urlParam, apiKey);
	// That hash generated has to be set into base64
	var hash64 = CryptoJS.enc.Base64.stringify(hash);
	
	//Outputs the hash to the console.
	//console.log(hash64);

	// Simple ajax function with all the parameters
	xhr =
		$.ajax({
			url: url,
			//dataType: json,
			//method: GET,
			headers: {
				'Accept': 'application/json',
				'api-auth-id': apiId,
				'api-auth-signature': hash64,
				'Content-Type': 'application/json'
			}
		}).done(function(data) {
			// The request has been successful.
			console.log("Successful Retrieved The Unleashed Data");
			console.log(data);
			//outputProductDetails(data);
			searchData(data,userProductCode,pageNumber,apiId,apiKey);
			
			
			//OLD
			//console.log(data.Items[0].ProductCode)
			//console.log(JSON.stringify(tmpHTML, false, 2));
		}).fail(function(data, status, er) {
			// The request has NOT been successful.
			console.log("error: " + data + " status: " + status + " er:" + er);
			//console.log(JSON.stringify(data.responseJSON, false, 2));
		});
}

function searchData(data,userProductCode,page,apiId,apiKey){
	var dataLength = data.Items.length - 1;
	var i;
	var x;
	console.log("Array Length: " + dataLength);
	console.log("Number Of Pages: " + data.Pagination.NumberOfPages);
	//for (x=1; x<=data.Pagination.NumberOfPages;x++){
	for (i=0; i <= dataLength; i++){
		var currentProductCode = data.Items[i].ProductCode;
		if (currentProductCode == userProductCode){
			outputProductDetails(data,i)
			//If a product is found this returns from the function
			return;
		}
	}
	if(page < data.Pagination.NumberOfPages){
		page++;
		console.log(page);
		getResponse(userProductCode,apiId,apiKey,page);
		}else{
			console.log("No Unleashed Data Found");
			//Outputs a message to the user inform them that not data was found
			document.getElementById("productCode").innerHTML = "No Data Was Found for: " + userProductCode;
			document.getElementById("productDescription").innerHTML = "";
			document.getElementById("guid").innerHTML = "";
			document.getElementById("warehouse").innerHTML = "";
			document.getElementById("qtyOnHand").innerHTML = "";
			document.getElementById("availableQty").innerHTML = "";
			document.getElementById("allocatedQty").innerHTML = "";
			document.getElementById("unleashedCustomerCode").innerHTML = "";
			document.getElementById("unleashedCustomerName").innerHTML = "";
			document.getElementById("unleashedCustomerType").innerHTML = "";
			document.getElementById("unleashedSledgerGuid").innerHTML = "";
			document.getElementById("unleashedAddressName").innerHTML = "";
			document.getElementById("unleashedAddressType").innerHTML = "";
			document.getElementById("unleashedStreetAddress").innerHTML = "";
			document.getElementById("unleashedStreetAddress2").innerHTML = "";
			document.getElementById("unleashedPostalCode").innerHTML = "";
			document.getElementById("unleashedRegion").innerHTML = "";
			document.getElementById("unleashedCity").innerHTML = "";
			document.getElementById("unleashedCountry").innerHTML = "";
			document.getElementById("unleashedContactFirstName").innerHTML = "";
			document.getElementById("unleashedContactSurname").innerHTML = "";
			}
	
	
	
}

function outputProductDetails(data,i){
	//Outputs the product code
	document.getElementById("productCode").innerHTML = "Product Code: " + data.Items[i].ProductCode;
	//Outputs the product description
	document.getElementById("productDescription").innerHTML = "Product Description: " + data.Items[i].ProductDescription;
	//Outputs the guid
	document.getElementById("guid").innerHTML = "GUID: " + data.Items[i].guid;
	//Outputs the warehouse
	document.getElementById("warehouse").innerHTML = "Warehouse: " + data.Items[i].warehouse;
	//Outputs the qty on hand
	document.getElementById("qtyOnHand").innerHTML = "QtyOnHand: " + data.Items[i].QtyOnHand;
	//Outputs the available qty
	document.getElementById("availableQty").innerHTML = "Available Qty: " + data.Items[i].AvailableQty;
	//Outputs the allocated qty
	document.getElementById("allocatedQty").innerHTML = "Allocated Qty: " + data.Items[i].AllocatedQty;
	
	document.getElementById("unleashedCustomerCode").innerHTML = "";
	document.getElementById("unleashedCustomerName").innerHTML = "";
	document.getElementById("unleashedCustomerType").innerHTML = "";
	document.getElementById("unleashedSledgerGuid").innerHTML = "";
	document.getElementById("unleashedAddressName").innerHTML = "";
	document.getElementById("unleashedAddressType").innerHTML = "";
	document.getElementById("unleashedStreetAddress").innerHTML = "";
	document.getElementById("unleashedStreetAddress2").innerHTML = "";
	document.getElementById("unleashedPostalCode").innerHTML = "";
	document.getElementById("unleashedRegion").innerHTML = "";
	document.getElementById("unleashedCity").innerHTML = "";
	document.getElementById("unleashedCountry").innerHTML = "";
	document.getElementById("unleashedContactFirstName").innerHTML = "";
	document.getElementById("unleashedContactSurname").innerHTML = "";
}


//DearInventory
function dearInventoryStockSearch(userProductCode,dearAccountId, dearApiKey,page){
	console.log("Searching Dear Inventory For Stock Data About Product: " + userProductCode);
	// Initialize variables and get values from the field
	var xhr;
	
	// build the url based on the different parameters
	var urlParam = "ProductCode="+userProductCode+"&pageSize=1000";
	//var urlParam = "";
	
	var pageNumber = page;
	console.log(pageNumber);
		
	// Final url is built
	var url = " https://inventory.dearsystems.com/ExternalApi/v2/ref/productavailability?Page="+page+"&Limit=1000"

	// Simple ajax function with all the parameters
	xhr =
		$.ajax({
			url: url,
			//dataType: json,
			//method: GET,
			headers: {
				//'Accept': 'application/json',
				'api-auth-accountid': dearAccountId,
				'api-auth-applicationkey': dearApiKey,
				'Content-Type': 'application/json'
			}
		}).done(function(data) {
			// The request has been successful.
			console.log("Successful Retrieved The DearInventory Data");
			console.log(data);
			//outputProductDetails(data);
			searchDearInventoryDataData(data,userProductCode,pageNumber,dearAccountId,dearApiKey);
			
			
			//OLD
			//console.log(data.Items[0].ProductCode)
			//console.log(JSON.stringify(tmpHTML, false, 2));
		}).fail(function(data, status, er) {
			// The request has NOT been successful.
			console.log("error: " + data + " status: " + status + " er:" + er);
			//console.log(JSON.stringify(data.responseJSON, false, 2));
		});
}
		

function searchDearInventoryData(data,userProductCode,page,dearAccountId,dearApiKey){
	var dataLength = data.Items.length - 1;
	var i;
	var x;
	console.log("Array Length: " + dataLength);
	console.log("Number Of Pages: " + data.Pagination.NumberOfPages);
	//for (x=1; x<=data.Pagination.NumberOfPages;x++){
	for (i=0; i <= dataLength; i++){
		var currentProductCode = data.Items[i].ProductCode;
		if (currentProductCode == userProductCode){
			outputDearIventoryDetailsDetails(data,i)
			//If a product is found this returns from the function
			return;
		}
	}
	if(page < data.Pagination.NumberOfPages){
		page++;
		console.log(page);
		dearInventoryStockSearch(userProductCode,dearAccountId,dearApiKey,page);
		}else{
			console.log("No DearInventory Data Found");
			//Outputs a message to the user inform them that not data was found
			document.getElementById("dearID").innerHTML = "No Data Was Found for: " + userProductCode;
			document.getElementById("dearSku").innerHTML = "";
			document.getElementById("dearName").innerHTML = "";
			document.getElementById("dearLocation").innerHTML = "";
			document.getElementById("dearBin").innerHTML = "";
			document.getElementById("dearOnHand").innerHTML = "";
			document.getElementById("dearAllocated").innerHTML = "";
			document.getElementById("dearAvailable").innerHTML = "";
			document.getElementById("dearOnOrder").innerHTML = "";
			document.getElementById("dearStockOnHand").innerHTML = "";
			}
	
	
	
}

//Output dearInventory data
function outputDearIventoryDetails(data,i){
	document.getElementById("dearId").innerHTML = "ID: " + data.Items[i].ID;
	document.getElementById("dearSku").innerHTML = "SKU: " + data.Items[i].SKU;
	document.getElementById("dearName").innerHTML = "Name: " + data.Items[i].Name;
	document.getElementById("dearLocation").innerHTML = "Warehouse Location: " + data.Items[i].Location;
	document.getElementById("dearBin").innerHTML = "Bin: " + data.Items[i].Bin;
	document.getElementById("dearOnHand").innerHTML = "On Hand: " + data.Items[i].OnHand;
	document.getElementById("dearAllocated").innerHTML = "Allocated Stock: " + data.Items[i].Allocated;
	document.getElementById("dearAvailable").innerHTML = "Available Stock: " + data.Items[i].Available;
	document.getElementById("dearOnOrder").innerHTML = "Stock On Orders: " + data.Items[i].OnOrder;
	document.getElementById("dearStockOnHand").innerHTML = "Stock On Hand: " + data.Items[i].StockOnHand;
}


//Prospect request
function getPSData(userProductCode,pat,warehouse,opco){
	var request = new XMLHttpRequest()
	
	//The product the user wants to search for
	var psProductSearch = userProductCode;
	
	//The user selected warehouse which we will query for the stock level
	var userSelectedWarehouse = warehouse;
	
	//The user selected opco which is used for querying the stock level
	var userSelectedOpco = opco;
	
	//The prospect end point to get the product for
	var psEndPoint = "('" + userSelectedOpco + "','" + psProductSearch + "','" + userSelectedWarehouse + "')";
	
	console.log("Prospect End Point Search: " + psEndPoint);
	
	request.open('GET', "https://api-v1.prospect365.com/StockByWarehouses" + psEndPoint, true);
	request.setRequestHeader('Authorization', 'Bearer ' + pat);
	request.onload = function() {
	  // Begin accessing JSON data here
	  var data = JSON.parse(this.response)

	  if (request.status >= 200 && request.status < 400) {
		console.log("Connection To ProspectSoft Is Successful");
		//alert(data.value.scheduleid);
		//alert("- Reload The Data -");
		}
	console.log(data);
	console.log("ProspectSoft Array Data Lenght: " + data.value.length);
	//Checks the array length. If it is 0 do nothing
	if (data.value.length <= 0){
		console.log("No Prospect Data Found");
		document.getElementById("psProductItemId").innerHTML = "No Data Was Found For: " + psProductSearch;
		document.getElementById("psWarehouseCode").innerHTML = "";
		document.getElementById("psDecimalPhysicalStock").innerHTML = "";
		document.getElementById("psDecimalFreeStock").innerHTML = "";
		document.getElementById("psDecimalSalesOrders").innerHTML = "";
		document.getElementById("psTotalAvailableDecimal").innerHTML = "";
		return;
		}else{
			populate();
			return;
		}
	
	function populate() {
		//window.alert(lastSchedule);
		//window.alert(data.value[lastSchedule].ScheduleId);
		document.getElementById("psProductItemId").innerHTML = "Product Item: " + data.value[0].ProductItemId;
		document.getElementById("psWarehouseCode").innerHTML = "Warehouse:" + data.value[0].WarehouseCode;
		document.getElementById("psDecimalPhysicalStock").innerHTML = "Physical Stock: " + data.value[0].DecimalPhysicalStock;
		document.getElementById("psDecimalFreeStock").innerHTML = "Free Stock: " + data.value[0].DecimalFreeStock;
		document.getElementById("psDecimalSalesOrders").innerHTML = "Sales Orders: " + data.value[0].DecimalSalesOrders;
		document.getElementById("psTotalAvailableDecimal").innerHTML = "Total Available: " + data.value[0].TotalAvailableDecimal;
		document.getElementById("psOpCo").innerHTML = "";
		document.getElementById("psSledgerId").innerHTML = "";
		document.getElementById("psSledgerName").innerHTML = "";
		document.getElementById("psAddressLine1").innerHTML = "";
		document.getElementById("psAddressLine2").innerHTML = "";
		document.getElementById("psAddressLine3").innerHTML = "";
		document.getElementById("psAddressLine4").innerHTML = "";
		document.getElementById("psPostcode").innerHTML = "";
		document.getElementById("psTelephone").innerHTML = "";
		document.getElementById("psEmail").innerHTML = "";
		document.getElementById("psOnstop").innerHTML = "";
		document.getElementById("psBalance").innerHTML = "";
		document.getElementById("psCreditLimit").innerHTML = "";
		document.getElementById("psClosed").innerHTML = "";
		};
	}

	request.send()
	
}
		
	