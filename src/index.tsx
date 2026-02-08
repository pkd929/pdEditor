import React, { useState, useRef, useEffect } from "react";

type EditorProps = {
  value?: string;
  onChange?: (v: string) => void;
};

// Special Characters Modal
const SpecialCharModal = ({ onClose, onInsert }: { onClose: () => void; onInsert: (char: string) => void }) => {
  const chars = [
    '!', '"', '#', '$', '%', '&', "'", '(', ')', '*', '+', '-', '.', '/', 
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
    'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
    'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
    '€', '£', '¥', '©', '®', 'µ', 'π', '→', '⇔', '±', '×', '÷', '≠', '≤', '≥',
    'α', 'β', 'γ', 'δ', 'ε', 'θ', 'λ', 'σ', 'ω', '∑', '∫', '∞', '√', '∂'
  ];

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
      <div style={{ background: 'white', padding: 20, borderRadius: 8, maxWidth: 500, maxHeight: '80vh', overflow: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 15 }}>
          <h3 style={{ margin: 0 }}>Special Characters</h3>
          <button onClick={onClose} style={{ border: 'none', background: 'none', fontSize: 20, cursor: 'pointer' }}>×</button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: 5 }}>
          {chars.map((char, i) => (
            <button key={i} onClick={() => { onInsert(char); onClose(); }} style={{ padding: 10, cursor: 'pointer', border: '1px solid #ddd', background: 'white', fontSize: 16 }}>
              {char}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// Find & Replace Modal
const FindReplaceModal = ({ onClose, editorRef }: { onClose: () => void; editorRef: React.RefObject<HTMLDivElement> }) => {
  const [findText, setFindText] = useState('');
  const [replaceText, setReplaceText] = useState('');
  const [matchCase, setMatchCase] = useState(false);
  const [matchWholeWord, setMatchWholeWord] = useState(false);
  const [matchCyclic, setMatchCyclic] = useState(false);

  const highlightMatches = () => {
    if (!editorRef.current || !findText) return;
    const content = editorRef.current.innerHTML;
    const flags = matchCase ? 'g' : 'gi';
    const pattern = matchWholeWord ? `\\b${findText}\\b` : findText;
    const regex = new RegExp(pattern, flags);
    const highlighted = content.replace(regex, (match) => `<mark>${match}</mark>`);
    editorRef.current.innerHTML = highlighted;
  };

  const replace = () => {
    if (!editorRef.current || !findText) return;
    const content = editorRef.current.innerHTML.replace(/<mark>/g, '').replace(/<\/mark>/g, '');
    const flags = matchCase ? '' : 'i';
    const pattern = matchWholeWord ? `\\b${findText}\\b` : findText;
    const regex = new RegExp(pattern, flags);
    editorRef.current.innerHTML = content.replace(regex, replaceText);
  };

  const replaceAll = () => {
    if (!editorRef.current || !findText) return;
    const content = editorRef.current.innerHTML.replace(/<mark>/g, '').replace(/<\/mark>/g, '');
    const flags = matchCase ? 'g' : 'gi';
    const pattern = matchWholeWord ? `\\b${findText}\\b` : findText;
    const regex = new RegExp(pattern, flags);
    editorRef.current.innerHTML = content.replace(regex, replaceText);
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
      <div style={{ background: 'white', padding: 20, borderRadius: 8, minWidth: 400 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 15 }}>
          <h3 style={{ margin: 0 }}>Find & Replace</h3>
          <button onClick={onClose} style={{ border: 'none', background: 'none', fontSize: 20, cursor: 'pointer' }}>×</button>
        </div>
        <div style={{ marginBottom: 10 }}>
          <input type="text" placeholder="Find" value={findText} onChange={(e) => setFindText(e.target.value)} style={{ width: '100%', padding: 8, marginBottom: 10 }} />
          <input type="text" placeholder="Replace" value={replaceText} onChange={(e) => setReplaceText(e.target.value)} style={{ width: '100%', padding: 8 }} />
        </div>
        <div style={{ marginBottom: 15 }}>
          <label style={{ display: 'block', marginBottom: 5 }}><input type="checkbox" checked={matchCase} onChange={(e) => setMatchCase(e.target.checked)} /> Match case</label>
          <label style={{ display: 'block', marginBottom: 5 }}><input type="checkbox" checked={matchWholeWord} onChange={(e) => setMatchWholeWord(e.target.checked)} /> Match whole word</label>
          <label style={{ display: 'block' }}><input type="checkbox" checked={matchCyclic} onChange={(e) => setMatchCyclic(e.target.checked)} /> Match cyclic</label>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={highlightMatches} style={{ padding: '8px 16px', cursor: 'pointer' }}>Find</button>
          <button onClick={replace} style={{ padding: '8px 16px', cursor: 'pointer' }}>Replace</button>
          <button onClick={replaceAll} style={{ padding: '8px 16px', cursor: 'pointer' }}>Replace All</button>
        </div>
      </div>
    </div>
  );
};

// Color Picker
const ColorPicker = ({ onClose, onSelect, type }: { onClose: () => void; onSelect: (color: string) => void; type: 'text' | 'background' }) => {
  const colors = [
    '#000000', '#434343', '#666666', '#999999', '#B7B7B7', '#CCCCCC', '#D9D9D9', '#EFEFEF', '#F3F3F3', '#FFFFFF',
    '#980000', '#FF0000', '#FF9900', '#FFFF00', '#00FF00', '#00FFFF', '#4A86E8', '#0000FF', '#9900FF', '#FF00FF',
    '#E6B8AF', '#F4CCCC', '#FCE5CD', '#FFF2CC', '#D9EAD3', '#D0E0E3', '#C9DAF8', '#CFE2F3', '#D9D2E9', '#EAD1DC',
    '#DD7E6B', '#EA9999', '#F9CB9C', '#FFE599', '#B6D7A8', '#A2C4C9', '#A4C2F4', '#9FC5E8', '#B4A7D6', '#D5A6BD',
    '#CC4125', '#E06666', '#F6B26B', '#FFD966', '#93C47D', '#76A5AF', '#6D9EEB', '#6FA8DC', '#8E7CC3', '#C27BA0',
    '#A61C00', '#CC0000', '#E69138', '#F1C232', '#6AA84F', '#45818E', '#3C78D8', '#3D85C6', '#674EA7', '#A64D79',
    '#85200C', '#990000', '#B45F06', '#BF9000', '#38761D', '#134F5C', '#1155CC', '#0B5394', '#351C75', '#741B47',
    '#5B0F00', '#660000', '#783F04', '#7F6000', '#274E13', '#0C343D', '#1C4587', '#073763', '#20124D', '#4C1130'
  ];

  return (
    <div style={{ position: 'absolute', background: 'white', border: '1px solid #ccc', padding: 10, borderRadius: 4, boxShadow: '0 2px 8px rgba(0,0,0,0.15)', zIndex: 100 }}>
      <div style={{ marginBottom: 10, fontWeight: 'bold' }}>{type === 'text' ? 'Text Color' : 'Background Color'}</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: 3, marginBottom: 10 }}>
        {colors.map((color, i) => (
          <div key={i} onClick={() => { onSelect(color); onClose(); }} style={{ width: 20, height: 20, background: color, cursor: 'pointer', border: '1px solid #ddd' }} />
        ))}
      </div>
      <button onClick={onClose} style={{ width: '100%', padding: 5, cursor: 'pointer' }}>Close</button>
    </div>
  );
};

// Table Insert Popup
const TableInsertPopup = ({ onClose, onInsert }: { onClose: () => void; onInsert: (rows: number, cols: number) => void }) => {
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);

  return (
    <div style={{ position: 'absolute', background: 'white', border: '1px solid #ccc', padding: 15, borderRadius: 4, boxShadow: '0 2px 8px rgba(0,0,0,0.15)', zIndex: 100 }}>
      <div style={{ marginBottom: 10, fontWeight: 'bold' }}>Insert Table</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: 2, marginBottom: 10 }}>
        {Array.from({ length: 100 }, (_, i) => {
          const r = Math.floor(i / 10) + 1;
          const c = (i % 10) + 1;
          const isSelected = r <= rows && c <= cols;
          return (
            <div key={i} onMouseEnter={() => { setRows(r); setCols(c); }} onClick={() => { onInsert(rows, cols); onClose(); }} style={{ width: 15, height: 15, border: '1px solid #ddd', background: isSelected ? '#4A86E8' : 'white', cursor: 'pointer' }} />
          );
        })}
      </div>
      <div style={{ textAlign: 'center', marginBottom: 10 }}>{rows} × {cols}</div>
      <button onClick={onClose} style={{ width: '100%', padding: 5, cursor: 'pointer' }}>Cancel</button>
    </div>
  );
};

