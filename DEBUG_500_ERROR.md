# 🔧 Cara Fix 500 Internal Server Error - Chatbot

## Status Saat Ini
- ✅ **OPTIONS request**: 200 OK (CORS sudah fix)
- ❌ **POST request**: 500 Internal Server Error
- ❌ **Chatbot response**: "Maaf, terjadi kesalahan..."

## Penyebab #1 (Paling Sering): GEMINI_API_KEY Belum Di-Set

### Cara Fix (5 Menit):

**1. Buka Vercel Dashboard**
   - Go to: https://vercel.com/dashboard
   - Login dengan akun Anda

**2. Pilih Project kombinatorik-chatbot**
   - Klik project "kombinatorik-chatbot"

**3. Go to Settings**
   - Klik tab "Settings" di menu atas

**4. Environment Variables**
   - Klik "Environment Variables" di sidebar kiri
   - Klik tombol "Add New"

**5. Tambahkan Variable**
   ```
   Key: GEMINI_API_KEY
   Value: AIza... (paste API key dari Google AI Studio)
   
   Select Environments:
   ☑ Production
   ☑ Preview  
   ☑ Development
   ```
   - Klik "Save"

**6. Redeploy**
   - Go to "Deployments" tab
   - Klik deployment paling atas (latest)
   - Klik icon "..." (three dots)
   - Klik "Redeploy"
   - Wait ~30 seconds

**7. Test!**
   - Buka website kombinatorik
   - Klik chatbot button
   - Ketik: "Apa itu permutasi?"
   - Chatbot harus respons dengan jawaban! ✅

---

## Cara Cek Error Message Detail

### Di Browser (F12):

**Sebelum fix:**
```javascript
❌ API Error
  Status: 500
  Status Text: Internal Server Error
  Error Data: {error: "GEMINI_API_KEY not configured"}
  ^^^^^^^^^ INI KASIH TAU MASALAHNYA!
```

**Setelah fix:**
```javascript
📥 API Response
  Status: 200 ✅
  Status Text: OK
  Response Data: {response: "Permutasi adalah susunan..."}
```

---

## Penyebab #2: API Key Invalid/Expired

### Cara Fix:

**1. Generate New Key**
   - Go to: https://makersuite.google.com/app/apikey
   - Create new API key
   - Copy key

**2. Update di Vercel**
   - Settings → Environment Variables
   - Edit GEMINI_API_KEY
   - Paste new key
   - Save

**3. Redeploy**

---

## Test API Key Works

### Direct Test (Terminal):
```bash
curl -X POST \
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=YOUR_API_KEY_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "contents": [{
      "parts": [{"text": "Apa itu permutasi?"}]
    }]
  }'
```

**Jika sukses, akan return:**
```json
{
  "candidates": [{
    "content": {
      "parts": [{"text": "Permutasi adalah..."}]
    }
  }]
}
```

**Jika gagal, akan return:**
```json
{
  "error": {
    "message": "API key not valid...",
    "status": "INVALID_ARGUMENT"
  }
}
```

---

## Checklist Troubleshooting

- [ ] GEMINI_API_KEY sudah di-set di Vercel?
- [ ] API key valid? (test dengan curl di atas)
- [ ] Sudah redeploy setelah set env var?
- [ ] Browser console shows detail error? (F12)
- [ ] Vercel function logs checked? (Dashboard → Functions)

---

## Kontak Jika Masih Error

Jika setelah ikuti semua step di atas masih error:

1. **Screenshot console error** (F12 → Console tab)
2. **Copy error message** dari console
3. **Check Vercel logs**: Dashboard → Deployments → Latest → Functions → api/chat
4. **Screenshot Vercel logs**

Dengan info di atas, akan lebih mudah untuk debug!

---

## Quick Commands

### Check Vercel env vars (Terminal):
```bash
vercel env ls
```

### Add env var:
```bash
vercel env add GEMINI_API_KEY
# Paste key when prompted
```

### Redeploy:
```bash
vercel --prod
```

### Test endpoint:
```bash
curl -X POST https://kombinatorik-chatbot.vercel.app/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "test"}'
```

Expected response:
```json
{"response": "Saya adalah guru matematika..."}
```

---

**TL;DR: 99% chance masalahnya GEMINI_API_KEY belum di-set. Set di Vercel → Redeploy → Fixed! ✅**
