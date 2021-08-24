# Remindsy Mobile Application

Reminds you to buy cards and presents for friends and family a week or 2 weeks in advance of their birthday and/or anniversary.

## Feature I want to add
- Import birthdays and anniversaries from contacts and phone calendar with one click from the settings screen

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


