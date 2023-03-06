import Image from 'next/image';
import Link from 'next/link';

const Page = ({ data, pagename }) => {
    return (
        <>
            <h2 className='cityhead'>Events in {pagename}</h2>
            <div className='cityev'>
                {data.map((ev) => {
                    return (
                        <Link className='cityevents' key={ev.id} href={`/events/${ev.city}/${ev.id}`} passHref>
                            <Image className='cityimg' src={ev.image} width={200} height={100} alt={ev.title} />
                            <h2 className='citytitle'>{ev.title}</h2>
                            <p className='citydesc'>{ev.description}</p>
                        </Link>
                    )
                })}
            </div>
        </>
    )
}

export default Page;

export async function getStaticPaths() {
    const { events_categories } = await import('/data/data.json');
    const allpaths = events_categories.map((ev) => {
        return {
            params: {
                cat: ev.id.toString(),
            },
        };
    });
    return {
        paths: allpaths,
        fallback: false,
    };
}

export async function getStaticProps(context) {
    const { allEvents } = await import('/data/data.json');
    const id = context.params.cat;
    const single = allEvents.filter(ev => ev.city === id);
    return {
        props: {
            data: single,
            pagename: id
        },
    };
}