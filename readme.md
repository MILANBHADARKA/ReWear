# ReWear – Community Clothing Exchange

## Overview
ReWear is a web-based platform that enables users to exchange unused clothing through direct swaps, purchase, or rental using a point-based system. The platform incorporates AI-powered image processing and assistant functionalities to promote sustainable fashion and reduce textile waste by encouraging users to reuse wearable garments instead of discarding them.


## ✨ Key Features

### 🔄 Clothing Exchange System
- **Purchase System**: Users can buy clothes using points
- **Rental System**: Users can rent clothes for half the points
- **Direct Swaps**: Direct clothing exchanges between users
- **Point-based Economy**: Users start with initial points for transactions

### 🤖 AI-Powered Features
- **💬 Semantic Search**:
  - Search Assistant that helps users find items based on queries.
  - Example: “Show me black jackets for parties” → Returns matching community uploads.
- **💲 Intelligent Pricing Model**:
  - Suggest Cost: Uses real-time brand pricing (via web search Serper Dev tool) and item details (brand, title, description, date of purchase) to suggest a fair resale price.
  - Rental Pricing: Calculates rental price based on resale value and rental duration.
- **🌐 Live Web Price Integration**:
  - Fetches the current market price of the brand/item using the Serper API to keep pricing suggestions up-to-date and realistic.
- **🖼️ Image Search**:
  - Finds visually similar or matching product images from external sources or community uploads to help users see real examples and styles.
- **✍️ User Feedback & Sentiment Analysis**:
  - Feedback Collection: Users can leave feedback or reviews for uploaded clothing items.
  - Sentiment Analysis: Automatically detects whether feedback is positive, negative, or neutral.

### 👥 User Roles

#### 👤 User Features
- Upload clothing items to the gallery
- Purchase/rent clothes using points
- Browse and search clothing inventory
- Interact with the AI assistant for recommendations
- View transaction history

#### 🛡️ Admin Features
- **Content Moderation**: Approve/reject item listings
- **Spam Control**: Remove inappropriate or spam items
- **Lightweight Admin Panel**: System oversight and management
- **Analytics Dashboard**: 
  - Sales tracking (per day/hour)
  - Visual charts and analysis
  - User activity monitoring
-**Item/User Removal criteria**:
  -If more than 3 negative sentiments are found in an item, then a mail is sent to the admin for the removal of the item.

### 📊 Analytics & Insights
- Real-time sales dashboard
- Hourly and daily transaction charts
- User engagement metrics
- Clothing category popularity analysis

## 🚀 Tech Stack

### 🌐 Web
- **Frontend and Backend**:
  - Next.js 15
  - Tailwind
  - Shadcn
  - MongoDB
  - Cloudinary
  - JsonWebToken
  - Bcryptjs
  - Resend
  - Axios


---

### 🧠 Machine Learning / AI
- **Groq LLM (llama3-8b-8192)** – Intelligent price suggestion & rental pricing
- **Serper API** – Real-time web search integration for live pricing data
- **Sentiment Analysis** – Transformers
- **Smart Chatbot** – Transformer, NLP-driven assistant for personalized item search
- **FastAPI**
- **NLTK and TextBlob** – Cosine Similarity 


---

### 🔗 Web3 / NFTs
- **Wallet Integration**: WalletConnect / MetaMask
- **Smart Contracts**: Solidity (ERC-721 for badges)
- **Protocol**: Unlock Protocol for subscriptions

## Team Members

| Name | GitHub Profile |
|------|----------------|
| Milan Bhadarka | [https://github.com/milanbhadarka](https://github.com/milanbhadarka) |
| Devan Chanuhan | [https://github.com/devan019](https://github.com/devan019) |
| Manil Modi | [https://github.com/manilmodi](https://github.com/manilmodi) |
| Suryadeepsinh Gohil | [https://github.com/suryadeep36](https://github.com/suryadeep36) |

## 🎯 Project Goals
- Promote sustainable fashion practices
- Reduce textile waste through reuse
- Create an AI-enhanced user experience
- Build a community-driven platform
- Implement efficient point-based economy

# 🌱 Future Plans & Enhancements

This section outlines planned features and improvements to make the platform smarter, safer, and even more user-friendly.

---

## 📍 Location-Based Filter
- Show items available near the user's location.
- Helps users find nearby sellers and enables faster pickup or delivery.
- Supports sustainable and local community-driven resale.

---

## 🛡️ Security Guardrails
- Detect and prevent non-clothing items from being uploaded.
- Use AI image classification to ensure only valid clothing items are listed.
- Maintain platform focus and safety.

---

## 📱 Responsive Showcase
- Fully responsive frontend for seamless experience on desktop, tablet, and mobile.
- Dynamic layouts for product cards, large images, and quick actions.

---

## 🤖 Agentic AI (CrewAI) for Cost Suggestion
- Integrate CrewAI to make the price suggestion pipeline collaborative.
- Multiple specialized agents: market research, price adjuster, fashion trend analyst.
- Produce smarter and more explainable pricing recommendations.

---

✨ These improvements aim to make the project more:
- Scalable
- Trustworthy
- User-friendly
- Aligned with real-world needs in circular fashion & sustainable resale.

> ⚙️ Feel free to contribute or suggest more ideas!


## 🤝 Contributing
This is a collaborative hackathon project by the team members listed above. 

