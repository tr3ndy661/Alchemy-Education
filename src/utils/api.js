const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY; // Replace with your actual API key
const KHAN_ACADEMY_API_URL = 'https://www.khanacademy.org/api/v1';

export const fetchYouTubeVideo = async (videoId) => {
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${YOUTUBE_API_KEY}&part=snippet`
    );
    return await response.json();
  } catch (error) {
    console.error('Error fetching YouTube video:', error);
    return null;
  }
};

export const fetchKhanAcademyContent = async (topic) => {
  try {
    const response = await fetch(`${KHAN_ACADEMY_API_URL}/topic/${topic}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching Khan Academy content:', error);
    return null;
  }
};
