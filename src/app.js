const express= require('express');
const path = require('path');
const app = express();
const hbs = require('hbs');


require('./db/conn');
const Register = require('./model/registers');
const port = process.env.PORT || 3000

// const static_path = path.join(__dirname, "../public");
// app.use(express.static(static_path ));

const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.set('view engine', 'hbs');
app.set('views', template_path);
hbs.registerPartials(partials_path);


app.get('/', (req, res) => {
    // res.send('Hello World'); 
    res.render('index');
})

app.get('/register',(req,res)=>{
    res.render('register');
})

app.post('/register', async(req,res)=>{
    try {
        const password=req.body.password;
        const confirmpassword = req.body.confirmpassword;
        if(password===confirmpassword){
            const registerEmployee = new Register({
                name:req.body.name,
                email:req.body.email,
                phone:req.body.phone,
                password:password,
                confirmpassword:confirmpassword
            })
            const registered = await registerEmployee.save();
            res.status(201).render('index');
        }else{
            res.send("password are not matching")
        }
    } catch (error) {
        res.status(400).send(error)
    }
})

app.listen(port, () => {
    console.log(`running successfull on port ${port}`)
})