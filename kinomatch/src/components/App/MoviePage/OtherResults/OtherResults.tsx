import './OtherResults.scss';
// Récupérer le contexte

function OtherResults() {
    // Récupérer la data du context
    return (
        <aside className='otherResults-container'>
            <div className='otherResults-container--scrollList'>
                <h3 className='otherResults-container--scrollList---title'>Autres résultats</h3>
                {/* Mapper sur les données stockées */}
                <article className='otherResults-container--scrollList---movies'>
                    <a href="#"><img src="" alt="" /></a>
                </article>
            </div>
        </aside>
    )
}

export default OtherResults;