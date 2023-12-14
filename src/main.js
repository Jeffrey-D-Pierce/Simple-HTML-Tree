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
