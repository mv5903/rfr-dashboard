#npm run start & nodemon backend/src/index.ts
echo "Starting rfr-dashboard..."
clear
# Check Node Version
echo "Checking if Node.js is installed..."
if type node > /dev/null 2>&1 && which node > /dev/null 2>&1 ;then
    VERSION_OUTPUT="$(node -v)"
    OUTPUT="$(echo $VERSION_OUTPUT | cut -d'v' -f2)"
    MAJOR="$(echo $OUTPUT | cut -d'.' -f1)"
    if [ $MAJOR -ge 18 ]; then
        echo "Node.js is installed and is at least version 18, continuing..."
    else
        echo "Node.js is installed but is not at least version 18, attempting to install latest version..."
        npm install -g npm
    fi
else
    echo "Node.js is not installed or has not been detected. Please install node and try again."
    exit 1
fi
# Install all dependencies
echo "Installing dependencies, if they don't already exist..."
echo "Running npm install..."
npm install
echo "Running npm install -g nodemon..."
npm install -g nodemon