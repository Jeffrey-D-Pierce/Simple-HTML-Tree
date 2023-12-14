# Vanilla HTML Hierarchical Relationships

## Expectations

The items data minimal shape requires a unique id, and children with unique id:

```JSON
  {
    "title": "Template variable",
    "id": 1, // Must be unique
    "notes": [], // Template variable
    "faviconUrl": "Template variable",
    "children": [
      { "id": "Must be unique" }
    ]
  }
```

## Realizations

### Nodes and Edges are specific to graphs

Hierarchical is a controller-to-controlled relationship such as parent-child or supervisor-subordinate.

### Horizontal vs. Vertical vs. Centered is controlled by the parent positioning the children

![Alt text](./documentation/images/vertical_vanilla.png)