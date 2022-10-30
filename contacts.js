const fs = require("fs");
const readline = require('readline');
const validator = require('validator');
const {body, validationResult} = require('express-validator')


const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
});

// make a function
const questions = (ask) => {
    return new Promise((resolve,rejects) =>{
        rl.question(ask, (id) => {
            resolve(id);
        })
        
    })
}

// membuaf folder
const dirPath= './data';
if(!fs.existsSync(dirPath)){
    fs.mkdirSync(dirPath)
}

// membuat file contact.json
const dataPath = './data/contact.json';
if (!fs.existsSync(dataPath)){
    fs.writeFileSync(dataPath,'[]','utf-8')
}


// membuat fungsi load contact
const loadContact = () => {
    const file = fs.readFileSync('data/contact.json', 'utf-8');
    const contacts = JSON.parse(file);
    return contacts;
}

// membuat fungsi save contact
const saveContact = (contacts) => {
    fs.writeFileSync('data/contact.json', JSON.stringify(contacts))
};


// fungsi insert / add kontak 
const add_kontak = (contact) => {
    const contacts = loadContact()
    contacts.push(contact)
    saveContact(contacts)

}

// membuat fungsi update
const updateContacts = (newKontak) => {
    const contacts = loadContact()
    //hilangkan kontak lama yang namanya sama dengan  oldname
    const filternewcontact = contacts.filter((contact) =>  contact.name !== newKontak.oldName)
    // console.log(filternewcontact, newKontak)
    delete newKontak.oldName;
    filternewcontact.push(newKontak)
    saveContact(filternewcontact)
}

// membuat fungsi delete per kontak
const delete_contact =(name) =>{
    const all_contacts = loadContact();
  
    const listBaru = all_contacts.filter((all_contacts) => all_contacts.name !== name)
    saveContact(listBaru)
}



// membuat fungsi detail
const details = (name) => {
    const all_contacts = loadContact();
    const InformationDetail = all_contacts.find((contactName) => contactName.name === name)
    return InformationDetail;

};


// membuat fungsi check Duplikat
const checkDuplicate = (name) => {
    const contacts = loadContact()
    return contacts.find((contact) => contact.name === name ) 
}

module.exports = {
    saveContact,
    details, 
    delete_contact, 
    loadContact,
    add_kontak,
    checkDuplicate, 
    updateContacts, 
    
};
