import "./Providers.scss";

function Providers(providers: any) {
    return (
        // <ul className='movieFound__essentiel-disponibility'>
        //     <li><a className='movieFound__essentiel-disponibility--plateform' href='https://www.netflix.com/fr/' target='_blank'>Netflix</a></li>
        //     <li><a className='movieFound__essentiel-disponibility--plateform' href='https://www.primevideo.com/' target='_blank'>Prime Vidéo</a></li>
        //     <li><a className='movieFound__essentiel-disponibility--plateform' href='https://www.disneyplus.com/fr-fr' target='_blank'>Disney+</a></li>
        //     <li><a className='movieFound__essentiel-disponibility--plateform' href='https://video-a-la-demande.orange.fr/' target='_blank'>OrangeVOD</a></li>
        // </ul>

        <section className='movieFound__essentiel-disponibility'>
            <div className='movieFound__essentiel-flatrate'>
                <ul className='movieFound__essentiel-flatrateList'>
                    <li><a className='movieFound__essentiel-flatrateList--flaterate' href='https://www.netflix.com/fr/' target='_blank'>Netflix</a></li>
                    <li><a className='movieFound__essentiel-flatrateList--flaterate' href='https://www.primevideo.com/' target='_blank'>Prime Vidéo</a></li>
                    <li><a className='movieFound__essentiel-flatrateList--flaterate' href='https://www.disneyplus.com/fr-fr' target='_blank'>Disney+</a></li>
                    <li><a className='movieFound__essentiel-flatrateList--flaterate' href='https://video-a-la-demande.orange.fr/' target='_blank'>OrangeVOD</a></li>
                </ul>
            </div>
            <div className='movieFound__essentiel-rent'>
                <ul className='movieFound__essentiel-rentList'>
                    <li><a className='movieFound__essentiel-rentList--rent' href='https://www.netflix.com/fr/' target='_blank'>rent 1</a></li>
                    <li><a className='movieFound__essentiel-rentList--rent' href='https://www.primevideo.com/' target='_blank'>rent 2</a></li>
                    <li><a className='movieFound__essentiel-rentList--rent' href='https://www.disneyplus.com/fr-fr' target='_blank'>rent 3</a></li>
                    <li><a className='movieFound__essentiel-rentList--rent' href='https://video-a-la-demande.orange.fr/' target='_blank'>rent 4</a></li>
                </ul>
            </div>
            <div className='movieFound__essentiel-buy'>
                <ul className='movieFound__essentiel-buyList'>
                    <li><a className='movieFound__essentiel-buyList--buy' href='https://www.netflix.com/fr/' target='_blank'>buy 1</a></li>
                    <li><a className='movieFound__essentiel-buyList--buy' href='https://www.primevideo.com/' target='_blank'>buy 2</a></li>
                    <li><a className='movieFound__essentiel-buyList--buy' href='https://www.disneyplus.com/fr-fr' target='_blank'>buy 3</a></li>
                    <li><a className='movieFound__essentiel-buyList--buy' href='https://video-a-la-demande.orange.fr/' target='_blank'>buy 4</a></li>
                </ul>
            </div>

        </section>

    )
}

export default Providers;