import { collection, getDocs, addDoc, deleteDoc, doc, getDoc } from "firebase/firestore"; 
import { db } from "../components/AuthProvider";

export async function getSeasonalMessage(season) {
    const mapping = {
        "winter": "79DplVuo3xpjuFww2oIi",
        "spring": "qg8M1akHBrEWktm11sua",
        "summer": "uEHhtiXvV4jJbprNRBmQ",
        "fall": "MnXYdjHp8Tw9hMtuNvaX",
    };
    try {
        const docRef = doc(db, "seasonal", mapping[season]);
        const docSnap = await getDoc(docRef);
        const { message } = docSnap.data();
        return message;
    } catch (err) {
        console.log(err);
    }
}

export async function getAllPokemon() {
    const querySnapshot =  await getDocs(collection(db, "pokemon"));
    const documents = [];
    querySnapshot.forEach((pokemon) => {
        const { name, type, level } = pokemon.data();
        documents.push({
            name,
            type,
            level,
            id: pokemon.id,
        });
    });
    return documents;
};

export async function removePokemon(id) {
    try {
        await deleteDoc(doc(db, "pokemon", id));
    } catch (err) {
        console.log(err);
    }
}

export async function addPokemon({ name, type }) {
    try {
        const docRef = await addDoc(collection(db, "pokemon"), {
            name,
            type,
            level: 1,
        });
    } catch (err) {
        console.log(err);
    }
}