import { useState } from "react";


function ContactForm({ addContact }) {
    const [form, setForm] = useState({
        name: "",
        firstname: "",
        email: "",
        phone: ""
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
        const newContact = { ...form, id: Date.now() };
        addContact(newContact);
        setForm({ name: "", firstname: "", email: "", phone: "" });
    };

    return (
        <div>ContactForm
            <form onSubmit={handleSubmit} className="contact-form">
                <input type="text" name="name" placeholder="Nom" value={form.name} onChange={handleChange} />
                {errors.name && <span style={{color: 'red'}}>{errors.name}</span>}

                <input type="text" name="firstname" placeholder="Prénom" value={form.firstname} onChange={handleChange} />
                {errors.firstname && <span style={{color: 'red'}}>{errors.firstname}</span>}

                <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} />
                {errors.email && <span style={{color: 'red'}}>{errors.email}</span>}

                <input type="phone" name="phone" placeholder="Téléphone" value={form.phone} onChange={handleChange} />

                <button type="submit">Envoyer</button>
            </form>
        </div>
    );
}

export default ContactForm;