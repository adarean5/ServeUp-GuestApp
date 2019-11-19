// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: 'AIzaSyBPOgjmbV8Fexc_mSzyoNvC7PHZeNsJ5G4',
    authDomain: 'serveup-android-ba698.firebaseapp.com',
    databaseURL: 'https://serveup-android-ba698.firebaseio.com',
    projectId: 'serveup-android-ba698',
    storageBucket: 'serveup-android-ba698.appspot.com',
    messagingSenderId: '702266610802',
    appId: '1:702266610802:web:2e7d5ce412bc6569'
  },
  // baseUrlBackend: 'http://localhost:8000/api'
  baseUrlBackend: 'https://serveup-backend.herokuapp.com/api'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
