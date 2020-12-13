let updateBtns = document.getElementsByClassName('update-cart');

for(let i=0; i<updateBtns.length; i++){
  updateBtns[i].addEventListener('click', function(){
    let productId = this.dataset.product;
    let action = this.dataset.action;
    console.log(`productID: ${productId}, action: ${action}`);

    console.log(`User: ${user}`);
    if(user === 'AnonymousUser'){
      console.log('not login');
    }else{
      console.log('sending data...');
    }
  })
}