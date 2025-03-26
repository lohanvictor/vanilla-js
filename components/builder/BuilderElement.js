export class BuilderElement extends HTMLElement {
  constructor({ templateId = "" }) {
    super();

    const template = document.getElementById(templateId);
    const clone = template.content.cloneNode(true);
    this.appendChild(clone);
  }
}
