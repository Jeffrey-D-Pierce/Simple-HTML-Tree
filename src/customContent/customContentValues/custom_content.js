function customContent(itemInfo) {
  /* children
  Given the pagInfo, returns the img HTML with the screenshot
  */


  
  function description(itemInfo){
    let description = `<div title="${itemInfo.description}" class="description" >${itemInfo.description}</div>`;
    return description;
  }

  return `<div class='item-contents-display boxed-item'>
    <div class="item-header">
    <div class='item-title'>
      <div class='item-title-text' title='${
        itemInfo.title || "Title"
      }'>
        ${itemInfo.title || "Title"}
      </div>
    </div>
    </div>
    ${description(itemInfo)}
    </div>
  `
}
