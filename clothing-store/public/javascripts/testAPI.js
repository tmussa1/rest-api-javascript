(function(){
    const baseUri = "http://localhost:3000";

    function testAPIs(){
        listProducts()
        .then((products) => createProduct())
        .then((product) => getAProduct(product._id))
        .then((product) => updateAProduct(product._id, product))
        .then((product) => deleteAProduct(product._id))
        .catch(err => console.log(err));
    }

    function listProducts(){
        console.log("Listing products");

        return makeAPICall('GET', '/products/', {});
    }
    function createProduct(){
        var product = new FormData();
        product.append('name' , document.querySelector('#name').value);
        product.append('price', document.querySelector('#price').value);
        product.append('description', document.querySelector('#description').value);
        product.append('imageUrl', document.querySelector('input[type="file"]').files[0]);
        
        console.log("Creating a product");
        console.log(product.getAll("name"));
        console.log(product.getAll("price"));
        console.log(product.getAll("description"));
        console.log(product.getAll("imageUrl"));
        return makeAPICall('POST', '/products/addProduct', product)
    }

    function getAProduct(id){
        console.log("Getting a single product");
        
        return makeAPICall('GET', '/products/' + id, {});
    }

    function updateAProduct(id, product){
        console.log("Updating a product");
        return makeAPICall('PUT', '/products/'+ id, product);
    }

    function deleteAProduct(id){
        console.log("Deleting a product");
        return makeAPICall('DELETE', '/products/' + id);
    }

    function makeAPICall(method, route, payload){
        
        let path = baseUri + route;

        let fetchOptions = {};

        fetchOptions.method = method;
        

        if(method == 'POST'){
            fetchOptions.body = payload;
        } else if(method == 'PUT'){
            fetchOptions.headers = {'Content-type' : 'application/json'};
            fetchOptions.body = JSON.stringify(payload);
        } 

        let result = fetch(path, fetchOptions)
            .then((response) => {
                console.log("Response status", response.status, response.headers.get('Content-Type'));
                return response.json();
            }).catch((err) =>{
                console.log(err);
            });
       return result;
    }

    document.getElementById("test_api").onclick = testAPIs;
})();