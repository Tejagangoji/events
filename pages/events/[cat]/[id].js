import Image from 'next/image';
import { useRouter } from 'next/router';
import { useRef } from 'react';

const Single = ({ data }) => {
    const inputemail = useRef();
    const router = useRouter();
    const submitHandler = async (e) => {
        e.preventDefault();
        const emailvalue = inputemail.current.value;
        const eventid = router?.query.id;
        try {
            const response = await fetch('/api/emailregis', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: emailvalue, eventid: eventid })
            });
            if (!response.ok) throw new Error(`Error: ${response.status}`)
            const data = await response.json();
        } catch (e) {
            console.log("Error", e);
        }
    }
    return (
        <div className='sicity'>
            <Image className='siimg' src={data.image} width={500} height={400} alt={data.title} />
            <h1 className='sihead'>{data.title}</h1>
            <p className='sipara'>{data.description}</p>
            <form onSubmit={submitHandler}>
                <label htmlFor="email"><h3>Get registed for this events :</h3> <br />
                    <input ref={inputemail} type="email" name="email" id="email" placeholder='Enter your email' /><br />
                </label>
                <button type='submit' className='subbtn'>Submit</button>
            </form>
        </div>
    );
};

export default Single;

export async function getStaticPaths() {
    const { allEvents } = await import('/data/data.json');
    const allpaths = allEvents.map((ev) => {
        return {
            params: {
                cat: ev.city.toString(),
                id: ev.id.toString()
            }
        }
    });
    return {
        paths: allpaths,
        fallback: false
    }
}

export async function getStaticProps(context) {
    const { allEvents } = await import('/data/data.json');
    const id = context.params.id;
    const single = allEvents.find(si => si.id === id);
    return {
        props: {
            data: single
        }
    };
}