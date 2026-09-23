import { useEffect, useRef, useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { getPerson } from "@/services/tmdb";
import { formatDate } from "@/utils/filter";
import AppScroller from "@/components/AppScroller";
import TheFooter from "@/components/TheFooter";
import CarouselBase from "@/components/carousel/Base";
import MediaCard from "@/components/media/Card";

function calculateAge(birthday, deathday) {
  if (!birthday) return null;
  const birth = new Date(birthday);
  const end = deathday ? new Date(deathday) : new Date();
  let age = end.getFullYear() - birth.getFullYear();
  const m = end.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && end.getDate() < birth.getDate())) {
    age--;
  }
  return age;
}

function formatGender(gender) {
  switch (gender) {
    case 1:
      return "Female";
    case 2:
      return "Male";
    case 3:
      return "Non-binary";
    default:
      return null;
  }
}

const Person = () => {
  const { id } = useParams();
  const [person, setPerson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isBioExpanded, setIsBioExpanded] = useState(false);
  const [activeCreditTab, setActiveCreditTab] = useState("all");

  const scrollerRef = useRef(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    const getPersonDetails = async () => {
      try {
        const data = await getPerson(id);
        if (isMounted) {
          setPerson(data);
        }
      } catch (error) {
        console.error("Error fetching person details", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    if (id) {
      getPersonDetails();
      scrollerRef.current?.scrollTo({ top: 0 });
    }

    return () => {
      isMounted = false;
    };
  }, [id]);

  const castCredits = useMemo(
    () => person?.combined_credits?.cast || [],
    [person],
  );
  const crewCredits = useMemo(
    () => person?.combined_credits?.crew || [],
    [person],
  );

  // Top works for "Known For"
  const knownFor = useMemo(() => {
    const isActing =
      person?.known_for_department !== "Directing" &&
      person?.known_for_department !== "Production";
    const primary = isActing
      ? castCredits
      : crewCredits.length > 0
        ? crewCredits
        : castCredits;

    const seen = new Set();
    return primary
      .filter((c) => c.poster_path && (c.title || c.name))
      .sort(
        (a, b) =>
          (b.vote_count || 0) * (b.vote_average || 0) -
          (a.vote_count || 0) * (a.vote_average || 0),
      )
      .filter((c) => {
        if (seen.has(c.id)) return false;
        seen.add(c.id);
        return true;
      })
      .slice(0, 15);
  }, [person, castCredits, crewCredits]);

  // Filtered & chronologically sorted credits
  const filteredCredits = useMemo(() => {
    let list = [];
    if (activeCreditTab === "movies") {
      list = [
        ...castCredits.filter((c) => c.media_type === "movie"),
        ...crewCredits.filter((c) => c.media_type === "movie"),
      ];
    } else if (activeCreditTab === "tv") {
      list = [
        ...castCredits.filter((c) => c.media_type === "tv"),
        ...crewCredits.filter((c) => c.media_type === "tv"),
      ];
    } else if (activeCreditTab === "crew") {
      list = [...crewCredits];
    } else {
      list = [...castCredits, ...crewCredits];
    }

    // Deduplicate in case person was both cast and crew on same media
    const map = new Map();
    list.forEach((item) => {
      const key = `${item.media_type}-${item.id}`;
      if (!map.has(key)) {
        map.set(key, item);
      }
    });

    return Array.from(map.values()).sort((a, b) => {
      const dateA = a.release_date || a.first_air_date || "";
      const dateB = b.release_date || b.first_air_date || "";
      if (!dateA) return -1;
      if (!dateB) return 1;
      return dateB.localeCompare(dateA);
    });
  }, [activeCreditTab, castCredits, crewCredits]);

  const age = calculateAge(person?.birthday, person?.deathday);
  const gender = formatGender(person?.gender);
  const externalIds = person?.external_ids || {};

  const bio = person?.biography || "";
  const isBioLong = bio.length > 450;
  const displayedBio =
    isBioLong && !isBioExpanded ? `${bio.slice(0, 450)}...` : bio;

  return (
    <AppScroller ref={scrollerRef}>
      <title>{`${person ? person.name : "Person"} · React Movies`}</title>

      <div className="max-w-7xl w-full mx-auto px-4 py-8 md:px-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 text-white/50 gap-4">
            <div className="i-carbon:circle-dash text-5xl animate-spin"></div>
            <span>Loading person details...</span>
          </div>
        ) : !person ? (
          <div className="text-center py-32 text-white/60">
            <h2 className="text-2xl font-bold">Person not found</h2>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] lg:grid-cols-[320px_1fr] gap-8 lg:gap-12">
            {/* Left Sidebar */}
            <aside className="flex flex-col gap-6">
              {/* Profile Photo */}
              <div className="aspect-3/4 w-full max-w-[320px] mx-auto md:mx-0 rounded-2xl overflow-hidden bg-[#1e1e1e] border border-white/10 shadow-xl">
                {person?.profile_path ? (
                  <img
                    width={400}
                    height={600}
                    className="object-cover w-full h-full"
                    src={`https://image.tmdb.org/t/p/w500${person.profile_path}`}
                    alt={person.name}
                    fetchPriority="high"
                  />
                ) : (
                  <div className="h-full flex items-center justify-center opacity-20">
                    <div className="i-ph:user text-6xl"></div>
                  </div>
                )}
              </div>

              {/* Social / External Links */}
              <div className="flex items-center justify-center md:justify-start gap-4 text-white/70">
                {externalIds.imdb_id && (
                  <a
                    href={`https://www.imdb.com/name/${externalIds.imdb_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="IMDb"
                    className="hover:text-[rgb(64,193,173)] hover:scale-110 transition-all p-1"
                  >
                    <div className="i-cib:imdb text-2xl"></div>
                  </a>
                )}
                {externalIds.instagram_id && (
                  <a
                    href={`https://instagram.com/${externalIds.instagram_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Instagram"
                    className="hover:text-[rgb(64,193,173)] hover:scale-110 transition-all p-1"
                  >
                    <div className="i-simple-icons:instagram text-xl"></div>
                  </a>
                )}
                {externalIds.twitter_id && (
                  <a
                    href={`https://twitter.com/${externalIds.twitter_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Twitter / X"
                    className="hover:text-[rgb(64,193,173)] hover:scale-110 transition-all p-1"
                  >
                    <div className="i-simple-icons:twitter text-xl"></div>
                  </a>
                )}
                {externalIds.facebook_id && (
                  <a
                    href={`https://facebook.com/${externalIds.facebook_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Facebook"
                    className="hover:text-[rgb(64,193,173)] hover:scale-110 transition-all p-1"
                  >
                    <div className="i-simple-icons:facebook text-xl"></div>
                  </a>
                )}
                {person.homepage && (
                  <a
                    href={person.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Website"
                    className="hover:text-[rgb(64,193,173)] hover:scale-110 transition-all p-1"
                  >
                    <div className="i-ph-link-simple text-xl"></div>
                  </a>
                )}
              </div>

              {/* Personal Information Panel */}
              <div className="bg-[#181818] border border-white/5 rounded-2xl p-5 flex flex-col gap-4 text-sm">
                <h3 className="text-base font-semibold text-white/90 border-b border-white/10 pb-2">
                  Personal Info
                </h3>

                {person.known_for_department && (
                  <div>
                    <div className="text-white/40 text-xs">Known For</div>
                    <div className="font-medium text-white/90 mt-0.5">
                      {person.known_for_department}
                    </div>
                  </div>
                )}

                <div>
                  <div className="text-white/40 text-xs">Known Credits</div>
                  <div className="font-medium text-white/90 mt-0.5">
                    {castCredits.length + crewCredits.length}
                  </div>
                </div>

                {gender && (
                  <div>
                    <div className="text-white/40 text-xs">Gender</div>
                    <div className="font-medium text-white/90 mt-0.5">
                      {gender}
                    </div>
                  </div>
                )}

                {person.birthday && (
                  <div>
                    <div className="text-white/40 text-xs">Birthday</div>
                    <div className="font-medium text-white/90 mt-0.5">
                      {formatDate(person.birthday)}
                      {age !== null && !person.deathday && (
                        <span className="text-white/50 text-xs ml-1.5">
                          ({age} years old)
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {person.deathday && (
                  <div>
                    <div className="text-white/40 text-xs">Day of Death</div>
                    <div className="font-medium text-white/90 mt-0.5">
                      {formatDate(person.deathday)}
                      {age !== null && (
                        <span className="text-white/50 text-xs ml-1.5">
                          (aged {age})
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {person.place_of_birth && (
                  <div>
                    <div className="text-white/40 text-xs">Place of Birth</div>
                    <div className="font-medium text-white/90 mt-0.5">
                      {person.place_of_birth}
                    </div>
                  </div>
                )}

                {person.also_known_as && person.also_known_as.length > 0 && (
                  <div>
                    <div className="text-white/40 text-xs">Also Known As</div>
                    <div className="flex flex-col gap-1 mt-1 text-xs text-white/70">
                      {person.also_known_as.slice(0, 5).map((alias, i) => (
                        <span key={i} className="line-clamp-1">
                          {alias}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex flex-col gap-8 min-w-0">
              {/* Name & Department Badge */}
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-2">
                  {person.name}
                </h1>
                {person.known_for_department && (
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-[rgb(64,193,173)]/20 text-[rgb(64,193,173)] border border-[rgb(64,193,173)]/30">
                    {person.known_for_department}
                  </span>
                )}
              </div>

              {/* Biography */}
              <div>
                <h2 className="text-2xl font-semibold mb-3">Biography</h2>
                <div className="text-white/80 leading-relaxed whitespace-pre-line text-sm sm:text-base">
                  {displayedBio || "No biography available for this person."}
                </div>
                {isBioLong && (
                  <button
                    type="button"
                    onClick={() => setIsBioExpanded(!isBioExpanded)}
                    className="mt-3 text-xs sm:text-sm font-medium text-[rgb(64,193,173)] hover:underline inline-flex items-center gap-1"
                  >
                    <span>{isBioExpanded ? "Show less" : "Read more"}</span>
                    <div
                      className={`text-sm ${isBioExpanded ? "i-ph-caret-left-light rotate-90" : "i-ph-caret-right-light rotate-90"}`}
                    ></div>
                  </button>
                )}
              </div>

              {/* Known For Carousel */}
              {knownFor.length > 0 && (
                <div className="mt-4">
                  <CarouselBase query={{ title: "Known For" }}>
                    {knownFor.map((item) => (
                      <MediaCard
                        key={`${item.media_type}-${item.id}`}
                        item={item}
                        query={{ type: item.media_type }}
                      />
                    ))}
                  </CarouselBase>
                </div>
              )}

              {/* Full Filmography / Credits Section */}
              <div className="mt-6 flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
                  <div className="flex items-baseline gap-2">
                    <h2 className="text-2xl font-semibold">Filmography</h2>
                    <span className="text-sm text-white/40">
                      ({filteredCredits.length})
                    </span>
                  </div>

                  {/* Filter Tabs */}
                  <div className="flex items-center gap-2 bg-[#1c1c1c] p-1 rounded-lg border border-white/10 text-xs">
                    <button
                      type="button"
                      onClick={() => setActiveCreditTab("all")}
                      className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                        activeCreditTab === "all"
                          ? "bg-white/20 text-white"
                          : "text-white/50 hover:text-white"
                      }`}
                    >
                      All ({castCredits.length + crewCredits.length})
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveCreditTab("movies")}
                      className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                        activeCreditTab === "movies"
                          ? "bg-white/20 text-white"
                          : "text-white/50 hover:text-white"
                      }`}
                    >
                      Movies
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveCreditTab("tv")}
                      className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                        activeCreditTab === "tv"
                          ? "bg-white/20 text-white"
                          : "text-white/50 hover:text-white"
                      }`}
                    >
                      TV Shows
                    </button>
                    {crewCredits.length > 0 && (
                      <button
                        type="button"
                        onClick={() => setActiveCreditTab("crew")}
                        className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                          activeCreditTab === "crew"
                            ? "bg-white/20 text-white"
                            : "text-white/50 hover:text-white"
                        }`}
                      >
                        Crew ({crewCredits.length})
                      </button>
                    )}
                  </div>
                </div>

                {/* Credits List */}
                <div className="flex flex-col divide-y divide-white/5 bg-[#161616] border border-white/10 rounded-2xl overflow-hidden">
                  {filteredCredits.length === 0 ? (
                    <div className="p-8 text-center text-white/40 text-sm">
                      No credits found for this category.
                    </div>
                  ) : (
                    filteredCredits.map((credit) => {
                      const year =
                        credit.release_date?.slice(0, 4) ||
                        credit.first_air_date?.slice(0, 4) ||
                        "—";
                      const title = credit.title || credit.name || "Untitled";
                      const role = credit.character || credit.job || "";
                      const type = credit.media_type || "movie";

                      return (
                        <div
                          key={`${type}-${credit.id}-${credit.credit_id || Math.random()}`}
                          className="flex items-center gap-4 p-3.5 hover:bg-white/5 transition-colors group"
                        >
                          {/* Year */}
                          <span className="w-12 text-center text-sm font-mono text-white/50 flex-shrink-0">
                            {year}
                          </span>

                          {/* Media Type Icon / Dot */}
                          <div className="w-2 h-2 rounded-full bg-[rgb(64,193,173)]/60 flex-shrink-0"></div>

                          {/* Details */}
                          <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center sm:gap-2">
                            <Link
                              to={`/${type}/${credit.id}`}
                              className="font-medium text-white/90 group-hover:text-[rgb(64,193,173)] transition-colors truncate text-sm sm:text-base"
                            >
                              {title}
                            </Link>

                            {role && (
                              <span className="text-xs sm:text-sm text-white/50 truncate">
                                as <span className="text-white/70">{role}</span>
                              </span>
                            )}
                          </div>

                          {/* Media Badge */}
                          <span className="text-[10px] uppercase font-semibold tracking-wider px-2 py-0.5 rounded bg-white/10 text-white/60 flex-shrink-0">
                            {type === "movie" ? "Movie" : "TV"}
                          </span>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </main>
          </div>
        )}
      </div>

      <TheFooter />
    </AppScroller>
  );
};

export default Person;
