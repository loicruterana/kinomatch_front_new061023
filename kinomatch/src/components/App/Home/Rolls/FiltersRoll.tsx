// ================ IMPORT BIBLIOTHEQUES ================
import React, { useContext } from 'react';
import { Genre, ProviderHome } from '../../../../utils/interfaces';

// ================ IMPORT CONTEXTS ================
import { SelectedGenreFiltersContext } from '../../../../contexts/SelectedGenreFiltersContext';
import { SelectedProviderFiltersContext } from '../../../../contexts/SelectedProviderFiltersContext';
import { SelectedDecadeFiltersContext } from '../../../../contexts/SelectedDecadeFiltersContext';
import { SelectedNotationFiltersContext } from '../../../../contexts/SelectedNotationFiltersContext';

// ================ INTERFACES ================
interface RollGenreProps {
  preselectedGenres: Genre[];
  preselectedProviders: ProviderHome[];
  mobileVersion: boolean;
  showRollGenre: boolean;
  showRollProvider: boolean;
  showRollDecade: boolean;
  showRollNotation: boolean;
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
  showRollNotation,
  isLoading,
  handleClickOut,
}: RollGenreProps) => {
  // ================ UTILS ================

  const decades = [];

  for (let i = 2020; i >= 1890; i -= 10) {
    decades.push(i);
  }

  const notations = [];

  for (let i = 90; i >= 0; i -= 10) {
    notations.push(i);
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

  const { addNotationFilter, selectedNotationFilters } = useContext(
    SelectedNotationFiltersContext
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
    console.log(addGenreFilter)
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

  // handleNotationClick pour envoyer les choix de filtres à la fonction addNotationFilter du contexte SelectedNotationFiltersContext et donc stocker le filtre notation dans le state
  function handleNotationClick(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    const target = event.target as HTMLButtonElement;
    const filter = target.textContent;
    if (filter !== null) {
      addNotationFilter(filter);
    }
  }

  // ================ JSX ================
  return (
    <>
      {/* Bouton de validation pour la version mobile */}
      <div
        className={`home-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'
          }__validation`}
      >
        <button onClick={handleClickOut} aria-label='Valider'>
          Valider
        </button>
      </div>

      {/* Affichage des rolls, avec un affichage différent en fonction des filtres sélectionnés */}
      <div
        className={`home-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'
          }__filterRoll`}
        style={
          !mobileVersion
            ? selectedGenreFilters.length > 0 ||
              selectedProviderFilters.length > 0 ||
              selectedDecadeFilters.length > 0
              ? { paddingBottom: '170px' }
              : { paddingBottom: '120px' }
            : { paddingBottom: '0px' }
        }
      >
        {/* ROLL GENRE */}
        <div
          className={`home-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'
            }__roll-backgroundContainer`}
        >
          <div
            className={`home-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'
              }__roll-background`}
          >
            {((showRollGenre && mobileVersion) || !mobileVersion) && (
              <div
                className={`home-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'
                  }__roll-container`}
              >
                <div
                  className={`home-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'
                    }__roll-container__item-category`}
                >
                  GENRE
                </div>
                {isLoading
                  ? 'Chargement en cours'
                  : preselectedGenres.map((preselectedGenre) => (
                    <button
                      className={`home-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'
                        }__roll-container__item-genre${selectedGenreFilters.some(
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
                      aria-label={preselectedGenre.name} // Ajout de l'aria-label
                    >
                      <img
                        className={`home-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'
                          }__roll-container__item-genre--image${selectedGenreFilters.some(
                            (item) =>
                              item.id.toString() ===
                              preselectedGenre.id.toString()
                          )
                            ? '-selected'
                            : ''
                          }`}
                        src={
                          selectedGenreFilters.find(
                            (item) =>
                              item.id.toString() ===
                              preselectedGenre.id.toString()
                          )
                            ? `images/moodlogosnopelloche/${preselectedGenre.id}b.png`
                            : `images/moodlogosnopelloche/${preselectedGenre.id}.png`
                        }
                      ></img>
                      {preselectedGenre.name}
                    </button>
                  ))}
              </div>
            )}
          </div>
        </div>

        {/* ROLL PROVIDERS */}
        <div
          className={`home-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'
            }__roll-backgroundContainer`}
        >
          <div
            className={`home-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'
              }__roll-background`}
          >
            {((showRollProvider && mobileVersion) || !mobileVersion) && (
              <div
                className={`home-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'
                  }__roll-container`}
              >
                <div
                  className={`home-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'
                    }__roll-container__item-category`}
                >
                  PLATEFORME
                </div>
                {isLoading
                  ? 'Chargement en cours'
                  : preselectedProviders.map((preselectedProvider) => (
                    <button
                      className={`home-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'
                        }__roll-container__item-provider${selectedProviderFilters.some(
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
                      aria-label={preselectedProvider.provider_name} // Ajout de l'aria-label
                    >
                      {preselectedProvider.provider_name}
                    </button>
                  ))}
              </div>
            )}
          </div>
        </div>

        {/* ROLL DECENNIES */}
        <div
          className={`home-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'
            }__roll-backgroundContainer`}
        >
          <div
            className={`home-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'
              }__roll-background`}
            onClick={handleClickOut}
          >
            {((showRollDecade && mobileVersion) || !mobileVersion) && (
              <div
                className={`home-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'
                  }__roll-container`}
              >
                <div
                  className={`home-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'
                    }__roll-container__item-category`}
                >
                  DÉCENNIE
                </div>

                {decades.map((decade, index) => (
                  <button
                    key={index}
                    className={`home-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'
                      }__roll-container__item-decade${selectedDecadeFilters.some(
                        (item) => item.toString() === decade.toString()
                      )
                        ? '-selected'
                        : ''
                      }`}
                    onClick={handleDecadeClick}
                    aria-label={decade.toString()} // Ajout de l'aria-label
                  >
                    {decade}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        {/* ROLL NOTES */}
        <div
          className={`home-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'
            }__roll-backgroundContainer`}
        >
          <div
            className={`home-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'
              }__roll-background`}
            onClick={handleClickOut}
          >
            {((showRollNotation && mobileVersion) || !mobileVersion) && (
              <div
                className={`home-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'
                  }__roll-container`}
              >
                <div
                  className={`home-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'
                    }__roll-container__item-category`}
                >
                  NOTE MINIMUM
                </div>

                {notations.map((notation, index) => (
                  <button
                    key={index}
                    className={`home-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'
                      }__roll-container__item-decade${selectedDecadeFilters.some(
                        (item) => item.toString() === notation.toString()
                      )
                        ? '-selected'
                        : ''
                      }`}
                    onClick={handleDecadeClick}
                    aria-label={notation.toString()} // Ajout de l'aria-label
                  >
                    {notation}
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
