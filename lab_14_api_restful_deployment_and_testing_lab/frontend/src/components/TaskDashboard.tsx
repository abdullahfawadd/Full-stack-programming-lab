"use client";

import {
  ArrowUpRight,
  CloudSun,
  ExternalLink,
  FileJson,
  Globe2,
  Loader2,
  Newspaper,
  Search,
  Signal,
  ThermometerSun,
  Waves,
} from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import {
  endpointForNews,
  endpointForWeather,
  getNews,
  getWeather,
} from "@/lib/api";
import type { NewsResult, WeatherResult } from "@/types/api";

type LoadState = "idle" | "loading" | "success" | "error";
type ActivePanel = "weather" | "news";

const formatDate = (value: string | null) => {
  if (!value) return "Date unavailable";
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
};

export function TaskDashboard() {
  const [activePanel, setActivePanel] = useState<ActivePanel>("weather");
  const [city, setCity] = useState("Karachi");
  const [countryCode, setCountryCode] = useState("PK");
  const [limit, setLimit] = useState(6);
  const [weatherState, setWeatherState] = useState<LoadState>("idle");
  const [newsState, setNewsState] = useState<LoadState>("idle");
  const [weather, setWeather] = useState<WeatherResult | null>(null);
  const [news, setNews] = useState<NewsResult | null>(null);
  const [weatherError, setWeatherError] = useState("");
  const [newsError, setNewsError] = useState("");

  const weatherEndpoint = useMemo(() => endpointForWeather(city), [city]);
  const newsEndpoint = useMemo(
    () => endpointForNews(countryCode, limit),
    [countryCode, limit],
  );

  const weatherJson = weather
    ? JSON.stringify({ success: true, task: "8.1", data: weather }, null, 2)
    : "{\n  \"task\": \"8.1\",\n  \"status\": \"Run a city lookup\"\n}";

  const newsJson = news
    ? JSON.stringify({ success: true, task: "8.2", data: news }, null, 2)
    : "{\n  \"task\": \"8.2\",\n  \"status\": \"Fetch country headlines\"\n}";

  const handleWeatherSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setActivePanel("weather");
    setWeatherState("loading");
    setWeatherError("");

    try {
      const result = await getWeather(city);
      setWeather(result);
      setWeatherState("success");
    } catch (error) {
      setWeatherState("error");
      setWeatherError(error instanceof Error ? error.message : "Weather request failed.");
    }
  };

  const handleNewsSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setActivePanel("news");
    setNewsState("loading");
    setNewsError("");

    try {
      const result = await getNews(countryCode, limit);
      setNews(result);
      setNewsState("success");
    } catch (error) {
      setNewsState("error");
      setNewsError(error instanceof Error ? error.message : "News request failed.");
    }
  };

  return (
    <main className="min-h-screen">
      <section className="border-b border-[var(--line)] bg-[var(--paper)]">
        <div className="shell py-5">
          <div className="hero-panel fine-grid lifted grid overflow-hidden border border-[var(--ink)] text-white lg:grid-cols-[1fr_340px]">
            <div className="p-6 md:p-8">
              <div className="mb-8 flex flex-wrap items-center gap-4">
                <div className="grid size-12 place-items-center border border-white bg-white text-[var(--ink)]">
                  <Signal aria-hidden="true" size={24} />
                </div>
                <div>
                  <p className="mono text-sm text-white/68">Full Stack Programming Lab 14</p>
                  <h1 className="max-w-3xl text-4xl font-semibold leading-tight md:text-6xl">
                    REST API testing console
                  </h1>
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                <StatusPill label="Weather" value="Open-Meteo" />
                <StatusPill label="News" value="Google RSS" />
                <StatusPill label="Tests" value="Jest verified" />
              </div>
            </div>
            <div className="relative hidden min-h-[250px] border-l border-white/20 lg:block">
              <Image
                alt="Lab 14 weather and news data poster"
                className="h-full w-full object-cover mix-blend-screen opacity-95"
                fill
                priority
                src="/lab14-signal-poster.png"
              />
            </div>
          </div>
        </div>
        <div className="shell pb-5">
          <div className="grid grid-cols-2 border border-[var(--ink)] bg-white text-sm">
            <button
              className={`focus-ring px-4 py-3 text-left ${
                activePanel === "weather" ? "bg-[var(--gold)] text-black" : ""
              }`}
              onClick={() => setActivePanel("weather")}
              type="button"
            >
              <span className="mono block">8.1</span>
              Weather
            </button>
            <button
              className={`focus-ring border-l border-[var(--ink)] px-4 py-3 text-left ${
                activePanel === "news" ? "bg-[var(--teal)] text-white" : ""
              }`}
              onClick={() => setActivePanel("news")}
              type="button"
            >
              <span className="mono block">8.2</span>
              News
            </button>
          </div>
        </div>
      </section>

      <section className="shell grid items-start gap-7 py-7 lg:grid-cols-[0.88fr_1.12fr]">
        <div className="grid gap-6">
          <form
            className={`lifted border border-[var(--ink)] bg-[var(--paper)] p-6 ${
              activePanel === "weather" ? "block" : "hidden"
            }`}
            onSubmit={handleWeatherSubmit}
          >
            <TaskHeader
              icon={<CloudSun aria-hidden="true" className="text-[var(--gold)]" size={32} />}
              label="Task 8.1"
              title="Weather Forecast API"
            />
            <label className="mb-2 block text-sm font-medium" htmlFor="city">
              City name
            </label>
            <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
              <input
                className="focus-ring h-12 border border-[var(--ink)] bg-white px-4"
                id="city"
                name="city"
                onChange={(event) => setCity(event.target.value)}
                placeholder="Karachi"
                value={city}
              />
              <RunButton isLoading={weatherState === "loading"} tone="dark" />
            </div>
            <p className="mono mt-3 break-all text-xs text-[var(--muted)]">
              GET {weatherEndpoint}
            </p>
          </form>

          <form
            className={`teal-lifted border border-[var(--ink)] bg-[var(--paper)] p-6 ${
              activePanel === "news" ? "block" : "hidden"
            }`}
            onSubmit={handleNewsSubmit}
          >
            <TaskHeader
              icon={<Newspaper aria-hidden="true" className="text-[var(--teal)]" size={32} />}
              label="Task 8.2"
              title="News Headlines API"
            />
            <div className="grid gap-3 sm:grid-cols-[1fr_112px_auto]">
              <div>
                <label className="mb-2 block text-sm font-medium" htmlFor="country">
                  Country code
                </label>
                <input
                  className="focus-ring h-12 w-full border border-[var(--ink)] bg-white px-4 uppercase"
                  id="country"
                  maxLength={2}
                  name="country"
                  onChange={(event) => setCountryCode(event.target.value.toUpperCase())}
                  placeholder="PK"
                  value={countryCode}
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium" htmlFor="limit">
                  Limit
                </label>
                <select
                  className="focus-ring h-12 w-full border border-[var(--ink)] bg-white px-3"
                  id="limit"
                  name="limit"
                  onChange={(event) => setLimit(Number(event.target.value))}
                  value={limit}
                >
                  {[5, 6, 7, 8, 9, 10].map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
              </div>
              <RunButton isLoading={newsState === "loading"} tone="teal" />
            </div>
            <p className="mono mt-3 break-all text-xs text-[var(--muted)]">
              GET {newsEndpoint}
            </p>
          </form>
        </div>

        <div className="grid gap-6">
          <section
            className={`border border-[var(--ink)] bg-[var(--night)] p-6 text-white shadow-[10px_10px_0_var(--coral)] ${
              activePanel === "weather" ? "block" : "hidden"
            }`}
          >
            <TaskHeader
              icon={<ThermometerSun aria-hidden="true" className="text-[var(--gold)]" size={30} />}
              label="Weather output"
              title="Current city snapshot"
              dark
            />
            {weatherState === "error" ? (
              <ErrorBox message={weatherError} />
            ) : weather ? (
              <div className="grid gap-4">
                <div className="grid gap-4 sm:grid-cols-3">
                  <Metric label="Current temperature" value={`${weather.currentTemperature} C`} />
                  <Metric label="Humidity level" value={`${weather.humidityLevel}%`} />
                  <Metric label="Weather condition" value={weather.weatherCondition} />
                </div>
                <div className="grid gap-3 border border-white/20 p-4 sm:grid-cols-2">
                  <Detail label="City name" value={`${weather.city}, ${weather.country}`} />
                  <Detail label="Observed" value={formatDate(weather.observedAt)} />
                  <Detail
                    label="Coordinates"
                    value={`${weather.coordinates.latitude}, ${weather.coordinates.longitude}`}
                  />
                  <Detail label="Provider" value={weather.provider} />
                </div>
              </div>
            ) : (
              <EmptyState
                icon={<Waves aria-hidden="true" size={22} />}
                text="Run the weather endpoint to display Task 8.1 output."
              />
            )}
          </section>

          <section
            className={`gold-lifted border border-[var(--ink)] bg-[var(--paper)] p-6 ${
              activePanel === "news" ? "block" : "hidden"
            }`}
          >
            <TaskHeader
              icon={<Globe2 aria-hidden="true" className="text-[var(--green)]" size={30} />}
              label="News output"
              title="Latest country headlines"
            />
            {newsState === "error" ? (
              <ErrorBox message={newsError} />
            ) : news ? (
              <div className="grid gap-3">
                {news.articles.map((article) => (
                  <article
                    className="grid gap-2 border border-[var(--line)] bg-white p-4"
                    key={`${article.newsTitle}-${article.publicationDate}`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <span className="mono text-xs text-[var(--teal)]">
                        {article.sourceName}
                      </span>
                      <span className="mono text-xs text-[var(--muted)]">
                        {formatDate(article.publicationDate)}
                      </span>
                    </div>
                    <h4 className="text-lg font-semibold leading-snug">{article.newsTitle}</h4>
                    <a
                      className="focus-ring inline-flex w-fit items-center gap-2 text-sm font-semibold text-[var(--teal-dark)]"
                      href={article.newsUrl}
                      rel="noreferrer"
                      target="_blank"
                    >
                      Open source <ExternalLink aria-hidden="true" size={15} />
                    </a>
                  </article>
                ))}
              </div>
            ) : (
              <EmptyState
                icon={<Newspaper aria-hidden="true" size={22} />}
                text="Run the news endpoint to display Task 8.2 output."
              />
            )}
          </section>
        </div>
      </section>

      <section className="shell pb-8">
        <div className="grid gap-6">
          {activePanel === "weather" ? (
            <JsonPanel
              endpoint={weatherEndpoint}
              isActive
              json={weatherJson}
              label="Task 8.1 API JSON"
              onActivate={() => setActivePanel("weather")}
            />
          ) : (
            <JsonPanel
              endpoint={newsEndpoint}
              isActive
              json={newsJson}
              label="Task 8.2 API JSON"
              onActivate={() => setActivePanel("news")}
            />
          )}
        </div>
      </section>
    </main>
  );
}

function StatusPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-white/25 bg-white/10 p-3 backdrop-blur">
      <p className="mono text-xs text-white/55">{label}</p>
      <p className="mt-1 font-semibold">{value}</p>
    </div>
  );
}

