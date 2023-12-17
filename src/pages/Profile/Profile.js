import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import config from '../../config';

function Profile() {
    const navigate = useNavigate();

    useEffect(() => {
        navigate(config.routes.profile.me);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
}

export default Profile;
