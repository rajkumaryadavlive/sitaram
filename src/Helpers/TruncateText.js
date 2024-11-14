// Utils/truncateText.js

export const truncateText = (text, maxWords = 20) => {
    // Split the text into words
    const words = text.split(' ');
  
    // If the number of words is less than or equal to the maxWords, return the original text
    if (words.length <= maxWords) {
      return text;
    }
  
    // Otherwise, truncate the text to maxWords and add ellipsis
    const truncatedText = words.slice(0, maxWords).join(' ') + '...';
  
    return truncatedText;
  };

   // Function to get user initials
  export  const getUserInitials = (name) => {
    if (!name) return '';
    const names = name.split(' ');
    const initials = names.length > 1
      ? names[0][0] + names[1][0]
      : names[0][0];
    return initials.toUpperCase();
  };
  