function TaskHeader({
  dark = false,
  icon,
  label,
  title,
}: {
  dark?: boolean;
  icon: ReactNode;
  label: string;
  title: string;
}) {
  return (
    <div className="mb-5 flex items-center justify-between gap-4">
      <div>
        <p className={`mono text-sm ${dark ? "text-white/60" : "text-[var(--muted)]"}`}>
          {label}
        </p>
        <h2 className="text-2xl font-semibold">{title}</h2>
      </div>
      {icon}
    </div>
  );
}

function RunButton({ isLoading, tone }: { isLoading: boolean; tone: "dark" | "teal" }) {
  return (
    <button
      className={`focus-ring inline-flex h-12 items-center justify-center gap-2 border border-[var(--ink)] px-5 font-semibold text-white transition ${
        tone === "teal"
          ? "mt-7 bg-[var(--teal)] hover:bg-[var(--teal-dark)]"
          : "bg-[var(--ink)] hover:bg-[var(--teal-dark)]"
      }`}
      disabled={isLoading}
      type="submit"
    >
      {isLoading ? (
        <Loader2 aria-hidden="true" className="animate-spin" size={18} />
      ) : (
        <Search aria-hidden="true" size={18} />
      )}
      Run
    </button>
  );
}

function ErrorBox({ message }: { message: string }) {
  return (
    <div className="border border-[var(--coral)] bg-[rgba(205,91,69,0.16)] p-4">
      {message}
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-white/20 bg-white/10 p-4">
      <p className="mono text-xs text-white/60">{label}</p>
      <p className="mt-2 text-2xl font-semibold">{value}</p>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="mono text-xs text-white/50">{label}</p>
      <p className="mt-1 text-sm">{value}</p>
    </div>
  );
}

