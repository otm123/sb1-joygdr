import React, { useState, useEffect } from 'react';
import { User, Briefcase, MessageSquare, Hash } from 'lucide-react';

interface ProfileInfo {
  interests: string[];
  engagementTypes: string[];
  industries: string[];
  topics: string[];
}

function App() {
  const [profileInfo, setProfileInfo] = useState<ProfileInfo | null>(null);

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];
      if (activeTab.id) {
        chrome.tabs.sendMessage(
          activeTab.id,
          { action: 'extractProfileInfo' },
          (response: ProfileInfo) => {
            setProfileInfo(response);
          }
        );
      }
    });
  }, []);

  if (!profileInfo) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="w-96 p-4 bg-white">
      <h1 className="text-2xl font-bold mb-4">LinkedIn Profile Insights</h1>
      
      <div className="mb-4">
        <h2 className="text-lg font-semibold flex items-center"><User className="w-5 h-5 mr-2" /> Interests</h2>
        <ul className="list-disc pl-5">
          {profileInfo.interests.map((interest, index) => (
            <li key={index}>{interest}</li>
          ))}
        </ul>
      </div>

      <div className="mb-4">
        <h2 className="text-lg font-semibold flex items-center"><MessageSquare className="w-5 h-5 mr-2" /> Engagement Types</h2>
        <ul className="list-disc pl-5">
          {profileInfo.engagementTypes.map((type, index) => (
            <li key={index}>{type}</li>
          ))}
        </ul>
      </div>

      <div className="mb-4">
        <h2 className="text-lg font-semibold flex items-center"><Briefcase className="w-5 h-5 mr-2" /> Industries</h2>
        <ul className="list-disc pl-5">
          {profileInfo.industries.map((industry, index) => (
            <li key={index}>{industry}</li>
          ))}
        </ul>
      </div>

      <div className="mb-4">
        <h2 className="text-lg font-semibold flex items-center"><Hash className="w-5 h-5 mr-2" /> Topics</h2>
        <ul className="list-disc pl-5">
          {profileInfo.topics.map((topic, index) => (
            <li key={index}>{topic}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;