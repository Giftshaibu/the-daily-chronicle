```markdown
# The Post Office

A modern news aggregator application that fetches and displays the latest news from various sources using the GNews API.

## Features

- **Top Headlines**: Get the latest news from around the world
- **Category Filtering**: Browse news by categories like Technology, Sports, Entertainment, Science, Health, and Business
- **Search Functionality**: Search for specific news topics
- **Responsive Design**: Fully responsive layout that works on desktop and mobile devices
- **Infinite Scroll**: Load more articles as you scroll
- **Bookmarking**: Save articles to read later (local storage)
- **Dark Mode**: Toggle between light and dark themes

## Technologies Used

- React 18
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui components
- React Router DOM
- GNews API

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Giftshaibu/the-daily-chronicle.git
cd the-daily-chronicle
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your GNews API key:
```env
VITE_GNEWS_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

## API Reference

This project uses the [GNews API](https://gnews.io/) to fetch news articles. You'll need to sign up for a free API key.

## Project Structure

```
the-daily-chronicle/
├── src/
│   ├── components/     # Reusable UI components
│   ├── contexts/       # React contexts (theme, bookmarks)
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utility functions and API client
│   ├── pages/          # Page components
│   ├── types/          # TypeScript type definitions
│   ├── App.tsx         # Main app component
│   └── main.tsx        # Entry point
├── public/             # Static assets
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```
```
