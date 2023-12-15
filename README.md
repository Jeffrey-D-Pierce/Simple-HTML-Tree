# Vanilla HTML Hierarchical Relationships

## Expectations

### Item Data

The item data requires a unique id, and children with unique id. All other data is optional.

```JSON
  {
    "title": "Template variable", // This is the default label when there is no customContent, otherwise the id will display
    "id": 1, // Must be unique
    "notes": [], // Template variable
    "faviconUrl": "Template variable",
    "children": [
      { "id": "Must be unique" }
    ]
  }
```

### Custom Content (customContent)

If there is no customContent function on the item, the title (if there is one) or id will display in the rectangle.

If there is a customContent function, it will be called with the itemInfo to render the item.

The function customContent is set at the root item and inherited by all children. In the rendering of children, the customContent function is copied to the child along with a reference to the parent. The function customContent has access to the child and parent info.

## Realizations

### Nodes and Edges are specific to graphs

Hierarchical data has a controller-to-controlled relationship such as parent-child or supervisor-subordinate.

### Horizontal vs. Vertical vs. Centered is controlled by the parent positioning the children

After coding this layout:
![Alt text](./documentation/images/horizontal_layout.png)

The CSS broke and this image is what triggered the realization.

![Alt text](./documentation/images/vertical_vanilla.png)

### Rendering of relationships is controlled by sibling type

If an item has childeren, there is a line from the parent.
All childern have a line to toward the parent.
The connecting line is determined by the sibling order:

- only-child - has no connecting line to other siblings.
- first-child - the connecting line starts at the line to the parent and extends toward siblings.
- middle-child - the connecting line extends toward both the first-child and the last-child
- last-child - the conntecting line starts at the line toward the parent and extends toward siblings.
