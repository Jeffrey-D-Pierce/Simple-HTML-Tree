import { Entity } from './entity.js'
import { customContent } from "./custom_content.js";
import { dragControl, updateScale } from "./drag_control.js"
import items_html from "./items_html.json" assert { type: "json" };
import items_example from "./items.json" assert { type: "json" };
let items = items_html;

document.addEventListener('mousedown', function(e) {
  const elementRect = e.target.getBoundingClientRect();
  const elementLeftEdge = elementRect.left;
  
  if (e.clientX < elementLeftEdge) {
      console.log('Mouse click on a sibling connector line');
  }
});


function displayItems() {
  let nodesHTML = "";
  const item = items[0]
  // For all the top level entities
//  items.forEach((item) => {
    // Set the content rendering function for the entity and its childern
  item.customContent = customContent;
  item.rootItem = true
  nodesHTML += Entity(item);
//  });
  return nodesHTML;
}

function renderMap(element, style){
  const orientation = style || 0;
  const orientations = ["horizontal", "vertical", "centered"]
  orientations.forEach(o => element.classList.remove(o));
  element.classList.add(orientations[orientation] );
  element.innerHTML = displayItems(customContent);
}

if (window) window.renderMap = renderMap
dragControl('root')

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

});

document.getElementById('example-data-select').addEventListener('change', (event) => {
  if(event.target.value === "0") {
    items = items_html
  } else {
    items = items_example
  }
  renderMap(document.getElementById("root"));
});


 
