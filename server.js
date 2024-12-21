
//area para declarar as funções do código
const express = require('express');
const app = express();
const { pool } = require("./dbConfig");
const bcrypt = require("bcrypt");
const PORT = 4000;
const session = require('express-session');
const flash = require('express-flash');
const passport = require("passport");
require("dotenv").config();


//constante que é usada para inicializar o Passport como função
const initializePassport = require("./passportConfig.js");

initializePassport(passport);


//area para inicializar as funções declaradas
app.set("view engine", "ejs");
app.use(express.urlencoded({extended: false}));
app.use(express.static('public'));
app.use(session({
    /*o segredo é guardado em um arquivo .env, esse arquivo 
    NUNCA deve ser disponibilizado para terceiros*/
    secret: process.env.SEGREDO,
    resave: false,
    saveUninitialized: false
}))

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());


app.get('/', (req, res)=>{
    res.render('cadastro');
    
});

app.get('/cadastro', checkAuthenticated, (req, res)=>{
    res.render('cadastro');
    
});

app.get('/login', checkAuthenticated, (req, res) =>{
    let  {  email, senha } = req.body;
    res.render('login');
});

app.get('/logout', (req, res) => {
res.redirect('index')  });

app.get('/dashboard', checkNotAuthenticated, (req, res) => {
    res.render('dashboard');
    
});


app.get('/historia', checkNotAuthenticated, (req,res)=>{
    res.render('InteriorHistoria');
});

app.get('/artes', checkNotAuthenticated, (req,res)=>{
    res.render('InteriorArtes');
});

app.get('/fisica', checkNotAuthenticated, (req,res)=>{
    res.render('InteriorFisica');
});

app.get('/geografia', checkNotAuthenticated, (req,res)=>{
    res.render('InteriorGeografia');
});


app.get('/informatica', checkNotAuthenticated, (req,res)=>{
    res.render('InteriorInformatica');
});

app.get('/ingles', checkNotAuthenticated, (req,res)=>{
    res.render('InteriorIngles');
});

app.get('/matematica', checkNotAuthenticated, (req,res)=>{
    res.render('InteriorMatematica');
});

app.get('/quimica', checkNotAuthenticated, (req,res)=>{
    res.render('InteriorQuimica');
});

app.get('/sobrenos', (req, res)=>{
    res.render('presentation');
});


app.post("/cadastro", async (req, res) => {
    let  { usuario, email, senha, senha2 } = req.body;



    let erros =[];

   if (senha != senha2){
    erros.push({message:"As senhas não coincidem"});
   }

   if (senha.length < 8){
    erros.push({message:"A senha deve ter no mínimo 8 caracteres"});
   }

    if (erros.length > 0){
        res.render("cadastro", {erros});
    }
   
    else{
        
        let senhaCript = await bcrypt.hash(senha, 10);

       

        pool.query(
            `SELECT * FROM alunos WHERE email = $1`, [email], (err, result)=>{

                if(err){
                    throw err;
                }
                if(result.rows.length > 0){
                    erros.push({message:"O email já foi cadastrado"});
                    res.render("cadastro", {erros});
                }else{
                    pool.query(`INSERT INTO alunos (username, email, senha) 
                        VALUES ($1, $2, $3)
                        RETURNING id, senha`, [usuario, email, senhaCript], 
                        (err, result)=>{
                            if(err){
                                throw err;
                            }
                           
                            req.flash("sucesso_msg", "Cadastro realizado com sucesso");
                            res.redirect('/login');
                        }
                    )
                }
                
                

            }
        )
        
    }

});

app.post('/login', passport.authenticate('local',{
    successRedirect:'/dashboard',
    failureRedirect:'/cadastro',
    failureFlash: true
    
}));

app.delete('/logout', (req, res) => {
    if (req.session) {
      req.session.destroy(err => {
        if (err) {
          res.status(400).send('Unable to log out')
        } else {
          res.send('Logout successful')
        }
      });
    } else {
      res.end()
    }
  })

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect("/dashboard");
    }
    next();
  }

  function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/login");
  }
  
app.listen(PORT,() => {

});

