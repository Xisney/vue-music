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
