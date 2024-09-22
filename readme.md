# React TMDB Client

A React Movies application using [The Movie Database (TMDb)](https://developers.themoviedb.org) API.

## Quick Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/pirateIV/movies.git
   cd movies or cd custom-path
   ```

2. **Create and configure the environment file:**

   - Rename your `.env.sample` file to `.env`.

3. **Obtain API keys:**

   - Get your [TMDb API key](https://developers.themoviedb.org/3/getting-started/introduction).
   - (Optional) Get your [YouTube API key](https://developers.google.com/youtube/v3/getting-started) for video data.

4. **Enter the API keys into the `.env` file:**
   ```env
   VITE_TMDB_API_KEY=your_tmdb_api_key
   VITE_YOUTUBE_API_KEY=your_youtube_api_key
   ```

## Running the Application

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Start the development server at `localhost:5173`:**
   ```bash
   npm run dev
   ```

## Project Structure

```
react-movies/
├── .husky/                 # Husky config. for Git hooks.
├── public/                 # Static files.
├── src/                    # Source files.
│   ├── assets/             # Assets like images, icons, etc.
│   ├── components/         # React components.
│   ├── config/             # Configuration files.
│   ├── constants/          # Constants and enums.
│   ├── pages/              # Application pages.
│   ├── locales/            # Translations.
│   ├── routes/             # Routes configuration.
│   ├── services/           # Service utilities and API calls.
├── .env.sample             # Sample environment variables.
├── .gitignore              # Git ignore file.
├── package.json            # NPM package configuration.
├── README.md               # Project documentation.
```

## Available Scripts

- `npm run dev`: Starts the development server.
<!-- - `npm run build`: Builds the application for production.
- `npm run lint`: Lints the code for errors and warnings.
- `npm run test`: Runs the test suite. -->

## API Integration Overview

### TMDb API

- **Base URL:** `https://api.themoviedb.org/3`
- **Authentication:** API Key (stored in `.env` file)

### YouTube API (Optional)

- **Base URL:** `https://www.googleapis.com/youtube/v3`
- **Authentication:** API Key (stored in `.env` file)

## Contributing

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a pull request.

# Credits

This project idea is gotten from the foundational work by [jason.codes](https://movies.jason.codes/)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
