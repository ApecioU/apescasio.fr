// Get all <pre> blocks
const codeBlocks = document.querySelectorAll('pre');

// Loop through each <pre> element
for (let i = 0; i < codeBlocks.length; i++) {
  const lines = codeBlocks[i].textContent.trim().split('\n');
  let code = '';

  // Wrap each line in <code> tags and apply appropriate class
  for (let j = 0; j < lines.length; j++) {
    let line = lines[j].trim();
    let className = '';

    // Determine appropriate class based on contents of the line
    if (line.startsWith('#')) {
      className = 'powershell-comment';
    } else if (line.startsWith('::')) {
      className = 'batch-comment';
    } else if (line.startsWith('#!/bin/bash')) {
      className = 'bash-command';
    } else {
      // Split line into individual tokens based on whitespace, parenthesis, and curly braces
      const tokens = line.split(/(\s+|[\(\){}]|%[^%]*%|"[^"]*")/); // added " character " to the regular expression
      for (let k = 0; k < tokens.length; k++) {
        const token = tokens[k];
        if (token.startsWith('$')) {
          // Token is a PowerShell variable
          const variableName = token.replace('$', '');
          // Replace the variable name in the line with a span element with the appropriate class
          line = line.replace(token, `<span class="powershell-variable">${token}</span>`);
        } else if (token.startsWith('%')) {
          // Token is a Batch variable
          if (token.endsWith('%')) {
            // Token is at the end of a line
            line = line.replace(token, `<span class="batch-variable">${token}</span>`);
          } else if (tokens[k+1] && tokens[k+1].endsWith('%')) {
            // Token is at the start of a line
            const nextToken = tokens[k+1];
            line = line.replace(`${token}${nextToken}`, `<span class="batch-variable">${token}${nextToken}</span>`);
            k++;
          }
        } else if (token === 'if' || token === 'else' || token === 'elseif') {
          // Token is an if/else statement
          className = 'powershell-conditional';
        } else if (token === '(' || token === ')') {
          // Token is a parenthesis
          className = 'powershell-parenthesis';
        } else if (token === '{' || token === '}') {
          // Token is a curly brace
          className = 'powershell-curly-brace';
        } else if (token === '}' && tokens[k-1] === '{') {
          // This is a single-line if/else statement, which we want to assign the conditional class
          className = 'powershell-conditional';
        } else if (!className) {
          // Token is a PowerShell command (if no class has been assigned yet)
          className = 'powershell-command';
        }
      }
    }

    // Wrap line in <code> tags and apply class
    code += '<code';
    if (className) {
      code += ' class="' + className + '"';
    }
    code += '>' + line + '</code>\n';
  }

  // Replace the original <pre> content with the wrapped code
  codeBlocks[i].innerHTML = code;
}

$(function() {
  $("#includedContent").load("/memo/memo_files/headermemo.txt");
});