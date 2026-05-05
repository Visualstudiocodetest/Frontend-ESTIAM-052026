import Titre from "./Titre";
import { useState } from "react";

function Formulaire() {
    const [nom, setNom] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Bonjour, ${nom} !`);
        setNom('');
    }
    return (
        <div>
        <Titre titre="Formulaire de contact" />
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Nom" onChange={(e) => setNom(e.target.value)} />
            <button type="submit">Envoyer</button>
        </form>
        </div>
    );
}

export default Formulaire;