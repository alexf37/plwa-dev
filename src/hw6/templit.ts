type TemplitNode = string | number | Element | Element[];

function node(htmlString: string) {
  const e = document.createElement("div");
  e.innerHTML = htmlString;
  const ee = e.firstElementChild!;
  e.remove();
  return ee;
}

export function html(strings: TemplateStringsArray, ...subs: TemplitNode[]) {
  const formattedString = strings.reduce((acc, curr, i) => {
    let substitution = subs[i];
    const e = document.createElement("div");
    switch (typeof substitution) {
      case "number":
        substitution = substitution.toLocaleString();
        e.textContent = substitution;
        break;
      case "string":
        e.textContent = substitution;
        break;
      case "object":
        if (substitution instanceof Element) e.replaceChildren(substitution);
        else if (substitution instanceof Array) {
          for (const elem of substitution) {
            if (elem instanceof Element) e.appendChild(elem);
            else e.textContent = elem;
          }
        } else throw new Error("Invalid templit substitution");
        break;
    }

    const htmlFormattedString = e.innerHTML;
    return (acc += substitution ? `${curr}${htmlFormattedString}` : curr);
  }, "");

  return node(formattedString);
}

export class Templit {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  globalState: any[];
  globalStateIdx: number;
  rootNode: () => Element;
  parent: Element;
  callback: () => void;

  constructor(rootNode: () => Element, parent: Element, cb: () => void) {
    this.globalState = [];
    this.globalStateIdx = 0;
    this.rootNode = rootNode;
    this.parent = parent;
    this.callback = cb;
  }
  render() {
    this.parent.replaceChildren(this.rootNode());
    this.callback();
  }
  useState(initialState: unknown) {
    const idx = this.globalStateIdx;
    this.globalStateIdx++;
    if (this.globalState[idx] === undefined)
      this.globalState[idx] = initialState;

    const state = this.globalState[idx];
    const setState = (newState: unknown) => {
      this.globalState[idx] = newState;
      this.render();
    };
    return [state, setState];
  }
}
