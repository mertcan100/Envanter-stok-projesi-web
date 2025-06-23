fetch('http://localhost:3000/stocks')
    .then((res) => res.json())
    .then(data => {
        const tableBody = document.getElementById("stockList");
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

const addStock = () => {
    const veri = {
        productId : Number(document.getElementById("product-id").value),
        quantity : Number(document.getElementById("quantity").value),
    }

    fetch('http://localhost:3000/insert-stock', {
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

const deleteStock = () => {
    const veri = {
        
        stockID: Number(document.getElementById("stockID").value),
        
    }
    console.log(veri);

    fetch('http://localhost:3000/delete-stock', {
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
