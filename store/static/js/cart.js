let updateBtns = document.getElementsByClassName('update-cart');

for(let i=0; i<updateBtns.length; i++){
  updateBtns[i].addEventListener('click', function(){
    let productId = this.dataset.product;
    let action = this.dataset.action;
    console.log(`productID: ${productId}, action: ${action}`);

    console.log(`User: ${user}`);
    if(user === 'AnonymousUser'){
      addCookieItem(productId, action);
    }else{
      updateUserOrder(productId, action);
    }
  })
}

function addCookieItem(productId, action){
  console.log('add cookie item');

  if(action == 'add'){
    if(cart[productId] == undefined){
      cart[productId] = {'quantity': 1};
    }else{
      cart[productId]['quantity'] += 1;
    }
  }

  if(action == 'remove'){
    cart[productId]['quantity'] -= 1;

    if(cart[productId]['quantity'] <= 0){
      console.log(`remove product: ${productId}`);
      delete cart[productId];
    }
  }

  document.cookie = 'cart=' + JSON.stringify(cart) + ";domain=;path=/";
  console.log(`Cart: ${cart}`);
  location.reload();
}

function updateUserOrder(productId, action){
  console.log('sending data...');

  const url = '/update_item/';

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': csrftoken,
    },
    body: JSON.stringify({'productId': productId, 'action': action})
  })
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(`Data: ${data}`);
    location.reload()
  })

}