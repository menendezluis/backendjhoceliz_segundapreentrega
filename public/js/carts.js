const removeButtons = document.querySelectorAll('.remove-button');

document.addEventListener("DOMContentLoaded", () => {
    const decrementButtons = document.querySelectorAll(".decrement");
    const incrementButtons = document.querySelectorAll(".increment");
    const removeButtons = document.querySelectorAll(".remove");

    decrementButtons.forEach(button => {
        button.addEventListener("click", async (event) => {
            const productId = event.target.dataset.id;
            await adjustQuantity(productId, -1);
        });
    });

    incrementButtons.forEach(button => {
        button.addEventListener("click", async (event) => {
            const productId = event.target.dataset.id;
            await adjustQuantity(productId, 1);
        });
    });

    removeButtons.forEach(button => {
        button.addEventListener("click", async (event) => {
            const productId = event.target.dataset.id;
            await removeProduct(productId);
        });
    });
});

async function adjustQuantity(productId, amount) {
    try {
        const response = await fetch(`/path/to/cart/${cartId}/product/${productId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ quantity: amount }),
        });

        const data = await response.json();
        console.log(data);
        // Actualizar la página o el DOM según sea necesario
    } catch (error) {
        console.error(error);
    }
}

async function removeProduct(productId) {
    try {
        const response = await fetch(`/path/to/cart/${cartId}/product/${productId}`, {
            method: "DELETE",
        });

        const data = await response.json();
        console.log(data);
        // Actualizar la página o el DOM según sea necesario
    } catch (error) {
        console.error(error);
    }
}