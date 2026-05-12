import { api } from "../lib/api";

export default function Register() {
    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        try {
            await api.post("/register", { email, password });
            alert("Inscription réussie ! Vous pouvez maintenant vous connecter.");
        } catch (err) {
            alert(err.message || "Erreur lors de l'inscription");
        }
    };
    
    return (
        <div className="register-container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit} className="register-form">
                <input type="email" name="email" placeholder="Email" required />
                <input type="password" name="password" placeholder="Password" required />
                <button type="submit">Register</button>
            </form>
        </div>
    );
}