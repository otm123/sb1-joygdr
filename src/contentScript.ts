function extractProfileInfo() {
  const interests: string[] = [];
  const engagementTypes: string[] = [];
  const industries: string[] = [];
  const topics: string[] = [];

  // Extract interests
  document.querySelectorAll('.pv-interest-entity').forEach((element) => {
    const interest = element.querySelector('.pv-entity__summary-title')?.textContent?.trim();
    if (interest) interests.push(interest);
  });

  // Extract engagement types (based on recent activity)
  document.querySelectorAll('.feed-shared-update-v2').forEach((post) => {
    const action = post.querySelector('.feed-shared-actor__sub-description')?.textContent?.trim();
    if (action && !engagementTypes.includes(action)) engagementTypes.push(action);
  });

  // Extract industries and topics
  document.querySelectorAll('.pv-skill-category-entity').forEach((skill) => {
    const skillName = skill.querySelector('.pv-skill-category-entity__name')?.textContent?.trim();
    if (skillName) {
      if (skillName.toLowerCase().includes('industry')) {
        industries.push(skillName);
      } else {
        topics.push(skillName);
      }
    }
  });

  return { interests, engagementTypes, industries, topics };
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'extractProfileInfo') {
    sendResponse(extractProfileInfo());
  }
});