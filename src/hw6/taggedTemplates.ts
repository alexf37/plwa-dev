export function node(htmlString: string) {
  const e = document.createElement("div");
  e.innerHTML = htmlString;
  const ee = e.firstElementChild!;
  e.remove();
  return ee;
}

type JSXNode = string | Element;

export function html(strings: TemplateStringsArray, ...subs: JSXNode[]) {
  const formattedString = strings.reduce((acc, curr, i) => {
    const substitution = subs[i];
    const e = document.createElement("div");
    if (typeof substitution === "string") e.textContent = substitution;
    else e.replaceChildren(substitution);

    const htmlFormattedString = e.innerHTML;
    return (acc += substitution ? `${curr}${htmlFormattedString}` : curr);
  }, "");

  return node(formattedString);
}
