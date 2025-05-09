import { useLanguage } from '../LanguageContext'; // Import the context

const Navigation = () => {
  const { isTamil, setIsTamil, setTranslations } = useLanguage();

  const translatePage = async () => {
    const labelsToTranslate = [
      'Home', 'Products', 'Rental', 'Dashboard', 'Cart',
      'Transaction', 'Login', 'Logout', 'Welcome to Agrilink',
      'Explore our features', 'Your personalized dashboard',
      'Add to cart', 'View products', 'Rent now',
    ];

    const translatedMap = {};
    for (const text of labelsToTranslate) {
      try {
        const res = await axios.post(
          'https://google-translate113.p.rapidapi.com/api/v1/translator/text',
          {
            from: 'en',
            to: isTamil ? 'en' : 'ta',
            text,
          },
          {
            headers: {
              'X-RapidAPI-Key': 'YOUR_RAPIDAPI_KEY',
              'X-RapidAPI-Host': 'google-translate113.p.rapidapi.com',
              'Content-Type': 'application/json',
            },
          }
        );

        translatedMap[text] = res.data.trans;
      } catch (err) {
        console.error('Translation failed for:', text, err.message);
        translatedMap[text] = text; // fallback
      }
    }

    setTranslations(translatedMap);
    setIsTamil(!isTamil);
  };

  return (
    <button onClick={translatePage}>
      {isTamil ? 'English' : 'தமிழ்'}
    </button>
  );
};
