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
    return (
        <>
            {jobs.map((job: Job) => (
                <div key={job.id}>
                    <pre>{JSON.stringify(job, null, 2)}</pre>
                </div>
            ))}
        </>
    )
}
