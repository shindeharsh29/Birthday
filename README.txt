THE MUSEUM OF MY LOVE — setup notes
====================================

This is a complete, working site: index.html, index.css, script.js.
Open index.html in a browser and everything works right now (carousel,
envelope letter with typewriter effect, confetti, fireworks, floating
hearts, scroll reveal, music toggle).

To personalize it:

1. PHOTOS
   Drop 5 images into the "images" folder, named exactly:
     photo1.jpg, photo2.jpg, photo3.jpg, photo4.jpg, photo5.jpg
   (jpg or png both fine — just keep the same filenames, or edit the
   src attributes in index.html if you want different names.)
   Until you add real photos, each slide will just show its caption
   over a soft gradient background, so nothing looks broken.

2. MUSIC
   Drop an mp3 into the "music" folder named:
     birthday.mp3
   Click the 🎵 button (top right) to play/pause it.

3. THE LETTER
   Open script.js and find the `message` variable inside the
   "ENVELOPE + TYPEWRITER LETTER" section — edit the text there to
   whatever you want the letter to say.

4. COLORS / TEXT
   All the wording (hero title, museum text, final birthday message)
   is plain text right in index.html — search and edit directly.
   Colors and spacing are in index.css if you want to adjust the palette.

No external libraries are required — it's plain HTML/CSS/JS, so it'll
work the same way anywhere you host it (just keep all three files and
the images/music folders together).
