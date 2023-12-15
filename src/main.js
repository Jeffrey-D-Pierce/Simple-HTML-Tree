import { Entity } from './entity.js'
import items from "./items.json" assert { type: "json" };



function customContent(entityInfo) {
  /* children
  Given the pagInfo, returns the img HTML with the screenshot
  */
  function screenShot(entityInfo){
    return entityInfo && entityInfo.screenshotSrc
      ? `<img class='screeshot' src='${entityInfo.screenshotSrc}'/>`
      : ``;
  }

  /* notes
  given an array of notes
  return divs of the notes
  */
  function notes(notes){
    let notesHTML = ""
    if (notes && notes.length > 0){
      notes.map(n => {
        console.log(n)
        notesHTML += `<div>${n}</div>`;
      })
    }
    return notesHTML;
  }

  return `<div class="entity-header">
    <img class='favicon' src='${ entityInfo.faviconUrl || "./src/images/unknown-18-16.png"
    }'/>
    <div class='entity-title'>
      <div class='entity-title-text' title='${
        entityInfo.title || "Title"
      }'>
        ${entityInfo.title || "Title"}
      </div>
    </div>
    </div>
    ${screenShot(entityInfo)}
    <div class='notes'>
    ${notes(entityInfo.notes)}
    </div>
  `
}

function displayItems() {
  let nodesHTML = "";
  // For all the top level entities
  items.forEach((item) => {
    // Set the content rendering function for the entity and its childern
    item.customContent = customContent;
    item.rootItem = true
    nodesHTML += Entity(item);
  });
  return nodesHTML;
}

function renderMap(element, version){
  const orientation = version || 0;
  const orientations = ["horizontal", "vertical", "centered"]
  orientations.forEach(o => element.classList.remove(o));
  element.classList.add(orientations[orientation] );
  element.innerHTML = displayItems();
}

if (window) window.renderMap = renderMap


let draggableElement = document.getElementById('root');
let isDragging = false;
let originalMouseX, originalMouseY;

draggableElement.addEventListener('mousedown', function(e) {
    isDragging = true;
    //console.log(draggableElement.style)
    let orginalTranslation = getTranslateValues(draggableElement.style.transform);
    originalMouseX = e.clientX - orginalTranslation.x;
    originalMouseY = e.clientY - orginalTranslation.y;
    console.log('originalMouseX', originalMouseX, 'originalMouseY', originalMouseY)
});

document.addEventListener('mousemove', function(e) {
    if (isDragging) {
      let scaleValue = getScaleValue(draggableElement.style.transform);
      console.log('clientX', e.clientX, 'clientY', e.clientY)
      let deltaX = (e.clientX - originalMouseX) / scaleValue;
      let deltaY = (e.clientY  - originalMouseY) / scaleValue;
      console.log('deltaX', deltaX, 'deltaY', deltaY)
      // draggableElement.style.transform = `translate(${originalX + deltaX}px, ${originalY + deltaY}px)`;
      updateTranslation(draggableElement, deltaX, deltaY)
    }
});

document.addEventListener('mouseup', function(e) {
    if (isDragging) {
        isDragging = false;
    }
});


// Select the slider and the value display element
const slider = document.getElementById('scale-slider');
const sliderValueDisplay = document.getElementById('slider-value');

// Add an event listener for the 'input' event on the slider
slider.addEventListener('input', function() {
  // Update the display with the current value of the slider
  sliderValueDisplay.textContent = 'Current Value: ' + this.value;
  // Select the root element
  var rootElement = document.getElementById('root'); // replace 'root' with your actual root element's ID

  // Set the scale
  var scaleValue = this.value / 100; // for 80% scale

  // Apply the transform style to scale
  // rootElement.style.transform = 'scale(' + scaleValue + ')';
  updateScale(rootElement, scaleValue)
  rootElement.style.transformOrigin = 'top left'; // This sets the origin point of the scale transformation

});


function updateScale(element, newScale) {
  let transform = element.style.transform;
  let scaleRegex = /scale\(\d*\.?\d+\)/;
  let newScaleTransform = `scale(${newScale})`;

  if (transform.match(scaleRegex)) {
    element.style.transform = transform.replace(scaleRegex, newScaleTransform);
  } else {
    element.style.transform += ` ${newScaleTransform}`;
  }
}

function updateTranslation(element, newX, newY) {
  let scaleValue = getScaleValue(element.style.transform);
  let transform = element.style.transform;
  let adjustedX = newX * scaleValue;
  let adjustedY = newY * scaleValue;
  let translateRegex = /translate\(-?\d*\.?\d+px,\s*-?\d*\.?\d+px\)/g;
  let newTranslateTransform = `translate(${adjustedX}px, ${adjustedY}px)`;

  if (transform.match(translateRegex)) {
    element.style.transform = transform.replace(translateRegex, newTranslateTransform);
  } else {
    element.style.transform += ` ${newTranslateTransform}`;
  }
}


function getScaleValue(transformStyle) {
  // Regular expression to match the scale value
  let scaleRegex = /scale\((-?\d*\.?\d+)\)/;
  let defaultScale = 1; // Default scale (100%)

  // Search for the scale value
  let matches = scaleRegex.exec(transformStyle);

  // If a scale value is found, parse it to a float, otherwise default to 1
  let scaleValue = matches ? parseFloat(matches[1]) : defaultScale;
  // console.log('transformStyle', transformStyle, scaleValue)

  return scaleValue;
}

// Extract the translate values from the transform string
function getTranslateValues(transformString) {
  let translateRegex = /translate\((-?\d+\.?\d*)px,\s*(-?\d+\.?\d*)px\)/;
  let result = translateRegex.exec(transformString);
  // console.log('transformString', transformString, result)
  return result ? { x: parseFloat(result[1]), y: parseFloat(result[2]) } : { x: 0, y: 0 };
}