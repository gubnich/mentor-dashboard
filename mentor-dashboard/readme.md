# Mentor-dashboard
## Structure
* parser
  * data - исходные данные [отсюда](https://drive.google.com/drive/folders/1ULj8KjnNNCgUdGunQ1TY00dNbCsqAsHW), откорректированные вручную после выявления ошибок скриптом parser.js
  * parser.js - запускается командой **npm run parser**. Обрабатывает файлы в папке data и кладет получившийся school.json в папку public. Если в папку data положить необработанные файлы [отсюда](https://drive.google.com/drive/folders/1ULj8KjnNNCgUdGunQ1TY00dNbCsqAsHW), то скрипт выдаст ошибки, которые в них содержатся и которые нужно исправлять вручную.
* React приложение.
