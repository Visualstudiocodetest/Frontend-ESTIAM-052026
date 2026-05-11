
import ContactItem from "./ContactItem";
import { useState } from "react";
import ContactForm from "./ContactForm";

function ContactList({ contacts, deleteContact, updateContact }) {

    const [search, setSearch] = useState("");

    const filteredContacts = contacts.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.firstname.toLowerCase().includes(search.toLowerCase()) ||
        c.email.toLowerCase().includes(search.toLowerCase()) ||
        c.phone.includes(search)
    );

    return (
        <div>
            <h1>Contact List</h1>
            <input
                type="text"
                placeholder="Rechercher..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{ marginBottom: "1rem", padding: "0.5rem", width: "100%" }}
            />
            <ul>
                {filteredContacts.map((contact) => (
                    <ContactItem
                        key={contact.id}
                        contact={contact}
                        deleteContact={deleteContact}
                        updateContact={updateContact}
                    />
                ))}
            </ul>
        </div>
    );
}

export default ContactList;