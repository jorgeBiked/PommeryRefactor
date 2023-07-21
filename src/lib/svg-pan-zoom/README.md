Inspired by *react-native-svg-pan-zoom* by garblovians.
You can find the original library's link at [Github](https://github.com/garblovians/react-native-svg-pan-zoom).

## What's new

The following describes the changes performed to the original library.

**Drag bounding box**

When the SVG is dragged (pan), it is allowed to move beyond the boundaries of the containing view. However, this 
would cause some empty space to be visible on screen with no practial effect. There is a parameters that specifies 
what percentage of the SVG should be always visible on screen. For instance, a percentage of 0.2 would allow the 
user to pan the SVG until only 20% of it is visible on the screen.

File(s) changed:

 - util.ts

 Function(s) changed:

 - getBoundedTouchTransform

 Summary of changes:

 - Update extendPercentage to a value of **0.9**.
 - Create a new variable, **extendLimitH**, that holds the vertical limits for the SVG.