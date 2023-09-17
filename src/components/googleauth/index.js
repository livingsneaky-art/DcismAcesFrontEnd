import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google'
import React from 'react'
import { SignUpGoogle } from '../../services/authentication'
import { useDispatch } from 'react-redux'

const GoogleAuth = () => {
    const dispatch = useDispatch();

    return (
        <div className='flex w-full rounded-md shadow-md justify-center border'>
            <GoogleOAuthProvider clientId="178866011599-ugbm9asmikn05mk1mfo1efqjgg68dl1s.apps.googleusercontent.com">
                <div className='p-2'>
                    <GoogleLogin onSuccess={data => SignUpGoogle(dispatch, data.credential)}
                    />
                </div>
            </GoogleOAuthProvider>
        </div>

    )
}

export default GoogleAuth