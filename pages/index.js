import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { getAuth, signOut } from "firebase/auth";
import { useAuth } from "../components/AuthProvider";
import { getAllPokemon, addPokemon, removePokemon } from "../lib/firestore";


export async function getStaticProps() {
  const allPokemon = await getAllPokemon();
  const pokemon = allPokemon[0];
  const welcomeMessage = `Hello from ${pokemon ? pokemon.name: 'Pokemon'}!`;
  return {
    props: {welcomeMessage}
  }
}

export default function Home({welcomeMessage}) {
  const [pokedata, setPokedata] = useState({name: '', type: ''});
  const [isLoading, setIsLoading] = useState(false);
  const [allPokemon, setAllPokemon] = useState([]);
  const auth = getAuth();
  const { user } = useAuth();
  async function loadData() {
    const allPokemon = await getAllPokemon();
    setAllPokemon(allPokemon);
  }
  useEffect(() => {
    loadData();
  }, []);
  const handleChange = (e) => {
    setPokedata({
      ...pokedata,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, type } = pokedata;
    if (name.length < 2 || type.length < 2) {
      alert("Please fill in the name and type of the pokemon");
      return;
    }
    try {
      setIsLoading(true);
      await addPokemon(pokedata);
      setPokedata({name: '', type: ''});
      loadData();
    } catch(err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div>
      <Head>
        <title>Next.js with Firebase</title>
      </Head>
      <main>
        <h1>{welcomeMessage}</h1>
        {user ? (
          <button
            type="button"
            onClick={() => {
              signOut(auth).catch((err) => {
                console.log(err);
              });
            }}
          >
            Logout
          </button>
        ) : (
          <p>
            Try the{" "}
            <Link href="/login">
              <a>login</a>
            </Link>{" "}
            page
          </p>
        )}
        <p>User: {user ? user.uid : "None"}</p>
        <section>
          <p>Add pokemon to database</p>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              value={pokedata.name}
              id="name"
              name="name"
              onChange={handleChange}
            />
            <label htmlFor="type">Type</label>
            <input
              type="text"
              value={pokedata.type}
              id="type"
              name="type"
              onChange={handleChange}
            />
            <button type="submit">Submit</button>
          </form>
          {
            isLoading ? <div>Loading...</div> : (
              <ul>{allPokemon.map((pokemon) => {
                return (
                  <li key={pokemon.id}>
                    <h3>{pokemon.name}</h3>
                    <p>{pokemon.type}</p>
                    <p>{pokemon.level}</p>
                    <p>
                      <button
                        type="button"
                        onClick={async () => {
                          const confirmed = confirm("Do you want to remove this pokemon?");
                          if (confirmed) {
                            setIsLoading(true);
                            await removePokemon(pokemon.id);
                            loadData();
                            setIsLoading(false);
                          }
                        }}
                      >
                        Remove
                      </button>
                    </p>
                  </li>
                )
              })}</ul>
            )
          }
        </section>
      </main>
    </div>
  );
}
