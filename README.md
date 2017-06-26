Mobile Application for the Museum of La Rochelle as part of an internship of end of bachelor at l3i of the university of La Rochelle.

Two versions are currently available :
* A Native Android App in the NativeAndroidApp folder which sends data to a remote server (here a dumb server for simulation)
    * Platform-specific skills
    * Highest	performance
    * Full access to device capabilities
* A [Mobile Web Application](https://museum-26191.firebaseapp.com/) in the MobileWebApplication folder
    * Fully hosted in the mobile browser
    * Slowest
    * No access to device capabilities


Before starting the dumb server :
1. Change the host and port on the line 31 in Server/app.py
2. Change the values of SERVER_BASE_URL and PARAM_PORT on the lines 26 and 27 of the NetworkUtils class of the Native Android App

To start the dumb server :


    python Server/app.py


|                        |      **Native**     |        **HTML5**       |
|------------------------|---------------------|------------------------|
| **App Features**       |                     |                        |
| Graphics               | Native APIs         | HTML, Canvas, SVG      |
| Performance            | Fast                | Slow                   |
| Native look and feel   | Native              | Emulated               |
| Distribution           | Appstore            | Web                    |
| **Device Access**      |                     |                        |
| Camera                 | Yes                 | No                     |
| Notifications          | Yes                 | No                     |
| Contacts, calendar     | Yes                 | No                     |
| Offline storage        | Secure file storage | Shared SQL             |
| Geolocation            | Yes                 | Yes                    |
| **Gestures**           |                     |                        |
| Swipe                  | Yes                 | Yes                    |
| Pinch, spread          | Yes                 | No                     |
| **Connectivity**       | Online and offline  | Mostly online          |
| **Development skills** | ObjectiveC, Java    | HTML5, CSS, Javascript |