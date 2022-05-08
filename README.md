# Software Soundboard
This is a Soundboard that a friend wanted for some reason, so I threw it together quickly in electron in my spare time one night.


# Requirements for building
  Node.JS: 
    https://nodejs.org/en/download/ (*NIX, Linux, And Windows)

  NPM:
    https://nodejs.org/en/download/ (*NIX, Linux, And Windows)

  Electron:
    chocolatey install electron (win 10/11/server2016-2022)
    npm install -g electron (*NIX systems && windows)
    snap install electron (Snap-configured Linux systems)
    or download it from https://www.electronjs.org/ (windows only)
    
    NOTE: ON WINDOWS THE PATH ENV VARIABLES SOMETIMES DO NOT GET SET. 
          IF YOU INSTALL NODEJS AND 'npm' IS NOT RECOGNIZED AS A COMMAND,
          YOU MAY NEED TO GET THE ENVIRONMENTAL VARIABLE FOR NODEJS MANUALLY.
          
# Build Process
  Step 1:
    clone this repo (git clone) or download it as a zip
    
  Step 2:
    navigate into directory
    
  Step 3:
    Run: npm install
   
  Step 4:
    Run:  npm install electron-builder --save-dev
    
  Step 5 (Windows Users):
    npm run dist-win
    
  Step 5 (Linux and MacOS Users):
    npm run dist-nix
    
 That's it, you should now have system binaries in a folder called ./dist
 
 
Prebuilt binaries are provided (of course) as revisions are made and pushed
