var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.tsx
var index_exports = {};
__export(index_exports, {
  CustomEditor: () => CustomEditor
});
module.exports = __toCommonJS(index_exports);
var import_react = require("react");
var import_jsx_runtime = require("react/jsx-runtime");
var SpecialCharModal = ({ onClose, onInsert }) => {
  const chars = [
    "!",
    '"',
    "#",
    "$",
    "%",
    "&",
    "'",
    "(",
    ")",
    "*",
    "+",
    "-",
    ".",
    "/",
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
    "\u20AC",
    "\xA3",
    "\xA5",
    "\xA9",
    "\xAE",
    "\xB5",
    "\u03C0",
    "\u2192",
    "\u21D4",
    "\xB1",
    "\xD7",
    "\xF7",
    "\u2260",
    "\u2264",
    "\u2265",
    "\u03B1",
    "\u03B2",
    "\u03B3",
    "\u03B4",
    "\u03B5",
    "\u03B8",
    "\u03BB",
    "\u03C3",
    "\u03C9",
    "\u2211",
    "\u222B",
    "\u221E",
    "\u221A",
    "\u2202"
  ];
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1e3 }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { background: "white", padding: 20, borderRadius: 8, maxWidth: 500, maxHeight: "80vh", overflow: "auto" }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", justifyContent: "space-between", marginBottom: 15 }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { style: { margin: 0 }, children: "Special Characters" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { onClick: onClose, style: { border: "none", background: "none", fontSize: 20, cursor: "pointer" }, children: "\xD7" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { display: "grid", gridTemplateColumns: "repeat(10, 1fr)", gap: 5 }, children: chars.map((char, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { onClick: () => {
      onInsert(char);
      onClose();
    }, style: { padding: 10, cursor: "pointer", border: "1px solid #ddd", background: "white", fontSize: 16 }, children: char }, i)) })
  ] }) });
};
var FindReplaceModal = ({ onClose, editorRef }) => {
  const [findText, setFindText] = (0, import_react.useState)("");
  const [replaceText, setReplaceText] = (0, import_react.useState)("");
  const [matchCase, setMatchCase] = (0, import_react.useState)(false);
  const [matchWholeWord, setMatchWholeWord] = (0, import_react.useState)(false);
  const [matchCyclic, setMatchCyclic] = (0, import_react.useState)(false);
  const highlightMatches = () => {
    if (!editorRef.current || !findText) return;
    const content = editorRef.current.innerHTML;
    const flags = matchCase ? "g" : "gi";
    const pattern = matchWholeWord ? `\\b${findText}\\b` : findText;
    const regex = new RegExp(pattern, flags);
    const highlighted = content.replace(regex, (match) => `<mark>${match}</mark>`);
    editorRef.current.innerHTML = highlighted;
  };
  const replace = () => {
    if (!editorRef.current || !findText) return;
    const content = editorRef.current.innerHTML.replace(/<mark>/g, "").replace(/<\/mark>/g, "");
    const flags = matchCase ? "" : "i";
    const pattern = matchWholeWord ? `\\b${findText}\\b` : findText;
    const regex = new RegExp(pattern, flags);
    editorRef.current.innerHTML = content.replace(regex, replaceText);
  };
  const replaceAll = () => {
    if (!editorRef.current || !findText) return;
    const content = editorRef.current.innerHTML.replace(/<mark>/g, "").replace(/<\/mark>/g, "");
    const flags = matchCase ? "g" : "gi";
    const pattern = matchWholeWord ? `\\b${findText}\\b` : findText;
    const regex = new RegExp(pattern, flags);
    editorRef.current.innerHTML = content.replace(regex, replaceText);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1e3 }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { background: "white", padding: 20, borderRadius: 8, minWidth: 400 }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", justifyContent: "space-between", marginBottom: 15 }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { style: { margin: 0 }, children: "Find & Replace" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { onClick: onClose, style: { border: "none", background: "none", fontSize: 20, cursor: "pointer" }, children: "\xD7" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { marginBottom: 10 }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { type: "text", placeholder: "Find", value: findText, onChange: (e) => setFindText(e.target.value), style: { width: "100%", padding: 8, marginBottom: 10 } }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { type: "text", placeholder: "Replace", value: replaceText, onChange: (e) => setReplaceText(e.target.value), style: { width: "100%", padding: 8 } })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { marginBottom: 15 }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { style: { display: "block", marginBottom: 5 }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { type: "checkbox", checked: matchCase, onChange: (e) => setMatchCase(e.target.checked) }),
        " Match case"
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { style: { display: "block", marginBottom: 5 }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { type: "checkbox", checked: matchWholeWord, onChange: (e) => setMatchWholeWord(e.target.checked) }),
        " Match whole word"
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { style: { display: "block" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { type: "checkbox", checked: matchCyclic, onChange: (e) => setMatchCyclic(e.target.checked) }),
        " Match cyclic"
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", gap: 10 }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { onClick: highlightMatches, style: { padding: "8px 16px", cursor: "pointer" }, children: "Find" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { onClick: replace, style: { padding: "8px 16px", cursor: "pointer" }, children: "Replace" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { onClick: replaceAll, style: { padding: "8px 16px", cursor: "pointer" }, children: "Replace All" })
    ] })
  ] }) });
};
var ColorPicker = ({ onClose, onSelect, type }) => {
  const colors = [
    "#000000",
    "#434343",
    "#666666",
    "#999999",
    "#B7B7B7",
    "#CCCCCC",
    "#D9D9D9",
    "#EFEFEF",
    "#F3F3F3",
    "#FFFFFF",
    "#980000",
    "#FF0000",
    "#FF9900",
    "#FFFF00",
    "#00FF00",
    "#00FFFF",
    "#4A86E8",
    "#0000FF",
    "#9900FF",
    "#FF00FF",
    "#E6B8AF",
    "#F4CCCC",
    "#FCE5CD",
    "#FFF2CC",
    "#D9EAD3",
    "#D0E0E3",
    "#C9DAF8",
    "#CFE2F3",
    "#D9D2E9",
    "#EAD1DC",
    "#DD7E6B",
    "#EA9999",
    "#F9CB9C",
    "#FFE599",
    "#B6D7A8",
    "#A2C4C9",
    "#A4C2F4",
    "#9FC5E8",
    "#B4A7D6",
    "#D5A6BD",
    "#CC4125",
    "#E06666",
    "#F6B26B",
    "#FFD966",
    "#93C47D",
    "#76A5AF",
    "#6D9EEB",
    "#6FA8DC",
    "#8E7CC3",
    "#C27BA0",
    "#A61C00",
    "#CC0000",
    "#E69138",
    "#F1C232",
    "#6AA84F",
    "#45818E",
    "#3C78D8",
    "#3D85C6",
    "#674EA7",
    "#A64D79",
    "#85200C",
    "#990000",
    "#B45F06",
    "#BF9000",
    "#38761D",
    "#134F5C",
    "#1155CC",
    "#0B5394",
    "#351C75",
    "#741B47",
    "#5B0F00",
    "#660000",
    "#783F04",
    "#7F6000",
    "#274E13",
    "#0C343D",
    "#1C4587",
    "#073763",
    "#20124D",
    "#4C1130"
  ];
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { position: "absolute", background: "white", border: "1px solid #ccc", padding: 10, borderRadius: 4, boxShadow: "0 2px 8px rgba(0,0,0,0.15)", zIndex: 100 }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { marginBottom: 10, fontWeight: "bold" }, children: type === "text" ? "Text Color" : "Background Color" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { display: "grid", gridTemplateColumns: "repeat(10, 1fr)", gap: 3, marginBottom: 10 }, children: colors.map((color, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { onClick: () => {
      onSelect(color);
      onClose();
    }, style: { width: 20, height: 20, background: color, cursor: "pointer", border: "1px solid #ddd" } }, i)) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { onClick: onClose, style: { width: "100%", padding: 5, cursor: "pointer" }, children: "Close" })
  ] });
};
var TableInsertPopup = ({ onClose, onInsert }) => {
  const [rows, setRows] = (0, import_react.useState)(3);
  const [cols, setCols] = (0, import_react.useState)(3);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { position: "absolute", background: "white", border: "1px solid #ccc", padding: 15, borderRadius: 4, boxShadow: "0 2px 8px rgba(0,0,0,0.15)", zIndex: 100 }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { marginBottom: 10, fontWeight: "bold" }, children: "Insert Table" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { display: "grid", gridTemplateColumns: "repeat(10, 1fr)", gap: 2, marginBottom: 10 }, children: Array.from({ length: 100 }, (_, i) => {
      const r = Math.floor(i / 10) + 1;
      const c = i % 10 + 1;
      const isSelected = r <= rows && c <= cols;
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { onMouseEnter: () => {
        setRows(r);
        setCols(c);
      }, onClick: () => {
        onInsert(rows, cols);
        onClose();
      }, style: { width: 15, height: 15, border: "1px solid #ddd", background: isSelected ? "#4A86E8" : "white", cursor: "pointer" } }, i);
    }) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { textAlign: "center", marginBottom: 10 }, children: [
      rows,
      " \xD7 ",
      cols
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { onClick: onClose, style: { width: "100%", padding: 5, cursor: "pointer" }, children: "Cancel" })
  ] });
};
var CustomEditor = ({ value, onChange }) => {
  const [isSourceMode, setIsSourceMode] = (0, import_react.useState)(false);
  const [sourceValue, setSourceValue] = (0, import_react.useState)("");
  const [showSpecialChar, setShowSpecialChar] = (0, import_react.useState)(false);
  const [showFindReplace, setShowFindReplace] = (0, import_react.useState)(false);
  const [showTextColor, setShowTextColor] = (0, import_react.useState)(false);
  const [showBgColor, setShowBgColor] = (0, import_react.useState)(false);
  const [showTablePopup, setShowTablePopup] = (0, import_react.useState)(false);
  const [isFullscreen, setIsFullscreen] = (0, import_react.useState)(false);
  const editorRef = (0, import_react.useRef)(null);
  const containerRef = (0, import_react.useRef)(null);
  (0, import_react.useEffect)(() => {
    if (editorRef.current && value !== void 0 && !isSourceMode) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);
  (0, import_react.useEffect)(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);
  const handleInput = () => {
    if (editorRef.current && onChange) {
      onChange(editorRef.current.innerHTML);
    }
  };
  const execCmd = (cmd, val) => {
    var _a;
    document.execCommand(cmd, false, val);
    (_a = editorRef.current) == null ? void 0 : _a.focus();
  };
  const toggleSourceMode = () => {
    var _a;
    if (isSourceMode) {
      if (editorRef.current) {
        editorRef.current.innerHTML = sourceValue;
        onChange == null ? void 0 : onChange(sourceValue);
      }
    } else {
      setSourceValue(((_a = editorRef.current) == null ? void 0 : _a.innerHTML) || "");
    }
    setIsSourceMode(!isSourceMode);
  };
  const insertSpecialChar = (char) => {
    if (editorRef.current) {
      editorRef.current.focus();
      document.execCommand("insertText", false, char);
      handleInput();
    }
  };
  const insertTable = (rows, cols) => {
    let html = '<table border="1" style="border-collapse: collapse; width: 100%;">';
    for (let r = 0; r < rows; r++) {
      html += "<tr>";
      for (let c = 0; c < cols; c++) {
        html += '<td style="padding: 8px; border: 1px solid #ddd;">&nbsp;</td>';
      }
      html += "</tr>";
    }
    html += "</table>";
    document.execCommand("insertHTML", false, html);
    handleInput();
  };
  const toggleFullscreen = async () => {
    var _a;
    if (!document.fullscreenElement) {
      await ((_a = containerRef.current) == null ? void 0 : _a.requestFullscreen());
    } else {
      await document.exitFullscreen();
    }
  };
  const handleCopy = () => {
    document.execCommand("copy");
  };
  const handlePaste = () => {
    document.execCommand("paste");
  };
  const handlePastePlain = async () => {
    try {
      const text = await navigator.clipboard.readText();
      document.execCommand("insertText", false, text);
    } catch (e) {
      console.error("Paste failed", e);
    }
  };
  const toolbarStyle = {
    display: "flex",
    flexWrap: "wrap",
    gap: 5,
    padding: 10,
    background: "#f5f5f5",
    borderBottom: "1px solid #ccc",
    alignItems: "center"
  };
  const btnStyle = {
    padding: "6px 10px",
    cursor: "pointer",
    border: "1px solid #ccc",
    background: "white",
    borderRadius: 3,
    fontSize: 14
  };
  const selectStyle = {
    padding: "6px 10px",
    cursor: "pointer",
    border: "1px solid #ccc",
    background: "white",
    borderRadius: 3,
    fontSize: 14
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { ref: containerRef, style: __spreadValues({ border: "1px solid #ccc", background: "white" }, isFullscreen ? { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999 } : {}), children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: toolbarStyle, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { onClick: toggleSourceMode, style: btnStyle, title: "Source Mode", children: "Source" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", { onChange: (e) => execCmd("formatBlock", e.target.value), style: selectStyle, defaultValue: "", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "", children: "Style" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "p", children: "Paragraph" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "h1", children: "Heading 1" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "h2", children: "Heading 2" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "h3", children: "Heading 3" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "h4", children: "Heading 4" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "h5", children: "Heading 5" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "h6", children: "Heading 6" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "pre", children: "Pre" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", { onChange: (e) => execCmd("formatBlock", e.target.value), style: selectStyle, defaultValue: "", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "", children: "Format" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "p", children: "Normal" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "address", children: "Address" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "blockquote", children: "Quote" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", { onChange: (e) => execCmd("fontSize", e.target.value), style: selectStyle, defaultValue: "", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "", children: "Size" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "1", children: "Small" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "3", children: "Normal" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "5", children: "Large" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "7", children: "Huge" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { onClick: () => execCmd("bold"), style: btnStyle, title: "Bold", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "B" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { onClick: () => execCmd("italic"), style: btnStyle, title: "Italic", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { children: "I" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { onClick: () => execCmd("underline"), style: btnStyle, title: "Underline", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("u", { children: "U" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { onClick: () => execCmd("strikeThrough"), style: btnStyle, title: "Strikethrough", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("s", { children: "S" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { onClick: () => execCmd("subscript"), style: btnStyle, title: "Subscript", children: "x\u2082" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { onClick: () => execCmd("superscript"), style: btnStyle, title: "Superscript", children: "x\xB2" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { position: "relative" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { onClick: () => setShowTextColor(!showTextColor), style: btnStyle, title: "Text Color", children: "A" }),
        showTextColor && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ColorPicker, { onClose: () => setShowTextColor(false), onSelect: (c) => execCmd("foreColor", c), type: "text" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { position: "relative" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { onClick: () => setShowBgColor(!showBgColor), style: btnStyle, title: "Background Color", children: "\u25FC" }),
        showBgColor && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ColorPicker, { onClose: () => setShowBgColor(false), onSelect: (c) => execCmd("backColor", c), type: "background" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { onClick: () => execCmd("justifyLeft"), style: btnStyle, title: "Align Left", children: "\u2261" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { onClick: () => execCmd("justifyCenter"), style: btnStyle, title: "Align Center", children: "\u2261" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { onClick: () => execCmd("justifyRight"), style: btnStyle, title: "Align Right", children: "\u2261" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { onClick: () => execCmd("justifyFull"), style: btnStyle, title: "Justify", children: "\u2261" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { onClick: () => execCmd("insertUnorderedList"), style: btnStyle, title: "Bullet List", children: "\u2022 List" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { onClick: () => execCmd("insertOrderedList"), style: btnStyle, title: "Numbered List", children: "1. List" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { onClick: () => execCmd("indent"), style: btnStyle, title: "Indent", children: "\u2192" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { onClick: () => execCmd("outdent"), style: btnStyle, title: "Outdent", children: "\u2190" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { onClick: () => execCmd("formatBlock", "blockquote"), style: btnStyle, title: "Blockquote", children: '"' }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { position: "relative" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { onClick: () => setShowTablePopup(!showTablePopup), style: btnStyle, title: "Insert Table", children: "Table" }),
        showTablePopup && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableInsertPopup, { onClose: () => setShowTablePopup(false), onInsert: insertTable })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { onClick: () => setShowSpecialChar(true), style: btnStyle, title: "Special Characters", children: "\u03A9" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { onClick: () => setShowFindReplace(true), style: btnStyle, title: "Find & Replace", children: "\u{1F50D}" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { onClick: handleCopy, style: btnStyle, title: "Copy", children: "Copy" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { onClick: handlePaste, style: btnStyle, title: "Paste", children: "Paste" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { onClick: handlePastePlain, style: btnStyle, title: "Paste Plain", children: "Paste Plain" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { onClick: toggleFullscreen, style: btnStyle, title: "Fullscreen", children: isFullscreen ? "\u2297" : "\u2295" })
    ] }),
    isSourceMode ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "textarea",
      {
        value: sourceValue,
        onChange: (e) => setSourceValue(e.target.value),
        style: { width: "100%", minHeight: 400, padding: 10, border: "none", fontFamily: "monospace", resize: "vertical" }
      }
    ) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "div",
      {
        ref: editorRef,
        contentEditable: true,
        onInput: handleInput,
        style: { minHeight: 400, padding: 10, outline: "none" }
      }
    ),
    showSpecialChar && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpecialCharModal, { onClose: () => setShowSpecialChar(false), onInsert: insertSpecialChar }),
    showFindReplace && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FindReplaceModal, { onClose: () => setShowFindReplace(false), editorRef })
  ] });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CustomEditor
});
