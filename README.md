# newza

Gerenciador de consumo elétrico.

## Usando componentes
https://ionicframework.com/docs/components

## Icones nos components
https://ionicons.com/

## Deploying
# https://ionicframework.com/docs/angular/your-first-app/6-deploying-mobile
ionic build www
ionic cap add android --verbose
ionic cap copy
ionic cap open android

https://ionicframework.com/docs/cli/commands/capacitor-run
https://ionicframework.com/docs/cli/livereload
https://ionicframework.com/docs/angular/your-first-app/6-deploying-mobile
https://stackoverflow.com/questions/59531305/call-retries-were-exceeded-exception-while-ng-build
node --max_old_space_size=4096 node_modules/@angular/cli/bin/ng build

ionic cordova build android --prod --release --verbose --max_old_space_size=40960
    ng run app:ionic-cordova-build:production --platform=android

# Assinar versão do APK
https://ionicframework.com/docs/v3/intro/deploying/

