const loop = require('@vorprog/loop').loop;

/**
 * @typedef {Object} ElementConfig
 * @property {string} tag - HTML element tag
 * @property {string} xmlns - XML namespace (defaults to http://www.w3.org/1999/xhtml)
 * @property {string} textContent
 * @property {ElementConfig[]} children
 * @property {EventListener} onclick
 */

/**
 * @param {HTMLElement} parentElement
 * @param {ElementConfig} elementConfig
 * @returns {Element}
*/
const newElement = (parentElement, elementConfig = {}) => {
  const element = document.createElementNS(elementConfig.xmlns || `http://www.w3.org/1999/xhtml`, elementConfig.tag || `div`);
  element.textContent = elementConfig.textContent || null;
  loop(elementConfig.children, (key, childConfig) => newElement(element, childConfig));
  if(elementConfig.onclick) element.addEventListener("click", elementConfig.onclick);

  delete elementConfig.xmlns;
  delete elementConfig.tag;
  delete elementConfig.textContent;
  delete elementConfig.children;
  delete elementConfig.onclick;

  loop(elementConfig, (key, value) => element.setAttribute(key, value || ``));
  return parentElement.appendChild(element);
};

module.exports = newElement;
