import { ThirdPartySignIn } from '../services/authentication';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';

const ThirdPartySignIns = () => {
  const dispatch = useDispatch();

  return <div style={{ textAlign: 'center', marginTop: '1rem' }}>
    <GoogleOAuthProvider clientId="178866011599-ugbm9asmikn05mk1mfo1efqjgg68dl1s.apps.googleusercontent.com">
      <GoogleLogin
        onSuccess={credentialResponse => ThirdPartySignIn(dispatch, credentialResponse.credential)}
        onError={() => {
          console.log('Login Failed');
        }}
      />
    </GoogleOAuthProvider>
  </div>
}

export default ThirdPartySignIns;
