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
        notesHTML += `<div title="${n}" class="note" >${n}</div>`;
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
