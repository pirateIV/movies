import React from "react";
import IconVercel from "./icon/IconVercel";
import IconTMDB from "./icon/IconTMDB";

const TheFooter = () => {
  return (
    <footer className="p-[3.75rem] flex flex-col gap-4">
      <div className="flex flex-row gap-2 items-center my-2">
        <img src="/movies-sm.webp" width="25" height="25" alt="Logo" />
        <div className="text-xl">React Movies</div>
      </div>
      <div className="flex flex-row gap-2 items-center">
        <div className="opacity-50 text-sm">Made with</div>
        <a
          href="https://react.dev/"
          target="_blank"
          rel="noopener noreferrer"
          title="React"
        >
          <img src="/R.webp" width="100" alt="React logo" />
        </a>
      </div>

      <div className="flex items-center text-sm">
        <span className="opacity-50 me-1"> Data Provided by&nbsp;</span>
        <IconTMDB />
      </div>

      <div className="opacity-50 text-sm">
        <p>
          This project uses the TMDB API but is not endorsed or certified by
          TMDB.
        </p>
      </div>
      <div className="flex flex-row gap-4 mt-5 items-center">
        <a
          href="https://github.com/pirateIV/movies"
          target="_blank"
          aria-label="Link to GitHub account"
          rel="noopener"
          n-link=""
        >
          <div i-simple-icons:github=""></div>
        </a>
        <div className="text-gray-900 text-sm">
          <a
            href="https://www.themoviedb.org/"
            target="_blank"
            rel="noopener noreferrer"
            title="The Movie Database"
            className="text-opacity-100"
          >
            <IconVercel />
          </a>
        </div>
        <div className="flex items-center gap-2">
          <span>Language:</span>
          <label htmlFor="langSwitcher" className="sr-only"></label>
          <select id="langSwitcher" className="rounded-md text-sm p-1 *:p-1">
            <option value="en">English</option>
            <option value="de-DE">Deutsch</option>
            <option value="es-ES">Español</option>
            <option value="it">Italiano</option>
            <option value="ja">日本語</option>
            <option value="zh-CN">简体中文</option>
            <option value="pt-PT">Português</option>
            <option value="pt-BR">Português do Brasil</option>
            <option value="ru-RU">Русский</option>
            <option value="fr-FR">Français</option>
            <option value="uk-UA">Українська</option>
          </select>
        </div>
      </div>
    </footer>
  );
};

export default TheFooter;
