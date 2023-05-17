import Slide from './Slide.js';

const container = document.getElementById('slide');
const elements = document.getElementById('slide_elements');
const controls = document.getElementById('slide_controls');

if (container && elements && controls && elements.children.length) {
  const slide = new Slide(
    container,
    Array.from(elements.children),
    controls,
    3000,
  );
}
