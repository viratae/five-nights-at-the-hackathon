/*
Handles the rendering of screen components
*/
const renderer = (function renderer() {
    function sayHi() {
        console.log("Connected!");
    }
    return {
        sayHi,
    }
})();
export {
    renderer
}