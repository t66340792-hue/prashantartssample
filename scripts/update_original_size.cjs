const fs = require('fs');
const path = require('path');

const basePath = 'c:/Users/v/Downloads/golden-embrace-wedding-main/golden-embrace-wedding-main/src/components/sections';

const filesToUpdate = [
  'SectionSixHaldi.tsx',
  'SectionSevenSangeet.tsx',
  'SectionEightBaraat.tsx'
];

for (const file of filesToUpdate) {
  const filePath = path.join(basePath, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Change section wrapper: remove h-screen, maybe keep bg color or change to black to avoid weird empty space, 
  // but if we remove h-screen, the section height just wraps the video height, so bg color doesn't matter much.
  content = content.replace(/className="relative w-full h-screen overflow-hidden bg-[^"]+"/, 'className="relative w-full overflow-hidden bg-black"');
  
  // Update video className to remove absolute positioning and object-cover, and use h-auto
  content = content.replace(/className="absolute inset-0 w-full h-full object-cover opacity-100"/, 'className="w-full h-auto block opacity-100"');

  fs.writeFileSync(filePath, content, 'utf8');
}

console.log("Updated videos to original size!");
