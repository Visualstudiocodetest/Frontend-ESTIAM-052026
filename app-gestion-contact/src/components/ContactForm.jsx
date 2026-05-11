import { useState } from "react";

function ContactForm({ addContact }) {

    const addNewContact = (e) => {
        e.preventDefault();
        const newContact = {
            id: Date.now(),
            name: e.target.name.value,
            firstname: e.target.firstname.value,
            email: e.target.email.value,
            phone: e.target.phone.value
        };
        addContact(newContact);
        e.target.reset();
    }
        return (
        <div>ContactForm
        <form onSubmit={addNewContact} className="contact-form">

            <input type="text" name="name" placeholder="Nom" required />

            <input type="text" name="firstname" placeholder="Prénom" required />

            <input type="email" name="email" placeholder="Email" required />

            <input type="phone" name="phone" placeholder="Téléphone" required />

            <button type="submit">Envoyer</button>


        </form>
        </div>
    )
    }

export default ContactForm;