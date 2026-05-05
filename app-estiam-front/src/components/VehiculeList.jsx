import { useState } from 'react';

function VehiculeList() {
    const [vehicules, setVehicules] = useState([]);
    const [newVehicule, setNewVehicule] = useState('');
    
    const addVehicule = () => {
        if (newVehicule.trim() !== '') {
            setVehicules([...vehicules, newVehicule]);
            setNewVehicule('');
        }
    };

    return (
        <div>
            <h2>Gestion des Véhicules</h2>
            <input
                type="text"
                value={newVehicule}
                onChange={(e) => setNewVehicule(e.target.value)}
                placeholder="Nom du véhicule"
            />
            <button onClick={addVehicule}>Ajouter un Véhicule</button>
            <ul>
                {vehicules.map((vehicule, index) => (
                    <li key={index}>{vehicule}</li>
                ))}
            </ul>
        </div>
    );
}

export default VehiculeList;
