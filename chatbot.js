/**
 * Chatbot Widget untuk Website Kombinatorik
 * Standalone JavaScript component yang bisa di-include di halaman manapun
 */

class ChatbotWidget {
    constructor(config = {}) {
        this.apiUrl = config.apiUrl || 'https://kombinatorik-chatbot.vercel.app/'; // Ganti dengan URL API Vercel
        this.isOpen = false;
        this.messages = [];
        this.isLoading = false;
        
        this.init();
    }

    init() {
        // Create chatbot HTML structure
        this.createWidget();
        
        // Add event listeners
        this.attachEventListeners();
        
        // Add welcome message
        this.addMessage('bot', 'Halo! Saya asisten pembelajaran Kombinatorik. Ada yang bisa saya bantu? 😊');
    }

    createWidget() {
        const widgetHTML = `
            <!-- Chatbot Toggle Button -->
            <button id="chatbot-toggle" class="chatbot-toggle" aria-label="Toggle Chatbot">
                <svg id="chatbot-icon-closed" class="chatbot-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                </svg>
                <svg id="chatbot-icon-open" class="chatbot-icon chatbot-icon-hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>

            <!-- Chatbot Window -->
            <div id="chatbot-window" class="chatbot-window chatbot-window-hidden">
                <!-- Header -->
                <div class="chatbot-header">
                    <div class="chatbot-header-content">
                        <div class="chatbot-avatar">🧮</div>
                        <div>
                            <h3 class="chatbot-title">Asisten Kombinatorik</h3>
                            <p class="chatbot-status">Online</p>
                        </div>
                    </div>
                    <button id="chatbot-close" class="chatbot-close-btn" aria-label="Close Chatbot">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="20" height="20">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>

                <!-- Messages Container -->
                <div id="chatbot-messages" class="chatbot-messages">
                    <!-- Messages will be inserted here -->
                </div>

                <!-- Input Area -->
                <div class="chatbot-input-area">
                    <input 
                        type="text" 
                        id="chatbot-input" 
                        class="chatbot-input" 
                        placeholder="Ketik pertanyaan Anda..."
                        autocomplete="off"
                    />
                    <button id="chatbot-send" class="chatbot-send-btn" aria-label="Send Message">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="20" height="20">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                        </svg>
                    </button>
                </div>
            </div>
        `;

        // Create container and insert HTML
        const container = document.createElement('div');
        container.id = 'chatbot-container';
        container.innerHTML = widgetHTML;
        document.body.appendChild(container);

        // Add styles
        this.addStyles();
    }

