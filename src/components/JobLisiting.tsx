import { useEffect, useReducer, useState } from 'react'
import { initialState, Reducer, type Job } from "../types/alltypes";
import dataJson from "../data.json";

function JobLisiting() {
    const [state, dispatch] = useReducer(Reducer, initialState);
    const [loading, setLoading] = useState<boolean>(true) 
    const [error, setError] = useState<string | null>('')
    
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
        <span className="bg-dark-cyan text-white px-2 py-1 rounded-full text-xs uppercase">
          NEW!
        </span>
      ) : null;
    };
    
    const RatingFeatures = (data: Job) => {
      return data.featured ? (
        <span className="bg-very-dark-grayish-cyan text-white px-2 py-1 rounded-full text-xs uppercase">
          FEATURED
        </span>
      ) : null;
    };
        

    useEffect(()=>{
        fetchData()
    }, [])

    const FilterByRole =() =>{
        
    }
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    return (
      <div className="bg-light-cyan py-10 px-4">
        {state.data && (
          <div className="space-y-6 max-w-5xl mx-auto">
            {state.data.map((job) => (
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
                      <span className="uppercase bg-blue-400 text-white px-2 py-1 rounded-xl text-xs">
                        {RatingNew(job)}
                      </span>
                      <span className="uppercase bg-black text-white px-2 py-1 rounded-full text-xs">
                        {RatingFeatures(job)}
                      </span>
                    </div>

                    <p className=" text-black text-lg font-bold text-very-dark-cyan hover:text-dark-cyan cursor-pointer">
                      {job.position}
                    </p>

                    <div className="flex gap-4 text-gray-500 text-sm">
                      <span>{job.postedAt}</span>
                      <span>•</span>
                      <span>{job.contract}</span>
                      <span>•</span>
                      <span>{job.location}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 mt-4 lg:mt-0 lg:justify-end text-dark-cyan font-semibold text-sm">
                  <span className=" text-blue-500 bg-light-grayish-cyan px-3 py-1 rounded-md">
                    {job.role}
                  </span>
                  <span className="text-blue-500 bg-light-grayish-cyan px-3 py-1 rounded-md">
                    {job.level}
                  </span>
                  {job.languages &&
                    job.languages.map((lang, index) => (
                      <span
                        key={index}
                        className="text-blue-500 bg-light-grayish-cyan px-3 py-1 rounded-md"
                      >
                        {lang}
                      </span>
                    ))}
                  {job.tools &&
                    job.tools.map((tool, index) => (
                      <span
                        key={index}
                        className="text-blue-500 bg-light-grayish-cyan px-3 py-1 rounded-md"
                      >
                        {tool}
                      </span>
                    ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
      
}

export default JobLisiting