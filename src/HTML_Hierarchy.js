
/* children
Given the parent, returns the rendered children as HTML
*/
function children(parent){
  const children = parent.children;
  let cHTML = ''
  if (children && children.length > 0) children.forEach(child => {
    child.parent = parent;
    child.customContent = parent.customContent;
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
        ${contents(entityInfo)}
      </div>
    </div>
    <div class='children-container'>
      ${children(entityInfo)}
    </div>
  </div>
  `;
}


function contents(entityInfo){
  // If there is a title, use it, otherwise use the id
  function defaultTitle(entityInfo){
    const title = entityInfo.title || entityInfo.id
    return `<div class='entity-title-text' title='${title}'>
      ${title}
    </div>
    `
  }

  return entityInfo.customContent ? entityInfo.customContent(entityInfo) : defaultTitle(entityInfo)
}