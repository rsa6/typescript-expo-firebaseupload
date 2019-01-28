## Typescript ReactNative With Firebase Upload

### 폴더 분리
- src
- components
- action

## install
- yarn add firebase
- yarn add -D @types/firebase

## functions 
- camera
- image picker from (camera roll)
- camera flip...
- firebase upload image
- firebase notification (need expo login on bash)

## firebase setting
- storage permission config (anyone can upload)
- made folder in storage

## notification setting
```
curl -H "Content-Type: application/json" -X POST "https://exp.host/--/api/v2/push/send" -d '{
  "to": "ExponentPushToken[get token here]",
  "title":"hello",
  "body": "world"
}'
```
- 나중에는 푸싱서버 만들어야 하는데 expo 측에서 노드버전 공개해놓았다.