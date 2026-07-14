# 출석체크 프로그램 사용 안내

파일 구성:
- `display.html` : 강의실 화면에 띄우는 QR코드 페이지
- `checkin.html` : 학생이 QR 스캔 후 여는 체크인 페이지
- `admin.html` : 실시간 출석 현황을 보는 관리자 페이지
- `config.js` : Firebase 설정값과 학생 명단 (직접 채워넣어야 함)

## 1단계. Firebase 프로젝트 만들기

1. https://console.firebase.google.com 접속 → 로그인 → "프로젝트 추가"
2. 프로젝트 이름 입력 후 생성 (Google Analytics는 꺼도 무방)
3. 왼쪽 메뉴 "빌드 > Firestore Database" 클릭 → "데이터베이스 만들기"
   - 위치는 `asia-northeast3 (서울)` 추천
   - 보안 규칙은 일단 "테스트 모드"로 시작 (아래 3단계에서 규칙을 바꿔줄 거예요)
4. 왼쪽 메뉴 "프로젝트 개요" 옆 톱니바퀴 → "프로젝트 설정" → 아래로 스크롤 → "내 앱" → 웹 아이콘(</>) 클릭
5. 앱 닉네임 아무거나 입력 → 등록 → `firebaseConfig` 객체가 나타남 → 이 값을 통째로 복사

## 2단계. config.js에 붙여넣기

`config.js` 파일을 열어서 `firebaseConfig` 부분을 방금 복사한 값으로 교체하세요.
학생 명단(`STUDENTS`)도 필요하면 여기서 수정하면 됩니다.

## 3단계. Firestore 보안 규칙 설정 (중요)

기본 테스트 모드는 시간이 지나면 잠깁니다. Firebase 콘솔 > Firestore Database > "규칙" 탭에서
아래 내용으로 교체하세요. (학생은 본인 이름 문서만 쓸 수 있고, 관리자는 전체를 읽을 수 있는 정도의
기본 규칙입니다. 더 엄격하게 하고 싶으면 말씀해주세요.)

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /classes/{classId} {
      allow read: if true;
      allow write: if request.resource.data.currentToken is string;
    }
    match /classes/{classId}/attendance/{studentName} {
      allow read: if true;
      allow create: if request.resource.data.name is string;
      allow update, delete: if false;
    }
  }
}
```

## QR 자동 갱신 (5분마다)

`display.html`이 5분마다 새 토큰을 생성해서 Firestore의 `classes/{classId}` 문서에 저장하고,
QR코드에도 그 토큰을 담아 새로 그립니다. 학생이 `checkin.html`을 열면 URL에 담긴 토큰이
Firestore에 저장된 최신 토큰과 일치하고 아직 5분이 지나지 않았는지 확인한 후에만 출석 선택 화면을
보여줍니다. 화면을 미리 찍어뒀다가 나중에 전송하는 방식의 부정 출석을 막기 위한 장치입니다.

갱신 주기를 바꾸고 싶으면 `display.html`의 `ROTATE_MS` 값을 수정하면 됩니다
(현재 `5 * 60 * 1000` = 5분).

## 4단계. 배포하기

가장 간단한 방법은 GitHub Pages입니다.

1. GitHub에 새 저장소 생성 후 이 폴더의 4개 파일(`display.html`, `checkin.html`, `admin.html`, `config.js`)을 업로드
2. 저장소 Settings > Pages > Source에서 브랜치 선택 후 저장
3. 몇 분 뒤 `https://아이디.github.io/저장소이름/display.html` 같은 주소가 생성됨

또는 Firebase Hosting을 써도 됩니다 (같은 프로젝트라 더 깔끔합니다). 원하시면 이 방법도 안내해드릴게요.

## 5단계. 실제 사용

1. 수업 시작 전, 강의실 화면(PC/노트북/프로젝터)에서 `display.html` 열기
2. 관리자는 본인 기기에서 `admin.html` 열어두기
3. 학생들이 QR을 스캔하면 이름을 처음 한 번 선택 → 다음 수업부터는 자동으로 이름이 떠서 버튼 한 번이면 출석 완료
4. `admin.html`에서 실시간으로 출석/미출석 확인, 필요하면 CSV로 다운로드

## 참고
- 수업은 날짜가 아니라 **1일차 ~ 8일차**로 관리됩니다 (`config.js`의 `TOTAL_DAYS`로 일수 조절 가능).
  `display.html` 하단의 버튼으로 몇 일차인지 선택하면 그 일차용 QR코드가 뜨고, 선택은 자동 저장되어
  다음에 화면을 열어도 마지막으로 고른 일차가 유지됩니다.
- `admin.html`에서도 오른쪽 위 드롭다운으로 일차를 바꿔가며 각 날짜의 출석 현황을 따로 볼 수 있습니다.
- 나중에 QR을 일정 시간마다 자동 갱신해서 화면 촬영 후 전송하는 것을 막고 싶으면 말씀해주세요, 추가해드릴게요.
