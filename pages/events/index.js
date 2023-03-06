import Image from 'next/image';
import Link from 'next/link';

const Page = ({ data }) => {
    return (
        <>
            <div className="evind">
                {data.map(ev => <Link className='singleev' key={ev.id} href={`/events/${ev.id}`} passHref><Image className='evimg' src={ev.image} width={300} height={200} alt={ev.title} /><h2 className='evtitle'>{ev.title}</h2></Link>)}
            </div>
        </>
    )
}

export default Page;

export async function getStaticProps() {
    const { events_categories } = await import('/data/data.json')
    return {
        props: {
            data: events_categories
        },
    };
}