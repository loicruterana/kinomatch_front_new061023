import { useContext } from 'react';

import './PictureProfileModale.scss';

import API_BASE_URL from '../../../../utils/config';

import axios from 'axios';

import { PictureProfile } from '../../../../utils/interfaces';
import { AuthContext } from '../../../../contexts/AuthContext';

const PictureProfileModale = (
  { showPictureProfileModale, setShowPictureProfileModale }: PictureProfile) => {
  const { userData, updateUserDataPicture } = useContext(AuthContext);

  function handleClickOut() {
    // console.log('onpasseici3');
    setShowPictureProfileModale(!showPictureProfileModale);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handleClick(event: { target: any; }) {
    const searchParams = new URLSearchParams();
    searchParams.append('userID', userData.id);

    const imageElement = event.target;
    const profileData = imageElement.getAttribute('data-profile');
    // console.log(profileData);
    const bodyData = {
      picture: profileData,
    };
    // console.log('onpassela');

    axios
      .put(`${API_BASE_URL}/pictures?${searchParams}`, bodyData)
      .then((response) => {
        // console.log('onpasseici');
        console.log('reponse', response);
        updateUserDataPicture(profileData);
      })
      .catch((error) => {
        // console.log('onpasseerreur');
        console.log('error', error);
      });
    // setUserData({
    //   ...userData,
    //   picture: 'yodaprofile',
    // });
    // console.log('onpasseici2');
    handleClickOut();
  }

  return (
    <div className='pictureProfileModale'>
      <div>
        <img
          src='images/leonprofile.png'
          alt='leonprofile'
          className='pictureProfileModale-pic'
          onClick={handleClick}
          data-profile='leonprofile'
        />{' '}
        <img
          src='images/yodaprofile.png'
          alt='yodaprofile'
          className='pictureProfileModale-pic'
          onClick={handleClick}
          data-profile='yodaprofile'
        />{' '}
        <img
          src='images/leiaprofile.png'
          alt='leiaprofile'
          className='pictureProfileModale-pic'
          onClick={handleClick}
          data-profile='leiaprofile'
        />{' '}
        <img
          src='images/ghostfaceprofile.png'
          alt='ghostfaceprofile'
          className='pictureProfileModale-pic'
          onClick={handleClick}
          data-profile='ghostfaceprofile'
        />
      </div>
      {/* <div className='pictureProfileModale__bottompart'>
        <button onClick={handleClickOut}>Retour</button>
      </div> */}
    </div>
  );
};

export default PictureProfileModale;
