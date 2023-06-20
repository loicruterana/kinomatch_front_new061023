// ================ IMPORT BIBLIOTHEQUES ================
import React, { useContext } from 'react';
import { Genre, Provider } from '../../../../utils/interfaces';

// ================ IMPORT CONTEXTS ================
import { SelectedGenreFiltersContext } from '../../../../contexts/SelectedGenreFiltersContext';
import { SelectedProviderFiltersContext } from '../../../../contexts/SelectedProviderFiltersContext';
import { SelectedDecadeFiltersContext } from '../../../../contexts/SelectedDecadeFiltersContext';

// ================ INTERFACES ================
interface RollGenreProps {
  preselectedGenres: Genre[];
  preselectedProviders: Provider[];
  mobileVersion: boolean;
  showRollGenre: boolean;
  showRollProvider: boolean;
  showRollDecade: boolean;
  isLoading: boolean;
  handleClickOut: () => void;
}

//* ================ COMPOSANT ================

export const RollGenre = ({
  preselectedGenres,
  preselectedProviders,
  mobileVersion,
  showRollGenre,
  showRollProvider,
  showRollDecade,
  isLoading,
  handleClickOut,
}: RollGenreProps) => {
  // ================ UTILS ================

  const decades = [];

  for (let i = 2020; i >= 1890; i -= 10) {
    decades.push(i);
  }

  // ================ IMPORT PROPS CONTEXTS ================

  const { addGenreFilter, selectedGenreFilters } = useContext(
    SelectedGenreFiltersContext
  );
  const { addProviderFilter, selectedProviderFilters } = useContext(
    SelectedProviderFiltersContext
  );
  const { addDecadeFilter, selectedDecadeFilters } = useContext(
    SelectedDecadeFiltersContext
  );

  // ================ HANDLERS ================

  // handler pour envoyer les choix de filtres à la fonction addGenreFilter du contexte SelectedGenreFiltersContext et donc stocker les filtres genre dans le state
  function handleGenreClick(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    const target = event.target as HTMLButtonElement;
    const name = target.textContent;
    const genreId = target.dataset.id;
    if (name !== null && genreId !== undefined) {
      addGenreFilter(name, genreId);
    }
  }
  // handleProviderClick pour envoyer les choix de filtres à la fonction addProviderFilter du contexte SelectedProviderFiltersContext et donc stocker les filtres provider dans le state
  function handleProviderClick(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    const target = event.target as HTMLButtonElement;
    const name = target.textContent;
    const providerId = target.dataset.id;
    if (name !== null && providerId !== undefined) {
      addProviderFilter(name, providerId);
    }
  }

  // handleDecadeClick pour envoyer les choix de filtres à la fonction addDecadeFilter du contexte SelectedDecadeFiltersContext et donc stocker le filtre decade dans le state
  function handleDecadeClick(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    const target = event.target as HTMLButtonElement;
    const filter = target.textContent;
    if (filter !== null) {
      addDecadeFilter(filter);
    }
  }

  // ================ JSX ================
  return (
    <>
      {/* pour la version mobile, on affiche le bouton de validation en bas de la modale */}
      <div
        className={`Home-container__roll-modale-${
          mobileVersion ? 'mobile-version' : 'desktop-version'
        }__validation`}
      >
        <button onClick={handleClickOut}>Valider</button>
      </div>

      {/* affichage des rolls, ceux-ci ont un affichage différent (padding-bottom) si un filtre est sélectionné */}
      <div
        className={`Home-container__roll-modale-${
          mobileVersion ? 'mobile-version' : 'desktop-version'
        }__filterRoll`}
        style={
          selectedGenreFilters.length > 0 ||
          selectedProviderFilters.length > 0 ||
          selectedDecadeFilters.length > 0
            ? { paddingBottom: '170px' }
            : { paddingBottom: '120px' }
        }
      >
        {/* // ================ JSX : ROLL GENRE ================ */}
        <div
          className={`Home-container__roll-modale-${
            mobileVersion ? 'mobile-version' : 'desktop-version'
          }__roll-backgroundContainer`}
        >
          <div
            className={`Home-container__roll-modale-${
              mobileVersion ? 'mobile-version' : 'desktop-version'
            }__roll-background`}
          >
            {((showRollGenre && mobileVersion) || !mobileVersion) && (
              <div
                className={`Home-container__roll-modale-${
                  mobileVersion ? 'mobile-version' : 'desktop-version'
                }__roll-container`}
              >
                <div
                  className={`Home-container__roll-modale-${
                    mobileVersion ? 'mobile-version' : 'desktop-version'
                  }__roll-container__item-category`}
                >
                  GENRE
                </div>
                {isLoading
                  ? 'Chargement en cours'
                  : preselectedGenres.map((preselectedGenre) => (
                      <button
                        className={`Home-container__roll-modale-${
                          mobileVersion ? 'mobile-version' : 'desktop-version'
                        }__roll-container__item${
                          selectedGenreFilters.some(
                            (item) =>
                              item.id.toString() ===
                              preselectedGenre.id.toString()
                          )
                            ? '-selected'
                            : ''
                        }`}
                        key={preselectedGenre.id}
                        onClick={handleGenreClick}
                        data-id={preselectedGenre.id}
                      >
                        {preselectedGenre.name}
                      </button>
                    ))}
              </div>
            )}
          </div>
        </div>
        {/* // ================ JSX : ROLL PROVIDERS ================ */}
        <div
          className={`Home-container__roll-modale-${
            mobileVersion ? 'mobile-version' : 'desktop-version'
          }__roll-backgroundContainer`}
        >
          <div
            className={`Home-container__roll-modale-${
              mobileVersion ? 'mobile-version' : 'desktop-version'
            }__roll-background`}
          >
            {((showRollProvider && mobileVersion) || !mobileVersion) && (
              <div
                className={`Home-container__roll-modale-${
                  mobileVersion ? 'mobile-version' : 'desktop-version'
                }__roll-container`}
              >
                <div
                  className={`Home-container__roll-modale-${
                    mobileVersion ? 'mobile-version' : 'desktop-version'
                  }__roll-container__item-category`}
                >
                  PLATEFORME
                </div>
                {isLoading
                  ? 'Chargement en cours'
                  : preselectedProviders.map((preselectedProvider) => (
                      <button
                        className={`Home-container__roll-modale-${
                          mobileVersion ? 'mobile-version' : 'desktop-version'
                        }__roll-container__item${
                          selectedProviderFilters.some(
                            (item) =>
                              item.provider_id.toString() ===
                              preselectedProvider.provider_id.toString()
                          )
                            ? '-selected'
                            : ''
                        }`}
                        onClick={handleProviderClick}
                        data-id={preselectedProvider.provider_id}
                        key={preselectedProvider.provider_id}
                      >
                        {preselectedProvider.provider_name}
                      </button>
                    ))}
              </div>
            )}
          </div>
        </div>
        {/* // ================ JSX : ROLL DECENNIES ================ */}
        <div
          className={`Home-container__roll-modale-${
            mobileVersion ? 'mobile-version' : 'desktop-version'
          }__roll-backgroundContainer`}
        >
          <div
            className={`Home-container__roll-modale-${
              mobileVersion ? 'mobile-version' : 'desktop-version'
            }__roll-background`}
            onClick={handleClickOut}
          >
            {((showRollDecade && mobileVersion) || !mobileVersion) && (
              <div
                className={`Home-container__roll-modale-${
                  mobileVersion ? 'mobile-version' : 'desktop-version'
                }__roll-container`}
              >
                <div
                  className={`Home-container__roll-modale-${
                    mobileVersion ? 'mobile-version' : 'desktop-version'
                  }__roll-container__item-category`}
                >
                  DÉCENNIE
                </div>

                {decades.map((decade, index) => (
                  <button
                    key={index}
                    className={`Home-container__roll-modale-${
                      mobileVersion ? 'mobile-version' : 'desktop-version'
                    }__roll-container__item${
                      selectedDecadeFilters.some(
                        (item) => item.toString() === decade.toString()
                      )
                        ? '-selected'
                        : ''
                    }`}
                    onClick={handleDecadeClick}
                  >
                    {decade}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );

  //* ================ FERMETURE DU COMPOSANT ================
};

export default RollGenre;
