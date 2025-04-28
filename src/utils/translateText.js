// utils/translateText.js
import axios from 'axios';

const API_KEY = 'YOUR_GOOGLE_API_KEY'; // Use env var for production

export const translateText = async (text, targetLang = 'ta') => {
  try {
    const response = await axios.post(
      `https://translation.googleapis.com/language/translate/v2`,
      null,
      {
        params: {
          q: text,
          target: targetLang,
          key: API_KEY,
        },
      }
    );
    return response.data.data.translations[0].translatedText;
  } catch (error) {
    console.error('Translation failed:', error);
    return text;
  }
};
