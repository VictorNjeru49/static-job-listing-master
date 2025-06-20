import { useEffect, useReducer, useState } from "react";
import { initialState, Reducer, type Job } from "../types/alltypes";
import dataJson from "../data.json";

function JobListing() {
  const [state, dispatch] = useReducer(Reducer, initialState);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_INIT" });

      try {
        const results = dataJson;
        dispatch({ type: "FETCH_SUCESS", payload: results });
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred");
        }
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  const addFilter = (value: string) => {
    if (!filters.includes(value)) {
      setFilters((prev) => [...prev, value]);
    }
  };

  const removeFilter = (value: string) => {
    setFilters((prev) => prev.filter((f) => f !== value));
  };

  const clearFilters = () => setFilters([]);

  const filteredJobs = state.data.filter((job) => {
    if (filters.length === 0) return true;
    const tags = [job.role, job.level, ...job.languages, ...(job.tools || [])];
    return filters.every((filter) => tags.includes(filter));
  });

  const RatingNew = (job: Job) =>
    job.new ? (
      <span className="uppercase bg-blue-400 text-white px-2 py-1 rounded-xl text-xs">
        NEW!
      </span>
    ) : null;

  const RatingFeatures = (job: Job) =>
    job.featured ? (
      <span className="uppercase bg-black text-white px-2 py-1 rounded-full text-xs">
        FEATURED
      </span>
    ) : null;

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error)
    return <div className="text-center text-red-500 py-10">Error: {error}</div>;

  return (
    <div className="bg-light-cyan py-10 px-4">
      {filters.length > 0 && (
        <div className="bg-white shadow-md rounded-md p-4 flex flex-wrap items-center gap-3 mb-8 max-w-5xl mx-auto">
          {filters.map((filter, index) => (
            <div
              key={index}
              className="flex items-center gap-2 bg-indigo-400 text-white px-2 py-1 rounded-md"
            >
              <span className="text-sm font-semibold">{filter}</span>
              <button
                onClick={() => removeFilter(filter)}
                className="bg-yellow-50 text-blue-600 rounded px-2 py-0.5 hover:bg-very-dark-cyan"
              >
                ×
              </button>
            </div>
          ))}
          <button
            onClick={clearFilters}
            className="ml-auto text-sm text-white bg-red-600 px-4 py-2 hover:underline"
          >
            Clear
          </button>
        </div>
      )}

      <div className="space-y-6 max-w-5xl mx-auto">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <div
              key={job.id}
              className={`bg-white p-6 rounded-md shadow-md flex flex-col lg:flex-row lg:items-center lg:justify-between border-l-4 ${
                job.featured ? "border-l-dark-cyan" : "border-l-transparent"
              }`}
            >
              <div className="flex items-start lg:items-center gap-6">
                <img
                  src={job.logo}
                  alt={`${job.company} logo`}
                  className="w-16 h-16 lg:w-20 lg:h-20 object-contain"
                />
                <div className="space-y-1">
                  <div className="flex items-center gap-3 text-sm font-bold text-dark-cyan">
                    <span className="text-blue-400">{job.company}</span>
                    {RatingNew(job)}
                    {RatingFeatures(job)}
                  </div>

                  <p className="text-black text-lg text-left font-bold hover:text-dark-cyan cursor-pointer">
                    {job.position}
                  </p>

                  <div className="flex gap-4 text-gray-500 text-sm flex-wrap">
                    <span>{job.postedAt}</span>
                    <span>•</span>
                    <span>{job.contract}</span>
                    <span>•</span>
                    <span>{job.location}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 mt-4 lg:mt-0 lg:justify-end text-dark-cyan font-semibold text-sm">
                <button
                  onClick={() => addFilter(job.role)}
                  className= "bg-blue-300  px-3 py-1 rounded-md hover:bg-dark-cyan hover:text-white transition"
                >
                  {job.role}
                </button>
                <button
                  onClick={() => addFilter(job.level)}
                  className= "bg-blue-300  px-3 py-1 rounded-md hover:bg-dark-cyan hover:text-white transition"
                >
                  {job.level}
                </button>
                {job.languages.map((lang, idx) => (
                  <button
                    key={idx}
                    onClick={() => addFilter(lang)}
                    className="bg-blue-300   px-3 py-1 rounded-md hover:bg-dark-cyan hover:text-white transition"
                  >
                    {lang}
                  </button>
                ))}
                {job.tools &&
                  job.tools.map((tool, idx) => (
                    <button
                      key={idx}
                      onClick={() => addFilter(tool)}
                      className= "bg-blue-300  px-3 py-1 rounded-md hover:bg-dark-cyan hover:text-white transition"
                    >
                      {tool}
                    </button>
                  ))}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 mt-10">
            No jobs match the selected filters.
          </div>
        )}
      </div>
    </div>
  );
}

export default JobListing;
