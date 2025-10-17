# Amazon Product Listing Optimizer

This project is a full-stack web application designed to optimize Amazon product listings using an AI model. It fetches product details (mocked for local setup), uses AI to generate improved content, displays a side-by-side comparison, and stores the optimization history in a MySQL database.

## Tech Stack

| Component | Technology | Purpose |
| :--- | :--- | :--- |
| **Backend** | Node.js (Express) | REST API, data fetching (mocked), AI integration (mocked), and database interaction. |
| **Frontend** | React | User interface for ASIN input, result display, and history viewing. |
| **Database** | MySQL (via Sequelize ORM) | Persistent storage for optimization history. |

## Project Structure

\`\`\`
amazon-optimizer/
├── backend/
│   ├── node_modules/
│   ├── src/
│   │   ├── aiService.js         # AI optimization logic (mocked)
│   │   ├── db.js                # Sequelize setup and Optimization model
│   │   ├── optimizationRoutes.js  # Express routes for /optimize and /history
│   │   └── scraperService.js    # Amazon data fetching logic (mocked)
│   ├── .env.example           # Environment variable template
│   ├── package.json           # Backend dependencies
│   └── server.js              # Main Express server file
├── frontend/
│   ├── node_modules/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── HistoryView.js
│   │   │   ├── OptimizationForm.js
│   │   │   └── OptimizationResult.js
│   │   ├── App.css
│   │   ├── App.js             # Main application component
│   │   ├── index.css
│   │   └── index.js
│   ├── package.json           # Frontend dependencies
│   └── ...
├── db_schema.sql              # SQL script for database setup
└── README.md                  # This file
\`\`\`

## Local Setup and Running Instructions

### Prerequisites

1.  **Node.js and npm**: Ensure you have Node.js (v18+) and npm installed.
2.  **MySQL**: A running MySQL server instance is required.
3.  **VSCode**: Recommended IDE for development.

### Step 1: Database Setup

1.  Start your MySQL server.
2.  Execute the commands in the \`db_schema.sql\` file to create the database and the necessary table.

    \`\`\`bash
    # Example using MySQL CLI
    mysql -u [your_user] -p < db_schema.sql
    \`\`\`

### Step 2: Backend Configuration and Run

1.  Navigate to the backend directory:
    \`\`\`bash
    cd amazon-optimizer/backend
    \`\`\`
2.  Create a \`.env\` file by copying the example:
    \`\`\`bash
    cp .env.example .env
    \`\`\`
3.  Edit the \`.env\` file with your MySQL credentials and desired port (default is 5000).

    \`\`\`
    # .env file
    PORT=5000
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=your_mysql_password
    DB_NAME=amazon_optimizer
    # You can leave OPENAI_API_KEY blank as the AI service is mocked
    \`\`\`

4.  Install dependencies and start the server:
    \`\`\`bash
    npm install
    npm run dev # or npm start
    \`\`\`
    The backend should start on \`http://localhost:5000\`.

### Step 3: Frontend Configuration and Run

1.  Open a new terminal and navigate to the frontend directory:
    \`\`\`bash
    cd amazon-optimizer/frontend
    \`\`\`
2.  Install dependencies and start the React application:
    \`\`\`bash
    npm install
    npm start
    \`\`\`
    The frontend should open automatically in your browser at \`http://localhost:3000\`.

## AI Prompt Engineering Reasoning (Mocked)

The \`aiService.js\` file contains a **mock implementation** to ensure the application is immediately runnable without a valid API key.

### Real AI Implementation Strategy

If a real AI model (like GPT-4 or Gemini) were used, the prompt would be structured as follows to meet the requirements:

1.  **Role Assignment**: Establish the AI as an "expert Amazon listing optimizer" to set the context and tone.
2.  **Input Data**: Clearly provide the original title, bullet points, and description.
3.  **Task Definition**: Explicitly instruct the AI to make the content:
    *   Keyword-rich and readable (for the title).
    *   Clear and concise (for the bullets).
    *   Persuasive and compliant (for the description).
    *   Generate 3-5 new keyword suggestions.
4.  **Output Format**: Use a **JSON response format** to ensure the output is easily parsable by the Node.js backend. This is crucial for reliable data handling.

**Example Prompt Structure (as seen in \`aiService.js\` comments):**

\`\`\`
You are an expert Amazon listing optimizer. Your task is to rewrite the following product details to be more keyword-rich, persuasive, and compliant with Amazon's terms of service.

Original Title: [Original Title]
Original Bullet Points: [Bullet 1, Bullet 2, ...]
Original Description: [Original Description]

Provide your output in a JSON format with the following keys:
{
  "optimized_title": "...",
  "optimized_bullets": ["...", "...", "..."],
  "optimized_description": "...",
  "optimized_keywords": "keyword1, keyword2, keyword3, keyword4, keyword5"
}
\`\`\`

## Assumptions and Challenges

### 1. Amazon Data Fetching (Scraping)

*   **Assumption**: For the local, runnable version, the Amazon data fetching is **mocked** in \`scraperService.js\`. It returns hardcoded data for specific ASINs (\`B07H65KP63\` and \`B08L8HP6KR\`).
*   **Challenge**: Real-world Amazon scraping is highly complex due to anti-bot measures, changing HTML structures, and legal terms of service. A production-ready solution would require a robust library (like Puppeteer) and likely a proxy service.

### 2. AI Integration

*   **Assumption**: The AI optimization is **mocked** in \`aiService.js\`. It returns predictable, placeholder optimized text.
*   **Challenge**: Integrating a real AI model requires careful prompt engineering (as detailed above), handling API keys securely (via \`.env\`), managing costs, and implementing robust error handling for API failures or rate limits.

### 3. Database

*   **Assumption**: The application uses Sequelize as an ORM, which automatically handles the connection and model mapping based on the \`.env\` file. The \`db_schema.sql\` file provides the necessary table structure.

## Testing

You can test the application using the following mock ASINs:

*   **\`B07H65KP63\`**: Returns data for "Premium Noise-Cancelling Wireless Headphones".
*   **\`B08L8HP6KR\`**: Returns data for "Smart Home Security Camera".
*   **Any other ASIN**: Will trigger a "not found" error from the mock scraper.

After optimizing, try clicking the **Optimization History** button (with the ASIN still in the input field) to see the history records stored in the MySQL database.

