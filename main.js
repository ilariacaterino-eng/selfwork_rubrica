let contactWrapper = document.querySelector(`#contactWrapper`);
// bottoni
let showContactBtn = document.querySelector(`#showContactBtn`);
let saveContactBtn = document.querySelector(`#saveContactBtn`);
let searchContactBtn = document.querySelector(`#searchContactBtn`);

let nameInput = document.querySelector(`#nameInput`);
let phoneInput = document.querySelector(`#phoneInput`);
let searchInput = document.querySelector(`#searchInput`);

const rubrica = {
    contactList: [
        {contactName: `Ugo`, phoneNumber: `1211222222`},
        {contactName: `Madre`, phoneNumber: `16467855844`},
        {contactName: `Padre`, phoneNumber: `18488573458`},
        {contactName: `Fratm`, phoneNumber: `12173487744`},
    ],
    showContacts: function(){
        contactWrapper.innerHTML = ``;
        this.contactList.forEach((contact, i) =>{
        let div = document.createElement('div');
        div.classList.add('card-custom');
        div.innerHTML = `
            <p class="mb-0 mx-2 mx-md-3 customtext-shadow">${contact.contactName}</p>
            <p class="mb-0 mx-2 mx-md-3 customtext-shadow">${contact.phoneNumber}</p>
                <div>
                    <i class="fa-regular fa-pen-to-square mx-2 desktop-small icon edit-btn" data-index="${i}"></i>
                    <i class="fa-regular fa-trash-can mx-2 desktop-small icon delete-btn" data-index="${i}"></i>
                </div>
                `;
        contactWrapper.appendChild(div);
        
      });
    },
    addContact: function(newName, newNumber){
        let newContact = {contactName: newName, phoneNumber: newNumber};
        this.contactList.push(newContact);
        this.showContacts();
    },
    removeContact: function(i){
        this.contactList.splice(i, 1);
        this.showContacts();
    },
    searchContact: function(name){
       let contattiTrovato = this.contactList.filter(contact => {
            return contact.contactName.toLowerCase() == name.toLowerCase()
       });
       contactWrapper.innerHTML = ``;
       if(contattiTrovato.length == 0){
        alert(`contatto non trovato`);
       }else{
        contattiTrovato.forEach(element =>{
            let div = document.createElement('div');
            div.classList.add('card-custom');
            let realIndex = this.contactList.indexOf(element);
            div.innerHTML = `
            <p class="mb-0 mx-2 mx-md-3 customtext-shadow">${element.contactName}</p>
            <p class="mb-0 mx-2 mx-md-3 customtext-shadow">${element.phoneNumber}</p>
                <div>
                    <i class="fa-regular fa-pen-to-square mx-2 desktop-small icon edit-btn" data-index="${realIndex}"></i>
                    <i class="fa-regular fa-trash-can mx-2 desktop-small icon delete-btn" data-index="${realIndex}"></i>
                </div>
            `;
            contactWrapper.appendChild(div);
            searchInput.value = ``;
        })
       }
    },
    editContact : function(i){
        let nuovoNome = prompt(`Nuovo nome:`, this.contactList[i].contactName);
        let nuovoNumero = prompt(`Nuovo numero:`, this.contactList[i].phoneNumber);
        if(nuovoNome === null || nuovoNumero === null) return;
        if(nuovoNome === `` || nuovoNumero === ``){
        alert(`Inserisci sia il nome che il numero`);
        return;
        }
    this.contactList[i].contactName = nuovoNome;
    this.contactList[i].phoneNumber = nuovoNumero;
    this.showContacts();
    }
    }

// bottone mostra contatti
let check1 = false;
showContactBtn.addEventListener(`click`, ()=>{
    if(check1 == false){
        rubrica.showContacts();
        showContactBtn.innerText = `Nascondi contatti`;
        check1 = true;
    }else{
        contactWrapper.innerHTML = ``;
        showContactBtn.innerText = `Mostra contatti`;
        check1 = false;
    };
});
// bottone aggiungi contatti
saveContactBtn.addEventListener(`click`, ()=>{
    let name = nameInput.value;
    let phone = phoneInput.value;
    if(name === `` || phone === ``){
        alert(`Inserisci sia il nome che il numero`)
    }else{
        rubrica.addContact(name, phone);
        check1 = true;
        showContactBtn.innerText = `Nascondi contatti`;
        nameInput.value = '';
        phoneInput.value = '';
    }
})
// bottone cestino (serve per allargare il raggio d'azione dell'icona altrimenti non va)
contactWrapper.addEventListener('click', (event) => {
    let trash = event.target.closest('.delete-btn');
    if (trash) {
        let i = trash.getAttribute('data-index');
        rubrica.removeContact(i);
    }
    let edit = event.target.closest('.edit-btn');
    if (edit) {
        let i = edit.getAttribute('data-index');
        rubrica.editContact(i);
    }
});
// bottone cerca
searchContactBtn.addEventListener(`click`, ()=>{
    rubrica.searchContact(searchInput.value);
});


