import './OtherResults.scss';
// Récupérer le contexte

function OtherResults(movieID) {
    // Récupérer la data du context
    console.log(movieID);

    return (
        <aside className='otherResults-container'>
            <div className='otherResults-container--scrollList'>
                <h3 className='otherResults-container--scrollList---title'>Autres résultats</h3>
                {/* Mapper sur les données stockées */}
                    {movieID.movieID.map((movieElem: { poster_path: any; }) => (

                        <a  href='#'><img className='otherResults-container--scrollList---images' src={`https://image.tmdb.org/t/p/${movieElem.poster_path}`} srcSet={`https://image.tmdb.org/t/p/w220_and_h330_face/${movieElem.poster_path} 1x`} alt="" /></a>

                    ))}
            </div>
        </aside>
    )
}

export default OtherResults;

