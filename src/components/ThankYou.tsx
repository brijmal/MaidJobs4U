import React from 'react';

export default function ThankYou() {
  return (
    <div className="min-h-screen flex items-center justify-center text-center p-4">
      <div className="max-w-md space-y-4">
        <h1 className="text-2xl font-bold text-white">
          Thanks for filling your details. <span className="text-pink-400">MaidJobs4U</span> will get back to you in just a few days with jobs in your locality
        </h1>
        <p className="text-white">
          अपना विवरण भरने के लिए धन्यवाद। <span className="text-pink-400">MaidJobs4U</span> आपके क्षेत्र में नौकरियों के साथ कुछ ही दिनों में आपसे संपर्क करेगा
        </p>
      </div>
    </div>
  );
}