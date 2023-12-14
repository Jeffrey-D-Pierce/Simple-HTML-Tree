import { Entity } from './entity.js'
import items from "./items.json" assert { type: "json" };

function displayItems() {
  let nodesHTML = "";
  items.forEach((item) => {
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
