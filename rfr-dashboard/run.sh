#npm run start & nodemon backend/src/index.ts
red="\033[1;31m"
green="\033[1;32m"
yellow="\033[1;33m"
reset="\033[0m"

echo -e "Starting rfr-dashboard...\n"
# Check Node Version
echo -e "${yellow}Checking if Node.js is installed..."
if type node > /dev/null 2>&1 && which node > /dev/null 2>&1 ;then
    VERSION_OUTPUT="$(node -v)"
    OUTPUT="$(echo $VERSION_OUTPUT | cut -d'v' -f2)"
    MAJOR="$(echo $OUTPUT | cut -d'.' -f1)"
    # Version 18 is the minimum required version because of the addition of native fetch support, which is used in the backend.
    # Would rather use the native fetch api then a package like node-fetch.
    if [ $MAJOR -ge 18 ]; then
        echo -e "${green}Node.js is installed and is at least version 18, continuing...\n"
    else
        echo -e "${yellow}Node.js is installed but is not at least version 18, attempting to install latest version...\n"
        npm install -g npm
    fi
else
    echo -e "${red}Node.js is not installed or has not been detected. Please install node and try again.\n"
    exit 1
fi
# Check if secrets file exists, containing api keys and such
echo -e "${yellow}Checking if secrets file exists..."
FILE="./src/secrets.js"
if [ -f "$FILE" ]; then
    echo -e "${green}$FILE exists.\n${reset}"
else 
    echo -e "${red}FATAL: $FILE does not exist. Please create it and try again."
    exit 1
fi

# Install all dependencies
echo "Installing dependencies, if they don't already exist..."
echo "Running npm install..."
npm install
echo "Running npm install -g nodemon..."
npm install -g nodemon
echo -e "${yellow}Installation finished. Starting rfr-dashboard (this may take a little while. Wait for a new browser window to pop up with dashboard!)...${reset}"
npm run start & nodemon backend/src/index.ts