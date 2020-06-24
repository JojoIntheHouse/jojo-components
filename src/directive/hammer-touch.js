/**
 * Prevent click events after a touchend.
 * 
 * Inspired/copy-paste from this article of Google by Ryan Fioravanti
 * https://developers.google.com/mobile/articles/fast_buttons#ghost
 * 
 * USAGE: 
 * Prevent the click event for an certain element
 * ````
 *  PreventGhostClick(myElement);
 * ````
 * 
 * Prevent clicks on the whole document (not recommended!!) * 
 * ````
 *  PreventGhostClick(document);
 * ````
 * 
 */
const PreventGhostClick = (function(window, document) {
    var coordinates = [];
    var threshold = 25;
    var timeout = 2500;
    // no touch support
    if(!("ontouchstart" in window)) {
        
        return function(){};
    }

    /**
     * prevent clicks if they're in a registered XY region
     * @param {MouseEvent} ev
     */
    function preventGhostClick(ev) {
        for (var i = 0; i < coordinates.length; i++) {
            var x = coordinates[i][0];
            var y = coordinates[i][1];

            // within the range, so prevent the click
            if (Math.abs(ev.clientX - x) < threshold && Math.abs(ev.clientY - y) < threshold) {
                ev.stopPropagation();
                ev.preventDefault();
                break;
            }
        }
    }

    /**
     * reset the coordinates array
     */
    function resetCoordinates() {
        coordinates = [];
    }

    /**
     * remove the first coordinates set from the array
     */
    function popCoordinates() {
        coordinates.splice(0, 1);
    }

    /**
     * if it is an final touchend, we want to register it's place
     * @param {TouchEvent} ev
     */
    function registerCoordinates(ev) {
        // touchend is triggered on every releasing finger
        // changed touches always contain the removed touches on a touchend
        // the touches object might contain these also at some browsers (firefox os)
        // so touches - changedTouches will be 0 or lower, like -1, on the final touchend
        if(ev.touches.length - ev.changedTouches.length <= 0) {
            var touch = ev.changedTouches[0];
            coordinates.push([touch.clientX, touch.clientY]);
            setTimeout(popCoordinates, timeout);
        }
    }


    document.addEventListener("click", preventGhostClick, true);
    /**
     * prevent click events for the given element
     * @param {EventTarget} el
     */
    return function(el) {
        el.addEventListener("touchstart", resetCoordinates, true);
        el.addEventListener("touchend", registerCoordinates, true);
    };
})(window, document);

export default {
    // v-tap:stop>
    // v-tap="function"
    install(Vue, options){
        Vue.directive("tap", {
            bind: function(el, binding) {
                if(!options.touchenable) return 
                if (binding.arg === 'stop' || typeof binding.value === "function") {
                    const mc = new Hammer(el);
                    mc.options.domEvents = true
                    PreventGhostClick(el);
                    mc.on("tap", function(ev){
                        if(binding.arg === 'stop')
                            ev.srcEvent.stopImmediatePropagation();
                        // ev.srcEvent.preventDefault();
                        binding.value && binding.value()
                    });
                }
            }
        });
    }
}
