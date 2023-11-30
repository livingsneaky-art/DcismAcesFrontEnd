import { useState } from "react";
import { LoginSocialFacebook } from "reactjs-social-login";
import { FacebookLoginButton } from "react-social-login-buttons";

const FacebookAuthLogin = () => {
  const [profile, setProfile] = useState();

  return (
    <div className="flex w-full rounded-md shadow-md justify-center border">
      {!profile ? (
        <LoginSocialFacebook
          appId="1466891613881212"
          onResolve={(response) => {
            console.log(response);
            setProfile(response.data);
          }}
          onReject={(error) => {
            console.log(error);
          }}
        >
          <FacebookLoginButton />
        </LoginSocialFacebook>
      ) : (
        ""
      )}

      {profile ? (
        <div>
          <h1>{profile.name}</h1>
          <img src={profile.picture.data.url} alt={profile.name} />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default FacebookAuthLogin;
