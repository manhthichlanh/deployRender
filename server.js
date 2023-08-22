const exp = require("express");

const app = exp();

const bodyParser = require('body-parser');

const port = 3005;

app.use(bodyParser.urlencoded());

//Câu 1
app.listen(port, () => {
    console.log(`Cổng hiện tại là: ${port}`)
});
//Câu 1

//Câu 2
app.get("/", (req, res) => {
    res.send("Đây là trang home");
});

app.get("/product", (req, res, next) => {
    res.send("Đây là trang Product");
});

app.get("/add-product", (req, res, next) => {
    res.send(`<form action="/product" method="POST"><input type="text"
    name="productName" placeholder="input first name"><br><button type="submit">Add Product</button></form>`)
})
// *Nguyên nhân là do thiếu đường dẫn để post*;

// *Khắc phục:*
app.post("/product", (req, res, next) => {
    const { productName } = req.body;
    res.send(`Product Name: ${productName}`);
})
// *Khắc phục:*
//Câu 2

//Câu 3
const inventors = [
    { id: 1, first: 'Albert', last: 'Einstein', year: 1879, passed: 1955 },
    { id: 2, first: 'Isaac', last: 'Newton', year: 1643, passed: 1727 },
    { id: 3, first: 'Galileo', last: 'Galilei', year: 1564, passed: 1642 },
    { id: 4, first: 'Marie', last: 'Curie', year: 1867, passed: 1934 },
    { id: 5, first: 'Johannes', last: 'Kepler', year: 1571, passed: 1630 },
    { id: 6, first: 'Nicolaus', last: 'Copernicus', year: 1473, passed: 1543 }
];

app.get('/inventors', (req, res) => {
    let list = '<h2>Danh sách nhà khoa học<ul>';
    inventors.forEach(e => {
        list += `<li><a style="text-decoration:none;color:green;" href="/inventor/${e.id}">${e.last} ${e.first}</a></li>`;
    });
    list += '</ul></h2>';
    res.send(list);
})

app.get('/inventor/:id', (req, res) => {
    let id = req.params.id;
    inventor = inventors.find(e => e.id == id);
    const info = `<h2>Thông tin chi tiết nhà khoa học:Full name: ${inventor.first} ${inventor.last}, Year: ${inventor.year},
    Passed: ${inventor.passed}</h2>`;
    // res.send(info);
    //Xử lý trả về dạng status và json
    const resume = {
        fullName: `${inventor.first} ${inventor.last}`,
        year: inventor.year,
        passed: inventor.passed
    }
    res.status(200).json(resume);
    //Xử lý trả về dạng status và json
});
//Câu 3

//Câu 4
app.get('/add-inventor', (req, res) => {
    res.send(`<h1>Thêm Nhà Khoa Học</h1><form action="/inventor" method="POST"><input type="text"
    name="first" placeholder="input first name"><input type="text" name="last" placeholder="input last name"><br><input
    type="number" name="year" placeholder="Year"><input type="number" name="passed"
    placeholder="passed"><br><button type="submit">Add Product</button></form>`);
});

app.post('/inventor', (req, res) => {
    let newInventor = req.body;
    newInventor.id = inventors.length + 1;
    inventors.push(newInventor);
    res.redirect('/inventors');
})
//Câu 4

//Câu làm thêm 
app.get("/calculate", (req, res) => {
    res.send(`<h1>Tính bội số của số nhập vào từ 1 đến 100</h1>
    <form action="/calculate" method="POST">
      <label for="number">Nhập số cần tính bội số:</label>
      <input type="number" id="number" name="number" required>
      <button type="submit">Tính bội số</button>
    </form>`);
})

app.post('/calculate', (req, res) => {
    const number = req.body.number;
    if (number <= 0) {
        res.send("Vui lòng nhập số dương");
        return 0;
    }
    const results = [];
    for (let i = 1; i <= 100; i++) {
        i % number == 0 && results.push(i);
    }
    if (results.length == 0) {
        res.send(`<h2>Không có số nào từ 1 - 100 là bội số của ${number} </h2>`);
        return 0;
    }
    res.send(`<h2>Bội số của ${number} là: ${results.join(', ')}</h2>`);
});

//Câu làm thêm 

