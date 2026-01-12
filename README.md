# 🛡️ Kavach: Financial DNA Shield

Kavach is a modern, responsive web application that provides a real-time dashboard for monitoring financial transactions. It leverages cutting-edge AI to analyze transaction streams and detect **"mutations"**—anomalies or potentially fraudulent activities—based on a user's unique financial behavior patterns.

### 🎥 [Demo Video Link](insert-your-google-drive-link-here)

---

## 📝 Description
Traditional fraud detection often relies on rigid rules. **Kavach** treats your financial history like biological DNA. By sequencing your transaction "rhythm," our AI identifies deviations (mutations) in real-time. It is designed for everyday users who want more than just a "blocked card" notification—they want to understand the *why* behind the security.

---

## ✨ Key Features
* **Real-Time Transaction Feed**: Instant visibility into financial activities as they occur.
* **AI-Powered Anomaly Detection**: Uses Google's Gemini to analyze transactions against historical behavior.
* **Contextual AI Analysis**: Provides clear, human-readable reasons for flagged "mutations" along with a confidence score.
* **Interactive Dashboard**: A sleek, mobile-responsive UI built with ShadCN and Tailwind CSS.

---

## 🛠️ Tech Stack
* **Framework**: [Next.js](https://nextjs.org/) (App Router)
* **Language**: [TypeScript](https://www.typescriptlang.org/)
* **Styling**: [Tailwind CSS](https://tailwindcss.com/)
* **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
* **Icons**: [Lucide React](https://lucide.dev/)

---

## ☁️ Google Technologies Used
> ⚠️ **Mandatory Hackathon Component**

* **Firebase Genkit**: Chosen for its robust AI orchestration capabilities, allowing us to build structured, type-safe "flows" for transaction analysis.
* **Google Gemini (via Genkit)**: We utilized Gemini's large context window to compare new transactions against a user's previous 10 transactions, enabling complex pattern recognition that traditional ML models might miss.
* **Generative AI (Structured Output)**: Used to ensure the AI always returns a valid JSON response containing `isMutation`, `confidence`, and `reason`.

---



## 🧠 How the AI Analysis Works
The fraud detection system is powered by a Genkit flow defined in `src/ai/flows/analyze-transaction-for-mutation.ts`:

1.  **Context Building**: The system pulls the user's 10 most recent transactions.
2.  **Prompting**: Information is sent to Gemini, instructing it to act as a **"Financial DNA Sequencing Expert."**
3.  **Analysis**: The model analyzes geography, timing, and spending rhythm.
4.  **Structured Result**: Returns an immediate diagnosis of whether the transaction is a "Mutation."

---

## 🏁 Setup Instructions

1.  **Clone the repository**:
    ```bash
    git clone [https://github.com/your-username/kavach.git](https://github.com/your-username/kavach.git)
    cd kavach
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Environment Variables**:
    Create a `.env` file and add your Google/Firebase API keys:
    ```env
    GOOGLE_GENAI_API_KEY=your_key_here
    ```

4.  **Run the project**:
    ```bash
    npm run dev
    ```
    Open `http://localhost:9002` to view the dashboard.

---

## 👥 Team Members
* **ANKUSH PK**
* **ANANYA ARVIND K**
* **ABHINAV M PRASAD**
* **ANIKETH**
