import Image from 'next/image'
import Link from 'next/link'

export const Homepage = ({ data }) => {
    return (
        <main>
            <div className="homehead"><h2>We made you to plan your trips</h2></div>
            <div className="homeevents">
                {data.map(ev => <Link className='singleev' key={ev.id} href={`/events/${ev.id}`}><Image className='homeimg' src={ev.image} width={200} height={100} alt={ev.title} /><h2 className='evtitle'>{ev.title}</h2><p className='evdesc'>{ev.description}</p></Link>)}
            </div>
        </main>
    )
}