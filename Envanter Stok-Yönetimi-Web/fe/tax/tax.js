fetch('http://localhost:3000/taxes')
    .then((res) => res.json())
    .then(data => {
        const tableBody = document.getElementById("taxList");
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

const addTax = () => {
    const veri = {
        
        orderId : Number(document.getElementById("order-id").value),
        taxRate : Number(document.getElementById("tax-rate").value)
    }
    console.log(veri);

    fetch('http://localhost:3000/insert-tax', {
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

const deleteTax = () => {
    const veri = {
        
        TaxID: Number(document.getElementById("TaxID").value),
        
    }
    console.log(veri);

    fetch('http://localhost:3000/delete-tax', {
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
