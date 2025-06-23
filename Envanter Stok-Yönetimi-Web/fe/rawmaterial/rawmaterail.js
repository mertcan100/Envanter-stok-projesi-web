fetch('http://localhost:3000/rawmaterials')
    .then((res) => res.json())
    .then(data => {
        const tableBody = document.getElementById("rawmaterialList");
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

const addRawmaterial = () => {
    const veri = {
        rawmaterialName : document.getElementById("rawmaterial-name").value,
        rawmaterialQuantity : Number(document.getElementById("rawmaterial-quantity").value),
    }

    fetch('http://localhost:3000/insert-rawmaterial', {
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

const deleteRawmaterial = () => {
    const veri = {
        
        rawmaterialID: Number(document.getElementById("rawmaterialID").value),
        
    }
    console.log(veri);

    fetch('http://localhost:3000/delete-rawmaterial', {
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
