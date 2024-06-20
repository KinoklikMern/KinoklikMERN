import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SignupCss from './signup.module.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import RegistrationSuccess from './RegistrationSuccess';
import RoleChoice from './RoleChoise';
import RegistrationPersonalInfo from './RegistrationPeronalInfo';
import filmmakerIcon from '../../../images/icons/filmmakerIcon.svg';
import { useTranslation } from 'react-i18next';

function RegistrationForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState('');
  const [nextClicked, setNextClicked] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [role, setRole] = useState({
    label: t('An amazing and talented visionary filmmaker'),
    value: 'Filmmaker',
    image: filmmakerIcon,
  });

  // Personal Info
  const [receiveNewsletter, setReceiveNewsletter] = useState(true);
  const [agreeToTerms, setAgreeToTerms] = useState(false); // New state for the terms and conditions checkbox

  useEffect(() => {
    // Clear the error message when nextClicked changes
    setError('');
  }, [nextClicked]);

  const handleSubmit = async () => {
    // Validate the form fields
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !role
    ) {
      setError(t('All fields are required.'));
      return;
    }

    if (role.value === 'Actor' && !gender) {
      setError(t('Please select gender!'));
      return;
    }

    if (!isValidEmail.test(email)) {
      setError(t('Invalid Email'));
      return;
    }

    if (password !== confirmPassword) {
      setError(t('Passwords do not match.'));
      return;
    }

    if (password.length < 8) {
      setError(t('Password must be at least 8 characters long!'));
      return;
    }
    if (agreeToTerms === false) {
      setError(t('Please check the user agreement option!'));
      return;
    }

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/users/register`,
        {
          email: email,
          password: password,
          firstName: firstName,
          lastName: lastName,
          role: role.value,
          receiveNewsletter: receiveNewsletter,
          gender: gender,
        }
      );

      if (data.emailExists) {
        setError(t('Email is already in use.'));
        return;
      }

      setError('');
      setSuccess(data.message);
      // eslint-disable-next-line no-unused-vars
      const { message, ...rest } = data;
      navigate('/verification', {
        state: { user: data.user },
        replace: true, // prevent user go back to the previous page
      });
    } catch (error) {
      setSuccess('');
      setError(error.response.data.message);
    }
  };

  const handleBack = () => {
    setNextClicked(false); // Set nextClicked to false
    navigate('/signup');
  };

  return (
    <>
      <div className={SignupCss.bg}>
        {!nextClicked && (
          <div className="tw-pt-4 tw-text-center tw-text-3xl tw-font-bold tw-text-[#712cb0] md:tw-text-4xl">
            {t('SIGN UP')}
          </div>
        )}

        <div>
          <div>
            {!nextClicked ? (
              <RoleChoice role={role} setRole={setRole} />
            ) : (
              <RegistrationPersonalInfo
                firstName={firstName}
                lastName={lastName}
                email={email}
                password={password}
                confirmPassword={confirmPassword}
                setFirstName={setFirstName}
                setLastName={setLastName}
                setEmail={setEmail}
                setPassword={setPassword}
                setConfirmPassword={setConfirmPassword}
                role={role}
                receiveNewsletter={receiveNewsletter}
                setReceiveNewsletter={setReceiveNewsletter}
                agreeToTerms={agreeToTerms}
                setAgreeToTerms={setAgreeToTerms}
                handleSubmit={handleSubmit}
                setNextClicked={setNextClicked}
                handleBack={handleBack}
                showBackButton={!nextClicked}
                setGender={setGender}
                gender={gender}
              />
            )}

            {nextClicked ? (
              <button
                onClick={handleSubmit}
                className="[#712cb0] tw-mx-auto tw-my-4 tw-block tw-w-[130px] tw-cursor-pointer tw-rounded-lg tw-border-[0.5px] tw-border-white tw-bg-[#712cb0] tw-text-center tw-text-lg tw-font-medium tw-text-white tw-shadow-[0_4px_8px_0_rgba(96,35,170,0.2),0_6px_20px_0_rgba(175,63,227,0.19)] tw-transition-all  tw-duration-300 hover:tw-bg-white hover:tw-text-[#712cb0]"
              >
                {t('Sign Up')}
              </button>
            ) : null}
            {
              <button
                onClick={() => setNextClicked(!nextClicked)}
                className="tw-mx-auto tw-my-4 tw-block tw-w-[100px] tw-cursor-pointer tw-rounded-lg tw-border-[0.5px] tw-border-[#712cb0] tw-bg-white tw-text-center tw-text-lg tw-font-medium tw-text-[#712cb0] tw-shadow-[0_4px_8px_0_rgba(96,35,170,0.2),0_6px_20px_0_rgba(175,63,227,0.19)] tw-transition-all tw-duration-300 tw-ease-in-out hover:tw-bg-[#712cb0] hover:tw-text-white"
              >
                {!nextClicked ? t('Next') : t('Back')}
              </button>
            }

            <div className={SignupCss.form_Message}>
              {!nextClicked ? (
                <p>
                  {t('already signed up?')}{' '}
                  <Link to="/login" className={SignupCss.link}>
                    {t('Login')}
                  </Link>
                </p>
              ) : null}
              {success && <RegistrationSuccess />}
              {error && <div className={SignupCss.error_text}>*{error}</div>}
              <br />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RegistrationForm;
