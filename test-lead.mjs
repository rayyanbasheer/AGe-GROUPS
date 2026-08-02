import fs from 'fs';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';

const firebaseConfig = JSON.parse(fs.readFileSync('firebase-applet-config.json', 'utf8'));
const app = initializeApp(firebaseConfig);
const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

async function run() {
  try {
    await addDoc(collection(db, 'leads'), {
      name: 'Chatbot User',
      phone: '9842569545',
      message: 'test message',
      source: 'chatbot',
      createdAt: serverTimestamp()
    });
    console.log("Success");
  } catch (e) {
    console.error("Failed:", e.message);
  }
  process.exit(0);
}
run();
