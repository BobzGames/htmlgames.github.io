Creating Base64 version of apk...

Create apk using android studio and rename .zip

Within the zip root (where AndroidManifest.xml is) ctrl+A all files and create new zip file - call it main.zip

Move main outside of the zip and upload to a online base64 decoder (e.g: http://www.motobit.com/util/base64-decoder-encoder.asp) with
o/p set to base64.bin. Once converted goto downloads folder and append .txt.

Open in textpad and replace \n with nothing to create a long string. Paste this long string into apk.js (which ever version is currently used)

This will form the skeleton apk.



