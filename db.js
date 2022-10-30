
const Pool = require ('pg').Pool
const pool = new Pool({
    user:"postgres",
    password:"gadissuci25",
    database:'db_artikel',
    host:"localhost", 
    port: 5432
})



const prosesAddContact =  async (req, res) => {
    res.render('add_artikel',{
        title: "Add Artikel",
        
    })
}

const addContact = async (req, res) => {
    try {
        const {rows: del_contacts_query} = await pool.query(`INSERT INTO tb_artikel (id, judul, deskripsi) VALUES ('${req.params.id}', '${req.params.judul}', '${req.params.deskripsi}'`);
        add_contacts_query(
            addContact => 
            res.render('./add_artikel', {
                title: "Add Artikel ", 
                addContact
        })
        )
    }
    catch (error)
    {
        console.error(error.message)
    }
};
        
const delContact =  async (req, res) => {
    try {
        const {rows: del_contacts_query} = await pool.query(`DELETE FROM tb_artikel WHERE id = '${req.params.id}'`)
        
    }
    catch (error)
    {
        console.error(error.message)
    }
}
        
module.exports = {pool,
                delContact,
                addContact , 
                prosesAddContact,
            }