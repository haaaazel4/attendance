// ====== 여기에 본인의 Firebase 프로젝트 설정값을 붙여넣으세요 ======
// Firebase 콘솔 > 프로젝트 설정 > 일반 > 내 앱 > SDK 설정 및 구성 에서 확인 가능
export const firebaseConfig = {
  apiKey: "AIzaSyBswJzF2fGhi5qvspk5dbFlKlD_XpN6voM",
  authDomain: "wesabootcamp.firebaseapp.com",
  projectId: "wesabootcamp",
  storageBucket: "wesabootcamp.firebasestorage.app",
  messagingSenderId: "761452747019",
  appId: "1:761452747019:web:75865d2121e9c99b6e6a0e",
};

// ====== 고정 학생 명단 (필요하면 자유롭게 수정하세요) ======
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

// ====== 전체 교육 일수 ======
export const TOTAL_DAYS = 8;

// N일차의 수업 ID를 만들어줍니다. (예: 1일차 -> "day1")
export function getClassIdForDay(day) {
  return `day${day}`;
}

