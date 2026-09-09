const fs = require('fs');
const path = require('path');

const basePath = 'c:/Users/v/Downloads/golden-embrace-wedding-main/golden-embrace-wedding-main/src/components/sections';

const filesToUpdate = [
  'SectionTwoStory.tsx',
  'SectionFiveEvents.tsx',
  'SectionSixHaldi.tsx',
  'SectionSevenSangeet.tsx',
  'SectionEightBaraat.tsx',
  'SectionTenThankYou.tsx'
];

for (const file of filesToUpdate) {
  const filePath = path.join(basePath, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Add imports if missing
  if (!content.includes('useRef')) {
    if (content.includes('import { useState, useEffect }')) {
       content = content.replace('import { useState, useEffect }', 'import { useState, useEffect, useRef }');
    } else if (content.includes('import { clips')) {
       content = `import { useRef } from "react";\n` + content;
    } else {
       content = `import { useRef } from "react";\n` + content;
    }
  }
  
  if (!content.includes('usePlayOnScroll')) {
    content = `import { usePlayOnScroll } from "@/hooks/usePlayOnScroll";\n` + content;
  }

  // SectionTwoStory is a special case since it already has videoRef and observer logic
  if (file === 'SectionTwoStory.tsx') {
    // Replace the manual observer logic with the hook
    content = content.replace(/\/\/ Video intersection observer logic[\s\S]*?\}, \[\]\);/m, 'usePlayOnScroll(videoRef, true, 0.5);');
    fs.writeFileSync(filePath, content, 'utf8');
    continue;
  }

  // For others: add videoRef if missing
  if (!content.includes('const videoRef')) {
    content = content.replace(/(const revealRef.*?;\n)/, '$1  const videoRef = useRef<HTMLVideoElement>(null);\n  usePlayOnScroll(videoRef, false, 0.3);\n');
  }

  // Update video tags: add ref, remove autoPlay, update opacity
  content = content.replace(/<video([\s\S]*?)>/, (match, p1) => {
    let newTag = p1;
    if (!newTag.includes('ref={videoRef}')) {
      newTag = '\n            ref={videoRef}' + newTag;
    }
    newTag = newTag.replace(/\s*autoPlay\s*/, '\n            ');
    
    // Change opacity to 100
    newTag = newTag.replace(/opacity-\d+/, 'opacity-100');
    // Remove mix-blend if present
    newTag = newTag.replace(/mix-blend-overlay/, '');
    
    return `<video${newTag}>`;
  });

  // Remove gradients
  content = content.replace(/<div className="absolute inset-0 bg-gradient-to-t [^"]+" \/>/, '');
  content = content.replace(/<div className="absolute inset-0 bg-gradient-to-b [^"]+" \/>/, '');
  
  // Also remove pointer-events-none gradients
  content = content.replace(/<div className="absolute inset-0 bg-gradient-to-[tb] [^"]+ pointer-events-none" \/>/, '');

  fs.writeFileSync(filePath, content, 'utf8');
}

console.log("Successfully updated all video sections!");