export const CustomEditor = ({ value, onChange }: EditorProps) => {
  const [isSourceMode, setIsSourceMode] = useState(false);
  const [sourceValue, setSourceValue] = useState('');
  const [showSpecialChar, setShowSpecialChar] = useState(false);
  const [showFindReplace, setShowFindReplace] = useState(false);
  const [showTextColor, setShowTextColor] = useState(false);
  const [showBgColor, setShowBgColor] = useState(false);
  const [showTablePopup, setShowTablePopup] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editorRef.current && value !== undefined && !isSourceMode) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const handleInput = () => {
    if (editorRef.current && onChange) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const execCmd = (cmd: string, val?: string) => {
    document.execCommand(cmd, false, val);
    editorRef.current?.focus();
  };

  const toggleSourceMode = () => {
    if (isSourceMode) {
      if (editorRef.current) {
        editorRef.current.innerHTML = sourceValue;
        onChange?.(sourceValue);
      }
    } else {
      setSourceValue(editorRef.current?.innerHTML || '');
    }
    setIsSourceMode(!isSourceMode);
  };

  const insertSpecialChar = (char: string) => {
    if (editorRef.current) {
      editorRef.current.focus();
      document.execCommand('insertText', false, char);
      handleInput();
    }
  };

  const insertTable = (rows: number, cols: number) => {
    let html = '<table border="1" style="border-collapse: collapse; width: 100%;">';
    for (let r = 0; r < rows; r++) {
      html += '<tr>';
      for (let c = 0; c < cols; c++) {
        html += '<td style="padding: 8px; border: 1px solid #ddd;">&nbsp;</td>';
      }
      html += '</tr>';
    }
    html += '</table>';
    document.execCommand('insertHTML', false, html);
    handleInput();
  };

  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) {
      await containerRef.current?.requestFullscreen();
    } else {
      await document.exitFullscreen();
    }
  };

  const handleCopy = () => {
    document.execCommand('copy');
  };

  const handlePaste = () => {
    document.execCommand('paste');
  };

  const handlePastePlain = async () => {
    try {
      const text = await navigator.clipboard.readText();
      document.execCommand('insertText', false, text);
    } catch (e) {
      console.error('Paste failed', e);
    }
  };

  const toolbarStyle: React.CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 5,
    padding: 10,
    background: '#f5f5f5',
    borderBottom: '1px solid #ccc',
    alignItems: 'center'
  };

  const btnStyle: React.CSSProperties = {
    padding: '6px 10px',
    cursor: 'pointer',
    border: '1px solid #ccc',
    background: 'white',
    borderRadius: 3,
    fontSize: 14
  };

  const selectStyle: React.CSSProperties = {
    padding: '6px 10px',
    cursor: 'pointer',
    border: '1px solid #ccc',
    background: 'white',
    borderRadius: 3,
    fontSize: 14
  };

  return (
    <div ref={containerRef} style={{ border: '1px solid #ccc', background: 'white', ...(isFullscreen ? { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999 } : {}) }}>
      <div style={toolbarStyle}>
        <button onClick={toggleSourceMode} style={btnStyle} title="Source Mode">Source</button>
        
        <select onChange={(e) => execCmd('formatBlock', e.target.value)} style={selectStyle} defaultValue="">
          <option value="">Style</option>
          <option value="p">Paragraph</option>
          <option value="h1">Heading 1</option>
          <option value="h2">Heading 2</option>
          <option value="h3">Heading 3</option>
          <option value="h4">Heading 4</option>
          <option value="h5">Heading 5</option>
          <option value="h6">Heading 6</option>
          <option value="pre">Pre</option>
        </select>

        <select onChange={(e) => execCmd('formatBlock', e.target.value)} style={selectStyle} defaultValue="">
          <option value="">Format</option>
          <option value="p">Normal</option>
          <option value="address">Address</option>
          <option value="blockquote">Quote</option>
        </select>

        <select onChange={(e) => execCmd('fontSize', e.target.value)} style={selectStyle} defaultValue="">
          <option value="">Size</option>
          <option value="1">Small</option>
          <option value="3">Normal</option>
          <option value="5">Large</option>
          <option value="7">Huge</option>
        </select>

        <button onClick={() => execCmd('bold')} style={btnStyle} title="Bold"><b>B</b></button>
        <button onClick={() => execCmd('italic')} style={btnStyle} title="Italic"><i>I</i></button>
        <button onClick={() => execCmd('underline')} style={btnStyle} title="Underline"><u>U</u></button>
        <button onClick={() => execCmd('strikeThrough')} style={btnStyle} title="Strikethrough"><s>S</s></button>
        
        <button onClick={() => execCmd('subscript')} style={btnStyle} title="Subscript">x₂</button>
        <button onClick={() => execCmd('superscript')} style={btnStyle} title="Superscript">x²</button>

        <div style={{ position: 'relative' }}>
          <button onClick={() => setShowTextColor(!showTextColor)} style={btnStyle} title="Text Color">A</button>
          {showTextColor && <ColorPicker onClose={() => setShowTextColor(false)} onSelect={(c) => execCmd('foreColor', c)} type="text" />}
        </div>

        <div style={{ position: 'relative' }}>
          <button onClick={() => setShowBgColor(!showBgColor)} style={btnStyle} title="Background Color">◼</button>
          {showBgColor && <ColorPicker onClose={() => setShowBgColor(false)} onSelect={(c) => execCmd('backColor', c)} type="background" />}
        </div>

        <button onClick={() => execCmd('justifyLeft')} style={btnStyle} title="Align Left">≡</button>
        <button onClick={() => execCmd('justifyCenter')} style={btnStyle} title="Align Center">≡</button>
        <button onClick={() => execCmd('justifyRight')} style={btnStyle} title="Align Right">≡</button>
        <button onClick={() => execCmd('justifyFull')} style={btnStyle} title="Justify">≡</button>

        <button onClick={() => execCmd('insertUnorderedList')} style={btnStyle} title="Bullet List">• List</button>
        <button onClick={() => execCmd('insertOrderedList')} style={btnStyle} title="Numbered List">1. List</button>

        <button onClick={() => execCmd('indent')} style={btnStyle} title="Indent">→</button>
        <button onClick={() => execCmd('outdent')} style={btnStyle} title="Outdent">←</button>

        <button onClick={() => execCmd('formatBlock', 'blockquote')} style={btnStyle} title="Blockquote">"</button>

        <div style={{ position: 'relative' }}>
          <button onClick={() => setShowTablePopup(!showTablePopup)} style={btnStyle} title="Insert Table">Table</button>
          {showTablePopup && <TableInsertPopup onClose={() => setShowTablePopup(false)} onInsert={insertTable} />}
        </div>

        <button onClick={() => setShowSpecialChar(true)} style={btnStyle} title="Special Characters">Ω</button>
        <button onClick={() => setShowFindReplace(true)} style={btnStyle} title="Find & Replace">🔍</button>

        <button onClick={handleCopy} style={btnStyle} title="Copy">Copy</button>
        <button onClick={handlePaste} style={btnStyle} title="Paste">Paste</button>
        <button onClick={handlePastePlain} style={btnStyle} title="Paste Plain">Paste Plain</button>

        <button onClick={toggleFullscreen} style={btnStyle} title="Fullscreen">{isFullscreen ? '⊗' : '⊕'}</button>
      </div>

      {isSourceMode ? (
        <textarea
          value={sourceValue}
          onChange={(e) => setSourceValue(e.target.value)}
          style={{ width: '100%', minHeight: 400, padding: 10, border: 'none', fontFamily: 'monospace', resize: 'vertical' }}
        />
      ) : (
        <div
          ref={editorRef}
          contentEditable
          onInput={handleInput}
          style={{ minHeight: 400, padding: 10, outline: 'none' }}
        />
      )}

      {showSpecialChar && <SpecialCharModal onClose={() => setShowSpecialChar(false)} onInsert={insertSpecialChar} />}
      {showFindReplace && <FindReplaceModal onClose={() => setShowFindReplace(false)} editorRef={editorRef} />}
    </div>
  );
};
