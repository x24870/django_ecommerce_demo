import json

from .models import *

def cookieCart(request):
    try:
        cart = json.loads(request.COOKIES['cart'])
    except:
        cart = {}

    order = {'get_cart_total': 0, 'get_cart_items': 0, 'shipping': False}# for non-login user
    items = []
    cartItems = order['get_cart_items']

    for key in cart:
        # because cookie is stored in client side
        # if server side can't find this product in database
        # it will be skipped
        try:
            cartItems += cart[key]['quantity']
            product = Product.objects.get(id=key)
            total = (product.price * cart[key]['quantity'])

            order['get_cart_total'] += total
            order['get_cart_items'] += cart[key]['quantity']

            item = {
                'product': {
                    'id': product.id,
                    'name': product.name,
                    'price': product.price,
                    'imageURL': product.imageURL
                },
                'quantity': cart[key]['quantity'],
                'get_total': total
            }

            items.append(item)

            if product.digital == False:
                order['shipping'] = True
        except:
            pass

    return {'cartItems':cartItems, 'order': order, 'items':items}

def cartData(request):
    if request.user.is_authenticated:
        customer = request.user.customer
        order, created = Order.objects.get_or_create(customer=customer, complete=False)
        items = order.orderitem_set.all()
        cartItems = order.get_cart_items
    else:
        cookieData = cookieCart(request)
        cartItems = cookieData['cartItems']
        order = cookieData['order']
        items = cookieData['items']

    return {'cartItems':cartItems, 'order': order, 'items':items}