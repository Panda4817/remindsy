# Remindsy Mobile Application

Reminds you to buy cards and presents for friends and family a week or 2 weeks in advance of their birthday and/or anniversary.

## Features I want to add
- Import birthdays/anniversaries from contacts and phone calendars
- Design a cool splash screen

## Requirements
- See package.json

## Run on local machine through wsl2
-  run on windows powershell
```
adb kill-server 
adb -a nodaemon server start
``` 
- run on wsl2 Bash terminal
```
expo start --tunnel
```
- If you see the message `Successfully ran adb reverse`, then everything worked
- Use qr to open on physical device or use link to open on an emulator
  
## Testing
- Run `yarn test -u` to update/ create snapshots for that day
- Then run `yarn test` again on the same day


