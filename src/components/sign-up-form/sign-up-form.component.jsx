import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils'
import FormInput from "../form-input/form-input.component";
import './sign-up-form.styles.scss'
import Button from "../button/button.component";

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    const handeChange = (event) => {
        const { name, value } = event.target;

        setFormFields({...formFields, [name]:value})
    };

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if(password !== confirmPassword){
            alert("The password doesn't match the confirm password");
            return;
        }

        try{
            const response = createAuthUserWithEmailAndPassword(email, password);
            const { user } = await response;
            await createUserDocumentFromAuth(user, { displayName });

            resetFormFields();
        } catch(error){
            if(error.code === 'auth/email-already-in-use'){
                alert('Cannot create user, email is already used');
            }
            console.error(error);
        }

    };

    return(
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label='Display Name' type='text' required name="displayName" onChange={handeChange} value={displayName}/>
                <FormInput label='Email' type='emai' required name="email" onChange={handeChange} value={email}/>
                <FormInput label='Password' type='password' required name="password" onChange={handeChange} value={password}/>
                <FormInput label='Confirm Password' type='password' required name="confirmPassword" onChange={handeChange} value={confirmPassword}/>
                <Button type="submit">Sign Up</Button>
            </form>
        </div>
    );
};

export default SignUpForm;