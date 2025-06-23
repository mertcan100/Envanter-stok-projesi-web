import express from "express";
import cors from 'cors';
import mssql from 'mssql'

const config = {
    user:'sa',
    password:'123456',
    server:"MERTCAN\\SQLEXPRESS01",
    database:"Project",
    connectionTimeout:15000,
    port:1433,
    options:{
        encrypt:false,
        trustServerCertificate:true
    }
};



async function getProduct(){
    try{
        let pool = await mssql.connect(config);
        const res = await pool.request().query(`select ProductID, ProductName, Price, StockLevel from Products`);
        return res;
    }
    catch(error){
        console.error(error);
    }
}

async function getStocks(){
    try{
        let pool = await mssql.connect(config);
        const res = await pool.request().query(`select * from Stocks`);
        return res;
    }
    catch(error){
        console.error(error);
    }
}

async function gettaxes(){
    try{
        let pool = await mssql.connect(config);
        const res = await pool.request().query(`select * from TaxOptimization`);
        return res;
    }
    catch(error){
        console.error(error);
    }
}

async function getRawMaterials(){
    try{
        let pool = await mssql.connect(config);
        const res = await pool.request().query(`select * from RawMaterials`);
        return res;
    }
    catch(error){
        console.error(error);
    }
}

const app = express();
app.use(express.json())
const port = 3000;

app.use(cors())

app.get('/products',async (req, res) => {
    const r = await getProduct();
    res.send(r);
});
app.get('/rawmaterials',async (req, res) => {
    const r = await getRawMaterials();
    res.send(r);
});


app.get('/stocks',async (req, res) => {
    const r = await getStocks();
    res.send(r)
});

app.get('/taxes',async (req, res) => {
    const r = await gettaxes();
    res.send(r)
});

app.post('/insert-product',async (req,res) => {
    const {productName, price, stocklevel} = req.body;
    let pool = await mssql.connect(config);
    const request = pool.request();
    request.input('p1', mssql.VarChar, productName)
    request.input('p2', mssql.Int, price)
    request.input('p3', mssql.Int, stocklevel)

   await request.query("INSERT INTO Products (ProductName, Price, StockLevel) VALUES (@p1,@p2,@p3)");
   res.send("Başarılı")
})

app.post('/insert-stock',async (req,res) => {
    const {productId, quantity} = req.body;
    let pool = await mssql.connect(config);
    const request = pool.request();
    request.input('p1', mssql.Int, productId);
    request.input('p2', mssql.Int, quantity)

   await request.query("INSERT INTO Stocks (ProductID, Quantity) VALUES (@p1,@p2)");
   res.send("Başarılı")
})

app.post('/insert-tax',async (req,res) => {
    const {orderId, taxRate} = req.body;
    let pool = await mssql.connect(config);
    const request = pool.request();
    request.input('p1', mssql.Int, orderId);
    request.input('p2', mssql.Int, taxRate)

   await request.query("INSERT INTO TaxOptimization (OrderID, TaxRate) VALUES (@p1,@p2)");
   res.send("Başarılı")
})

app.post('/insert-rawmaterial',async (req,res) => {
    const {rawmaterialName, rawmaterialQuantity} = req.body;
    let pool = await mssql.connect(config);
    const request = pool.request();
    request.input('p1', mssql.VarChar, rawmaterialName);
    request.input('p2', mssql.Int, rawmaterialQuantity)

   await request.query("INSERT INTO RawMaterials (RawMaterialName, RawMaterialQuantity) VALUES (@p1,@p2)");
   res.send("Başarılı")
})

app.post('/delete-rawmaterial',async (req,res) => {
    const {rawmaterialID} = req.body;
    let pool = await mssql.connect(config);
    const request = pool.request();
    request.input('p1', mssql.Int, rawmaterialID);
     

   await request.query("delete from RawMaterials where RawMaterialID = @p1 ");
   res.send("Başarılı")
})

app.post('/delete-tax',async (req,res) => {
    const {id} = req.body;
    let pool = await mssql.connect(config);
    const request = pool.request();
    request.input('p1', mssql.Int, id);
    

   await request.query("delete from TaxOptimization where TaxOptID=@p1 ");
   res.send("Başarılı")
})

app.post('/delete-stock',async (req,res) => {
    const {stockID} = req.body;
    let pool = await mssql.connect(config);
    const request = pool.request();
    request.input('p1', mssql.Int,stockID);
    

   await request.query("delete from Stocks where StockID=@p1 ");
   res.send("Başarılı")
})


app.post('/delete-product',async (req,res) => {
    const {productID} = req.body;
    let pool = await mssql.connect(config);
    const request = pool.request();
    request.input('p1', mssql.Int,productID);
    

   await request.query("delete from Products where ProductID=@p1 ");
   res.send("Başarılı")
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

