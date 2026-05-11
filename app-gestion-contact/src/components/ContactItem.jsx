

import { useState } from "react";

function ContactItem({ contact, deleteContact, updateContact }) {

    const [isEditing, setIsEditing] = useState(false);
    const [form, setForm] = useState({
        name: contact.name || "",
        firstname: contact.firstname || "",
        email: contact.email || "",
        phone: contact.phone || ""
    });
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        if (!form.name.trim()) newErrors.name = "Le nom est requis.";
        if (!form.firstname.trim()) newErrors.firstname = "Le prénom est requis.";
        if (!form.email.trim()) {
            newErrors.email = "L'email est requis.";
        } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) {
            newErrors.email = "L'email n'est pas valide.";
        }
        return newErrors;
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setErrors({});
        updateContact && updateContact(contact.id, form);
        setIsEditing(false);
    };

    return (
        <li>
            {isEditing ? (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    <input name="name" value={form.name} onChange={handleChange} placeholder="Nom" />
                    {errors.name && <span style={{color: 'red'}}>{errors.name}</span>}
                    <input name="firstname" value={form.firstname} onChange={handleChange} placeholder="Prénom" />
                    {errors.firstname && <span style={{color: 'red'}}>{errors.firstname}</span>}
                    <input name="email" value={form.email} onChange={handleChange} placeholder="Email" />
                    {errors.email && <span style={{color: 'red'}}>{errors.email}</span>}
                    <input name="phone" value={form.phone} onChange={handleChange} placeholder="Téléphone" />
                    <div>
                        <button type="submit">Valider</button>
                        <button type="button" onClick={() => setIsEditing(false)}>Annuler</button>
                    </div>
                </form>
            ) : (
                <>
                    <h2>{contact.name} - {contact.firstname}</h2>
                    <p>{contact.email}</p>
                    <p>{contact.phone}</p>
                    <button onClick={() => deleteContact && deleteContact(contact.id)}>Supprimer</button>
                    <button onClick={() => setIsEditing(true)}>Modifier</button>
                </>
            )}
        </li>
    );
}

export default ContactItem;