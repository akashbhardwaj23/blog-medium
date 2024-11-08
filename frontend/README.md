# Blog Frontend

A React-based frontend for a Medium-inspired blogging platform that provides a clean and intuitive interface for reading and creating blog posts.

## Features

### 1. Blog Feed
- Responsive grid layout displaying all published blogs
- Preview cards with blog title, author, and excerpt
- Infinite scroll for smooth content loading

### 2. User Profile
- Personal profile page displaying user information
- List of user's published blogs
- Profile editing capabilities

### 3. Blog Creation
- Rich text editor interface
- Image upload support
- Draft saving functionality
- Publishing controls

### 4. Blog Page
- Clean, distraction-free reading experience
- Author information
- Responsive layout for all screen sizes

## Tech Stack

- **React.js** - Frontend library
- **TypeScript** - Type safety and better development experience
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **React Query** - State management and API calls
- **Axios** - HTTP client

## Project Structure

```
frontend/
├── src/
│   ├── components/        # Reusable UI components
│   ├── pages/            # Page components
│   ├── hooks/            # Custom React hooks
│   ├── api/              # API integration
│   ├── utils/            # Utility functions
│   ├── types/            # TypeScript types
│   ├── styles/           # Global styles
│   └── App.tsx           # Root component
├── public/               # Static assets
└── package.json
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Backend server running (refer to backend README)

### Installation

1. Navigate to frontend directory
```bash
cd frontend
```

2. Install dependencies
```bash
npm install
```

3. Create `.env` file and add:
```
VITE_API_URL=http://localhost:3000
```

4. Start development server
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run test` - Run tests
- `npm run preview` - Preview production build

## Contributing

1. Fork the repository
2. Create your feature branch
   ```bash
   git checkout -b feature/NewFeature
   ```
3. Commit changes
   ```bash
   git commit -m 'Add NewFeature'
   ```
4. Push to branch
   ```bash
   git push origin feature/NewFeature
   ```
5. Open a Pull Request

## Troubleshooting

Common issues and solutions:

1. **Build Errors**
   - Clear node_modules and reinstall
   - Check TypeScript version compatibility

2. **API Connection Issues**
   - Verify backend server is running
   - Check API_URL in .env file

3. **Styling Issues**
   - Run `npm run build:css` to rebuild Tailwind
   - Clear browser cache

## License

MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Akash Bhardwaj - [GitHub](https://github.com/akashbhardwaj23)

Project Link: [https://github.com/akashbhardwaj23/blog-medium](https://github.com/akashbhardwaj23/blog-medium)