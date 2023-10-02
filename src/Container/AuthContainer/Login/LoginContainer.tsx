import {useCallback, useContext} from 'react';

// import {yupResolver} from '@hookform/resolvers/yup';
import {useMutation} from '@tanstack/react-query';
import {useForm} from 'react-hook-form';
// import {
//   getDeviceId,
//   getDeviceName,
//   getDevicePayload,
// } from '../../../../src/utility/common';
// import {login} from '../../../APIServices/Auth';
// import {LoginFormValidationSchema} from '../../../constants/validationSchema';
// import loginContext from '../../../contexts/loginContext';
// import {LoginContext} from '../../../contexts/loginContext/types';
// import NavigationRoutes from '../../../navigators/NavigationRoutes';
// import {navigate} from '../../../services/navigationService';
import {LoginFormType, LoginPayload, LoginResponse} from './types';
import { LoginDefaultValues } from '../../../constants/FormDefaultValues';
import { login } from '../../../APIServices/App';

export default function useLoginContainer() {
//   const {setUserAuthentication} = useContext(loginContext) as LoginContext;

//   const {mutate: loginUser} = useMutation(login, {
//     onSuccess: (data: LoginResponse) => {
//       setUserAuthentication(data);
//     },
//     onError: (e: object) => {
//       if (e?.error?.email_verification == false) {
//         navigate(NavigationRoutes.AUTH_STACK.OTP, {userEmail: e?.error?.email});
//       }
//     },
//   });
const {mutate: logintMutation} = useMutation(login, {
  onSuccess: (data) => {
    console.log(data, "LOGINNN")
  },
  onError: (data) => {
    console.log(data.message.validationErrors, 'errrrrrrrrrr ');
  },
});


//   const handleOnSignUp = useCallback(() => {
//     navigate(NavigationRoutes.AUTH_STACK.SIGN_UP);
//   }, []);

//   const handleForgot = useCallback(() => {
//     navigate(NavigationRoutes.AUTH_STACK.FORGOT_PASSWORD);
//   }, []);

//   const handleSigin = useCallback(() => {
//     navigate(NavigationRoutes.AUTH_STACK.LOGIN);
//   }, []);

//   const handleNewPassword = useCallback(() => {
//     navigate(NavigationRoutes.AUTH_STACK.OTP);
//   }, []);

  const {control, handleSubmit} = useForm<LoginFormType>({
    mode: 'all',
    defaultValues: LoginDefaultValues,
    // resolver: yupResolver(LoginFormValidationSchema),
  });
//   let fcm = getDevicePayload();
  const handleSubmitForm = async (data: LoginFormType) => {
    const {email, password} = data;
    // let fcm = await getDevicePayload();

    // const payload: LoginPayload = {
    //   email,
    //   password,
    //   device_id: getDeviceId(),
    //   device_name: getDeviceName(),
    //   fcm_token: fcm?.deviceId || 1,
    // };
    // console.log(payload, "payloadpayload")
    // loginUser(payload);
    let formdata = new FormData();
    formdata.append('email', email);
    formdata.append('password', password);
    formdata.append('SignIn', true);

    logintMutation(formdata)
  };
  return {
    control,
    // handleForgot,
    // handleOnSignUp,
    handleSubmit: handleSubmit(handleSubmitForm),
  };
}
