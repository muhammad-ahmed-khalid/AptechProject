import React from 'react'
// import * as Screens from '../Screens/index'
import NavigationStrings from '../constants/NavigationStrings'
import * as Container from '../Container/index'

export default function (Stack) {
    return (
        <>
        <Stack.Screen  options={{title: 'Login'}} name={NavigationStrings.LOGIN} component={Container.Login}  />
        <Stack.Screen  options={{title: 'Signup'}} name={NavigationStrings.SIGNUP} component={Container.Signup}  />
            {/* <Stack.Screen  options={{title: 'Auth PhoneNumber', headerShown: true}} name={NavigationStrings.TERMS_CONDITIONS} component={Screens.TermsConditions} />
            <Stack.Screen  options={{title: 'Auth PhoneNumber', headerShown: false}} name={NavigationStrings.PHONE_NUMBER} component={Screens.PhoneNumber} />
            <Stack.Screen name={NavigationStrings.EDIT_PROFILE} component={Screens.EditProfile} />
            <Stack.Screen name={NavigationStrings.OTP_VERIFICATION} component={Screens.OTPVerification} /> */}
        </>
    )
}