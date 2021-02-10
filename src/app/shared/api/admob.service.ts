import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { AdMobFreeBanner, AdMobFreeBannerConfig } from '@ionic-native/admob-free/ngx';

@Injectable({
    providedIn: 'root'
})
export class AdmobService {

    // TODO Verificar pq não esta funcionando o ADWORKS

    // https://medium.com/@alejandrolp1986/monetize-your-app-with-admob-in-your-ionic-5-app-2a0688e5a482

    // BANNER CONFIG
    bannerConfig: AdMobFreeBannerConfig = {
        isTesting: true, // KEEP DURING CODING, REMOVE AT PROD.
        autoShow: true,
        id: 'ca-app-pub-2442768927794927~8058339253'
    };

    // ADD PLATFORM Y ADMOB AT CONSTRUCTOR.
    constructor( public platform: Platform, private admobFree: AdMobFreeBanner ) {
        // LOAD ADS AT PLATFORM READY PROMISE.
        platform.ready().then(() => {
            // BANNER
            this.admobFree.config(this.bannerConfig);
            console.log('INTERSTIAL LOADED');
        }).catch(e =>
            console.log('PROBLEM LOADING INTERSTITIAL: ', e)
        );

        // CHECK AND SHOW BANNER
        this.admobFree.prepare().then(() => {
            console.log('BANNER LOADED');
        }).catch(e =>
            console.log('PROBLEM LOADING BANNER: ', e)
        );
    }

    showBanner() {
        // CHECK AND SHOW BANNER
        this.admobFree.prepare().then(() => {
            console.log('BANNER LOADED');
        }).catch(e =>
            console.log('PROBLEM LOADING BANNER: ', e)
        );
    }
}
