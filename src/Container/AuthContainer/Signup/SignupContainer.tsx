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
import { setItem } from '../../../Services/storageServices';
import { useAuth } from '../../../Services/AuthContext';

export default function useSignupContainer() {
  const { setIsAuthenticated } = useAuth();
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
const stackChange = async(data) => {
  await setItem("myLogin",data)
}
const {mutate: logintMutation} = useMutation(login, {
  onSuccess: (data) => {
    console.log(data, "SignUp");
    if(data?.status == 200){
      setIsAuthenticated(true)
      stackChange(data)
    }

  },
  onError: (data) => {
    console.log(data.message.validationErrors, 'errrrrrrrrrr ');
  },
});


  const {control, handleSubmit} = useForm<LoginFormType>({
    mode: 'all',
    defaultValues: LoginDefaultValues,
    // resolver: yupResolver(LoginFormValidationSchema),
  });
//   let fcm = getDevicePayload();
  const handleSubmitForm = async (data: LoginFormType) => {
    const {email, password, name} = data;
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
    formdata.append('name', name);
    formdata.append('email', email);
    formdata.append('password', password);
    formdata.append('Signup', true);
    formdata.append('token', 1);
    
    console.log(formdata, "App")
    logintMutation(formdata)
  };
  return {
    control,
    // handleForgot,
    // handleOnSignUp,
    handleSubmit: handleSubmit(handleSubmitForm),
  };
}
