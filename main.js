import './style.css'
import './keyboard.css'
import getRandomColor from './getRandomColor';
import * as Tone from 'tone';
import C4 from './piano/C4.mp3'
import D4 from '/piano/D4.mp3'
import E4 from '/piano/E4.mp3'
import F4 from '/piano/F4.mp3'
import G4 from '/piano/G4.mp3'
import A4 from '/piano/A4.mp3'
import B4 from '/piano/B4.mp3'
import C5 from '/piano/C5.mp3'
import D5 from '/piano/D5.mp3'
import E5 from '/piano/E5.mp3'

const noteToColor = {
  'C4': '#9b59b6',
  'C#4': '#8e44ad',
  'D4': '#e74c3c',
  'D#4': '#c0392b',
  'E4': '#e67e22',
  'F4': '#f1c40f',
  'F#4': '#f39c12',
  'G4': '#2ecc71',
  'G#4': '#27ae60',
  'A4': '#3498db',
  'A#4': '#2980b9',
  'B4': '#2c3e50'
};

const piano = new Tone.Sampler(
  { C4, D4, E4, F4, G4, A4, B4, C5, D5, E5 },
  {
    onload: () => {
      console.log('loaded');
      // piano.volume.value = props.volume || -1;
    }
  }
).toDestination();

document.addEventListener("DOMContentLoaded", function () {
  var canvas = document.getElementById("myCanvas");
  var ctx = canvas.getContext("2d");
  var intervalId, startX, startY, endX, endY, currentX, currentY, color;
  var duration = 500; // Duration in milliseconds
  var originalSteps = 20; // Original number of steps for a complete line
  var stepDuration = duration / originalSteps;

  function triggerDraw(note) {
    console.log(note)
    clearInterval(intervalId); // Clear previous interval if exists
    let steps = originalSteps; // Reset steps for each new line

    startX = Math.random() * canvas.width;
    startY = Math.random() * canvas.height;
    endX = Math.random() * canvas.width;
    endY = Math.random() * canvas.height;
    currentX = startX;
    currentY = startY;
    color = noteToColor[note]

    ctx.beginPath();
    ctx.moveTo(startX, startY);

    var stepX = (endX - startX) / steps;
    var stepY = (endY - startY) / steps;




    intervalId = setInterval(function () {
      if (steps-- > 0) {
        currentX += stepX;
        currentY += stepY;

        drawLine(ctx, currentX, currentY, color);
      } else {
        clearInterval(intervalId);
      }
    }, stepDuration);
  }



  function drawLine(ctx, x, y, color) {
    ctx.lineTo(x, y);
    ctx.strokeStyle = color;
    ctx.lineWidth = 10; // Width of the brush stroke
    ctx.stroke();
  }


  function play(note) {
    piano.triggerAttackRelease(note, 0.75)
    triggerDraw(note)
  }

  const keys = document.querySelectorAll('.keyboard li');
  keys.forEach(key => {
    key.addEventListener('click', () => {
      const note = key.getAttribute('data-note');
      play(note);
    });
  });
});

