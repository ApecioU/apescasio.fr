const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');

const pages = [
  { title: 'Accueil', url: 'https://www.apescasio.fr/memo', keywords: 'accueil aaron pescasio home' },
  { title: "Script d'installation Windows Server (IP, AD DS, DNS, DHCP... tout préconfiguré)", url: 'https://apescasio.fr/memo/vt/ad', keywords: 'ipi scripts script powershell ad ds dns dhcp windows windows server ip batch' },
  { title: "Script de préparation d'un PC portable pour un nouveau salarié", url: 'https://www.apescasio.fr/memo/ws/integration', keywords: 'script powershell preparation préparation pc portable nouveau salarié ' },
  { title: "Script pour savoir la date de 'LastLogOn' d'un utilisateur", url: 'https://www.apescasio.fr/memo/ws/lastlogon', keywords: 'script powershell preparation préparation pc portable nouveau salarié ' },
  { title: "Script pour rechercher une valeur dans plusieurs fichiers Excel", url: 'https://www.apescasio.fr/memo/ws/trouver-excel', keywords: 'script rechercher une valeur dans plusieurs fichiers Excel' },
  { title: "Script pour faciliter la migration d'un ancien PC au nouveau PC", url: 'https://www.apescasio.fr/memo/ws/migration', keywords: 'script migration ancien PC au nouveau PC' },
  { title: "Script pour préparer et sécuriser son VPS", url: 'https://www.apescasio.fr/memo/vps/prep', keywords: 'script prep préparer sécuriser son vps' },
  { title: "Script pour mettre en place un serveur web NGINX et héberger son site web", url: 'https://apescasio.fr/memo/vps/web', keywords: 'script serveur web nginx site web vps ssl certbot https' },
  { title: "Procédure EBP pour 'L'utilisateur est déjà connecté depuis le JJ/MM/YYYY'", url: 'https://apescasio.fr/memo/ebp/', keywords: 'procédure procedure ebp utilisateur déjà deja connecté connecte depuis le' },
  { title: "Procédure pour la mise en place d'un Azure AD", url: 'https://www.apescasio.fr/memo/azure', keywords: 'azure ad procédure procedure mise en place' },
  { title: "Procédure pour synchroniser des utilisateurs Office 365 déjà existants avec l'AD on-premise (local)", url: 'https://www.apescasio.fr/memo/azure/fixadc/', keywords: 'azure ad procédure procedure office 365 office365 synchroniser AD on-premise onpremise premise' },
  { title: "Procédure Citrix pour se connecter à 'MonBureauVirtuel'", url: 'https://apescasio.fr/memo/citrix/', keywords: 'procédure procedure citrix monbureauvirtuel connecter à a mon bureau virtuel' }

];

let selectedSuggestionIndex = 0;
let searchResultsVisible = false;
function updateSearchResults() {

  const inputValues = searchInput.value.toLowerCase().split(' ');
  const matchingPages = pages.filter(page => {
    if (!inputValues[0]) {
      return false;
    }
    if (page.keywords) {
      const pageKeywords = page.keywords.split(' ');
      return inputValues.every(inputValue => {
        return pageKeywords.some(keyword => keyword.includes(inputValue));
      });
    }
    return inputValues.every(inputValue => {
      return page.title.toLowerCase().includes(inputValue);
    });
  });

  searchResults.innerHTML = '';
  matchingPages.forEach((page, index) => {
    const resultItem = document.createElement('li');
    resultItem.classList.add('search-result-item');
    if (index === selectedSuggestionIndex) {
      resultItem.classList.add('selected');
      resultItem.innerHTML = `<a href="${page.url}" class="pagesselected">${page.title}</a>`;
    } else {
      resultItem.innerHTML = `<a href="${page.url}" class="pagesconst">${page.title}</a>`;
    }
    resultItem.addEventListener('click', () => {
      window.location.href = page.url;
    });
    resultItem.addEventListener('mouseenter', () => {
      resultItem.querySelector('a').classList.add('pagesselected');
    });
    resultItem.addEventListener('mouseleave', () => {
      resultItem.querySelector('a').classList.remove('pagesselected');
    });
    searchResults.appendChild(resultItem);
  });


  // Show or hide search results based on whether there are any matches
  if (matchingPages.length > 0) {
    searchResults.style.display = 'block';
    searchResultsVisible = true;
  } else {
    searchResults.style.display = 'none';
    searchResultsVisible = false;
  }
}


searchInput.addEventListener('input', () => {
  selectedSuggestionIndex = 0;
  updateSearchResults();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowDown') {
    event.preventDefault();
    const suggestions = document.querySelectorAll('.search-result-item');
    selectedSuggestionIndex = (selectedSuggestionIndex + 1) % suggestions.length;
    updateSearchResults();
  } else if (event.key === 'ArrowUp') {
    event.preventDefault();
    const suggestions = document.querySelectorAll('.search-result-item');
    selectedSuggestionIndex = (selectedSuggestionIndex - 1 + suggestions.length) % suggestions.length;
    updateSearchResults();
  } else if (event.key === 'Enter') {
    event.preventDefault();
    const suggestion = document.querySelector('.search-result-item.selected');
    if (suggestion) {
      window.location.href = suggestion.querySelector('a').href;
    }
  } else if (event.key === 'Escape') {
    event.preventDefault();
    searchResults.style.display = 'none';
    searchResultsVisible = false;
  }
});

// Hide search results when user clicks outside the search input
document.addEventListener('click', (event) => {
  const isClickInsideSearchInput = searchInput.contains(event.target);
  if (!isClickInsideSearchInput && searchResultsVisible) {
    searchResults.style.display = 'none';
    searchResultsVisible = false;
  }
});

// Show search results again when user clicks on the search input
searchInput.addEventListener('click', () => {
  if (!searchResultsVisible) {
    searchResults.style.display = 'block';
    searchResultsVisible = true;
  }
});
