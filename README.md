# MusicApp 🎵

A full-stack music streaming application built with Node.js, Express, TypeScript, and MongoDB. This application provides both client-facing music streaming features and an admin panel for content management.

## Features

For a comprehensive overview of all features, see [Features.md](Features.md).

### Quick Overview
- **Client Features**: Music streaming, search, favorites, like system, responsive design
- **Admin Features**: Content management, file upload, rich text editor, dashboard
- **Technical Features**: TypeScript, MongoDB, Cloudinary integration, RESTful API

## Tech Stack

- **Backend**: Node.js, Express.js, TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Frontend**: Pug templates, CSS, JavaScript
- **File Storage**: Cloudinary
- **Rich Text Editor**: TinyMCE
- **Build Tools**: TypeScript compiler, Nodemon
- **Deployment**: Vercel-ready configuration

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/HuyDang05/Music_App.git
   cd MusicApp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   MONGO_URL=your_mongodb_connection_string
   PORT=3000
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

4. **Run the application**
   ```bash
   # Development mode
   npm start
   
   # Build for production
   npm run build
   ```

## Project Structure

```
MusicApp/
├── config/                 # Configuration files
│   ├── config.ts          # System configuration
│   └── database.ts        # Database connection
├── controllers/           # Route controllers
│   ├── admin/            # Admin panel controllers
│   └── client/           # Client-side controllers
├── helpers/              # Utility functions
├── middlewares/          # Express middlewares
├── models/               # MongoDB models
├── public/               # Static assets
│   ├── admin/           # Admin panel assets
│   ├── css/             # Stylesheets
│   ├── js/              # Client-side JavaScript
│   └── images/          # Images
├── routes/               # Route definitions
│   ├── admin/           # Admin routes
│   └── client/          # Client routes
├── views/                # Pug templates
│   ├── admin/           # Admin panel views
│   └── client/          # Client views
├── index.ts              # Application entry point
└── package.json          # Dependencies and scripts
```

## API Endpoints

### Client Endpoints
- `GET /` - Home page
- `GET /songs/:slugTopic` - Songs by topic
- `GET /songs/detail/:slugSong` - Song details
- `PATCH /songs/like/:typeLike/:idSong` - Like/unlike song
- `PATCH /songs/favorite/:typeFavorite/:idSong` - Add/remove from favorites
- `PATCH /songs/listen/:idSong` - Increment listen count
- `GET /search/:type` - Search songs
- `GET /favorite-songs` - User's favorite songs

### Admin Endpoints
- `GET /admin` - Admin dashboard
- `GET /admin/songs` - Songs management
- `GET /admin/songs/create` - Create new song
- `POST /admin/songs/createPost` - Submit new song
- `GET /admin/songs/edit/:id` - Edit song
- `PATCH /admin/songs/edit/:id` - Update song
- `GET /admin/topics` - Topics management
- `GET /admin/upload` - File upload interface

## Database Schema

The application uses MongoDB with the following main collections:

- **Songs**: Music tracks with metadata
- **Topics**: Song categories/genres
- **Singers**: Artist information
- **Favorite Songs**: User favorites (currently session-based)

For detailed database design, relationships, and schema information, see [DatabaseDesign.md](DatabaseDesign.md).

## Deployment

The application is configured for deployment on Vercel:

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Vercel**
   - Connect your GitHub repository to Vercel
   - Set environment variables in Vercel dashboard
   - Deploy automatically on push to main branch

## 🔧 Development

### Available Scripts
- `npm start` - Start development server with nodemon
- `npm run build` - Build TypeScript and copy static files
- `npm run ts-check` - Type check without compilation
- `npm run add-build` - Add built files to git

### Code Style
- TypeScript for type safety
- ESLint for code quality
- Pre-commit hooks for automated checks

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## Author

- **HuyDang05** - [GitHub](https://github.com/HuyDang05)

## 🐛 Issues

If you find any bugs or have feature requests, please open an issue on [GitHub](https://github.com/HuyDang05/Music_App/issues).

## 📞 Support

For support, email [your-email@example.com] or create an issue on GitHub.

---

**Note**: This is a learning project demonstrating full-stack development with Node.js, TypeScript, and MongoDB. It includes both client-facing features and an admin panel for content management.
