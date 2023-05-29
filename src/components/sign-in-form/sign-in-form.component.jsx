import { useState } from "react";
import { signInAuthUserWithEmailAndPassword, createUserDocumentFromAuth, signInWithGooglePopup } from '../../utils/firebase/firebase.utils'
import FormInput from "../form-input/form-input.component";
import './sign-in-form.styles.scss'
import Button from "../button/button.component";

const defaultFormFields = {
    email: '',
    password: ''
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const handeChange = (event) => {
        const { name, value } = event.target;

        setFormFields({...formFields, [name]:value})
    };

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try{
            await signInAuthUserWithEmailAndPassword(email, password);
            resetFormFields();
        } catch(error){
            if(error.code === 'auth/wrong-password'){
                alert('The password you have given is incorrect');
            }
            else if(error.code === 'auth/user-not-found'){
                alert('The email you have given is incorrect');
            }
            else{
                console.log(error);
            }
        }

    };

    const signInWithGoogle = async () => {
        const response = signInWithGooglePopup();
        const { user } = await response; //use await so that there is a user object to be given to createUserDocumentFromAuth     
    };

    return(
        <div className="sign-in-container">
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label='Email' type='emai' required name="email" onChange={handeChange} value={email}/>
                <FormInput label='Password' type='password' required name="password" onChange={handeChange} value={password}/>
                <div className="buttons-container">
                    <Button type="submit">Sign In</Button>
                    <Button type='button' buttonType='google' onClick={signInWithGoogle}>Google sign in</Button>
                </div>
            </form>
        </div>
    );
};

export default SignInForm;