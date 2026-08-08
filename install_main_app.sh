

cd ~
sudo apt-get update

mkdir -p ~/deb
################
#donloads
#google chrome
(
if [ ! -f ~/deb/google-chrome-stable_current_amd64.deb ]; then
    wget -P ~/deb https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
fi
)&
wait
################
# vscode 
(sudo apt-get install -y code)&
# git
(sudo apt-get install -y git)&
# nodejs
(sudo apt-get install -y nodejs)&
# npm
(sudo apt-get install -y npm)&
#google chrome
(sudo apt install  ~/deb/google-chrome-stable_current_amd64.deb)&

echo "apt-get apps"
wait
################
# vlc
(sudo snap install vlc)&
# Sublime Text
(sudo snap install sublime-text --classic)&
(sudo snap remove gedit)&
# opencode
(sudo snap install opencode --classic)&
echo "snap apps"
wait
############################
npm init -y
# angular-cli
(npm i -g angular-cli)&
# playwright
(
    npm i playwright
    npx playwright install chromium
)&
# faker 
(npm i  @faker-js/faker)&
echo "npm packages"
wait
