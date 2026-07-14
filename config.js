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
  "가재발",
  "최유정",
  "최준혁",
  "최승린",
  "손태양",
  "두인경",
  "김경미",
  "황선영",
];

// 오늘 날짜 기준 수업 ID를 만들어줍니다. (예: 20260714)
// 필요하면 수업 이름 등을 앞에 붙여서 커스터마이징 가능합니다.
export function getTodayClassId() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `class_${y}${m}${d}`;
}
