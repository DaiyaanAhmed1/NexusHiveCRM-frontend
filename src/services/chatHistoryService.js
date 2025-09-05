// chatHistoryService.js
// Service for managing persistent chat history

const CHAT_CONFIG = {
  STORAGE_KEY: 'ai_chat_history',
  MAX_CHATS_PER_ROLE: 50,
  MAX_MESSAGES_PER_CHAT: 100
};

class ChatHistoryService {
  constructor() {
    this.chats = this.loadChats();
  }

  // Load all chats from localStorage
  loadChats() {
    try {
      const stored = window.localStorage.getItem(CHAT_CONFIG.STORAGE_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch (error) {
      console.error('Error loading chat history:', error);
      return {};
    }
  }

  // Save chats to localStorage
  saveChats() {
    try {
      window.localStorage.setItem(CHAT_CONFIG.STORAGE_KEY, JSON.stringify(this.chats));
    } catch (error) {
      console.error('Error saving chat history:', error);
    }
  }

  // Get all chats for a specific role
  getChatsForRole(role) {
    return this.chats[role] || [];
  }

  // Get a specific chat by ID
  getChat(role, chatId) {
    const roleChats = this.getChatsForRole(role);
    return roleChats.find(chat => chat.id === chatId);
  }

  // Create a new chat
  createNewChat(role, title = 'New Chat') {
    const chatId = `chat_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
    const newChat = {
      id: chatId,
      title: title,
      messages: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      role: role
    };

    if (!this.chats[role]) {
      this.chats[role] = [];
    }

    this.chats[role].unshift(newChat); // Add to beginning

    // Limit number of chats per role
    if (this.chats[role].length > CHAT_CONFIG.MAX_CHATS_PER_ROLE) {
      this.chats[role] = this.chats[role].slice(0, CHAT_CONFIG.MAX_CHATS_PER_ROLE);
    }

    this.saveChats();
    return newChat;
  }

  // Add message to a chat
  addMessage(role, chatId, message) {
    const chat = this.getChat(role, chatId);
    if (!chat) return null;

    const newMessage = {
      id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`,
      ...message,
      timestamp: new Date().toISOString()
    };

    chat.messages.push(newMessage);
    chat.updatedAt = new Date().toISOString();

    // Limit messages per chat
    if (chat.messages.length > CHAT_CONFIG.MAX_MESSAGES_PER_CHAT) {
      chat.messages = chat.messages.slice(-CHAT_CONFIG.MAX_MESSAGES_PER_CHAT);
    }

    this.saveChats();
    return newMessage;
  }

  // Update chat title
  updateChatTitle(role, chatId, title) {
    const chat = this.getChat(role, chatId);
    if (chat) {
      chat.title = title;
      chat.updatedAt = new Date().toISOString();
      this.saveChats();
    }
  }

  // Delete a chat
  deleteChat(role, chatId) {
    if (this.chats[role]) {
      this.chats[role] = this.chats[role].filter(chat => chat.id !== chatId);
      this.saveChats();
    }
  }

  // Clear all chats for a role
  clearChatsForRole(role) {
    this.chats[role] = [];
    this.saveChats();
  }

  // Get recent chats (last 10)
  getRecentChats(role, limit = 10) {
    const roleChats = this.getChatsForRole(role);
    return roleChats.slice(0, limit);
  }

  // Search chats by title or content
  searchChats(role, query) {
    const roleChats = this.getChatsForRole(role);
    const lowercaseQuery = query.toLowerCase();
    
    return roleChats.filter(chat => 
      chat.title.toLowerCase().includes(lowercaseQuery) ||
      chat.messages.some(msg => 
        msg.content.toLowerCase().includes(lowercaseQuery)
      )
    );
  }

  // Get chat statistics
  getChatStats(role) {
    const roleChats = this.getChatsForRole(role);
    const totalMessages = roleChats.reduce((sum, chat) => sum + chat.messages.length, 0);
    
    return {
      totalChats: roleChats.length,
      totalMessages: totalMessages,
      averageMessagesPerChat: roleChats.length > 0 ? Math.round(totalMessages / roleChats.length) : 0,
      oldestChat: roleChats.length > 0 ? roleChats[roleChats.length - 1].createdAt : null,
      newestChat: roleChats.length > 0 ? roleChats[0].createdAt : null
    };
  }
}

// Create and export singleton instance
const chatHistoryService = new ChatHistoryService();
export default chatHistoryService;