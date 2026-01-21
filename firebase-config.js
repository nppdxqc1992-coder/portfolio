// Firebase 配置文件
// 这个文件包含 Firebase 的连接信息

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 你的 Firebase 配置（从 Firebase 控制台获取）
const firebaseConfig = {
    apiKey: "AIzaSyD6-qSi-et4KWenYXyFNDOV0UPXZdwbfWQ",
    authDomain: "portfolio-99aac.firebaseapp.com",
    projectId: "portfolio-99aac",
    storageBucket: "portfolio-99aac.firebasestorage.app",
    messagingSenderId: "146546561478",
    appId: "1:146546561478:web:8842545ea8cc88affe62c7"
};

// 初始化 Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// 导出供其他文件使用
export { auth, db, signInWithEmailAndPassword, onAuthStateChanged, signOut, doc, getDoc, setDoc };
