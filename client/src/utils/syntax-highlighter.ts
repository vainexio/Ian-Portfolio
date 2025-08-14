// Enhanced JavaScript syntax highlighter for the Live Coding Environment
// Supports both light and dark modes with accessibility-focused color contrast

interface SyntaxToken {
  type: 'keyword' | 'variable' | 'property' | 'function' | 'string' | 'comment' | 'number' | 'operator' | 'punctuation' | 'text';
  value: string;
}

// Color themes for light and dark modes
const colorSchemes = {
  dark: {
    keyword: '#FF6B9D',      // Pink for keywords (if, const, let, function, etc.)
    variable: '#61DAFB',     // Cyan for variables
    property: '#FFD93D',     // Yellow for object properties
    function: '#9B59B6',     // Purple for function names
    string: '#4ECDC4',       // Teal for strings
    comment: '#7F8C8D',      // Gray for comments
    number: '#E67E22',       // Orange for numbers
    operator: '#F39C12',     // Amber for operators
    punctuation: '#BDC3C7',  // Light gray for punctuation
    text: '#FFFFFF'          // White for default text
  },
  light: {
    keyword: '#E91E63',      // Deep pink for keywords
    variable: '#00BCD4',     // Cyan for variables
    property: '#FF9800',     // Orange for object properties
    function: '#9C27B0',     // Purple for function names
    string: '#4CAF50',       // Green for strings
    comment: '#9E9E9E',      // Gray for comments
    number: '#FF5722',       // Deep orange for numbers
    operator: '#795548',     // Brown for operators
    punctuation: '#424242',  // Dark gray for punctuation
    text: '#212121'          // Almost black for default text
  }
};

// Keywords to highlight
const keywords = [
  'const', 'let', 'var', 'function', 'class', 'if', 'else', 'for', 'while', 'do',
  'switch', 'case', 'default', 'break', 'continue', 'return', 'try', 'catch',
  'finally', 'throw', 'new', 'this', 'super', 'extends', 'import', 'export',
  'from', 'default', 'async', 'await', 'true', 'false', 'null', 'undefined',
  'typeof', 'instanceof', 'in', 'of', 'delete', 'void'
];

// Operators
const operators = [
  '+', '-', '*', '/', '%', '=', '==', '===', '!=', '!==', '>', '<', '>=', '<=',
  '&&', '||', '!', '&', '|', '^', '~', '<<', '>>', '>>>', '?', ':', '=>'
];

// Function to tokenize JavaScript code
function tokenize(code: string): SyntaxToken[] {
  const tokens: SyntaxToken[] = [];
  let i = 0;

  while (i < code.length) {
    const char = code[i];

    // Skip whitespace but preserve it
    if (/\s/.test(char)) {
      let whitespace = '';
      while (i < code.length && /\s/.test(code[i])) {
        whitespace += code[i];
        i++;
      }
      tokens.push({ type: 'text', value: whitespace });
      continue;
    }

    // Single-line comments
    if (char === '/' && code[i + 1] === '/') {
      let comment = '';
      while (i < code.length && code[i] !== '\n') {
        comment += code[i];
        i++;
      }
      tokens.push({ type: 'comment', value: comment });
      continue;
    }

    // Multi-line comments
    if (char === '/' && code[i + 1] === '*') {
      let comment = '';
      while (i < code.length - 1 && !(code[i] === '*' && code[i + 1] === '/')) {
        comment += code[i];
        i++;
      }
      if (i < code.length - 1) {
        comment += '*/';
        i += 2;
      }
      tokens.push({ type: 'comment', value: comment });
      continue;
    }

    // Strings (single or double quotes)
    if (char === '"' || char === "'" || char === '`') {
      const quote = char;
      let string = quote;
      i++;
      while (i < code.length && code[i] !== quote) {
        if (code[i] === '\\') {
          string += code[i];
          i++;
          if (i < code.length) {
            string += code[i];
            i++;
          }
        } else {
          string += code[i];
          i++;
        }
      }
      if (i < code.length) {
        string += code[i];
        i++;
      }
      tokens.push({ type: 'string', value: string });
      continue;
    }

    // Numbers
    if (/\d/.test(char) || (char === '.' && /\d/.test(code[i + 1]))) {
      let number = '';
      while (i < code.length && (/[\d.]/.test(code[i]) || (code[i].toLowerCase() === 'e' && /[+-]?\d/.test(code[i + 1])))) {
        number += code[i];
        i++;
      }
      tokens.push({ type: 'number', value: number });
      continue;
    }

    // Operators (check longer operators first)
    let operatorFound = false;
    for (const op of operators.sort((a, b) => b.length - a.length)) {
      if (code.substr(i, op.length) === op) {
        tokens.push({ type: 'operator', value: op });
        i += op.length;
        operatorFound = true;
        break;
      }
    }
    if (operatorFound) continue;

    // Punctuation
    if (/[{}[\]();,.]/.test(char)) {
      tokens.push({ type: 'punctuation', value: char });
      i++;
      continue;
    }

    // Identifiers (variables, functions, properties)
    if (/[a-zA-Z_$]/.test(char)) {
      let identifier = '';
      while (i < code.length && /[a-zA-Z0-9_$]/.test(code[i])) {
        identifier += code[i];
        i++;
      }

      // Check if it's a keyword
      if (keywords.includes(identifier)) {
        tokens.push({ type: 'keyword', value: identifier });
      } else {
        // Check if it's followed by parentheses (function call)
        let j = i;
        while (j < code.length && /\s/.test(code[j])) j++;
        if (j < code.length && code[j] === '(') {
          tokens.push({ type: 'function', value: identifier });
        } else {
          // Check if it's a property (preceded by a dot)
          let k = tokens.length - 1;
          while (k >= 0 && tokens[k].type === 'text') k--;
          if (k >= 0 && tokens[k].type === 'punctuation' && tokens[k].value === '.') {
            tokens.push({ type: 'property', value: identifier });
          } else {
            tokens.push({ type: 'variable', value: identifier });
          }
        }
      }
      continue;
    }

    // Any other character
    tokens.push({ type: 'text', value: char });
    i++;
  }

  return tokens;
}

// Function to apply syntax highlighting
export function highlightJavaScript(code: string, isDarkMode: boolean = true): string {
  const tokens = tokenize(code);
  const colors = isDarkMode ? colorSchemes.dark : colorSchemes.light;
  
  return tokens.map(token => {
    const color = colors[token.type];
    return `<span style="color: ${color}; font-weight: ${token.type === 'keyword' || token.type === 'function' ? 'bold' : 'normal'}">${escapeHtml(token.value)}</span>`;
  }).join('');
}

// Helper function to escape HTML
function escapeHtml(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Function to get highlighted code with typing animation
export function getHighlightedCodeWithTyping(code: string, typedLength: number, isDarkMode: boolean = true): string {
  const visibleCode = code.substring(0, typedLength);
  return highlightJavaScript(visibleCode, isDarkMode);
}