const { execSync } = require('child_process');
const path = require('path');

const pngDir = 'C:\\Users\\Administrator\\token-hacker\\social-content\\output-images\\png';
const vidDir = 'C:\\Users\\Administrator\\token-hacker\\social-content\\output-videos';
const { mkdirSync, existsSync } = require('fs');
if (!existsSync(vidDir)) mkdirSync(vidDir);

// Helper: create a video from frames list with durations in seconds
function makeVideo(name, frames, durations) {
  const outPath = path.join(vidDir, name);
  
  // Create concat file with per-frame durations
  const concatLines = [];
  let totalDuration = 0;
  for (let i = 0; i < frames.length; i++) {
    const framePath = path.join(pngDir, frames[i]).replace(/\\/g, '/');
    const dur = durations[i] || 4;
    concatLines.push(`file '${framePath}'`);
    concatLines.push(`duration ${dur}`);
    totalDuration += dur;
  }
  // FFmpeg concat needs last frame repeated
  concatLines.push(`file '${path.join(pngDir, frames[frames.length - 1]).replace(/\\/g, '/')}'`);
  
  const concatContent = concatLines.join('\n');
  const concatFile = path.join(vidDir, 'concat.txt');
  require('fs').writeFileSync(concatFile, concatContent);
  
  console.log(`\n🎬 Creating: ${name} (${totalDuration.toFixed(0)}s)`);
  
  try {
    execSync(
      `ffmpeg -y -f concat -safe 0 -i "${concatFile}" -vf "fps=30,format=yuv420p" -c:v libx264 -preset fast -crf 23 -pix_fmt yuv420p "${outPath}"`,
      { stdio: 'inherit', timeout: 60000 }
    );
    console.log(`✅ ${name} done!`);
  } catch (e) {
    console.error(`❌ ${name} failed:`, e.message);
  }
  
  // Clean up concat file
  require('fs').unlinkSync(concatFile);
}

// === VIDEO 1: "The API Key Problem" (25s) ===
makeVideo('video-1-api-key-problem.mp4',
  ['tk-v1-01-hook.png', 'tk-v1-02-problem.png', 'tk-v1-03-solution.png', 'tk-v1-04-price.png', 'tk-v1-05-cta.png'],
  [3, 5, 4, 6, 4]  // ~22s
);

// === VIDEO 2: "Save 60%" (20s) ===
makeVideo('video-2-save-60-percent.mp4',
  ['tk-v2-01-hook.png', 'tk-v2-02-gpt4o.png', 'tk-v2-03-claude.png', 'tk-v2-04-total.png', 'tk-v2-05-cta.png'],
  [3, 4, 4, 4, 4]  // ~19s
);

// === VIDEO 3: "One Line Switch" (15s) ===
makeVideo('video-3-one-line-switch.mp4',
  ['tk-v3-01-hook.png', 'tk-v3-02-gpt4o.png', 'tk-v3-03-claude.png', 'tk-v3-04-deepseek.png', 'tk-v3-05-cta.png'],
  [2, 3, 3, 3, 3]  // ~14s
);

console.log('\n🎉 All TikTok videos generated!');
