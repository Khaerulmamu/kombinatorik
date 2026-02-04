# 🎵 Music Player Guide - Quiz Page

## Overview
Music player sederhana sudah ditambahkan di halaman quiz dengan tombol play/pause toggle di pojok kiri bawah.

## Features
- ✅ Single button toggle (Play ▶️ / Pause ⏸️)
- ✅ Fixed position (bottom-left corner)
- ✅ Purple gradient (konsisten dengan theme)
- ✅ Default state: Paused
- ✅ Error handling (file not found)

## Setup Instructions

### Step 1: Add MP3 File

**Option A: Root Directory**
```bash
# Copy file ke root repository
cp /path/to/tante-culik-aku-dong-remix.mp3 ./
```

**Option B: Assets Directory (Recommended)**
```bash
# Buat folder assets
mkdir -p assets

# Copy file ke assets
cp /path/to/tante-culik-aku-dong-remix.mp3 ./assets/

# Update quiz.html line 700:
<source src="assets/tante-culik-aku-dong-remix.mp3" type="audio/mpeg">
```

**Option C: Use External URL**
```html
<!-- Edit quiz.html line 700 -->
<source src="https://example.com/path/to/song.mp3" type="audio/mpeg">
```

### Step 2: Test

1. Open `quiz.html` in browser
2. Look for ▶️ button in bottom-left corner
3. Click button
4. Music should start playing (icon changes to ⏸️)
5. Click again to pause

## File Name Requirements

The audio file should be named:
```
tante-culik-aku-dong-remix.mp3
```

Or update the source in `quiz.html` line 700 to match your filename.

## Troubleshooting

### Button Shows ❌
**Problem:** MP3 file not found

**Solution:**
1. Check file exists in correct location
2. Check filename matches exactly
3. Check file format is MP3
4. Check browser console for errors

### Button Shows ▶️ but No Sound
**Problem:** Audio file found but can't play

**Solution:**
1. Check file is valid MP3
2. Check browser audio permissions
3. Try different browser
4. Check file isn't corrupted

### Button Disabled
**Problem:** Audio error detected

**Solution:**
1. Refresh page
2. Check browser console
3. Verify file path in source code

## Customization

### Change Position
Edit `quiz.html` line 705:
```html
<!-- Change from bottom-left to bottom-right -->
class="fixed bottom-6 right-6 ..."

<!-- Change from bottom to top -->
class="fixed top-6 left-6 ..."
```

### Change Colors
Edit `quiz.html` line 705:
```html
<!-- Change gradient colors -->
bg-gradient-to-r from-blue-600 to-green-600
hover:from-blue-700 hover:to-green-700
```

### Change Size
Edit `quiz.html` line 705:
```html
<!-- Make larger -->
class="... w-16 h-16 ..."

<!-- Make smaller -->
class="... w-12 h-12 ..."
```

### Enable Loop
Edit `quiz.html` line 698:
```html
<audio id="bgMusic" preload="metadata" loop>
                                         ^^^^
```

### Auto-play on Load (Not Recommended)
Edit `quiz.html` line 698:
```html
<audio id="bgMusic" preload="metadata" autoplay>
                                       ^^^^^^^^
```

**Note:** Most browsers block autoplay. User must interact first.

## Technical Details

**Audio Element:**
- Format: MP3 (audio/mpeg)
- Preload: metadata only (efficient)
- Controls: Hidden (custom button used)

**Button:**
- Type: Fixed position button
- Framework: Tailwind CSS
- JavaScript: Vanilla (no dependencies)

**Browser Support:**
- Chrome: ✅
- Firefox: ✅
- Safari: ✅
- Edge: ✅
- Mobile browsers: ✅

## FAQ

**Q: Can I use a different song?**
A: Yes! Just replace the MP3 file or update the source URL.

**Q: Will music play on all pages?**
A: No, only on quiz page. Each page is independent.

**Q: Can I add volume control?**
A: Yes, but requires additional implementation. Current version is simple toggle only.

**Q: Does it work offline?**
A: Yes, if MP3 file is in repository. No if using external URL.

**Q: Can I disable the music player?**
A: Yes, remove or comment out the audio element and button in quiz.html.

## Support

If you encounter issues:
1. Check browser console (F12)
2. Verify file exists
3. Check filename spelling
4. Try different browser
5. Check file isn't corrupted

---

**Created:** 2026-02-04  
**Version:** 1.0  
**Status:** Ready to use
