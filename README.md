# newza

Gerenciador de consumo elétrico.

## Usando componentes
https://ionicframework.com/docs/components

## Icones nos components
https://ionicons.com/

## Deploying
# https://ionicframework.com/docs/angular/your-first-app/6-deploying-mobile
# Pré

https://ionicframework.com/docs/cli/commands/capacitor-run
https://ionicframework.com/docs/cli/livereload
https://ionicframework.com/docs/angular/your-first-app/6-deploying-mobile
https://stackoverflow.com/questions/59531305/call-retries-were-exceeded-exception-while-ng-build


altere a versão do config.xml e packge.json

rm www -R | ionic build www | ionic cap add android --verbose | ionic cap copy | ionic cap open android

node --max_old_space_size=4096 node_modules/@angular/cli/bin/ng build
# Ciclo de Geração (as vezes é preciso remover a pasta platforms)

# altere a versão do config.xml e packge.json

https://stackoverflow.com/questions/39705491/error-source-path-does-not-exist-resources-android-icon-drawable-hdpi-icon-png

------------------------
Caso de erro:
[ERROR] An error occurred while running subprocess cordova.
        cordova platform add android --save exited with exit code 1.

Solução: sudo rm platforms -R | cordova platform add android | cordova platform add ios

Solução 2:
Removed android platform (ionic cordova platform remove android)
Deleted node_modules folder
Manually updated dependencies versions on package.json, according to the versions on the package.json from my blank project.
Ran npm install
Reinstalled android platform (ionic cordova platform add android)

Solução 3: 
npm cache clean --force
npm install
npm install --save-dev @angular-devkit/build-angular
npm install --save-dev @angular-devkit/core
https://github.com/angular/angular-cli/issues/16868

TESTE
npm run build

Solução 4:
https://stackoverflow.com/questions/39705491/error-source-path-does-not-exist-resources-android-icon-drawable-hdpi-icon-png

ionic integrations enable cordova --add

cordova clean
------------------------

ng run app:ionic-cordova-build:production --platform=android

ionic cordova build android --prod --release --max_old_space_size=40960 

# Assinar versão do APK
cp /home/heverton/Projetos/NewZaWorkspace/newza-frontend/platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk /home/heverton/Projetos/NewZaWorkspace/newza-backend/src/main/resources/release

cd ../newza-backend/src/main/resources/release

jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore newza-android-senha-padrao.jks app-release-unsigned.apk my-alias

## sudo apt install zipalign -y

zipalign -v 4 app-release-unsigned.apk app-release-1.6.0.apk

rm app-release-unsigned.apk

## sudo apt install apksigner -y

apksigner verify app-release-1.6.0.apk

https://ionicframework.com/docs/v3/intro/deploying/

### Dica install
ionic integrations disable capacitor




