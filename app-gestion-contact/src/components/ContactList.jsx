
import ContactItem from "./ContactItem";
import { useState } from "react";

function ContactList({ contacts, deleteContact, updateContact }) {
    const [search, setSearch] = useState("");

    const filteredContacts = contacts.filter(contact =>
        contact.name.toLowerCase().includes(search.toLowerCase()) ||
        contact.firstname?.toLowerCase().includes(search.toLowerCase() || "") ||
        contact.email?.toLowerCase().includes(search.toLowerCase() || "") ||
        contact.phone?.toLowerCase().includes(search.toLowerCase() || "")
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