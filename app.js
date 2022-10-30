const express = require('express');

const app = express()

const port = process.env.PORT || 4250
const {pool} = require("./db")
var fs = require('fs')
const { body, validationResult, check } = require('express-validator');
const session = require ('express-session')
const flash = require ('connect-flash')
const cookieParser = require('cookie-parser')
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express')
const apiDocumentation = require('./apidocs.json')
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(apiDocumentation));

app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.urlencoded({extended :true}))



// information using ejs
app.set('view engine', 'ejs')

app.use(express.static(__dirname + '/public'));
app.use(flash())
app.use(cookieParser('secret'))
app.use(
  session({
    cookie : {maxAge : 6000},
    secret : 'secret',
    resave: true,
    saveUninitialized : true
  })
)



// halaman login
app.get('/', (req, res)=>{
  res.render('./index', {title:"index our company"})
  
});

app.get('/login', (req, res) => {
  res.render('login');
});

const generateAuthToken = () => {
  return crypto.randomBytes(30).toString('hex');
}


// / This will hold the users and authToken related to users
const authTokens = {};

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = getHashedPassword(password);

    const user = users.find(u => {
        return u.email === email && hashedPassword === u.password
    });

    if (user) {
        const authToken = generateAuthToken();

        // Store authentication token
        authTokens[authToken] = user;

        // Setting the auth token in cookies
        res.cookie('AuthToken', authToken);

        // Redirect user to the protected page
        res.redirect('/protected');
    } else {
        res.render('login', {
            message: 'Invalid username or password',
            messageClass: 'alert-danger'
        });
    }
});



// coba halama login, kalau gagal delete saja

app.post("/login", (req,res) => {
  const email = req.body.email;
  const password = req.body.password;
  pool.query(`select from tb_user where email = '${email}'`,
  email,
  (err, result) => {
    if(err) {
      res.send({err:err});
    }

    if (result.length >0) {
      bcrypt.compare(password, result[0].password, (error, response) => {
        if (response) {
          req.session.user = result;
        }
      })
    }
  }

  )
})
// halaman login
app.get('/home', (req, res)=>{
  res.render('./home', {title:"index our company"})
  
});


// memangggil view list dari database (assincronus)
app.get("/artikel", async (req, res) => {
  try {
    const {rows : kontak } = await pool.query(`select * from tb_artikel`)
      res.render ('artikel', {
          kontak,
          title: "View",
          msg: req.flash('msg')
          
      })

  }
  catch (error){
      console.error("salah")
  }
      
})


// ketika diklik di button add, direct ke form tambah
app.get('/artikel/add', (req, res) => {
  res.render('add_artikel', {
      title: 'New Artikel',
      
  })
})

// proses insert data dan validasi
app.post('/artikel',
[
  body('id').custom(async(value) => {
    
    const query_list_name =  await pool.query(`SELECT id from tb_artikel where id = '${value}'`)  
    if(query_list_name.rowCount > 0) {
      throw new Error('Id already used')
    }
    return true
  }),
  // check('mobile', 'nomor tidak valid!').isMobilePhone('id-ID'),
  // check('email', 'email tidak valid!').isEmail()
],
  (req, res) => {
    try{
      const err = validationResult(req)
      if(!err.isEmpty()){
        res.render('add_artikel', {
          title: 'New Artikel',
          err: err.array(),
        })
        req.flash('msg', 'data fail added')
        res.redirect('/artikel')
      }
      else{
        const{id, judul, deskripsi} = req.body

        pool.query(`INSERT INTO tb_artikel values('${id}','${judul}','${deskripsi}')`)
        req.flash('msg', 'Artikel berhasil ditambahkan')
        res.redirect('/artikel')
      }
    } 
    catch (err) {
      console.error(err.message)
  } 
  
})


//  memangggil detail view list dari database (assincronus )
// route ini tidak boleh disimpan di atas
app.get("/artikel/:id", async (req, res) => {
  try {
    const id = (req.params.id)
    const {rows : kontak }  = await pool.query(`select * from tb_artikel where id = '${id}'`)
    kontak.map(
      detailContact => 
      res.render('details', {
      title: "page detail data data ", 
      detailContact
      })
      )
  }
  catch (error){
      console.error("salah")
  }
      
})


//Proses Update artikel
app.post('/artikel/update', [
  body('id').custom(async(value, {req}) => {
      const duplikat = await pool.query(`SELECT id FROM tb_artikel WHERE id = '${value}'`)
      if(!value === req.body.oldId && duplikat) {
          throw new Error('id artikel sudah digunakan')
      }
      return true
  }),
  // check('email', 'Email yang ada input salah').isEmail(),
  // check('mobile', 'No HP yang anda input salah').isMobilePhone('id-ID')
  
], 
  async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
      res.render('edit', {
          title : 'Form Ubah artikel',
          
          errors : errors.array(),
          contactEdit : req.body,
      })
  }
  else {
      const{id, judul, deskripsi} = req.body
      await pool.query(`UPDATE tb_artikel SET id = '${id}', judul = '${judul}', deskripsi = '${deskripsi}' where id = '${req.body.oldId}' `)
      req.flash('msg', 'Artikel  berhasil di Update')
      res.redirect('/artikel')
  }
})


// Untuk route Edit Contact by Name
app.get('/artikel/edit/:id', async (req, res) => {
  try{
      const id = (req.params.id)
      const {rows : contact} = await pool.query(`SELECT id, judul, deskripsi FROM tb_artikel WHERE id = '${id}'`)
      contact.map(contactEdit => {
          res.render('edit', {
              title : "Page artikel Detail",
              contactEdit
          })
      })
  }
  catch (err) {
      console.error(err.message)
  }
  
})


// Route Contact Delete By Name
app.get('/artikel/delete/:id', async (req, res) => {
  try {
      const deleteContact = await pool.query(`DELETE FROM tb_artikel WHERE id = '${req.params.id}'`)
      if(!deleteContact) {
          req.flash('msg', 'Data artikel gagal di hapus')
          res.redirect('/artikel')
      }
      else {
          req.flash('msg', 'Artikel  berhasil di hapus')
          res.redirect('/artikel')
      }
  }
  catch(err){
      console.error(err.message)
  }
})

// halaman about
app.get('/about', (req, res)=>{
  res.render('./about', {title:"about our company"})
  // res.sendFile('./about.html', {root:__dirname})
  //res.send('hellooo post about')
});

app.use('/', (req, res) => {
  res.status(404)
  // res.send('page not found 404')
})



app.listen(port, () => {
  
  console.log(`Example app listening on port http://localhost:${port}/`)
})