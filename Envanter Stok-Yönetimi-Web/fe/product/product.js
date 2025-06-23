fetch('http://localhost:3000/products')
    .then((res) => res.json())
    .then(data => {
        const tableBody = document.getElementById("productList");
        data.recordset.forEach((v) => {
            const tr = document.createElement("tr");
            for (const key in v) {
                const td = document.createElement('td');
                td.textContent = v[key];
                tr.appendChild(td);
            }
            tableBody.appendChild(tr);
        })
    });

const addProduct = () => {
    const veri = {
        productName : document.getElementById("product-name").value,
        price : Number(document.getElementById("price").value),
        stocklevel : Number(document.getElementById("stock-level").value)
    }
    console.log(veri);

    fetch('http://localhost:3000/insert-product', {
        method: "POST",
        headers: {
            'Content-Type': "application/json",
        },
        body: JSON.stringify(veri)
    })
        .then((res) => res.text(veri))
        .then(data => {
            console.log(data, "data")
        });
}

const deleteProduct = () => {
    const veri = {
        
        productID: Number(document.getElementById("productID").value),
        
    }
    console.log(veri);

    fetch('http://localhost:3000/delete-product', {
        method: "POST",
        headers: {
            'Content-Type': "application/json",
        },
        body: JSON.stringify(veri)
    })
        .then((res) => res.text(veri))
        .then(data => {
            console.log(data, "data")
        });
}
