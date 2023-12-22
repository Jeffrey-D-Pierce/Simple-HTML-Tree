(function() {
  let _itemsIndex = {}
  function render(hierarchyInformation){
    let { rootElement = "root", orientation, items, customContent } = hierarchyInformation
    const element = document.getElementById(rootElement)

    const orientations = ["horizontal", "vertical", "centered"]
    if (!orientations.includes(orientation)) orientation = "horizontal"
    orientations.forEach(o => element.classList.remove(o));
    element.classList.add(orientation);
    element.innerHTML = items ? displayItems(items, customContent) : "No Items Array";
  }

  function displayItems(items, customContent) {
    let nodesHTML = "";
    _itemsIndex = {};
    const item = items[0]
    item.rootItem = true
    item.customContent = item.customContent || customContent
    nodesHTML += Parent(item);
    return nodesHTML;
  }
  
  /* Parent
  Given the entityInfo and parentInfo
  Returns HTML for the entity and all children.
  */
  function Parent(entityInfo){
    const parentInfo = entityInfo.parent;
    _itemsIndex[`entity-${entityInfo.id}`] = entityInfo
    const childrenClass =
      entityInfo.children && entityInfo.children.length && !entityInfo.hideChildren ? "" : "no-children";
    return `
    <div id='entity-${entityInfo.id}' class='entity ${siblingClass(entityInfo, parentInfo)} ${childrenClass}'>

      <div class='entity-contents'>
        ${contents(entityInfo)}
      </div>
      <div class='children-container'>
        ${ children(entityInfo)}
      </div>
    </div>
    `;
  }

  /* children
  Given the parent, returns the rendered children as HTML
  */
  function children(parent){
    if (parent.hideChildren) return "";
    const children = parent.children;
    let cHTML = ''
    if (children && children.length > 0) children.forEach((child, i) => {
      //if (i > 1) return
      child.parent = parent;
      child.customContent = parent.customContent;
      cHTML += Parent(child);    
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

  // This is the default content rendering for an entity
  function contents(entityInfo){
    // If there is a title, use it, otherwise use the id
    function defaultTitle(entityInfo){
      const title = entityInfo.title || entityInfo.id
      return `<div class='entity-contents-display'>
      <div class='entity-title-text' title='${title}'>
        ${title}
        </div></div>`
    }

    return entityInfo.customContent ? entityInfo.customContent(entityInfo) : defaultTitle(entityInfo)
  }  

  function clearCustomContent () {
    const keys = Object.keys(_itemsIndex)
    keys.forEach((key) => _itemsIndex[key].customContent = undefined)
  }
  function itemsIndex(){
    return _itemsIndex
  }
  if (window) window.Parent_Child_Hierarchy = { render, clearCustomContent, itemsIndex }
  
})();

