#Native5 Slider Widget
A styled slider widget for touch based devices.

![Slider Image](https://s3.amazonaws.com/cdn.native5.com/slider-example.png)

##Usage

```javascript
var slider = new native5.ui.Slider("#slider",{
    handle : ".n5-slider-handle",
    min : 0,
    max : 100,
    unit : 'Dollars',
    title : 'Amount',
    val : 25
});
```
Additional operations on the slider:

* `value` : Get/set the current value of the slider. : `slider.value`, `slider1.value = 23` 
* `delete` : Destroy the slider : `slider.delete`
* `reconfig` : Updates the values of existing slider widget  : `slider.reconfig(params)`  
Parameters: min, max, initval, unit (Described in the configuration section)
* `enabled` : When passed with a parameter(boolean), toggles the slider, otherwise returns the current state  
    *  `slider1.enabled(true)` : Enables the slider 
    *  `slider1.enabled` : Boolean, indicating whether slider is enabled.
* `slide` : Moves slider handle to a position, in percentage of the range specified  : `slider.slide(60)`

##Configuration
The widget takes several configurational params along with the container element:

* `container` : HTML element container for the slider widget. (Required)
* `handle` : HTML element for the slider handle. If no handle is provided, a default handle is automatically created, with the class ```n5-slider-handle```.
* `initval` : Initial Value for the slider. Default : 0 
* `min, max` : minimum and maximum value of slider range. Default : 0,100 
* `stepsize` : The number of steps you would like to break a unit step into. For example, if you want a 0.25 increment value, your stepsize will be 4. Default : 1.
* `unit` : Unit to display for the value subtitle. Default : "Units".
* `title` : Display Title. Default : "Slider".

##Styling
If slider specific styling is needed, the following CSS class names can be used:

* n5-slider: The slider container box
* n5-slider-handle: The slider handle
* n5-slider-slide: The slide bar of the slider widget
* n5-slider-value: The value box of slider widget

##Dependencies 
* jQuery Core

##Browser Compatibility
Compatible and tested on :

* Android 4.0+, 
* Mobile Safari 5.0+, 
* IE Mobile 10

##Authors
* Anurag Dadheech

Copyright &copy; Native5 2013 | MIT
