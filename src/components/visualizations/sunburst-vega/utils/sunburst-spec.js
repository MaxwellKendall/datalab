export default {
  "$schema": "https://vega.github.io/schema/vega/v5.json",
  "width": 600,
  "height": 600,
  "padding": 5,
  "autosize": "none",

  "data": [
  {
    "name": "tree",
    "transform": [
      {
        "type": "stratify",
        "key": "id",
        "parentKey": "parent"
      },
      {
        "type": "partition",
        "field": "size",
        "sort": {"field": "value"},
        "as": ["a0", "r0", "a1", "r1", "depth", "children"]
      },
      {
        "type": "partition",
        "field": "agency",
      },
      {
        "type": "partition",
        "field": "colorHex"
      }

    ]
  }
],

  "scales": [
  {
    "name": "xscale",
    "type": "linear",
    "range": [0, {"signal": "2 * PI"}]
  },
  {
    "name": "yscale",
    "type": "sqrt",
    "range": [0, {"signal": "width / 2"}]
  }
],

  "marks": [
  {
    "type": "arc",
    "from": {"data": "tree"},
    "encode": {
      "enter": {
        "x": {"signal": "width / 2"},
        "y": {"signal": "height / 2"},
        "fill": {"signal": "datum.colorHex"},
        "opacity": {"signal": "datum.depth > 1 ? (datum.depth === 2 ? .7 : .4) : 1"},
        "tooltip": {"signal": "'Name: ' + datum.name + ', Type: ' + datum.type + ', Agency: ' + datum.agency + ', id: ' + datum.id + (datum.parent ? ', ' + datum.parent + ' parent' : '') + (datum.size ? ', ' + datum.size + ' size' : '')"}
      },
      "update": {
        "startAngle": {"scale": "xscale", "signal": "max(0, min(2 * PI, datum.a0))"},
        "endAngle": {"scale": "xscale", "signal": "max(0, min(2 * PI, datum.a1))"},
        "innerRadius": {"scale": "yscale", "signal": "max(0,datum.r0)"},
        "outerRadius": {"scale": "yscale", "signal": "max(0, datum.r1)"},
        "stroke": {"value": "white"},
        "strokeWidth": {"value": 0.5},
        "zindex": {"value": 0},
      },
      "hover": {
        "stroke": {"value": "#ddd"},
        "strokeWidth": {"value": 2},
        "zindex": {"value": 1}
      },
      "click": {
        "stroke": {"value": "#ddd"}
      }
    }
  }
]
}