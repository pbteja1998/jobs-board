import { useState } from 'react'
import Head from 'next/head'

import jobs from '../../frontendmentor/data.json'

type Job = {
    id: number
    company: string
    logo: string
    new: boolean
    featured: boolean
    position: string
    role: string
    level: string
    postedAt: string
    contract: string
    location: string
    languages: string[]
    tools: string[]
}

export default function IndexPage() {
    const [selectedTags, setSelectedTags] = useState<string[]>([])
    const handleTagClick = (tag: string) => {
        if (selectedTags.indexOf(tag) === -1) {
            setSelectedTags([...selectedTags, tag])
        }
    }
    const removeTag = (tag: string) => {
        setSelectedTags(selectedTags.filter((_tag: string) => _tag !== tag))
    }
    const clearTags = () => {
        setSelectedTags([])
    }
    const doesTagExistInJob = (tag: string, job: Job) => {
        const allTagsInJob = [
            job.role,
            job.level,
            ...job.languages,
            ...job.tools,
        ]
        for (const jobTag of allTagsInJob) {
            if (jobTag.toLowerCase() === tag.toLowerCase()) {
                return true
            }
        }
    }
    const doesAllSelectedTagsExistInJob = (job: Job) => {
        for (const tag of selectedTags) {
            if (!doesTagExistInJob(tag, job)) {
                return false
            }
        }
        return true
    }

    const filteredJobs = () => {
        if (selectedTags.length === 0) {
            return jobs
        }
        return jobs.filter((job: Job) => doesAllSelectedTagsExistInJob(job))
    }

    const handleFocus = (e: any, onClick: any) => {
        if (e.key === 'Enter') {
            onClick()
        }
    }

    const getCompanyInitials = (name: string) => {
        const words = name.split(' ')
        if (words.length > 1) {
            return words[0].charAt(0) + words[1].charAt(0)
        }
        return words[0].charAt(0)
    }

    return (
        <>
            <Head>
                <title>Jobs Board</title>
            </Head>
            <div
                className={`px-4 sm:px-10 md:px-16 xl:px-40 h-38 pt-20 bg-cyan-0 bg-repeat-x bg-center 
                    bg-header-mobile sm:bg-header-desktop`}
            >
                {selectedTags.length > 0 && (
                    <div
                        className={
                            'flex items-center my-auto h-18 bg-white shadow-lg transform translate-y-1/2 px-4'
                        }
                    >
                        <div
                            className={
                                'flex items-center overflow-x-scroll w-10/12 sm:w-11/12'
                            }
                        >
                            {selectedTags.map((tag: string) => (
                                <div
                                    key={tag}
                                    className={
                                        'overflow-visible flex items-center h-8 pl-1 bg-cyan-1 ml-4 rounded overflow-hidden shadow'
                                    }
                                >
                                    <span
                                        className={
                                            'bg-cyan-1 text-cyan-0 font-semibold text-sm'
                                        }
                                    >
                                        {tag}
                                    </span>
                                    <span
                                        className={`h-full w-8 px-2 bg-cyan-0 ml-2 text-white w-7.5 
                                        text-xl cursor-pointer hover:bg-cyan-4`}
                                        tabIndex={0}
                                        onClick={() => removeTag(tag)}
                                        onKeyDown={(e) => {
                                            handleFocus(e, () => removeTag(tag))
                                        }}
                                        role={'button'}
                                    >
                                        x
                                    </span>
                                </div>
                            ))}
                        </div>
                        <button
                            className={
                                'ml-auto text-cyan-0 text-sm hover:underline cursor-pointer font-bold'
                            }
                            onClick={() => clearTags()}
                            onKeyDown={(e) => {
                                handleFocus(e, () => clearTags())
                            }}
                        >
                            Clear
                        </button>
                    </div>
                )}
            </div>
            <div
                className={`p-4 ${
                    selectedTags.length > 0 && 'pt-9'
                } bg-cyan-1 sm:px-10 md:px-16 xl:px-40`}
            >
                {filteredJobs().map((job: Job) => (
                    <div
                        className={`flex flex-col bg-white mt-10 px-6 pb-6 shadow-lg rounded ${
                            job.featured && 'border-cyan-0 border-l-5'
                        } sm:flex-row sm:items-center sm:pt-6 sm:h-38`}
                        key={job.id}
                    >
                        <div className={'w-20 sm:ml-4 sm:w-24'}>
                            {job.logo ? (
                                <img
                                    className={`w-12 transform -translate-y-1/2 sm:translate-y-0 sm:w-20 
                                    sm:w-full sm:h-full sm:object-contain`}
                                    src={job.logo}
                                    alt="Logo"
                                />
                            ) : (
                                <span
                                    className={`
                                        w-12 h-12 sm:w-20 sm:h-20 bg-cyan-0
                                        transform -translate-y-1/2 sm:translate-y-0 inline-flex 
                                        items-center justify-center rounded-full 
                                    `}
                                >
                                    <span className="text-base font-semibold leading-none text-white">
                                        {getCompanyInitials(job.company)}
                                    </span>
                                </span>
                            )}
                        </div>
                        <div className={'sm:ml-6'}>
                            <div className={'flex items-center'}>
                                <h2 className={'text-sm text-cyan-0 font-bold'}>
                                    {job.company}
                                </h2>
                                {job.new && (
                                    <p
                                        className={`ml-2 h-5 leading-5 bg-cyan-0 text-xs text-white 
                                            rounded-full px-2 py-0 font-semibold`}
                                    >
                                        NEW!
                                    </p>
                                )}
                                {job.featured && (
                                    <p
                                        className={`ml-2 h-5 leading-5 bg-cyan-4 text-xs text-white 
                                            rounded-full px-2 py-0 font-semibold`}
                                    >
                                        FEATURED
                                    </p>
                                )}
                            </div>
                            <div className={'mt-4 sm:mt-2'}>
                                <h2
                                    className={
                                        'text-cyan-4 font-bold hover:text-cyan-0 cursor-pointer'
                                    }
                                >
                                    {job.position}
                                </h2>
                            </div>
                            <div className={'mt-4 flex items-center sm:mt-2'}>
                                <p
                                    className={
                                        'text-gray-500 text-sm sm:text-base'
                                    }
                                >
                                    {job.postedAt}
                                </p>
                                <p
                                    className={
                                        'ml-1 sm:ml-2 text-gray-500 text-sm sm:text-base'
                                    }
                                >
                                    •
                                </p>
                                <p
                                    className={
                                        'ml-1 sm:ml-2 text-gray-500 text-sm sm:text-base'
                                    }
                                >
                                    {job.contract}
                                </p>
                                <p
                                    className={
                                        'ml-1 sm:ml-2 text-gray-500 text-sm sm:text-base'
                                    }
                                >
                                    •
                                </p>
                                <p
                                    className={
                                        'ml-1 sm:ml-2 text-gray-500 text-sm sm:text-base'
                                    }
                                >
                                    {job.location}
                                </p>
                            </div>
                        </div>
                        <hr className={'mt-4 sm:hidden'} />
                        <div
                            className={
                                'flex flex-wrap sm:ml-auto sm:items-center sm:pl-5 md:pl-10 xl:pl-16'
                            }
                        >
                            <span
                                className={`inline-flex items-center px-2.5 py-0.5 ml-2 mt-5 sm:my-2 
                                    rounded-md text-xs font-semibold leading-5 bg-cyan-1 text-cyan-0 
                                    cursor-pointer hover:bg-cyan-0 hover:text-white`}
                                onClick={() => handleTagClick(job.role)}
                                tabIndex={0}
                                onKeyDown={(e) => {
                                    handleFocus(e, () =>
                                        handleTagClick(job.role)
                                    )
                                }}
                                role={'button'}
                            >
                                {job.role}
                            </span>
                            <span
                                className={`inline-flex items-center px-2.5 py-0.5 ml-2 mt-5 sm:my-2 
                                    rounded-md text-xs font-semibold leading-5 bg-cyan-1 text-cyan-0 
                                    cursor-pointer hover:bg-cyan-0 hover:text-white`}
                                onClick={() => handleTagClick(job.level)}
                                tabIndex={0}
                                onKeyDown={(e) => {
                                    handleFocus(e, () =>
                                        handleTagClick(job.level)
                                    )
                                }}
                                role={'button'}
                            >
                                {job.level}
                            </span>
                            {job.languages.map((language) => (
                                <span
                                    key={language}
                                    className={`inline-flex items-center px-2.5 py-0.5 ml-2 mt-5 sm:my-2
                                        rounded-md text-xs font-semibold leading-5 bg-cyan-1 text-cyan-0
                                        cursor-pointer hover:bg-cyan-0 hover:text-white`}
                                    onClick={() => handleTagClick(language)}
                                    tabIndex={0}
                                    onKeyDown={(e) => {
                                        handleFocus(e, () =>
                                            handleTagClick(language)
                                        )
                                    }}
                                    role={'button'}
                                >
                                    {language}
                                </span>
                            ))}
                            {job.tools.map((tool) => (
                                <span
                                    key={tool}
                                    className={`inline-flex items-center px-2.5 py-0.5 ml-2 mt-5 sm:my-2 
                                        rounded-md text-xs font-semibold leading-5 bg-cyan-1 text-cyan-0 
                                        cursor-pointer hover:bg-cyan-0 hover:text-white`}
                                    onClick={() => handleTagClick(tool)}
                                    tabIndex={0}
                                    onKeyDown={(e) => {
                                        handleFocus(e, () =>
                                            handleTagClick(tool)
                                        )
                                    }}
                                    role={'button'}
                                >
                                    {tool}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}
