
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

/* children
Given the pagInfo, returns the img HTML with the screenshot
*/
function screenShot(entityInfo){
  return entityInfo && entityInfo.screenshotSrc
    ? `<img class='screeshot' src='${entityInfo.screenshotSrc}'/>`
    : ``;
}

/* children
Given the parent, returns the rendered children as HTML
*/
function children(parent){
  const children = parent.children;
  let cHTML = ''
  if (children && children.length > 0) children.forEach(child => {
    child.parent = parent;
    cHTML += Entity(child);    
  });
  return cHTML;
}

/* siblingClass
Given entityInfo and parentInfo, returns the class needed to relate the entity to siblings.
*/
function siblingClass(entityInfo){
  const parentInfo = entityInfo.parent;
  let sibling = "orphan";
  if (parentInfo === undefined || parentInfo.children === undefined){
  } else if (parentInfo.children.length === 1){
    sibling = "only-child";
  } else if (parentInfo.children[0].id == entityInfo.id) {
      sibling = "first-child"
  } else if (parentInfo.children[parentInfo.children.length - 1].id == entityInfo.id){
      sibling = "last-child"
  } else if (parentInfo.children.length > 1){
      sibling = "middle-child"
  }
  return sibling;
}

/* entity
Given the entityInfo and parentInfo
Returns HTML for the entity and all children.
*/
export function Entity(entityInfo){
  const parentInfo = entityInfo.parent;
  const childrenClass =
    entityInfo.children && entityInfo.children.length ? "" : "no-children";
  return `
  <div id='${entityInfo.id}' class='entity ${siblingClass(entityInfo, parentInfo)} ${childrenClass}'>
    <div class='entity-contents'>
      <div class='entity-contents-display'>
        <div class="entity-header">
          <img class='favicon' src='${
            entityInfo.faviconUrl || "./src/images/unknown-18-16.png"
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
      </div>
    </div>
    <div class='children-container'>
      ${children(entityInfo)}
    </div>
  </div>
  `;
}

