const express = require('express');
const app = express();
const router = express().Router;
const fs = require("fs");
const csv = require("fast-csv");
const xlsx = require("node-xlsx");

/**
*  解析表单类型的数据
*/
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


/****/
/**
*  跨域请求配置
*/
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    res.header('Access-Control-Allow-Credentials', true);
    next();
});

app.get("/test", (req, res)=>{
    res.send({
        code: 200,
        message: 'success'
    })
})

//当接口不存在时，返回404状态码
app.use(function(req, res, next) {
    res.send({
        code: 404,
        message: 'Service Not Found'
    })
});

async function test() {
    async function analysisdata() {
        return new Promise((resolve,reject)=>{
            const workSheetsFromBuffer = xlsx.parse(fs.readFileSync(__dirname+"/ceshi.csv"));
            resolve(workSheetsFromBuffer);
            // fs.createReadStream(__dirname+"/ceshi.csv")
            //     .pipe(csv.parse({ headers: true }))
            //     .on('data', row => {
            //         console.log(index++);
            //         console.log(row)
            //         resolve(row)}
            //     )
            console.log(workSheetsFromBuffer)
            //解析xlsx
        });
    }
    async function readdata(v) {
        // console.log("xlsx =" ,v);//xlsx = [ { name: 'Sheet1', data: [ [Array], [Array], [Array] ] } ]
        // ctx.body=v;
        v[0].data.forEach(item=>{
            console.log(item)
        })
    }
    let r=await analysisdata();
    await readdata(r);
}

test()

app.listen(3002, ()=>{
    console.log(`3002端口号已启动....`)
})