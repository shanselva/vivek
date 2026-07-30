const fs = require('fs');
const path = require('path');

const files = [
  'app/(admin)/dashboard/testimonials/page.tsx',
  'app/(admin)/dashboard/team/page.tsx',
  'app/(admin)/dashboard/services/page.tsx',
  'app/(admin)/dashboard/projects/page.tsx',
  'app/(admin)/dashboard/gallery/page.tsx',
  'app/(admin)/dashboard/categories/page.tsx'
];

files.forEach(file => {
  const filePath = path.join(__dirname, file);
  let content = fs.readFileSync(filePath, 'utf8');

  const exportRegex = /export\s+default\s+function\s+(\w+)\s*\(\)\s*\{/;
  const match = content.match(exportRegex);
  if (match) {
    const functionName = match[1];
    let newFunctionName = functionName.replace('Page', 'Content');
    if (newFunctionName === functionName) newFunctionName += 'Content';
    
    content = content.replace(exportRegex, `function ${newFunctionName}() {`);

    if (!content.includes('Suspense')) {
      content = content.replace(/'use client';/, "'use client';\nimport { Suspense } from 'react';");
    }

    content += `\nexport default function ${functionName}() {\n  return (\n    <Suspense fallback={<div className="flex justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>}>\n      <${newFunctionName} />\n    </Suspense>\n  );\n}\n`;

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${file}`);
  }
});
