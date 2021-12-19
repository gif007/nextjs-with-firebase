import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore"; 
import { db } from "../components/AuthProvider";

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