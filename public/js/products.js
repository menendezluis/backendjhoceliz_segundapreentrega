// agrega los productos al carrito
/* let buttons = document.querySelectorAll("button")

buttons.forEach((button) => {
    button.addEventListener('click', (addToCart))
})

function addToCart(e) {
    const pid = e.target.id
    const cid = e.target.id
    fetch(`api/carts/${cid}/product/${pid}`, {
        method: 'POST',
    })
        .then(response => response.json())
        .then(data => {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Producto agregado correctamente',
                showConfirmButton: false,
                timer: 1500
            })
        })
        .catch(error => {
            console.log('Error:', error);
        });
} */