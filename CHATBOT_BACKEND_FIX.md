# 🔧 Fix untuk Backend Chatbot (kombinatorik-chatbot repo)

## Masalah CORS

Jika chatbot tidak bisa connect ke API Vercel, kemungkinan besar masalahnya adalah **CORS (Cross-Origin Resource Sharing)**. Browser memblock request dari domain berbeda jika server tidak mengirim CORS headers yang tepat.

## ✅ Solusi: Tambahkan CORS Headers di api/chat.js

Ganti file `api/chat.js` di repo `kombinatorik-chatbot` dengan kode berikut:

```javascript
export default async function handler(req, res) {
  // ============================================
  // CORS HEADERS - WAJIB UNTUK ALLOW REQUESTS
  // ============================================
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*'); // Atau ganti dengan domain spesifik
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST method for actual requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // 1. Ambil "message" dari request body
  const { message } = req.body;
  
  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'GEMINI_API_KEY not configured' });
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: "Anda adalah guru matematika yang ramah dan sabar. Jawablah pertanyaan ini seputar kombinatorika dengan jelas dan mudah dipahami. Gunakan contoh jika perlu: " + message
            }]
          }]
        })
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Gemini API Error:', errorData);
      throw new Error(`Gemini API returned ${response.status}`);
    }

    const data = await response.json();
    
    // 2. Ambil teks jawaban
    const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || "Maaf, saya sedang tidak bisa berpikir.";

    // 3. Kirim response dengan format yang benar
    res.status(200).json({ response: aiText });

  } catch (error) {
    console.error('API Handler Error:', error);
    res.status(500).json({ 
      response: "Terjadi kesalahan pada server AI.",
      error: error.message 
    });
  }
}
```

## 🔍 Perubahan Utama:

### 1. CORS Headers (Baris 4-11)
```javascript
res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
```
- Mengizinkan request dari domain manapun (`*`)
- Bisa diganti dengan domain spesifik: `'https://khaerulmamu.github.io'`

### 2. OPTIONS Preflight Handling (Baris 13-17)
```javascript
if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
}
```
- Browser mengirim OPTIONS request sebelum POST (preflight)
- Harus di-handle dengan status 200

### 3. Input Validation (Baris 24-26)
```javascript
if (!message) {
    return res.status(400).json({ error: 'Message is required' });
}
```
- Validasi message tidak kosong

### 4. API Key Check (Baris 30-32)
```javascript
if (!apiKey) {
    return res.status(500).json({ error: 'GEMINI_API_KEY not configured' });
}
```
- Pastikan environment variable sudah di-set

### 5. Enhanced Error Handling (Baris 45-49, 60-65)
- Log error untuk debugging
- Return structured error response

## 🧪 Testing

### Test 1: Cek CORS Headers
```bash
curl -X OPTIONS https://kombinatorik-chatbot.vercel.app/api/chat \
  -H "Origin: https://khaerulmamu.github.io" \
  -H "Access-Control-Request-Method: POST" \
  -v
```

Expected output harus include:
```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET,OPTIONS,PATCH,DELETE,POST,PUT
```

### Test 2: Test POST Request
```bash
curl -X POST https://kombinatorik-chatbot.vercel.app/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Apa itu permutasi?"}'
```

Expected output:
```json
{
  "response": "Permutasi adalah..."
}
```

### Test 3: Browser Console
Buka chatbot di website, ketik pesan, dan cek console:
- ✅ Tidak ada CORS error
- ✅ Status 200 OK
- ✅ Response dari AI muncul

## 📝 Environment Variables di Vercel

Pastikan `GEMINI_API_KEY` sudah di-set di Vercel Dashboard:

1. Buka https://vercel.com/dashboard
2. Pilih project `kombinatorik-chatbot`
3. Settings > Environment Variables
4. Add variable:
   - Name: `GEMINI_API_KEY`
   - Value: Your Gemini API key
   - Environments: Production, Preview, Development

## 🚀 Deployment

Setelah update code:

```bash
git add api/chat.js
git commit -m "Add CORS headers and improve error handling"
git push
```

Vercel akan auto-deploy. Tunggu ~1 menit, lalu test chatbot lagi.

## 🔍 Troubleshooting

### Issue: Masih CORS Error
**Solution:** 
- Ganti `'*'` dengan domain spesifik:
  ```javascript
  res.setHeader('Access-Control-Allow-Origin', 'https://khaerulmamu.github.io');
  ```

### Issue: 500 Internal Server Error
**Solution:**
- Cek Vercel logs: Dashboard > Project > Logs
- Pastikan GEMINI_API_KEY sudah di-set
- Cek quota API Gemini

### Issue: Empty Response
**Solution:**
- Cek struktur response Gemini API
- Add console.log untuk debugging:
  ```javascript
  console.log('Gemini Response:', JSON.stringify(data, null, 2));
  ```

### Issue: Timeout
**Solution:**
- Gemini API kadang lambat
- Frontend sudah ada 30s timeout
- Bisa increase di backend jika perlu

## ✅ Checklist

- [ ] Update api/chat.js dengan CORS headers
- [ ] Set GEMINI_API_KEY di Vercel
- [ ] Deploy to Vercel
- [ ] Test dengan curl
- [ ] Test di browser/chatbot
- [ ] Cek console logs (no errors)
- [ ] Verify response dari AI muncul

## 📚 Resources

- [Vercel CORS Guide](https://vercel.com/guides/how-to-enable-cors)
- [Gemini API Docs](https://ai.google.dev/tutorials/rest_quickstart)
- [MDN CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
