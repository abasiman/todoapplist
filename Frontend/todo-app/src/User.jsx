import { FcGoogle } from 'react-icons/fc';
import { GoogleAuthProvider, signInWithPopup, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "./Firebase";
import { useState } from 'react';

const User = () => {

    const [user, setUser] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const provider = new GoogleAuthProvider();
    const auth = getAuth(app); 

    const SIGN_IN_WITH_GOOGLE = () => {
        
        signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;
            console.log("user >>>", user);
            setUser(user);
            setEmail(user.email);
        }).catch((error) => {
            const errorCode = error.code;
            alert(`Error: ${errorCode}`);
        });
    };

    const signInWithEmailAndPasswordHandler = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                setUser(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(`Error: ${errorCode} - ${errorMessage}`);
            });
    };

    return (
        <div className="main">
            <div className='App'>
                <input 
                    type="email" 
                    placeholder='please enter your email' 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input 
                    type="password" 
                    placeholder='please enter password' 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button onClick={signInWithEmailAndPasswordHandler} type="button">
                    Sign in
                </button>
                <p>or</p>

                <button onClick={SIGN_IN_WITH_GOOGLE} className='google' type="button">
                    Sign in with Google 
                    <FcGoogle size={22} className='icon'/>
                </button>
                {
                    user && <div className='profile'>
                        <h1>{user.displayName || 'No Display Name'}</h1>
                        <img src={user.photoURL || 'placeholder.jpg'} alt='user'/>
                    </div>
                }
            </div>
        </div>
    );
};

export default User;
