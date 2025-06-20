import { useEffect, useReducer, useState } from 'react'
import { initialState, Reducer, type Job } from "../types/alltypes";
import dataJson from "../data.json";

function JobLisiting() {
    const [state, dispatch] = useReducer(Reducer, initialState);
    const [loading, setLoading] = useState<boolean>(true) 
    const [error, setError] = useState<string | null>('')
    const [selectedRole, setSelectedRole] = useState<string | null>(null);
    const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
    const [selectedLanguage, setSelectedLanguage] = useState<string | null>(
      null
    );
    const [selectedTool, setSelectedTool] = useState<string | null>(null);
    

    
    const fetchData = async ()=>{
        dispatch({type: 'FETCH_INIT'})
        try{
            const results = dataJson;
            dispatch({type: 'FETCH_SUCESS', payload: results})
            
        } catch(error: unknown) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("An unknown error occurred");
            }
        }
        setLoading(false)
    }

    const RatingNew = (data: Job) => {
      return data.new ? (
        <span className="uppercase bg-blue-400 text-white px-2 py-1 rounded-xl text-xs">
          NEW!
        </span>
      ) : null;
    };
    
    const RatingFeatures = (data: Job) => {
      return data.featured ? (
        <span className="uppercase bg-black text-white px-2 py-1 rounded-full text-xs">
          FEATURED
        </span>
      ) : null;
    };
        

    useEffect(()=>{
        fetchData()
    }, [])

    const filteredJobs = state.data.filter((job) => {
      const roleMatch = selectedRole ? job.role === selectedRole : true;
      const levelMatch = selectedLevel ? job.level === selectedLevel : true;
      const languageMatch = selectedLanguage
        ? job.languages.includes(selectedLanguage)
        : true;
        const toolMatch = selectedTool
        ? job.tools.includes(selectedTool)
        : true;

      return roleMatch && levelMatch && languageMatch && toolMatch;
    });
      
      

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    return (
      <div className="bg-amber-100 py-10 px-4">
        {state.data && (
          <div className="space-y-6 max-w-5xl mx-auto">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <div
                  key={job.id}
                  className={`bg-white p-6 rounded-md shadow-md flex flex-col lg:flex-row lg:items-center lg:justify-between border-l-4 ${
                    job.featured ? "border-l-dark-cyan" : "border-l-transparent"
                  }`}
                >
                  <div className="flex lg: flex-row items-start lg:items-center gap-6 sm: flex-col">
                    <img
                      src={job.logo}
                      alt={`${job.company} logo`}
                      className="w-16 h-16 lg:w-20 lg:h-20 object-contain"
                    />

                    <div className="space-y-1">
                      <div className="flex items-center gap-3 text-sm font-bold text-dark-cyan">
                        <span className="text-blue-400">{job.company}</span>
                        <span>{RatingNew(job)}</span>
                        <span>{RatingFeatures(job)}</span>
                      </div>

                      <p className="text-black text-lg font-bold text-very-dark-cyan hover:text-dark-cyan cursor-pointer sm: text-left">
                        {job.position}
                      </p>

                      <div className="flex gap-4 text-gray-500 text-sm sm: text-xs">
                        <span>{job.postedAt}</span>
                        <span>•</span>
                        <span>{job.contract}</span>
                        <span>•</span>
                        <span>{job.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 mt-4 lg:mt-0 lg:justify-end text-dark-cyan font-semibold text-sm lg:border-none sm: border-t py-5">
                    <button
                      onClick={() => setSelectedRole(job.role)}
                      className="text-blue-500 bg-indigo-300 px-3 py-1 rounded-md hover:bg-dark-cyan hover:text-white transition"
                    >
                      {job.role}
                    </button>

                    <button
                      onClick={() => setSelectedLevel(job.level)}
                      className="text-blue-500 bg-indigo-300 px-3 py-1 rounded-md hover:bg-dark-cyan hover:text-white transition"
                    >
                      {job.level}
                    </button>

                    {job.languages &&
                      job.languages.map((lang, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedLanguage(lang)}
                          className="text-blue-500 bg-indigo-300 px-3 py-1 rounded-md hover:bg-dark-cyan hover:text-white transition"
                        >
                          {lang}
                        </button>
                      ))}

                    {job.tools &&
                      job.tools.map((tool, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedTool(tool)}
                          className="text-blue-500 bg-indigo-300 px-3 py-1 rounded-md hover:bg-dark-cyan hover:text-white transition"
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
        )}
      </div>
    );
      
}
export default JobLisiting