function EmptyState({ icon, text }: { icon: ReactNode; text: string }) {
  return (
    <div className="grid min-h-[160px] place-items-center border border-dashed border-current p-6 text-center opacity-70">
      <div>
        <div className="mx-auto mb-3 grid size-10 place-items-center border border-current">
          {icon}
        </div>
        <p>{text}</p>
      </div>
    </div>
  );
}

function JsonPanel({
  endpoint,
  isActive,
  json,
  label,
  onActivate,
}: {
  endpoint: string;
  isActive: boolean;
  json: string;
  label: string;
  onActivate: () => void;
}) {
  return (
    <section className="border border-[var(--ink)] bg-white p-5">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <p className="mono text-sm text-[var(--muted)]">{label}</p>
          <p className="mono mt-1 break-all text-xs text-[var(--teal-dark)]">{endpoint}</p>
        </div>
        <button
          className={`focus-ring grid size-10 place-items-center border border-[var(--ink)] ${
            isActive ? "bg-[var(--ink)] text-white" : "bg-[var(--paper-soft)]"
          }`}
          onClick={onActivate}
          title={`Show ${label}`}
          type="button"
        >
          <FileJson aria-hidden="true" size={19} />
        </button>
      </div>
      <pre className="api-code mono border border-[var(--line)] bg-[var(--paper-soft)] p-4 text-xs">
        {json}
      </pre>
      <a
        className="focus-ring mt-4 inline-flex items-center gap-2 border border-[var(--ink)] px-3 py-2 text-sm font-semibold"
        href={endpoint}
        rel="noreferrer"
        target="_blank"
      >
        Open API <ArrowUpRight aria-hidden="true" size={16} />
      </a>
    </section>
  );
}
