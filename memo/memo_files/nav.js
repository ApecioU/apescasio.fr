const sidebarButton = document.querySelector('.sidebar-button');
const themeContainer = document.querySelector('.theme-container');

// Open the sidebar when the button is clicked
sidebarButton.addEventListener('click', function () {
  themeContainer.classList.toggle('sidebar-open');
});

// Close the sidebar when a user clicks outside of it
document.addEventListener('click', function (event) {
  const targetElement = event.target;

  // Check if the clicked element is not a child of the sidebar or the button
  if (!targetElement.closest('.sidebar') && !targetElement.closest('.sidebar-button')) {
    themeContainer.classList.remove('sidebar-open');
  }
});

// Get all copy buttons
const copyButtons = document.querySelectorAll('.copy-button');

// Loop through each copy button
for (let i = 0; i < copyButtons.length; i++) {
  const copyButton = copyButtons[i];
  const codeBlock = copyButton.parentNode.querySelector('pre');

  // Add click event listener to each copy button
  copyButton.addEventListener('click', () => {
    navigator.clipboard.writeText(codeBlock.textContent)
      .then(() => {
        copyButton.textContent = 'Copied!';
        setTimeout(() => {
          copyButton.textContent = 'Copy';
        }, 1500);
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  });
}


//replace

$(document).ready(function() {
  $(".code-container").on("input", function() {
    // Get the text entered into the code container
    var codeText = $(this).text();

    // Find all PowerShell commands in the text
    var powershellCommands = codeText.match(/Get-\w+|Set-\w+|New-\w+|Remove-\w+/g);

    // Add the 'powershell-command' class to all PowerShell commands
    $.each(powershellCommands, function(index, value) {
      codeText = codeText.replace(new RegExp(value, "g"), "<code class='powershell-command'>" + value + "</code>");
    });

    // Set the updated text back into the code container
    $(this).html("<pre>" + codeText + "</pre>");
  });
});

