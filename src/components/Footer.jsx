import IconTwitter from "./icon/IconTwitter";
import IconGithub from "./icon/IconGithub";
import IconVercel from "./icon/IconVercel";
import LanguageSwitcher from "./LanguageSwitcher";

const Footer = () => {
  return (
    <footer>
      <div className="w-full p-16 order-last lg:max-w-[calc(100%-70px)]">
        <div className="flex gap-2 items-center my-2">
          <img src="/movies-sm.webp" width="25" height="25" alt="logo" />
          <div className="sm:text-lg text-xl">React Movies</div>
        </div>

        <div>
          <div className="inline-flex items-center gap-2 my-2">
            <span className="text-xs sm:text-sm text-gray-300/60">
              Data Provided by&nbsp;
            </span>
            <a href="https://themoviedb.org">
              <img src="/tmdb.svg" width="100" height="75" alt="tmdb logo" />
            </a>
          </div>
        </div>

        <div>
          <p className="text-xs sm:text-sm text-gray-300/60 my-2">
            This project uses the TMDB API but is not endorsed or certified by
            TMDB.
          </p>
        </div>

        <div className="mt-8">
          <div className="flex items-center gap-5 text-lg">
            <IconTwitter />
            <IconGithub />
            <IconVercel />
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
