# Simple HTML Tree

## Objectives

Create a simple HTML Tree that is easy-to-use (integrate, operate, and customize). This approach leverages JSON to control the data (entities and relationships), JavaScript to control the content, and CSS to control the visual appearance.

## Demo

[GitHub Pages](https://jeffrey-d-pierce.github.io/Simple-HTML-Tree/Simple_HTML_Tree.html)

Features:

- Custom Content - Toggle to switch between default and custom.
- Orientation - Select orientation to change root class (horizontal, vertical, or centered)
- Dynamic Content
  - Hidden notes: Click on any "Child with Notes" to see notes
  - Hidden chidren: Click on "Parent with hidden children" to show and hide children
- Scale - Adjust slider to scale the root element.
- Panning - Click and drag the tree to move it around

![Controls in the demo](/docs/images/demo.gif)

## How to use

### Minimum

The minimal configuration as demonstrated by minimum.html requires main.js to render the HTML and main.css to style the items and relationships.

![Alt text](./docs/images/minimum.png)

#### Files

- main.js - Creates the html using JavaScript templates
- main.css - Styles the entities and relationships

#### Item Data

The item data requires a unique id, and children items with unique id.

```JSON
  {
    "id": 1, 
    "items": [
      { "id": 2 } 
    ]
  }
```

#### Render

```JavaScript
      document.addEventListener('DOMContentLoaded', ()=>{
        const items = formatItems(YOUR_DATA)
        let instructions = {
          rootElement: undefined, // will default to "root", 
          orientation: undefined, // horizontal, vertical, or centered
          customContent: undefined, // If provided, all items will render using the same customContent, unless an item has been assigned customerContent
          items 
        }
        const indexedItems = Simple_Tree.render(instructions);
      })
    </script>
```

#### Orientation

Orientation is controlled in CSS by setting one of three classes (horizontal, vertical, centered) to the root element.

### Customization

#### Custom Item Data

The item data requires a unique id, and children items with unique id. All other data is optional.

```JSON
  {
    "id": 1, // Should be unique.
    "title": "Template variable", // This is the default label when there is no customContent, otherwise the id will display
    "notes": [], // Example Template variable
    "faviconUrl": "", // Example Template variable
    "customContent": "Function(item)" // Used to render content
    "items": [
      { "id": 2 } 
    ]
  }
```

#### Custom Content (customContent)

If there is a customContent function, it will be called with the itemInfo to render the item inside the div with the class "item-contents-display".

If there is no customContent function on the item, the title (if there is one) or id will display.

Set the customContent function once at the root item where it is inherited by all children. In the rendering of children, the customContent function is copied to the child along with a reference to the parent. The function customContent has access to the child and parent info.

## Realizations

### Hierarchies are not Graphs

Unlike graphs with nodes and edges, hierarchical data has a controller-to-controlled relationship such as parent-child or supervisor-subordinate. This makes identifying the relationships and managing them easier.

- Assumptions of inheritance are possible.
- The rectangle of space required for rendering is determined by the parent and all descendants.

### Horizontal vs. Vertical vs. Centered is controlled by the parent positioning the children

In the process of defining the CSS for this layout:
![CSS defined](./docs/images/horizontal_layout.png)

The CSS broke and this image is what triggered the realization.

![Broken CSS](./docs/images/vertical_vanilla.png)

### Rendering of relationships is controlled by sibling type

If an item has childeren, there is a line from the parent.
All childern have a line to toward the parent. Siblings have a connecting line to other siblings.
The connecting line is determined by the sibling order:

- only-child - only connection is to the parent. There are no connecting line to other siblings.
- first-child - the connecting line starts at the line to the parent and extends toward siblings.
- middle-child - the connecting line extends toward both the first-child and the last-child
- last-child - the connecting line starts at the line toward the parent and extends toward siblings.
