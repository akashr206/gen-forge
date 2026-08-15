import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function parsePartialJson(jsonString) {
  if (!jsonString) return null;
  try {
    return JSON.parse(jsonString);
  } catch (e) {}

  let repaired = jsonString;
  let inString = false;
  let isEscaped = false;

  for (let i = 0; i < repaired.length; i++) {
    const char = repaired[i];
    if (char === '\\' && !isEscaped) {
      isEscaped = true;
    } else {
      if (char === '"' && !isEscaped) inString = !inString;
      isEscaped = false;
    }
  }
  
  if (inString) repaired += '"';

  const getBrackets = (str) => {
      let stack = [];
      let inStr = false;
      let esc = false;
      for (let i=0; i<str.length; i++){
          if(str[i]==='\\' && !esc) esc=true;
          else {
              if (str[i]==='"' && !esc) inStr = !inStr;
              else if (!inStr) {
                  if (str[i]==='{') stack.push('}');
                  if (str[i]==='[') stack.push(']');
                  if (str[i]==='}' || str[i]===']') stack.pop();
              }
              esc=false;
          }
      }
      return stack.reverse().join('');
  }
  
  // Backtrack until it parses
  for (let i = repaired.length; i > 0; i--) {
      let sub = repaired.substring(0, i);
      // Clean up dangling commas or colons before closing brackets
      sub = sub.replace(/,\s*$/, '').replace(/:\s*$/, ': null');
      let b = getBrackets(sub);
      try { 
        return JSON.parse(sub + b); 
      } catch(e) {}
  }
  return null;
}
