import SignUpForm from '../../components/sign-up-form/sign-up-form.component'
import './authentication.styles.scss'
import SignInForm from '../../components/sign-in-form/sign-in-form.component';

const Auth = () => {

    return(
        <div className='authentication-container'>
            <SignInForm/>
            <SignUpForm/>
        </div>
    );
};

export default Auth;