// 封装与dom相关的公共操作
// 也可直接使用classList完成下列操作
export function addClass(el, classname) {
  if (!hasClass(el.className, classname)) {
    if (el.className !== "") {
      el.className = el.className.split(" ").push(classname).join(" ");
    } else {
      el.className = classname;
    }
  }
}

function hasClass(classname, newclass) {
  let reg = new RegExp(`(^|\\s)${newclass}($|\\s)`);
  return reg.test(classname);
}

// 获取自定义属性
export function getData(el, name, val) {
  const prefix = "data-";
  name = prefix + name;
  if (val) {
    return el.setAttribute(name, val);
  } else {
    return el.getAttribute(name);
  }
}

// 添加浏览器前缀
const prefix = (() => {
  let curStyle = document.createElement("div").style;
  const transformNames = {
    webkit: "webkitTransform",
    Moz: "MozTransform",
    O: "OTransform",
    ms: "msTransform",
    standard: "transform",
  };
  Object.keys(transformNames).forEach((key) => {
    if (curStyle[transformNames[key]]) {
      return key;
    }
  });
  return false;
})();

export function addPrefix(style) {
  if (!prefix) {
    return;
  }
  if (prefix === "standard") {
    return style;
  }

  return prefix + style.charAt(0).toUpperCase() + style.substr(1);
}