    addStyles() {
        const style = document.createElement('style');
        style.textContent = `
            /* Chatbot Styles */
            #chatbot-container {
                font-family: system-ui, -apple-system, sans-serif;
            }

            .chatbot-toggle {
                position: fixed;
                bottom: 24px;
                right: 24px;
                width: 56px;
                height: 56px;
                border-radius: 50%;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                border: none;
                cursor: pointer;
                box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.3s ease;
                z-index: 1000;
            }

            .chatbot-toggle:hover {
                transform: scale(1.1);
                box-shadow: 0 6px 16px rgba(102, 126, 234, 0.5);
            }

            .chatbot-toggle:active {
                transform: scale(0.95);
            }

            .chatbot-icon {
                width: 28px;
                height: 28px;
                transition: all 0.3s ease;
            }

            .chatbot-icon-hidden {
                display: none;
            }

            .chatbot-window {
                position: fixed;
                bottom: 96px;
                right: 24px;
                width: 380px;
                max-width: calc(100vw - 48px);
                height: 600px;
                max-height: calc(100vh - 140px);
                background: white;
                border-radius: 16px;
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
                display: flex;
                flex-direction: column;
                overflow: hidden;
                z-index: 999;
                transition: all 0.3s ease;
                transform-origin: bottom right;
            }

            .chatbot-window-hidden {
                opacity: 0;
                transform: scale(0.8) translateY(20px);
                pointer-events: none;
            }

            .chatbot-header {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 16px;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .chatbot-header-content {
                display: flex;
                align-items: center;
                gap: 12px;
            }

            .chatbot-avatar {
                font-size: 32px;
                width: 48px;
                height: 48px;
                background: rgba(255, 255, 255, 0.2);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .chatbot-title {
                font-size: 16px;
                font-weight: 600;
                margin: 0;
            }

            .chatbot-status {
                font-size: 12px;
                opacity: 0.9;
                margin: 2px 0 0 0;
            }

            .chatbot-close-btn {
                background: transparent;
                border: none;
                color: white;
                cursor: pointer;
                padding: 4px;
                border-radius: 4px;
                transition: background 0.2s;
            }

            .chatbot-close-btn:hover {
                background: rgba(255, 255, 255, 0.2);
            }

            .chatbot-messages {
                flex: 1;
                overflow-y: auto;
                padding: 16px;
                background: #f9fafb;
                scroll-behavior: smooth;
            }

            .chatbot-message {
                margin-bottom: 16px;
                animation: messageSlideIn 0.3s ease;
            }

            @keyframes messageSlideIn {
                from {
                    opacity: 0;
                    transform: translateY(10px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            .chatbot-message-user {
                display: flex;
                justify-content: flex-end;
            }

            .chatbot-message-bot {
                display: flex;
                justify-content: flex-start;
            }

            .chatbot-message-content {
                max-width: 75%;
                padding: 12px 16px;
                border-radius: 16px;
                word-wrap: break-word;
                line-height: 1.5;
            }

            .chatbot-message-user .chatbot-message-content {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                border-bottom-right-radius: 4px;
            }

            .chatbot-message-bot .chatbot-message-content {
                background: white;
                color: #1f2937;
                border-bottom-left-radius: 4px;
                box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
            }

            .chatbot-typing {
                display: flex;
                gap: 4px;
                padding: 12px 16px;
            }

            .chatbot-typing span {
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background: #9ca3af;
                animation: typingAnimation 1.4s infinite;
            }

            .chatbot-typing span:nth-child(2) {
                animation-delay: 0.2s;
            }

            .chatbot-typing span:nth-child(3) {
                animation-delay: 0.4s;
            }

            @keyframes typingAnimation {
                0%, 60%, 100% {
                    transform: translateY(0);
                    opacity: 0.5;
                }
                30% {
                    transform: translateY(-10px);
                    opacity: 1;
                }
            }

            .chatbot-input-area {
                padding: 16px;
                background: white;
                border-top: 1px solid #e5e7eb;
                display: flex;
                gap: 8px;
            }

            .chatbot-input {
                flex: 1;
                padding: 12px 16px;
                border: 1px solid #d1d5db;
                border-radius: 24px;
                font-size: 14px;
                outline: none;
                transition: border-color 0.2s;
            }

            .chatbot-input:focus {
                border-color: #667eea;
            }

            .chatbot-send-btn {
                width: 44px;
                height: 44px;
                border-radius: 50%;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                border: none;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.2s;
            }

            .chatbot-send-btn:hover:not(:disabled) {
                transform: scale(1.05);
            }

            .chatbot-send-btn:disabled {
                opacity: 0.5;
                cursor: not-allowed;
            }

            /* Mobile Responsive */
            @media (max-width: 640px) {
                .chatbot-window {
                    bottom: 90px;
                    right: 16px;
                    width: calc(100vw - 32px);
                    height: calc(100vh - 140px);
                }

                .chatbot-toggle {
                    bottom: 16px;
                    right: 16px;
                    width: 52px;
                    height: 52px;
                }

                .chatbot-icon {
                    width: 24px;
                    height: 24px;
                }
            }
        `;
        document.head.appendChild(style);
    }

