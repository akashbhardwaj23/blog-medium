# Blog Medium

A full-stack blogging platform inspired by Medium, allowing users to create, read, and manage blog posts with a clean and intuitive interface.

## Features

- **Blog Feed**: View all published blog posts in a clean, organized layout
- **User Profiles**: Personalized profile pages showcasing user information and their published posts
- **Blog Creation**: Rich text editor for creating and publishing new blog posts
- **Individual Blog Pages**: Dedicated pages for each blog post with full content display
- **Responsive Design**: Fully responsive interface that works across desktop and mobile devices

## Tech Stack

### Frontend
- React.js
- Typescript
- Tailwind CSS

### Backend
- Node.js
- Express
- PostgreSQL
- Prisma ORM

## Installation

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL
- Git

### Setup Instructions

1. Clone the repository
```bash
git clone https://github.com/akashbhardwaj23/blog-medium.git
cd blog-medium
```

2. Backend Setup
```bash
cd backend
npm install
```

3. Configure Environment Variables
Create a `.env` file in the backend directory and add:
```
DATABASE_URL="your_postgres_url_here"
```

4. Initialize Database
```bash
npx prisma migrate dev
```

5. Start Backend Server
```bash
npm run dev
```

6. Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
```

The application should now be running on:
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3000`

## Usage

1. Register/Login to your account
2. Browse existing blogs on the home page
3. Create new blogs using the "Create Blog" button
4. View and edit your profile
5. Click on any blog to read the full content

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Akash Bhardwaj - [GitHub](https://github.com/akashbhardwaj23)

Project Link: [https://github.com/akashbhardwaj23/blog-medium](https://github.com/akashbhardwaj23/blog-medium)

## Acknowledgments

- Inspired by Medium's clean and user-friendly interface
- Built with modern web technologies
- Open source community for various tools and libraries used in this project