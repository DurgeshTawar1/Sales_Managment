// ScreenshotTaker.tsx
import React, { useEffect } from 'react';
import html2canvas from 'html2canvas';

const ScreenshotTaker: React.FC = () => {
  useEffect(() => {
    const takeScreenshot = () => {
      html2canvas(document.body).then(canvas => {
        // Convert the canvas to an image
        const img = canvas.toDataURL('image/png');
        // Save the image or do something with it
        console.log('Screenshot taken:', img);

        // You can also save the screenshot as a file if needed
        const link = document.createElement('a');
        link.href = img;
        link.download = `screenshot-${Date.now()}.png`;
        link.click();
      });
    };

    // Take a screenshot every minute
    const intervalId = setInterval(takeScreenshot, 60000);

    // Cleanup on component unmount
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return null;
};

export default ScreenshotTaker;