    attachEventListeners() {
        // Toggle button
        document.getElementById('chatbot-toggle').addEventListener('click', () => {
            this.toggleChat();
        });

        // Close button
        document.getElementById('chatbot-close').addEventListener('click', () => {
            this.toggleChat();
        });

        // Send button
        document.getElementById('chatbot-send').addEventListener('click', () => {
            this.sendMessage();
        });

        // Input enter key
        document.getElementById('chatbot-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });
    }

    toggleChat() {
        this.isOpen = !this.isOpen;
        const window = document.getElementById('chatbot-window');
        const iconClosed = document.getElementById('chatbot-icon-closed');
        const iconOpen = document.getElementById('chatbot-icon-open');

        if (this.isOpen) {
            window.classList.remove('chatbot-window-hidden');
            iconClosed.classList.add('chatbot-icon-hidden');
            iconOpen.classList.remove('chatbot-icon-hidden');
            
            // Focus input
            setTimeout(() => {
                document.getElementById('chatbot-input').focus();
            }, 300);
        } else {
            window.classList.add('chatbot-window-hidden');
            iconClosed.classList.remove('chatbot-icon-hidden');
            iconOpen.classList.add('chatbot-icon-hidden');
        }
    }

    addMessage(sender, text) {
        this.messages.push({ sender, text, timestamp: new Date() });
        
        const messagesContainer = document.getElementById('chatbot-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `chatbot-message chatbot-message-${sender}`;
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'chatbot-message-content';
        contentDiv.textContent = text;
        
        messageDiv.appendChild(contentDiv);
        messagesContainer.appendChild(messageDiv);
        
        // Scroll to bottom
        this.scrollToBottom();
    }

    showTypingIndicator() {
        const messagesContainer = document.getElementById('chatbot-messages');
        const typingDiv = document.createElement('div');
        typingDiv.id = 'chatbot-typing-indicator';
        typingDiv.className = 'chatbot-message chatbot-message-bot';
        typingDiv.innerHTML = `
            <div class="chatbot-message-content chatbot-typing">
                <span></span>
                <span></span>
                <span></span>
            </div>
        `;
        messagesContainer.appendChild(typingDiv);
        this.scrollToBottom();
    }

    hideTypingIndicator() {
        const typingIndicator = document.getElementById('chatbot-typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    scrollToBottom() {
        const messagesContainer = document.getElementById('chatbot-messages');
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    async sendMessage() {
        const input = document.getElementById('chatbot-input');
        const message = input.value.trim();
        
        if (!message || this.isLoading) return;
        
        // Add user message
        this.addMessage('user', message);
        input.value = '';
        
        // Show typing indicator
        this.showTypingIndicator();
        this.isLoading = true;
        
        // Disable send button
        const sendBtn = document.getElementById('chatbot-send');
        sendBtn.disabled = true;
        
        try {
            // Call API
            const response = await this.callAPI(message);
            
            // Hide typing indicator
            this.hideTypingIndicator();
            
            // Add bot response
            this.addMessage('bot', response);
        } catch (error) {
            console.error('Chatbot API Error:', error);
            this.hideTypingIndicator();
            this.addMessage('bot', 'Maaf, terjadi kesalahan. Silakan coba lagi nanti. 😔');
        } finally {
            this.isLoading = false;
            sendBtn.disabled = false;
            input.focus();
        }
    }

    async callAPI(message) {
        // Check if API URL is configured
        if (this.apiUrl === 'YOUR_VERCEL_API_URL_HERE') {
            // Demo mode - return canned responses
            return this.getDemoResponse(message);
        }

        // Real API call to Vercel
        const response = await fetch(this.apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: message,
                conversation_history: this.messages.slice(-10) // Send last 10 messages for context
            })
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }

        const data = await response.json();
        return data.response || data.message || 'Maaf, saya tidak mengerti.';
    }

    getDemoResponse(message) {
        // Demo responses untuk testing tanpa API
        const lowerMessage = message.toLowerCase();
        
        if (lowerMessage.includes('permutasi')) {
            return 'Permutasi adalah susunan objek dalam urutan tertentu. Rumusnya: P(n,r) = n! / (n-r)! \n\nContoh: Berapa cara menyusun 3 buku dari 5 buku? P(5,3) = 5!/(5-3)! = 60 cara. 📚';
        } else if (lowerMessage.includes('kombinasi')) {
            return 'Kombinasi adalah pemilihan objek tanpa memperhatikan urutan. Rumusnya: C(n,r) = n! / (r! × (n-r)!) \n\nContoh: Berapa cara memilih 3 buku dari 5 buku? C(5,3) = 10 cara. 📖';
        } else if (lowerMessage.includes('faktorial')) {
            return 'Faktorial (n!) adalah perkalian semua bilangan bulat positif dari 1 sampai n. \n\nContoh: 5! = 5 × 4 × 3 × 2 × 1 = 120 🔢';
        } else if (lowerMessage.includes('halo') || lowerMessage.includes('hai') || lowerMessage.includes('hello')) {
            return 'Halo! Senang bertemu dengan Anda! Saya siap membantu belajar kombinatorik. Apa yang ingin Anda pelajari hari ini? 😊';
        } else if (lowerMessage.includes('terima kasih') || lowerMessage.includes('thanks')) {
            return 'Sama-sama! Jangan ragu untuk bertanya lagi ya. Selamat belajar! 🎓';
        } else {
            return 'Saya adalah asisten pembelajaran Kombinatorik. Saya bisa membantu Anda dengan topik:\n\n• Permutasi\n• Kombinasi\n• Aturan Perkalian\n• Segitiga Pascal\n\nAda yang ingin ditanyakan? 🤔';
        }
    }
}

// Initialize chatbot when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const chatbot = new ChatbotWidget({
        // PASTIKAN URL-nya lengkap sampai ke folder /api/chat
        apiUrl: 'https://kombinatorik-chatbot.vercel.app/api/chat' 
    });
    
    window.chatbot = chatbot;
});
