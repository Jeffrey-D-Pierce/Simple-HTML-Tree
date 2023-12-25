function customContent(itemInfo) {
  /* children
  Given the pagInfo, returns the img HTML with the screenshot
  */
  function screenShot(itemInfo){
    return itemInfo && itemInfo.screenshotSrc
      ? `<img class='screeshot' src='${itemInfo.screenshotSrc}'/>`
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

  return `<div class='item-contents-display boxed-item'>
    <div class="item-header">
    <img class='favicon' src='${ itemInfo.faviconUrl || "./src/images/unknown-18-16.png"
    }'/>
    <div class='item-title'>
      <div class='item-title-text' title='${
        itemInfo.title || "Title"
      }'>
        ${itemInfo.title || "Title"}
      </div>
    </div>
    </div>
    ${screenShot(itemInfo)}
    <div class='notes'>
    ${notes(itemInfo.notes)}
    </div>
    </div>
  `
}
