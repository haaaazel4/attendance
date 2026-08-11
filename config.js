export const firebaseConfig = {
  apiKey: "AIzaSyBswJzF2fGhi5qvspk5dbFlKlD_XpN6voM",
  authDomain: "wesabootcamp.firebaseapp.com",
  projectId: "wesabootcamp",
  storageBucket: "wesabootcamp.firebasestorage.app",
  messagingSenderId: "761452747019",
  appId: "1:761452747019:web:75865d2121e9c99b6e6a0e",
};

export const STUDENTS = [
  "김고원",
  "고주혜",
  "윤성규",
  "김승혁",
  "한길령",
  "허자용",
  "박희준",
  "강여현",
  "한성재",
  "Kinsa Durst",
  "장서윤",
  "김유진",
];

// 오늘 하루 동안은 항상 같은 값 (오늘 날짜 기준 고정 ID)
export function getClassId() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `class_${y}${m}${d}`;
}
