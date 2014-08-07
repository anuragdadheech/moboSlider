var mobo = (function(mobo){
    var is_touch_device = 'ontouchstart' in document.documentElement;   
    var startx = 0;
    var starty = 0;
    var dist = 0;
    var disty = 0;
    var touchmove = false;
    var isVertical = false;

    mobo.ui = mobo.ui || {};

    var Handle = function(handleContainer) {
        Object.defineProperty(
            this, 
            "_elem", {
                value: handleContainer
            }
            );
    };

    var createHandle = function(handleContainer){
        var handleItem = new Handle(handleContainer);           
    };


    /**
     * Creates a new slider for mobile devices.
     * Usage : 
     *      var slider = new mobo.ui.Slider('.my-element', {});
     *      
     *
     */
    mobo.ui.Slider = function(container, params){

        var opts = params || {};
        var handle = opts.handle;
        var initVal = opts.val || 0;
        var min = opts.min || 0;
        var max = opts.max || 100;
        var unit = opts.unit || "Units";
        var title = opts.title || "Slider";
        var stepsize = opts.step || 1;

        var _range = max - min;
        var _value;
        var el = $(container)[0];

        if (!handle){
            $(container).append("<div class = 'mobo-slider-handle mobo-state-default mobo-corner-all'></div>");
        }


        var sliderHandle = $(".mobo-slider-handle", container);
        var sliderSlide = $(".slide-fill", container);
        var sliderLeft = $(sliderSlide).offset().left;
        var sliderLength = $(sliderSlide).width();
        var sliderValue = $(".value-main", container);
        var handleLeft = $(sliderHandle).offset().left;
        var handleWidth = $(sliderHandle).outerWidth();
        var handleRight = handleLeft + handleWidth;
        var sliderRight = sliderLeft + sliderLength;
        var handlePos;


        //TODO: Bind all events within the function below.
        //bindEvents();
        setUnits();
        sliderHandle.css("left", (((initVal-min)*100)/_range) + "%" );
        updateValue();
        

        window.addEventListener("orientationchange", 
                function() {
                    sliderHandle = $(".mobo-slider-handle", container);
                    sliderSlide = $(".slide-fill", container);
                    sliderLeft = $(sliderSlide).offset().left;
                    sliderLength = $(sliderSlide).width();
                    sliderHandle = $(".mobo-slider-handle", container);
                    sliderValue = $(".value-main", container);
                    handleLeft = $(sliderHandle).offset().left;
                    handleWidth = $(sliderHandle).outerWidth();
                    handleRight = handleLeft + handleWidth;
                    sliderRight = sliderLeft + sliderLength;
                    updateValue();
                }, false);

        if (window.navigator.msPointerEnabled) { // For IE Mobile
            el.addEventListener("MSPointerDown", onTouchStart, false);
            el.addEventListener("pointerdown", onTouchStart, false);
            el.addEventListener("MSPointerMove", onTouchMove, false);
            el.addEventListener("pointermove", onTouchMove, false);
            el.addEventListener("MSPointerUp", onTouchEnd, false);
            el.addEventListener("pointerup", onTouchEnd, false);
        } else {
            el.addEventListener("touchstart", onTouchStart, false);
            el.addEventListener("touchend", onTouchEnd, false);
            el.addEventListener("touchleave", onTouchEnd, false);
            el.addEventListener("touchmove", onTouchMove, false);

            el.addEventListener("mousedown", onTouchStart, false);
            el.addEventListener("mouseup", onTouchEnd, false);
            // el.addEventListener("touchleave", onTouchEnd, false);
            el.addEventListener("mousemove", onTouchMove, false);
            console.log("initialized.");
        }

        function setUnits(){
            var start = $(".slider-start-value", container);
            start.html(min);
            var end = $(".slider-end-value", container);
            end.html(max);
            var type = $(".value-type", container);
            type.html(unit);
            var sTitle = $(".slider-title", container);
            sTitle.html(title);
        }

        function updateValue(){
            handleLeft = sliderHandle.css("left");
            _value = (Math.round((((parseInt(handleLeft, 10))/sliderLength)*_range) + min)).toFixed(2);
            if (stepsize == 1){
                _value = Math.round(_value);
            }
            sliderValue.val(_value);
        }

        function onTouchStart(e) {
            if (window.navigator.msPointerEnabled) {
                startx = e.pageX;
                starty = e.pageY;
            } else {
                var touchObj = e.changedTouches[0];
                startx = touchObj.pageX;
                starty = touchObj.pageY;
            }
            handlePos = startx - sliderLeft - handleWidth/2;
            
        }

        function onTouchEnd(e){
            if(!isVertical){
                e.preventDefault();
                updateValue();

                sliderValue.trigger("change");
            }
                
        }

        function onTouchMove(e) {
            touchmove = true;
            if (window.navigator.msPointerEnabled) {
                var dist = e.pageX - startx;
                var disty = e.pageY - starty;
            } else {
                var touchObj = e.changedTouches[0];
                var dist = touchObj.pageX - startx;
                var disty = touchObj.pageY - starty;
            }
            if((disty<-5)){
                isVertical = true;
            }
            else{
                isVertical=false;
                e.preventDefault();
                var finalPos = handlePos + dist;
                if (finalPos>0 && finalPos<sliderLength) {
                    sliderHandle.css("left", finalPos);
                } else if (finalPos<0){
                    sliderHandle.css("left", 0);
                } else if (finalPos>sliderLength){
                    sliderHandle.css("left", "100%");
                }
                updateValue();
            }
        }

        Object.defineProperties(this, {
            __elem: {
                value: container
            },
            handle: {
                value: createHandle(handle)
            },
            value: {
                get: function(){
                    return _value;
                },
                set: function(val, percent){
                    if (percent){
                        $(container).find(".mobo-slider-handle").css("left", val + "%" );
                    updateValue();
                    } else{
                        var position = ((val - min)/_range) * 100;
                        $(container).find(".mobo-slider-handle").css("left", position + "%" );
                        updateValue();
                    }
                }
            },
            delete: {
            	get: function(){
                    sliderHandle = null;
                    sliderSlide = null;
                    sliderLeft = null;
                    sliderLength = null;
                    sliderHandle = null;
                    sliderValue = null;
                    handleLeft = null;
                    handleWidth = null;
                    handleRight = null;
                    sliderRight = null;
                    handlePos = null;

            		if (window.navigator.msPointerEnabled) { // For IE Mobile
                        el.removeEventListener("MSPointerDown", onTouchStart, false);
                        el.removeEventListener("pointerdown", onTouchStart, false);
                        el.removeEventListener("MSPointerMove", onTouchMove, false);
                        el.removeEventListener("pointermove", onTouchMove, false);
                        el.removeEventListener("MSPointerUp", onTouchEnd, false);
                        el.removeEventListener("pointerup", onTouchEnd, false);
                    } else {
                        el.removeEventListener("touchstart", onTouchStart, false);
                        el.removeEventListener("touchend", onTouchEnd, false);
                        el.removeEventListener("touchleave", onTouchEnd, false);
                        el.removeEventListener("touchmove", onTouchMove, false);
                    }
            	}
            },

            reconfig:{
                get: function(){},
                set: function(params){
                    var opts = params || {};
                    min = opts.min || 0;
                    max = opts.max || 100;
                    initVal = opts.val || 0;
                    unit = opts.unit || "Units";
                    _range = max - min;
                    setUnits();
                    sliderHandle.css("left", (((initVal-min)*100)/_range) + "%" );
                    updateValue();
                }
            }
        });
    }

    Object.defineProperties(mobo.ui.Slider.prototype, {
        enabled: {
            get: function(){
                return !this._elem.find(".mobo-slider-handle").hasClass("disabled");
            },
            set: function(val){
                if (val) {
                    this._elem.classList.find(".mobo-slider-handle").removeClass("disabled");
                } else {
                    this._elem.classList.find(".mobo-slider-handle").addClass("disabled");
                }
            }
        }, 
        slide: {
            value: function(newVal) {
                //TODO : Limit between 0 & 100
                if (newVal) {
                    $(".mobo-slider-handle").css("left", newVal + "%" );      
                }
            }
        }
    });
    return mobo;
}(mobo || {}));
