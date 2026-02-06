"use client";

import { useEffect, useState } from "react";
import AddQuest from "./components/AddQuest";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase";
import QuestList from "./components/QuestList";

export default function Home() {
  const [quests, setQuests] = useState([]);

  const questCollection = collection(db, "quests");

  // CREATE
  async function saveAddQuest(titulo, priority) {
    await addDoc(questCollection, {
      title: titulo,
      status: "open",
      priority: priority,
      created_at: new Date().toISOString(),
    });
    getQuests()
  }
  //saveAddQuest("Alguma coisa")

  // READ
  async function getQuests() {
    const q = query(questCollection, orderBy("created_at", "asc"));
    const data = await getDocs(q);
    const questList = data.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setQuests(questList);
  }

  useEffect(()=> {
    getQuests()
  },[])
  // UPDATE
  async function saveEditQuest(quest, title, priority) {
    const questRef = doc(db, "quests", quest.id);
    await updateDoc(questRef, {
      title: title || quest.title,
      priority: priority || quest.priority || "Normal",
    });
        getQuests()

  }

  async function saveConcludedQuest(quest) {
    const questRef = doc(db, "quests", quest.id);
    await updateDoc(questRef, {
      status: "concluded",
    });
        getQuests()

  }

  // DELETE
  async function deleteQuest(quest) {
    const questRef = doc(db, "quests", quest.id);
    await deleteDoc(questRef);
        getQuests()

  }

  const concludedQuests = quests.filter(
    (quest) => quest.status === "concluded"
  );
  const notConcludedQuests = quests.filter((quest) => quest.status === "open");

  const alunos = []


  //alunos.map((aluno) => console.log(`O aluno ${aluno} está presente`))



  if (true){
    console.log("Verdadeiro")
  } else { 
    console.log("Falso")
  }

  true? console.log("Verdadeiro") : console.log("Falso")

  return (
    <div
      className="flex h-screen justify-center items-center 
   bg-[url(./img/bg.png)] bg-cover  "
    >
      <div className="bg-rose-100 w-[80%] min-h-[70%] p-5 rounded-lg
      max-h-screen overflow-auto scrollbar-hide 
      ">
        <p className="text-4xl font-bold text-center text-rose-950">
          Quest To Do
        </p>

        <AddQuest 
          saveAddQuest={saveAddQuest}
        />

        <p className="text-rose-950">Abertas:</p>
        <div className="flex flex-col gap-3 w-full mt-2">
          <QuestList
            quests={notConcludedQuests}
            saveEditQuest={saveEditQuest}
            saveConcludedQuest={saveConcludedQuest}
            deleteQuest={deleteQuest}
          />
        </div>
        <p className="text-rose-950">Concluídas:</p>
        <div className="flex flex-col gap-3 w-full mt-2">
          <QuestList
            quests={concludedQuests}
            saveEditQuest={saveEditQuest}
            saveConcludedQuest={saveConcludedQuest}
            deleteQuest={deleteQuest}
          />
        </div>
      {
        alunos.map((aluno) => <p>{aluno}</p>)
      }

      </div>
    </div>
  );
}
