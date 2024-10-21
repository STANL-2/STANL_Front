import axios from 'axios'

const API_URL = 'https://api-free.deepl.com/v2/translate';
const API_KEY = 'bd80fa80-2ae0-4150-8c09-94e9178fad80:fx';

export const translateText = async (text, targetLang) => {
  try {
    const response = await axios.post(
      API_URL,
      new URLSearchParams({
        auth_key: API_KEY,
        text,
        target_lang: targetLang,
      })
    );
    
    // DeepL API에서 번역된 텍스트 반환
    return response.data.translations[0].text;
  } catch (error) {
    console.error('Translation error:', error);
    return text; // 번역 실패 시 원문 반환
  }
};
