# Custom Text Editor

A feature-rich, lightweight WYSIWYG editor built with React and TypeScript. No external dependencies required beyond React.

## 🚀 Features

### Text Formatting
- **Bold**, *Italic*, <u>Underline</u>, ~~Strikethrough~~
- Subscript (x₂) and Superscript (x²)
- Text color and background color picker
- Font size control (Small, Normal, Large, Huge)

### Paragraph Formatting
- Heading styles (H1-H6)
- Paragraph, Address, Quote formats
- Text alignment (Left, Center, Right, Justify)
- Blockquote
- Bullet and numbered lists
- Indent/Outdent

### Advanced Features
- **Source Mode**: Toggle between visual and HTML view
- **Special Characters**: Insert symbols, Greek letters, math symbols (Ω button)
- **Find & Replace**: Search with match case, whole word, and cyclic options
- **Color Picker**: 80+ color swatches for text and background
- **Table Insert**: Interactive grid selector for creating tables
- **Fullscreen Mode**: Expand editor to fullscreen (ESC to exit)
- **Clipboard**: Copy, Paste, and Paste as Plain Text

## 📦 Installation

```bash
npm install pdeditor
```

## 🔧 Requirements

### Peer Dependencies
```json
{
  "react": ">=17",
  "react-dom": ">=17"
}
```

### Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES2017+ support
- Fullscreen API (for fullscreen feature)
- Clipboard API (for paste plain text)

## 💻 Usage

### Basic Example

```tsx
import React, { useState } from 'react';
import { CustomEditor } from 'pdeditor';

function App() {
  const [content, setContent] = useState('<p>Start editing...</p>');

  return (
    <div>
      <CustomEditor 
        value={content} 
        onChange={setContent} 
      />
    </div>
  );
}
```

### TypeScript

```tsx
import React, { useState } from 'react';
import { CustomEditor } from 'pdeditor';

const MyEditor: React.FC = () => {
  const [htmlContent, setHtmlContent] = useState<string>('');

  const handleChange = (newContent: string) => {
    setHtmlContent(newContent);
    // Save to backend, localStorage, etc.
  };

  return (
    <CustomEditor 
      value={htmlContent} 
      onChange={handleChange} 
    />
  );
};
```

### Controlled Component

```tsx
import React, { useState, useEffect } from 'react';
import { CustomEditor } from 'pdeditor';

function ControlledEditor() {
  const [content, setContent] = useState('');

  // Load initial content
  useEffect(() => {
    fetch('/api/content')
      .then(res => res.json())
      .then(data => setContent(data.html));
  }, []);

  // Auto-save on change
  const handleChange = (newContent: string) => {
    setContent(newContent);
    // Debounce this in production
    fetch('/api/content', {
      method: 'POST',
      body: JSON.stringify({ html: newContent })
    });
  };

  return <CustomEditor value={content} onChange={handleChange} />;
}
```

## 📋 API Reference

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `value` | `string` | No | HTML content to display in the editor |
| `onChange` | `(value: string) => void` | No | Callback fired when content changes |

### Example with All Props

```tsx
<CustomEditor 
  value="<p>Initial HTML content</p>"
  onChange={(html) => console.log('Content changed:', html)}
/>
```

## 🎨 Styling

The editor comes with default styling. You can wrap it in a container to customize:

```tsx
<div style={{ maxWidth: '800px', margin: '0 auto' }}>
  <CustomEditor value={content} onChange={setContent} />
</div>
```

### Custom Container Styling

```tsx
<div className="editor-wrapper">
  <CustomEditor value={content} onChange={setContent} />
</div>
```

```css
.editor-wrapper {
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}
```

## 🛠️ Development

### Setup

```bash
# Clone the repository
git clone <repo-url>
cd pdeditor

# Install dependencies
npm install

# Build
npm run build
```

### Project Structure

```
pdeditor/
├── src/
│   └── index.tsx          # Main editor component
├── dist/                  # Built files
├── package.json
├── tsconfig.json
└── README.md
```

## 🎯 Toolbar Features

### Top Row
- **Source**: Toggle HTML source view
- **Style**: Paragraph, H1-H6, Pre
- **Format**: Normal, Address, Quote
- **Size**: Small, Normal, Large, Huge

### Formatting
- **B**: Bold
- **I**: Italic
- **U**: Underline
- **S**: Strikethrough
- **x₂**: Subscript
- **x²**: Superscript

### Colors
- **A**: Text color picker
- **◼**: Background color picker

### Alignment
- Left, Center, Right, Justify

### Lists & Indentation
- Bullet list
- Numbered list
- Indent/Outdent

### Advanced
- **"**: Blockquote
- **Table**: Insert table with grid selector
- **Ω**: Special characters modal
- **🔍**: Find & Replace
- **Copy/Paste**: Clipboard operations
- **⊕**: Fullscreen toggle

## 🔑 Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl/Cmd + B` | Bold |
| `Ctrl/Cmd + I` | Italic |
| `Ctrl/Cmd + U` | Underline |
| `Ctrl/Cmd + C` | Copy |
| `Ctrl/Cmd + V` | Paste |
| `ESC` | Exit fullscreen |

## 📝 Output Format

The editor outputs clean HTML:

```html
<p>Regular paragraph with <strong>bold</strong> and <em>italic</em> text.</p>
<h1>Heading 1</h1>
<ul>
  <li>List item 1</li>
  <li>List item 2</li>
</ul>
<table border="1" style="border-collapse: collapse; width: 100%;">
  <tr>
    <td style="padding: 8px; border: 1px solid #ddd;">Cell 1</td>
    <td style="padding: 8px; border: 1px solid #ddd;">Cell 2</td>
  </tr>
</table>
```

## ⚠️ Important Notes

### Content Security
- Always sanitize HTML output before rendering on your backend
- Use libraries like DOMPurify for XSS protection
- Validate content before saving to database

### Performance
- For large documents, consider debouncing the `onChange` callback
- Use React.memo if embedding multiple editors

### Browser Compatibility
- `document.execCommand()` is used for formatting (deprecated but widely supported)
- Fullscreen API requires user interaction to trigger
- Clipboard API may require HTTPS in production

## 🐛 Troubleshooting

### Editor not rendering
```tsx
// Make sure React is imported
import React from 'react';
import { CustomEditor } from 'pdeditor';
```

### TypeScript errors
```bash
# Ensure peer dependencies are installed
npm install react react-dom
npm install -D @types/react @types/react-dom
```

### Paste not working
- Paste requires clipboard permissions
- Use HTTPS in production
- Fallback to Ctrl+V if programmatic paste fails

## 📄 License

ISC

## 🤝 Contributing

Contributions welcome! Please open an issue or submit a PR.

## 📧 Support

For issues and questions, please connect https://www.linkedin.com/in/prashant-dubey-81a102173/
