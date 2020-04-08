// Timestamp of cart that page was last updated with
var lastCartUpdate = 0;

/*
 * Adds the specified item to the shopping cart, via Ajax call
 * itemCode - product code of the item to add
 */
function addToCart(itemCode) {

    var req = newXMLHttpRequest(); // object can be used to exchange data with a web server behind the scenes.

    req.onreadystatechange = getReadyStateHandler(req, updateCart); // functions are first-class objects in JavaScript. This means that functions can be parameters to other functions and can also create and return other functions.
    // GetReadyStateHandler function checks whether the XMLHttpRequest has completed and passes the XML response onto the handler function specified by the caller
    req.open("POST", "cart.do", true);
    req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    req.send("action=add&item="+itemCode);
}

/*
 * Adds the specified item to the shopping cart, via Ajax call
 * itemCode - product code of the item to add
 */
function deleteFromCart(itemCode) {

    var req = newXMLHttpRequest(); // object can be used to exchange data with a web server behind the scenes.

    req.onreadystatechange = getReadyStateHandler(req, updateCart); // functions are first-class objects in JavaScript. This means that functions can be parameters to other functions and can also create and return other functions. If there is a change make sure to update the Cart!
    // GetReadyStateHandler function checks whether the XMLHttpRequest has completed and passes the XML response onto the handler function specified by the caller
    req.open("POST", "cart.do", true);
    req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    req.send("action=remove&item="+itemCode); //the main change here. Now the post request knows to remove the item of that code. The remove code was actually given
}
/*
 * Update shopping-cart area of page to reflect contents of cart
 * described in XML document.
 */
function updateCart(cartXML) {
    var cart = cartXML.getElementsByTagName("cart")[0]; // parsing through the xml
    var generated = cart.getAttribute("generated"); //generated is a time stamp to prevent overwriting
    if (generated > lastCartUpdate) {
        lastCartUpdate = generated;
        var contents = document.getElementById("contents");
        contents.innerHTML = "";

        var items = cart.getElementsByTagName("item");
        for (var I = 0 ; I < items.length ; I++) {

            var item = items[I];
            var name = item.getElementsByTagName("name")[0].firstChild.nodeValue; //The firstChild property returns the first child node of the specified node, as a Node object.
            var quantity = item.getElementsByTagName("quantity")[0].firstChild.nodeValue;

            var listItem = document.createElement("li");
            listItem.appendChild(document.createTextNode(name+" x "+quantity)); //Updates to the XML
            contents.appendChild(listItem);
        }

    }

    document.getElementById("total").innerHTML = cart.getAttribute("total");
}
